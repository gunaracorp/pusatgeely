---
Task ID: 1
Agent: Z.ai Code (main orchestrator)
Task: Install website dari github.com/prabudanling/pusatgeely ke project Next.js dan upgrade menjadi super powerful super web app full SEO

Work Log:
- Clone repo prabudanling/pusatgeely ke /tmp/pusatgeely-repo, analisis struktur (website dealer Geely Bogor, Next.js 16 + Prisma + SEO engine 2.655 keyword)
- Verifikasi package.json kedua project identik — tanpa install dependensi baru
- rsync seluruh src/, public/ (images webp, promos PDF, humans.txt, key IndexNow), prisma/schema.prisma dari repo ke /home/z/my-project
- Hapus public/robots.txt statis agar robots.ts dinamis (dengan referensi sitemap) aktif
- Tambahkan redirects SEO (301: /harga → /harga-mobil-geely-bogor, /promo → /promo-geely-bogor) di next.config.ts
- bun run db:push + db:generate — tabel Lead siap
- UPGRADE 1 — AI Chat Assistant: buat src/app/api/chat/route.ts (z-ai-web-dev-sdk, system prompt dari data MODELS/BUSINESS, rate limit 4s, context 12 turn, bilingual ID/EN) + src/components/ai-chat-widget.tsx (FAB gradient emerald + pulse dot, panel responsif, suggestion chips, typing indicator, render markdown bold, WhatsApp handoff otomatis, reset). Terintegrasi di root layout → tampil di 50+ halaman
- UPGRADE 2 — Dynamic OG Image: src/app/opengraph-image.tsx (beranda, ImageResponse 1200x630) + src/app/model/[slug]/opengraph-image.tsx (kartu branded + foto unit asli via sharp webp→png base64, karena satori tidak mendukung webp). Hapus openGraph.images manual di model page agar kartu dinamis dipakai
- Task 5 (sitemap priority + changeFrequency) sudah ada bawaan repo — diverifikasi berfungsi (59 URL di sitemap.xml)
- Verifikasi Agent Browser: homepage render sempurna (desktop+mobile), AI chat end-to-end (chip → jawaban akurat harga EX5 → tombol WA), form test drive submit sukses + lead tersimpan di DB dengan normalisasi nomor, sticky bar mobile + footer + kedua FAB tanpa overlap, zero console error

Stage Summary:
- Website Pusat Geely terinstall penuh dan berjalan di port 3000: 59 URL sitemap, 44 landing SEO, JSON-LD 9 tipe, IndexNow, bilingual ID/EN
- Fitur baru: Geely Bot (AI chat 24/7 dengan data produk real-time dari lib/site.ts) + dynamic OG image per halaman
- API baru: /api/chat (POST, z-ai LLM, rate-limited)
- Semua verifikasi browser lolos; lint 0 error 0 warning
