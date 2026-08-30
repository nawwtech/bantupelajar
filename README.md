# BantuPelajar V4

BantuPelajar menggunakan Next.js di Vercel dan Supabase untuk fitur aplikasi/auth. Fitur AI menggunakan Groq melalui Next.js server route `/api/ai`.

## Environment Variables

Set di Vercel:

- `GROQ_API_KEY` — secret API key dari Groq
- Supabase variables jika diperlukan oleh environment aplikasi kamu

Jangan commit API key ke GitHub dan jangan gunakan prefix `NEXT_PUBLIC_` untuk `GROQ_API_KEY`.

## AI

Request frontend:

`POST /api/ai`

Body:

```json
{"message":"Jelaskan hukum Newton 2"}
```

Response:

```json
{"answer":"..."}
```
