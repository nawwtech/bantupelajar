# BantuPelajar V4 — GitHub + Vercel + Supabase + Groq

## 0) Tidak ada .env
File `.env`, `.env.local`, dan `.env.example` sengaja tidak dipakai.

## 1) GitHub
Upload seluruh isi folder ini ke repository. Jangan upload API key, service-role key, OAuth client secret, atau file .env.

## 2) Supabase
Project Settings -> API:
- Copy Project URL
- Copy Publishable Key

Buka `lib/config.ts` dan ganti hanya:
SUPABASE_URL
SUPABASE_PUBLISHABLE_KEY

Publishable key boleh dipakai di browser. Jangan pernah memakai `service_role` key di file ini.

## 3) Google OAuth
Supabase -> Authentication -> Providers -> Google -> Enable.
Masukkan Google OAuth Client ID + Client Secret yang sudah dibuat.
Google Cloud Authorized redirect URI:
https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback

Supabase Authentication -> URL Configuration:
Site URL:
https://YOUR_VERCEL_DOMAIN
Redirect URL:
https://YOUR_VERCEL_DOMAIN/auth/callback

## 4) Groq
Supabase Dashboard -> Edge Functions -> Secrets Management.
Buat secret:
GROQ_API_KEY = (API key Groq kamu)

Jangan menaruh key Groq di GitHub atau `lib/config.ts`.

## 5) Deploy Edge Function
Supabase Edge Function `groq-chat` harus dideploy dari folder `supabase/functions/groq-chat`.
Jika memakai Supabase CLI:
supabase login
supabase link --project-ref YOUR_PROJECT_ID
supabase functions deploy groq-chat

## 6) Vercel
Import GitHub repository ke Vercel dan Deploy.
Tidak perlu Environment Variables untuk project ini.

## 7) Test
1. Buka Vercel URL.
2. Login dengan Google.
3. Pastikan masuk `/dashboard`.
4. Buka AI Tutor.
5. Kirim pertanyaan.
6. Jika AI error, cek Supabase Edge Function logs dan pastikan secret GROQ_API_KEY sudah ada.

## Catatan penting
Vercel = hosting website.
Supabase = Google Auth, database, dan Edge Function.
Groq = AI model.

## 8) Login-first behavior
`middleware.ts` handles the auth gate:
- `/` -> `/login` when there is no Supabase session
- `/` -> `/dashboard` when already logged in
- `/login` -> `/dashboard` when already logged in
- `/dashboard`, `/tutor`, and other app routes -> `/login` when not logged in
- `/auth/callback` remains public so OAuth can finish

This is server-side middleware, so the browser does not briefly show the landing page to logged-out users before redirecting.
