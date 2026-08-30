const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const { message } = await req.json();
    if (typeof message !== "string" || !message.trim()) {
      return new Response(JSON.stringify({ error: "Pertanyaan tidak valid." }), { status: 400, headers: cors });
    }

    const key = Deno.env.get("GROQ_API_KEY");
    if (!key) {
      return new Response(JSON.stringify({ error: "GROQ_API_KEY belum diset di Supabase Edge Functions." }), { status: 503, headers: cors });
    }

    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "Kamu adalah BantuPelajar, tutor pendidikan berbahasa Indonesia. Jelaskan dengan akurat, bertahap, sederhana, dan sesuai tingkat pelajar. Jangan mengarang fakta. Bantu siswa memahami proses, bukan sekadar memberi jawaban.",
          },
          { role: "user", content: message },
        ],
        temperature: 0.4,
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      return new Response(JSON.stringify({ error: data?.error?.message || "Groq gagal merespons." }), { status: r.status, headers: cors });
    }

    return new Response(JSON.stringify({ answer: data?.choices?.[0]?.message?.content || "" }), { status: 200, headers: cors });
  } catch {
    return new Response(JSON.stringify({ error: "Request AI tidak valid." }), { status: 400, headers: cors });
  }
});
