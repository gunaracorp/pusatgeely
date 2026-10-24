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
---
Task ID: 2
Agent: Z.ai Code (main orchestrator)
Task: Diagnosis & perbaikan error sitemap Google Search Console pasca-deploy Vercel + upgrade SEO (46 dewan pakar)

Work Log:
- DIAGNOSIS: fetch live seperti Googlebot — pusatgeely.web.id/sitemap.xml 200 OK (59 URL valid); pusatgeely.vercel.app/sitemap.xml juga 200 tetapi SELURUH <loc> menunjuk ke pusatgeely.web.id → HOST MISMATCH = penyebab "Kami mengalami error saat mencoba mengakses peta situs" saat disubmit dari property vercel.app/domain lain
- FIX KRITIS: SITE_URL dinamis di src/lib/site.ts — prioritas NEXT_PUBLIC_SITE_URL → VERCEL_PROJECT_PRODUCTION_URL → VERCEL_URL → fallback https://pusatgeely.web.id; canonical, sitemap, JSON-LD, OG otomatis mengikuti domain deployment
- FIX: /api/indexnow ACCEPT multi-host (web.id + www + host aktif dari SITE_URL), host payload diambil dari URL pertama
- FIX: /api/chat + kedua opengraph-image pakai SITE_URL dinamis (tidak ada hardcode domain lagi)
- BARU: /api/seo-status — endpoint diagnostik pasca-deploy (host check vs canonical, jumlah URL sitemap, robots, keyword engine, checklist GSC 6 langkah)
- BARU: Sitelinks SearchAction JSON-LD di WebSite schema (target /indeks-kata-kunci?q={search_term_string}) + komponen keyword-explorer.tsx (search instan 2.655 frasa, word-based matching, ?q= deep-link, replaceState shareable, empty-state CTA WhatsApp)
- BUG FIX saat verifikasi: pencarian multi-kata substring → word-based ("kredit coolray" kini cocok 51 frasa)
- Verifikasi SSR: 2.729 internal link tetap di HTML awal (crawler-friendly)
- vercel.json: header cache sitemap/robots + X-Content-Type-Options + Referrer-Policy
- README di-rewrite lengkap + section baru "🚨 TROUBLESHOOTING: Error Sitemap di Google Search Console" (4 penyebab + solusi + alat diagnostik)
- Lint bersih; semua route 200

Stage Summary:
- Root cause error GSC: host mismatch (sitemap vercel.app berisi URL web.id) — diperbaiki permanen via SITE_URL dinamis; user tinggal set NEXT_PUBLIC_SITE_URL di Vercel + redeploy, lalu submit sitemap dari property yang host-nya sama
- SEO naik level: SearchAction sitelinks + search instan 2.655 frasa + endpoint diagnostik + vercel hardening
- Semua verifikasi browser & curl lolos; lint 0 error
---
Task ID: 3
Agent: Z.ai Code (main orchestrator)
Task: Pusat Unduhan — semua file proyek dapat diunduh via link (user: "tolong agar semua bisa di download berikan link nya")

Work Log:
- Audit ukuran: source total ±5,2 MB (src 1,1M + public 3,8M + prisma/db ~36K); node_modules 1,2 GB sengaja tidak diikutkan (di-install ulang via bun install; Vercel install otomatis)
- Rebuild zip lengkap 2 iterasi: percobaan pertama 44 MB karena folder sandbox skills/ (61 MB) ikut terzip; final dibersihkan dari skills/, .zscripts/, upload/, mini-services/, examples/, tests/, .git/, .next/, *.log, .env → 4,0 MB / 195 file
- 6 arsip di public/downloads/: 00-pusatgeely-source-lengkap.zip (4,0 MB, rekomendasi, deploy-ready), 01-source-code.zip (240 KB), 02-assets-gambar-promo.zip (3,6 MB), 03-database-prisma.zip (1,5 KB — SQLite terkompresi ekstrem, terverifikasi isinya benar), 04-config-deployment.zip (116 KB), PANDUAN-DEPLOY-VERCEL.md (4,5 KB)
- Download center /downloads/index.html: tema emerald branded, 6 kartu unduhan (badge, ukuran, deskripsi, tombol download), box penjelasan "kenapa kecil itu normal", ringkasan deploy 5 langkah, meta noindex
- robots.ts: tambah Disallow /downloads/ agar arsip tidak terindex Google
- DEPLOY-VERCEL.md baru (root + copy di /downloads): langkah deploy Vercel, env NEXT_PUBLIC_SITE_URL, domain kustom, submit sitemap GSC dengan aturan host-sama, troubleshooting error sitemap, catatan SQLite read-only di Vercel + migrasi Postgres, checklist go-live
- Hardening OG image model: sharp di-lazy-import → bila bundel Vercel tidak menyertakan sharp, kartu OG tetap render tanpa foto (bukan 500)
- Verifikasi: curl 200 semua unduhan (content-type application/zip + content-length benar), sitemap.xml 200, robots.txt menutup /downloads, lint 0 error, Agent Browser: download center render sempurna (6 kartu, 0 console error), href unduh benar, beranda tetap normal; dev.log bersih

Stage Summary:
- Pusat unduhan online: /downloads/index.html + 5 arsip + panduan — semua file proyek kini diunduh satu klik via preview
- Zip lengkap 4,0 MB deploy-ready: sudah memuat fix sitemap SITE_URL dinamis + vercel.json (Task 2) + hardening OG (Task 3)
- /downloads diblokir crawler; OG image kini tangguh di Vercel
