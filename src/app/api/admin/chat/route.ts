import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getContent, saveContent } from "@/lib/content";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are an AI assistant managing the Bestax Canada accounting services landing page. Your job is to help the Bestax team make content changes by understanding natural language requests.

The page has these editable sections:
- hero.urgencyStrip — the orange banner strip at the top
- hero.headlinePre / hero.headlineAccent / hero.headlinePost — the 3-part main headline (accent part shows in orange/red)
- stats[0-3] — four stat boxes (num + label) below the video
- painPoints[0-5] — six pain points in the "This is for you if..." card
- callBenefits[0-3] — four benefits in the "On the free call, Bestax will:" card
- banner.label / banner.amount / banner.subtitle / banner.footnote — the red $427K banner
- darkSection.label / darkSection.headline / darkSection.body — the dark "Most Business Owners Act Too Late" section
- faqs — array of {q, a} FAQ items (can add, edit, or remove items)

When the user asks you to change something:
1. Understand exactly what they want
2. Call the update_page_content tool with only the fields that need to change
3. Explain what you changed in a friendly, clear message

If you need clarification, ask before making changes.
Be concise and friendly. You're helping a non-technical team manage their marketing page.`;

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;
  const envPassword = (process.env.ADMIN_PASSWORD ?? "").trim();
  if (token !== envPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { messages } = await req.json();
  const currentContent = await getContent();

  const tools: Anthropic.Tool[] = [
    {
      name: "update_page_content",
      description:
        "Apply content changes to the live landing page. Only include the fields that need to change.",
      input_schema: {
        type: "object" as const,
        properties: {
          updates: {
            type: "object",
            description: "Partial PageContent object with only the changed fields",
          },
        },
        required: ["updates"],
      },
    },
  ];

  const contextMessage: Anthropic.MessageParam = {
    role: "user",
    content: `Current page content:\n${JSON.stringify(currentContent, null, 2)}\n\n---\n\n${messages[messages.length - 1].content}`,
  };

  const history: Anthropic.MessageParam[] = [
    ...messages.slice(0, -1),
    contextMessage,
  ];

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    tools,
    messages: history,
  });

  let reply = "";
  let appliedChanges: object | null = null;

  for (const block of response.content) {
    if (block.type === "text") {
      reply += block.text;
    } else if (block.type === "tool_use" && block.name === "update_page_content") {
      const { updates } = block.input as { updates: object };
      try {
        await saveContent(updates as Parameters<typeof saveContent>[0]);
        appliedChanges = updates;
      } catch (err) {
        reply += "\n\n⚠️ Could not save changes — Redis not configured yet.";
        console.error(err);
      }
    }
  }

  if (!reply && appliedChanges) {
    reply = "Done! The page has been updated.";
  }

  return NextResponse.json({ reply, appliedChanges });
}
