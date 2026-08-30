# BantuPelajar V4 — Vercel + Supabase + Groq

## Deploy

1. Push project ke GitHub.
2. Import repository ke Vercel.
3. Tambahkan Environment Variable di Vercel:

`GROQ_API_KEY` = API key Groq kamu

4. Redeploy.

## Arsitektur AI

AI sekarang berjalan melalui Next.js Route Handler:

`/api/ai` → Groq API

Tidak ada lagi Supabase Edge Function untuk Groq, sehingga build Vercel tidak perlu memproses import Deno.

## Supabase

Supabase tetap dipakai untuk autentikasi/database yang ada di aplikasi.
