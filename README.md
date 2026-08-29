# BantuPelajar V4

BantuPelajar memakai Vercel untuk frontend, Supabase untuk Google Auth/database/Edge Functions, dan Groq untuk AI. Tidak memakai `.env` untuk konfigurasi frontend.

## Quick setup

1. Push project ke GitHub.
2. Import repository ke Vercel dan deploy. Tidak perlu Vercel Environment Variables.
3. Supabase -> Authentication -> Providers -> Google: enable Google dan masukkan Client ID + Client Secret dari Google Cloud.
4. Google Cloud OAuth Web Client:
   - Authorized JavaScript origins: `https://bantupelajar.vercel.app`
   - Authorized redirect URI: `https://deylaklrprkfgrljcvzl.supabase.co/auth/v1/callback`
5. Supabase -> Authentication -> URL Configuration:
   - Site URL: `https://bantupelajar.vercel.app`
   - Redirect URL: `https://bantupelajar.vercel.app/auth/callback`
6. Supabase Edge Functions -> Secrets: add `GROQ_API_KEY` with your Groq secret. Never commit the Groq key.
7. Deploy `supabase/functions/groq-chat`.

## Routes

- `/` landing page
- `/login` Google login page
- `/auth/callback` OAuth callback
- `/dashboard` dashboard
- `/tutor` AI Tutor

The Supabase Publishable Key is intentionally in `lib/config.ts`; it is designed for browser use. Do not replace it with a service-role key.
