import { NextResponse } from "next/server";
import { GROQ_API_KEY, GROQ_API_URL, GROQ_MODEL } from "@/lib/config";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY belum diset di Vercel Environment Variables." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const message = body?.message;

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Pertanyaan tidak valid." },
        { status: 400 }
      );
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah BantuPelajar, tutor AI yang ramah. Jelaskan materi dengan jelas, bertahap, dan sesuai level pelajar. Gunakan Bahasa Indonesia kecuali pengguna meminta bahasa lain.",
          },
          { role: "user", content: message.trim() },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "Groq gagal merespons." },
        { status: response.status }
      );
    }

    const answer = data?.choices?.[0]?.message?.content;

    if (typeof answer !== "string" || !answer.trim()) {
      return NextResponse.json(
        { error: "Groq mengembalikan jawaban kosong." },
        { status: 502 }
      );
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json(
      { error: "Gagal menghubungi Groq." },
      { status: 500 }
    );
  }
}
