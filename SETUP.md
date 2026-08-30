# BantuPelajar setup

## Groq

The Groq key is configured manually in `lib/config.ts`.

1. Open `lib/config.ts`.
2. Replace `PASTE_GROQ_API_KEY_HERE` with your Groq API key.
3. Run `npm run build`.
4. Deploy from the local project if you are intentionally using manual config.

**Important:** never commit the real Groq API key to GitHub. GitHub secret scanning can block the push, and an exposed key should be revoked/rotated immediately.

The AI endpoint is a normal Next.js Node.js API route at `/api/ai`; there is no Supabase Edge Function or Deno import.
