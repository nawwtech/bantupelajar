# Build/deploy check

This version is fixed for Vercel's TypeScript path resolution.

## Important
- Supabase URL + publishable key are stored in `lib/config.ts` (no `.env` required).
- NEVER put the Groq API key in frontend code, `lib/config.ts`, GitHub, or Vercel source.
- Put `GROQ_API_KEY` in Supabase Edge Function secrets.
- `@/*` is explicitly mapped to the project root in `tsconfig.json`.

## Vercel
Push the whole project to GitHub and deploy the repository root. The Vercel build command is `npm run build`.

## Login flow
`/` -> `/login` when logged out -> Google OAuth -> `/auth/callback` -> `/dashboard`.
Authenticated users visiting `/` or `/login` are sent to `/dashboard`.
