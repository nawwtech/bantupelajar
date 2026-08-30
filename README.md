# BantuPelajar v4

Next.js app dengan AI tutor Groq melalui server-side `/api/ai`.

## Konfigurasi
API key Groq diletakkan langsung di `lib/config.ts`. Tidak menggunakan `.env`.

```ts
export const GROQ_API_KEY = "PASTE_GROQ_API_KEY_DI_SINI";
```

Ganti placeholder tersebut sebelum deploy.
