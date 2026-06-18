import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getContent, saveContent } from "@/lib/content";

const SYSTEM_PROMPT = `You are an AI assistant with FULL CONTROL over the Bestax Canada landing page. You can change anything on the page — text, design, colors, layout settings, phone numbers, emails, and more. Never say "you need a developer" — if a request is within the editable settings below, just do it immediately.

EDITABLE SECTIONS — you can change all of these:

CONTENT:
- hero.urgencyStrip — top orange strip text
- hero.headlinePre / hero.headlineAccent / hero.headlinePost — main headline (3 parts; accent shows in orange/red)
- stats[0-3] — four stat boxes: { num, label }
- painPoints[0-5] — six "This is for you if..." bullet points
- callBenefits[0-3] — four "On the free call..." bullet points
- banner.label / banner.amount / banner.subtitle / banner.footnote — the big red $427K banner
- darkSection.label / darkSection.headline / darkSection.body — the dark urgency section
- faqs — array of { q, a } — add, edit, remove any FAQ

DESIGN & CONTACT:
- header.phone — phone number shown in top header
- header.ctaText — the top header button label (e.g. "Book Free Call")
- header.ctaHref — where header button links to (e.g. "#booking")
- footer.phone — phone number in footer
- footer.email — email address in footer
- footer.hours — business hours shown in footer (e.g. "Mon–Sat 9am–8pm")
- footer.logoColorful — true = show logo in original colors, false = white/inverted (default)
- booking.cardTitle — title inside the red booking card header
- booking.cardSubtitle — subtitle under the booking card title
- booking.calloutText — the "Free · No obligation · 20 min" line
- testimonials.heading — heading above the review screenshots
- testimonials.subheading — caption below the review screenshots

RULES:
1. Always call update_page_content immediately when you know what to change — don't ask for confirmation unless truly ambiguous
2. If the user says "make the footer logo colorful", set footer.logoColorful to true
3. If asked to change the phone number, update both header.phone AND footer.phone
4. For FAQs, always send the complete updated faqs array (not just the changed item)
5. Be concise — confirm what you changed in one sentence after applying it
6. If the user shares a screenshot, analyze it carefully and apply matching changes`;


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

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;
  const envPassword = (process.env.ADMIN_PASSWORD ?? "").trim();
  if (token !== envPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Strip BOM and whitespace that PowerShell piping can inject
  const apiKey = (process.env.ANTHROPIC_API_KEY ?? "").replace(/^﻿/, "").trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured. Please add it in Vercel environment variables." },
      { status: 500 }
    );
  }

  const anthropic = new Anthropic({ apiKey });

  try {
    const { messages, imageBase64, imageType } = await req.json() as {
      messages: Anthropic.MessageParam[];
      imageBase64?: string;
      imageType?: string;
    };

    const currentContent = await getContent();
    const contextPrefix = `Current page content:\n${JSON.stringify(currentContent, null, 2)}\n\n---\n\n`;

    // Build last user message — inject image and context prefix
    const lastMsg = messages[messages.length - 1];
    const lastText = typeof lastMsg.content === "string" ? lastMsg.content : "";

    let lastContent: Anthropic.MessageParam["content"];
    if (imageBase64 && imageType) {
      const validType = (["image/jpeg","image/png","image/gif","image/webp"].includes(imageType)
        ? imageType
        : "image/jpeg") as "image/jpeg" | "image/png" | "image/gif" | "image/webp";
      lastContent = [
        { type: "image" as const, source: { type: "base64" as const, media_type: validType, data: imageBase64 } },
        { type: "text" as const, text: contextPrefix + (lastText || "Here is a screenshot for reference. Please analyze it and help make changes.") },
      ];
    } else {
      lastContent = contextPrefix + lastText;
    }

    const contextualMessages: Anthropic.MessageParam[] = [
      ...messages.slice(0, -1),
      { role: "user", content: lastContent },
    ];

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools,
      messages: contextualMessages,
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
          reply += "\n\n⚠️ Could not save to Redis — check UPSTASH env vars.";
          console.error(err);
        }
      }
    }

    if (!reply && appliedChanges) {
      reply = "Done! The page has been updated.";
    }

    return NextResponse.json({ reply, appliedChanges });
  } catch (err: unknown) {
    console.error("Chat API error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
