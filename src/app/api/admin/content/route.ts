import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;
  if (token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updates = await req.json();
  await saveContent(updates);
  return NextResponse.json({ ok: true });
}
