# BantuPelajar

Next.js + Supabase Auth. Fitur yang aktif:
- Google login
- Login email dengan magic link
- AI Tutor route
- Quiz dengan skor + pembahasan
- Catatan
- Tugas + deadline
- Progress + riwayat quiz

## Konfigurasi
Edit `app/lib/config.ts` pada salinan deployment yang aman dan isi URL Supabase serta nilai AI yang dibutuhkan. Jangan commit nilai rahasia ke repository.

Model AI default: `openai/gpt-oss-120b`.
