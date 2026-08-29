import { NextResponse } from "next/server";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/lib/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body?.message;
    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Pertanyaan tidak valid." }, { status: 400 });
    }

    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/groq-chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ message }),
      }
    );

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error || "AI gagal merespons." },
        { status: response.status }
      );
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Gagal menghubungi AI." }, { status: 500 });
  }
}
