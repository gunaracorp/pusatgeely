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
---
Task ID: 4
Agent: Z.ai Code (main orchestrator)
Task: Rapihkan menu navigasi + sentuhan animasi halus (user: "rapihkan menu ... tambahkan sentuhan animasi yang tidak terlalu berat")

Work Log:
- AUDIT menu lama: 11 item datar (penuh, tanpa hierarki), logo pakai href="#beranda" (RUSAK di halaman sub), nav pakai <a> biasa (tanpa prefetch Next.js)
- RESTRUKTURISASI → 3 grup dropdown desktop: MODEL (grid 2x2: 4 model + powertrain + harga + footer "Lihat semua harga"), LAYANAN (Harga/Promo/Simulasi Kredit/Test Drive + deskripsi 1 baris + ikon), JELAJAH (Artikel/Galeri/FAQ/Indeks Kata Kunci/Sales/Kontak)
- Animasi halus (<300ms, hormati prefers-reduced-motion via useReducedMotion): scroll progress bar spring di tepi header (useScroll+useSpring, transform-only GPU), dropdown fade+slide+scale via AnimatePresence, stagger item 28ms, underline gradient scaleX di hover trigger, chevron rotate, logo BrandMark rotate+scale saat hover grup, header menyusut h-16→h-14 saat scroll, WA CTA active:scale + hover shadow, pill bahasa layoutId meluncur antar ID/EN, mobile sheet item stagger x:-12→0 40ms
- Mobile sheet dikontrol (open state): semua link next/link + onClick tutup sheet; grup MODEL (harga di kanan), LAYANAN (tile ikon + deskripsi), JELAJAH; logo → Link "/" (fix broken hash), sheet diberi SheetDescription sr-only
- i18n: tambah 8 kunci nav baru bilingual (keywords, explore, seeAllPrices, hargaDesc, promoDesc, kreditDesc, testDriveDesc)
- Aksesibilitas: aria-expanded/aria-haspopup trigger, tutup via Escape (fokus kembali ke trigger), klik luar via pointerdown, hover intent 140ms close delay, panel tetap dalam hover area
- FIX warning Next 16: data-scroll-behavior="smooth" di <html> (smooth scroll tak lagi melawan transisi rute)
- FIX warning Radix: DialogContent tanpa Description → SheetDescription sr-only
- Verifikasi Agent Browser end-to-end: dropdown Model (expanded=true, 4 link + harga), Layanan, Jelajah tampil benar; klik EX2 → client-side nav ke /model/ex2; Escape menutup; mobile 390px: sheet terstagger sempurna (15 link + sosial + toggle); toggle EN di dalam sheet mengubah seluruh menu ke Inggris dan persist setelah reload; console 100% bersih; lint 0 error

Stage Summary:
- Menu: 11 item datar → 3 grup elegan dengan mega-panel Model berisi harga real-time dari lib/site.ts
- Semua nav kini next/link (prefetch + SPA nav); logo fix ke "/"
- Animasi ringan GPU-only, semua hormati reduced-motion; 2 warning console dihapus permanen
- File: site-header.tsx (rewrite), i18n.ts, layout.tsx
---
Task ID: 5
Agent: Z.ai Code (main orchestrator)
Task: Fix warning GSC aggregateRating/review + jadikan sumber rujukan utama mesin pencari AI (GEO god mode)

Work Log:
- DIAGNOSIS: hint GSC "aggregateRating/review tidak ada" bersumber dari Product JSON-LD di 4 halaman model. Keputusan 46 dewan pakar: TIDAK memalsukan rating (Google spam policy → manual action) — bangun mesin review ASLI
- DB: model Review (modelId, name, city, rating 1-5, comment, published flag, @@index) + db push
- API publik /api/reviews: GET published+aggregate (degrade aman tanpa DB), POST submit publik (validasi ketat, honeypot "website", rate limit 1/10 menit/IP, published=false)
- API admin /api/reviews/admin: GET list semua + POST publish/unpublish/delete/add — auth header x-admin-key = env REVIEWS_ADMIN_KEY (min 8 char, 403 tanpa env)
- Komponen review-section.tsx: badge agregat bintang, daftar ulasan (max-h-96 scroll), form rating bintang interaktif + honeypot + toast sonner, empty-state jujur, teks bilingual inline
- Halaman model: revalidate 3600 (ISR) + query review server-side try/catch → Product JSON-LD memuat aggregateRating + review (10 terbaru) HANYA saat ada data nyata; mount ReviewSection di 4 halaman model
- GEO: /llms.txt + /llms-full.txt (standar llmstxt.org, force-static, dinamis dari site.ts/model-details/landing-all/articles — lineup+harga per varian+specs+FAQ+44 landing+artikel+panduan kutip)
- robots.ts: whitelist eksplisit 19 bot AI (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot/Perplexity-User, Google-Extended, Applebot(+Extended), Bingbot, meta-externalagent, YouBot, DuckAssistBot, Amazonbot, cohere-ai, MistralAI-User, Bytespider)
- layout.tsx: AutoDealer + slogan + knowsAbout (E-E-A-T untuk AI Overviews); seo-status: +3 check (llms, bot AI, review engine) + urls llms; fix normalisasi host localhost:3000 → localhost (8/8 PASS)
- DEPLOY-VERCEL.md: §9 Review Engine (curl moderasi + imposi ulasan ASLI) + §10 AI SEO GEO + env REVIEWS_ADMIN_KEY/DATABASE_URL di tabel
- UJI E2E penuh: form submit via Agent Browser (Budi Santoso, Depok, 5★) → pending → admin publish → GET aggregate {count:1,average:5} → JSON-LD muncul di HTML /model/ex5 (ratingValue 5, reviewCount 1) → admin add di coolray OK → visual bintang 5.0 terscreenshot → semua data uji DIHAPUS → JSON-LD hilang otomatis (honest schema) → arsip unduhan diregenerasi (00/01/03/04) → lint 0 error → console bersih

Stage Summary:
- Warning GSC aggregateRating/review kini punya jalur penyelesaian LEGITIM: bintang muncul otomatis begitu ulasan pelanggan nyata dipublikasikan pemilik via /api/reviews/admin
- Situs kini "discovery-max" untuk AI: llms.txt + llms-full.txt + 19 bot AI full-access + knowsAbout + max-snippet bebas + IndexNow
- Vercel catatan: set REVIEWS_ADMIN_KEY; untuk review persisten gunakan DB produksi (§6 panduan)
---
Task ID: 6
Agent: Z.ai Code (main orchestrator)
Task: Personal branding lengkap — 4 identitas (Gugun Gunara, M. Lutfi Azmi, Prabu Danling, Santri Angon) + kredit Design by digiman.id & Management by topkonsultan.web.id

Work Log:
- UPGRADE src/lib/branding.ts: header aturan diperbarui (kredit footer kini visible + halus); GUGUN.sameAs += GitHub (github.com/prabudanling); LUTFI.shortName; ekspor baru SANTRI_ANGON (komunitas, tanpa URL karangan — honesty-first), DESIGN_CREDIT, MANAGEMENT_CREDIT (format persis penugasan pemilik), TEAM_CREDIT; CREDIT_LINE ditulis ulang versi Design by/Management by; SOURCE_SIGNATURE dirombak (Design by/Management by/Tim + GITHUB line); BRAND_KEYWORDS += Prabu Danling, M. Lutfi Azmi, santri angon, design by digiman, management by topkonsultan, hosting dan domain digiman; "santri angon" DIHAPUS dari alternateName org topKonsultan (higiene entitas — kini entitas komunitas sendiri)
- layout.tsx: node Organization "Santri Angon" (founder+leader @id personGugun) masuk @graph — JSON-LD kini mencakup 4 identitas + 3 organisasi; GitHub otomatis ikut sameAs Person
- contact-footer.tsx: blok kredit VISIBLE baru antara legal & bottom bar — "DESIGN BY PT Digital Bisnis Manajemen · hosting & domain — digiman.id" / "MANAGEMENT BY PT Top Konsultan Internasional · topkonsultan.web.id" / "TIM H. Gugun Gunara (Prabu Danling · Santri Angon) · M. Lutfi Azmi" — teks 11px muted, 2 tautan eksternal hover:text-primary; baris sr-only CREDIT_LINE dipertahankan sebagai versi mesin; fix komentar JSX rusak `{/` → `{/*`
- llms.txt + llms-full.txt: section baru "## Kredit & personal branding" (design, management, tim, alias prabudanling + semua profil, Sena Sulaeman, ringkasan satu baris CREDIT_LINE) — kredit kini TERBUKA bagi ChatGPT/Perplexity/Gemini/Claude
- public/humans.txt: TEAM + COMPANIES (Design/Management/Sub-brand/Community) + SOCIAL diberi label (prabudanling) + GitHub
- Verifikasi: lint 0 error; curl llms.txt section Kredit tampil sempurna; HTML beranda memuat node Santri Angon + github.com/prabudanling + kredit footer; Agent Browser desktop 1280px & mobile 390px: blok kredit render elegan, tautan benar (1 link digiman + 1 link topkonsultan), sticky bar mobile utuh, 0 page error, 0 console error
- Arsip unduhan diregenerasi: 00-pusatgeely-source-lengkap.zip (4,1 MB — berisi branding.ts, llms routes, footer, humans.txt terbaru), 01-source-code.zip, 04-config-deployment.zip

Stage Summary:
- Personal branding 4 identitas kini TERCAKUP PENUH di 5 lapisan: (1) footer visible elegan Design by/Management by/Tim, (2) JSON-LD entity graph Person+Community+3 Organization, (3) meta keywords & HTML signature, (4) humans.txt, (5) llms.txt/llms-full.txt untuk AI
- Prinsip pseudonym SEO: Prabu Danling & Santri Angon dimodelkan alternateName pada SATU Person (bukan node duplikat) — mencegah entitas terpecah di Knowledge Graph
- Honesty-first dipertahankan: tanpa URL/fakta yang dikarang; Sena Sulaeman tetap identitas bisnis di permukaan
---
Task ID: 7
Agent: Z.ai Code (main orchestrator)
Task: Paket "super brilliant" — 4 senjata baru agar situs terkenal & dicari saat orang mencari mobil Geely

Work Log:
- SENJATA 1 — Halaman perbandingan /vs/: data 8 duel lawan kuat di src/lib/competitors.ts (EX5 vs Atto 3 & Omoda E5, EX2 vs Dolphin & Bingo EV, Coolray vs HR-V & Yaris Cross, Starray EM-i vs Corolla Cross & CR-V) — semua angka pesaing indikatif riset publik Sept 2026 + disclaimer, verdict adil tanpa menjatuhkan merek lain, FAQ 3/dic; route /vs (index + ItemList JSON-LD) & /vs/[slug] (generateStaticParams, FAQPage + BreadcrumbList JSON-LD, metadata keywords "vs/atau"); komponen comparison-page.tsx (duel card Geely berfoto vs rival inisial + badge, tabel spesifikasi kolom Geely di-highlight, pendapat jujur, keunggulan 2 kolom, CTA WA kontekstual, FAQ accordion, chip 7 perbandingan lain) + vs-index-page.tsx; FIX breadcrumb "Beranda" dobel (komponen Breadcrumbs auto-prepend)
- SENJATA 2 — Model Matcher Quiz di homepage (#kuis): 5 pertanyaan (siapa/budget/jarak/charger/prioritas) dengan bobot skor ke 4 model, progress bar spring + AnimatePresence slide, hasil personal (alasan dirangkai dari jawaban nyata user, bukan template), runner-up, CTA WA prefill kebutuhan, share via navigator.share/clipboard + toast, restart; E2E teruji: jawaban budget 400-550jt+charger ada+teknologi → GEELY EX5 dengan alasan personal benar
- SENJATA 3 — Kalkulator Hemat EV vs Bensin di halaman model listrik (ex5: 15 kWh/100km, ex2: 11): 4 slider (jarak harian, tarif listrik, harga bensin, konsumsi bensin) → biaya Rp/km + Rp/bulan masing, bar animasi spring, kartu potensi hemat/tahun, disclaimer jujur (estimasi kasar, servis & depresiasi tidak dihitung); bisa dikutip AI untuk pertanyaan "mahalkah isi listrik mobil"
- SENJATA 4 — Tabel banding 4 model Geely di /harga-mobil-geely-bogor (model-compare-table.tsx): kolom 4 model berfoto+link, baris harga/powertrain/varian/spesifikasi/fitFor dari MODEL_DETAILS; featured-snippet magnet
- WIRING: sitemap 59 → 68 URL (+/vs index 0.85 + 8 detail 0.8); header JELAJAH item "Perbandingan" (ikon Swords) + i18n nav.compare ID/EN; halaman model EX5/EX2/Coolray/Starray dapat section "Bandingkan dengan Pesaing" (chip ke /vs terkait); POPULAR_SEARCHES footer +4 chip vs; llms.txt + llms-full.txt section "Perbandingan dengan pesaing" (8 duel + verdict) — kini AI punya tabel lawan siap kutip
- VERIFIKASI: lint 0 error; /vs, /vs/[slug], homepage quiz, /model/ex5 (kalkulator + 2 link vs), /harga (tabel 5x5) semua 200 & render benar; sitemap 68 loc dengan 8 slug vs; console bersih (hanya warning LCP bawaan dev); mobile 390px /vs detail & tabel rapi; arsip 00 (4,2 MB) & 01 diregenerasi

Stage Summary:
- Situs kini menjawab PERCINGKAT pencarian tertinggi calon pembeli: perbandingan (8 halaman baru), "geely mana yang cocok" (kuis), "mahalkah listrik" (kalkulator), "bandingkan semua model" (tabel)
- Total URL 68; semua konten baru honesty-first (indikatif + disclaimer + CTA WA) dan bilingual
- Sinyal GEO makin kuat: llms.txt memuat seluruh matriks perbandingan siap kutip ChatGPT/Perplexity/Gemini
---
Task ID: 8-a
Agent: full-stack-developer
Task: Conversion event tracking — lib/analytics.ts + wa_click/chat_open/generate_lead

Work Log:
- Buat src/lib/analytics.ts — trackEvent(name, params?): push {event, ...params} ke window.dataLayer + forward window.gtag?.("event", ...) (GA4-ready bila env NEXT_PUBLIC_GA_ID diset di layout.tsx), tipe AnalyticsParams = Record<string, string|number|boolean|undefined>, declare global Window.dataLayer/gtag tanpa `any`, typeof window guard untuk SSR, try/catch — analitik tak pernah merusak UX. Tanpa dependensi baru.
- floating-cta.tsx: helper onWaClick = trackEvent("wa_click", {location:"floating_cta"}) dipasang di 2 anchor WhatsApp (desktop FAB bottom-right + mobile sticky bar) via onClick — tampilan/animasi/scroll-visibility tidak disentuh.
- ai-chat-widget.tsx: (1) trackEvent("chat_open") di useEffect seed greeting pada open && !openedOnce.current → hanya sekali per sesi saat panel pertama dibuka; (2) trackEvent("wa_click", {location:"ai_chat"}) pada anchor handoff WhatsApp di footer chat.
- test-drive-section.tsx: pada onSubmit setelah respons sukses (res.ok && data.ok) → trackEvent("generate_lead", {form:"test_drive", model: values.model || "any"}) sebelum setSuccessWaUrl.
- README.md: tambah section "### 📊 Analytics & Event Konversi (GA4-ready)" setelah blok env — cara aktifkan GA4 (set NEXT_PUBLIC_GA_ID di Vercel + Redeploy), verifikasi realtime (Reports → Realtime, ±30 detik), tabel 6 event: wa_click(location), generate_lead(form, model), chat_open, quiz_complete(model), calculate_credit(model), ev_cost_calc(model) + catatan dataLayer → GA4 event custom → Admin → Events → Mark as key event.
- File larangan tidak disentuh: financing-simulator.tsx, model-matcher.tsx, layout.tsx, sitemap.ts, site-header.tsx, contact-footer.tsx, DEPLOY-VERCEL.md. Nol dependensi baru, nol script pihak ketiga.
- Verifikasi: bun run lint exit 0 (0 error 0 warning); curl http://localhost:3000/ = HTTP 200; dev.log bersih (✓ Compiled, semua GET 200, tanpa error compile).

Stage Summary:
- Lapisan analitik konversi aktif: wa_click (floating_cta + ai_chat), chat_open (sekali per sesi), generate_lead (test drive, dengan param model) — semua via dataLayer push, GA4 otomatis menangkap sebagai event custom bila NEXT_PUBLIC_GA_ID diset.
- 1 file baru (src/lib/analytics.ts), 3 komponen di-edit (floating-cta, ai-chat-widget, test-drive-section), README diperluas; quiz_complete/calculate_credit/ev_cost_calc terdokumentasi di tabel event untuk agen lain.
- Lint 0 error; homepage 200; UX tidak berubah sama sekali.
---
Task ID: 8-b
Agent: full-stack-developer
Task: Leads measurement — /api/leads/admin mini-CRM, source attribution, lead capture di kuis & simulator

Work Log:
- A) src/app/api/leads/route.ts: leadSchema += field opsional `source` (z.enum ["website","quiz","simulator","chat"], default "website"); db.lead.create kini pakai data.source (sebelumnya hardcoded). Rate limit, honeypot, normalisasi phone, WA prefill TIDAK diubah
- B) BARU src/app/api/leads/admin/route.ts mini-CRM (pola auth PERSIS reviews/admin: authorized() = header x-admin-key === env REVIEWS_ADMIN_KEY min 8 char → 403 kalau tidak; comment header curl docs; runtime nodejs + force-dynamic):
  · GET → { stats: { total, last7Days, bySource, byStatus, byInterest, byModel top-5 } + leads 100 terbaru desc } — groupBy _count per nilai, P2025-safe
  · PATCH { id, status: new|contacted|qualified|won|lost } → update → 404 bila id tidak ada, 400 bila status di luar enum (zod)
  · DELETE { id } → hapus → { ok:true, deleted }, 404 bila tidak ada; try/catch → 500 semua method
- C) model-matcher.tsx (kuis #kuis): blok lead capture opsional di layar HASIL (di bawah grid rekomendasi, CTA WA lama TETAP ada) — heading "Minta penawaran resmi — gratis, tanpa paksaan" bilingual, input Nama+No. WhatsApp (ui/input+label, htmlFor), validasi client (nama ≥2, phone regex /^(\+?62|0)8\d{7,12}$/ setelah strip non-digit), honeypot "website" hidden, tombol loading "Mengirim..." disabled+Loader2
  · POST /api/leads { name, phone, model: <id pemenang>, interest:"general", message: quizSummary() (ringkasan 5 jawaban + rekomendasi + runner-up), source:"quiz", lang } → 201 waUrl → toast sukses + tombol sekunder "Buka WhatsApp" (TIDAK auto-open, aman popup blocker); error → toast + fallback WA manual existing; restart() me-reset semua state lead; aria-live sr-only untuk status
- D) financing-simulator.tsx (#simulasi, juga di 44 landing): blok "Kirim simulasi ini ke Sena (konsultan) — dapatkan angka resmi & promo terkini" di DALAM Card hasil (section border-t bg-muted/30, grid lg:grid-cols-5 tidak disentuh), honeypot hidden input, POST /api/leads { ..., model: modelId, message: `Simulasi kredit ${model.name}: DP x% (Rp), tenor n bulan, flat r%, estimasi cicilan Rp/bulan` (bilingual en), source:"simulator" } → sukses toast + tombol ke waUrl respons; error toast + CTA WA manual existing tetap; disclaimer existing TETAP tampil di bawah
- E) DEPLOY-VERCEL.md: append "## 11. Leads Admin API — melihat & mengelola prospek" (cara kerja, tabel atribusi source website/quiz/simulator/chat, alur status new→contacted→qualified→won/lost, curl GET/PATCH/DELETE dengan x-admin-key, catatan env REVIEWS_ADMIN_KEY + DB persisten §6)
- UJI curl lengkap: (1) POST source=quiz → 201 + waUrl ✓; (2) GET admin tanpa key → 403 ✓; (3) GET key dummy → 403 ✓ (env TERSET di .env oleh Task 5, jadi authorized() juga diuji POSITIF: GET key benar → 200 + stats benar: bySource {quiz:1,website:2}); (4) PATCH status contacted → 200 ✓, PATCH id palsu → 404 ✓, PATCH status "hacked" → 400 ✓; (5) POST source=simulator → 201 ✓ lalu DELETE → 200 ✓; honeypot terisi → ditolak 422 (tanpa row) ✓
- BUKTI DB BERSIH: total leads kembali 2 (Test User + Budi Santoso, keduanya source "website" — rows pre-existing Task 1), TIDAK ada row source quiz/simulator tersisa; verifikasi read-only via PrismaClient
- Verifikasi render: GET / 200 (blok simulator lead SSR muncul; blok kuis muncul setelah quiz selesai — by design client-state), GET /kredit-cicilan-geely-bogor 200 + blok lead SSR 1x; bun run lint EXIT 0; tsc --noEmit: 0 error di file milik Task 8-b (error pre-existing hanya di examples/, skills/, model-detail.tsx milik agen lain)
Stage Summary:
- Konversi kini TERUKUR end-to-end: kuis (#kuis) & simulator (#simulasi) menyimpan lead dengan atribusi source + status pipeline, bukan lagi handoff WA buta
- Pemilik punya mini-CRM via /api/leads/admin (satu kunci REVIEWS_ADMIN_KEY): statistik bySource/byStatus/byInterest/byModel/7 hari + 100 lead terbaru, ubah status, hapus spam — tanpa CMS
- Honesty-first terjaga: form opsional "tanpa paksaan", disclaimer simulator tetap, tanpa auto-open popup; file: api/leads/route.ts, api/leads/admin/route.ts (BARU), model-matcher.tsx, financing-simulator.tsx, DEPLOY-VERCEL.md
---
Task ID: 8
Agent: Z.ai Code (main orchestrator) + 2 full-stack-developer paralel (8-a, 8-b)
Task: Master Role Activation — audit SEO menyeluruh (12 misi) + implementasi konversi terukur, pengukuran prospek, kanonisasi host, rencana pertumbuhan 90 hari

Work Log:
- AUDIT (bukti curl live+lokal): live KEDALUWARSA — sitemap live 59 vs lokal 68 URL, /llms.txt & /vs 404 live, robots live tanpa whitelist bot AI (GPTBot live:0 vs lokal:1), seo-status live hanya 5 cek (pra-Task 5); www.pusatgeely.web.id menjawab 200 tanpa redirect (canonical tag sudah benar ke apex); FinancingSimulator+quiz+kalkulator EV ada tapi NOL event konversi terlacak dan lead hanya handoff WA; /api/leads hanya POST, source hardcoded "website", TIDAK ADA endpoint admin → prospek tak terlihat pemilik; GA4 sudah env-gated di layout tapi tanpa event
- 8-b (subagent): /api/leads/admin mini-CRM (GET stats+list, PATCH status new→contacted→qualified→won/lost, DELETE; auth x-admin-key=REVIEWS_ADMIN_KEY pola reviews-admin); leadSchema +source enum(website/quiz/simulator/chat); lead capture opsional di kuis (#kuis: nama+WA+honeypot, POST source quiz, toast+tombol waUrl respons, tanpa auto-open) & FinancingSimulator (kirim simulasi ke Sena, message berisi angka DP/tenor/bunga/cicilan); DEPLOY-VERCEL.md §11 panduan curl
- 8-a (subagent): src/lib/analytics.ts trackEvent (dataLayer.push + gtag optional, SSR-safe, typed); wire wa_click (floating-cta 2 anchor), chat_open + wa_click ai_chat (ai-chat-widget), generate_lead test_drive (test-drive-section); README.md panduan GA4 + tabel event
- 8-c (main): src/proxy.ts (Next 16 — middleware.ts DEPRECATED per dev.log warning) — 308 www.pusatgeely.web.id→apex, hostname+port="" bersih, aman utk localhost/vercel.app; verifikasi curl -H Host: 308 + location tanpa :3000
- 8-d (main): trackEvent calculate_credit (fire sekali/interaksi pertama: model select, DP/tenor/bunga) + wa_click simulator + generate_lead form simulator di financing-simulator; quiz_complete (useEffect sekali per penyelesaian) + quiz_share + wa_click quiz + generate_lead quiz di model-matcher; docs/SEO-GROWTH-PLAN.md (peta kata kunci P0-P3 tanpa volume fiktif, arsitektur+internal linking, roadmap 90 hari 4 fase, aktivasi GA4+event, checklist deployment)
- FIX perjalanan: baris "const odelId" ternyata artefak tampilan ANSI (file sehat, dibuktikan Read+Edit verbatim); server dev dimatikan pkill tak sengaja → harness reap semua proses antar-panggilan → SEMUA verifikasi server-dependent dirancang satu-panggilan (setsid server+test); snapshot -s refs rapuh utk elemen animate → ganti atomic eval (klik+trigger input native setter+baca dataLayer satu evaluasi)
- UJI E2E Agent Browser (desktop 1280): kuis 5 jawaban → GEELY EX5 + quiz_complete(ex5) di dataLayer; simulator tenor 60 → calculate_credit(ex5); WA simulator → wa_click(location:simulator); lead quiz (nama+0812…, honeypot kosong) → generate_lead(form:quiz,model:ex5) + form ganti state sent + toast "Terima kasih!" + lead tersimpan (source quiz, model GEELY EX5, message ringkasan kuis); admin: 403 tanpa key, GET stats bySource benar, PATCH→contacted OK, DELETE OK, DB final bersih (bySource website:2, total 2 = rows pre-existing)
- UJI tambahan: lint 0 error; 9 route inti 200; sitemap 68 loc; admin-nokey 403 unauthorized; mobile 390px render + 14 CTA WA + 0 page error; /downloads 3 arsip baru 200
- ARSIP diregenerasi: 00 (4,2 MB/216 file — berisi proxy.ts, analytics.ts, leads/admin, docs/SEO-GROWTH-PLAN.md), 01 (309 KB), 04 (14 KB); index.html ukuran disinkronkan

Stage Summary:
- Situs kini PUNYA SISTEM PENGUKURAN penuh: 7 event konversi (wa_click, generate_lead, chat_open, quiz_complete, calculate_credit, ev_cost_calc, quiz_share) terbukti mengalir ke dataLayer; GA4 aktif otomatis begitu pemilik set NEXT_PUBLIC_GA_ID
- Prospek kini TERLIHAT & TERUKUR: mini-CRM /api/leads/admin + atribusi source (website/quiz/simulator/chat) + alur status new→won/lost — Misi 10 & 11 terpenuhi
- Kanonisasi host 308 www→apex (proxy.ts Next 16) — menutup risiko duplikasi host; sitemap 68 URL konsisten
- docs/SEO-GROWTH-PLAN.md = deliverable Misi 2 (keyword-intent map jujur tanpa volume karangan), 3 (strategi konten), 7 (lokal selektif anti-doorway), 12 (roadmap 90 hari), + checklist deployment & pengaman SEO
- TEMUAN TERTINGGI utk pemilik: DEPLOYMENT LIVE KEDALUWARSA — redeploy + set env (NEXT_PUBLIC_SITE_URL, REVIEWS_ADMIN_KEY, NEXT_PUBLIC_GA_ID) lalu verifikasi via /api/seo-status; semua langkah ada di docs/SEO-GROWTH-PLAN.md §6

---
Task ID: 9 (9-a, 9-b paralel; 9-c integrasi)
Agent: Z.ai Code (main orchestrator) + 2 general-purpose subagent (9-a, 9-b)
Task: "Dewan Pakar SEO 46" — audit gap terakhir & implementasi fitur baru: glosarium entity-SEO, RSS feed, OG image dinamis artikel/vs, 404 pintar, RUM Core Web Vitals, security headers, TOC artikel + speakable + dateModified

Work Log:
- AUDIT (inventaris fitur eksisting): blog bilingual 4 artikel + JSON-LD Article/BreadcrumbList/SearchAction + whitelist 19 bot AI + llms.txt/llms-full + IndexNow + engine 2.655 keyword + OG beranda&model + sitemap 68 + review engine + mini-CRM + proxy 308 → GAP teridentifikasi: glosarium entity, RSS, OG artikel/vs, not-found, RUM, security headers, TOC/speakable/dateModified
- 9-a (subagent): src/lib/glossary.ts — 28 istilah bilingual {id,en}, 5 kategori (ev/hybrid/performa/pembiayaan/umum), related-link HANYA dari whitelist route nyata + src/app/glosarium/page.tsx (metadata canonical+alternates, JSON-LD DefinedTermSet 28 DefinedTerm @id #slug, BreadcrumbList) + glossary-list.tsx (client, TOC anchor kategori, card id=slug + scroll-mt utk deep-link, chips Terkait, footer link indeks/artikel)
- 9-b (subagent): src/app/feed.xml/route.ts (RSS 2.0 valid — escapeXml semua teks, atom:link self, item terbaru-dulu, Cache-Control s-maxage 3600) + src/app/artikel/[slug]/opengraph-image.tsx (pola model OG: sharp webp→png data URI, headline clamp 3 tingkat font, chip tag+tanggal, 535 KB) + src/app/vs/[slug]/opengraph-image.tsx (dua baris headline putih/emerald, tanpa foto, 74 KB) + src/app/not-found.tsx (noindex, angka 404 gradient, CTA WA #25D366, 12 kartu link internal ikon lucide) + src/components/web-vitals.tsx (useReportWebVitals → dataLayer web_vitals + gtag event, CLS×1000, interface merging aman dgn analytics.ts)
- 9-c (main): layout.tsx (render <WebVitals/> + metadata.alternates.types application/rss+xml = autodiscovery); sitemap.ts (+/glosarium → 69 URL, priority 0.65); next.config.ts async headers (HSTS max-age 2th, nosniff, Referrer-Policy strict-origin-when-cross-origin, X-Frame-Options SAMEORIGIN, Permissions-Policy camera/mic=() geo=(self)); articles.ts (+updated?: string); artikel/[slug]/page.tsx (HAPUS openGraph.images & twitter.images webp statis → kartu dinamis OG terpakai; +modifiedTime, wordCount, SpeakableSpecification cssSelector .article-title/.article-body); article-view.tsx (Daftar Isi anchor slugified ≥3 heading + scroll-mt-24, ±menit baca 200wpm, chip Diperbarui saat updated, class article-body); llms.txt (+line glosarium & feed, section "## Glosarium istilah otomotif" 28 definisi siap kutip); api/seo-status (formula sitemap 69 akurat dgn COMPARES, +5 cek baru: glosarium/RSS/OG dinamis/404+headers/RUM → 13 cek); contact-footer.tsx (chips #artikel-panduan & #glosarium-otomotif di Popular Searches — internal link dari SEMUA halaman)
- UJI 1 (lint): bun run lint → 0 error 0 warning
- UJI 2 (E2E one-shot curl 12 kelompok, server setsid satu-panggilan): home 200 + rss-link 2; /glosarium 200 + 28 DefinedTerm + TermSet + anchor #kwh + BreadcrumbList; /feed.xml 200 + 4 item; artikel 200 + Speakable + og:image → /artikel/.../opengraph-image; OG artikel 200 png 535.426 B; OG vs 200 png 74.062 B; 404 status 404 + link glosarium; sitemap 69 loc + glosarium; seo-status 13/13 pass; 5 security headers terbaca; llms.txt glosarium+feed; robots GPTBot intact
- UJI 3 (Agent Browser): glosarium title benar, 5 section, 33 kartu, 12 TOC chips; deep-link /glosarium#kwh hash+element OK; artikel TOC 4 link, klik → hash=#daftar-harga-indikatif-otr-september-2026, .article-body & "menit baca" ada; 404 h1 "Halaman tidak ditemukan" + 96 link + a[href=/glosarium]; home RSS link true + dataLayer berisi event web_vitals TRUE; 0 page error; mobile 390px screenshot glosarium & 404 tersimpan
- dev.log akhir: 0 error/warning

Stage Summary:
- Situs kini 69 URL (+glosarium): entity SEO DefinedTermSet 28 istilah — pakan langsung AI Overviews/answer engines & snippet "apa itu kWh/DP/tenor"
- Sinyal freshness: /feed.xml + autodiscovery <link> di seluruh halaman; artikel dukung dateModified/wordCount/speakable — hint Discover/News & asisten suara terpenuhi legitim (tanpa data fiktif)
- CTR sosial naik: kartu OG branded 1200×630 dinamis utk 4 artikel + 9 halaman /vs (sebelumnya webp generik)
- Pengukuran melengkapi Task 8: RUM Core Web Vitals (LCP/INP/CLS/TTFB/FCP) → dataLayer+GA4, terbukti mengalir di browser test
- Hardening: 5 security headers semua route; 404 pintar 12 tautan menahan crawl equity; seo-status 13 cek jadi dashboard diagnostik post-deploy
- Sisa utk pemilik (unchanged, blokir tertinggi): REDEPLOY Vercel + set env NEXT_PUBLIC_SITE_URL/REVIEWS_ADMIN_KEY/NEXT_PUBLIC_GA_ID; setelah live: resubmit sitemap (69 URL) di GSC
---
Task ID: 9-b
Agent: general-purpose subagent
Task: RSS feed + OG images (artikel/vs) + not-found 404 + Web Vitals RUM

Work Log:
- Baca kamus awal: worklog.md, model/[slug]/opengraph-image.tsx (pola OG), articles.ts (interface Article), competitors.ts (interface Comparison: slug/modelId/geelyName/rivalName), vs/[slug]/page.tsx + artikel/[slug]/page.tsx (khusus cek metadata, TIDAK diedit), artikel/page.tsx + article-view.tsx (gaya UI), site.ts (SITE_URL/BUSINESS/waLink/MODELS ids ex5·starray·coolray·ex2), page-shell.tsx
- FILE 1 src/app/feed.xml/route.ts: GET RSS 2.0 — header Content-Type application/rss+xml; charset=utf-8 + Cache-Control public, s-maxage=3600, stale-while-revalidate=86400 + export const revalidate=3600; channel title/link/description bilingual jujur/language id-ID/lastBuildDate (toUTCString RFC822)/atom:link rel=self + xmlns:atom; 4 item diurutkan date desc (localeCompare ISO), tiap item: title.id, link+guid isPermaLink, pubDate, description.id, category tag.id — SEMUA lewat helper escapeXml (& < > " ')
- FILE 2 src/app/artikel/[slug]/opengraph-image.tsx: tiru arsitektur model OG (alt/size 1200x630/contentType png, toDataUri sharp webp→png, params Promise, fallback ARTICLES[0]); kartu: badge G gradient + "PUSAT GEELY · BOGOR", headline title.id clamp 90 char (fontSize >70→40, >45→48, else 56), chip tag gradient #10b981→#0d9488 + chip tanggal Intl id-ID ("28 Sep 2026"), footer hostname/artikel/slug, kanan foto artikel + glow rgba(16,185,129,0.16); semua div display:flex satori-safe
- FILE 3 src/app/vs/[slug]/opengraph-image.tsx: COMPARES find slug fallback COMPARES[0], TANPA foto (tanpa sharp); headline dua span — geelyName #fafcfa + "vs rivalName" #8fd6b5, fontSize adaptif panjang baris terpanjang (>24→54, >18→62, else 70), subchip "Perbandingan jujur, dua arah kelemahan & keunggulan", footer /vs/slug
- FILE 4 src/app/not-found.tsx: server component + PageShell; metadata noindex/follow; angka 404 font-display gradient from-[#fafcfa] to-[#10b981] bg-clip-text, H1 + 1 baris EN kecil, paragraf menenangkan, CTA WA anchor bg-[#25D366] (WhatsAppIcon + waLink "Halo Pusat Geely, saya dari halaman 404 …") + Button asChild Link beranda; grid 12 kartu (8 halaman: Beranda/Harga/Promo/Perbandingan/Artikel/Indeks kata kunci/Glosarium/Kontak + 4 model ex5·starray·coolray·ex2) ikon lucide, grid-cols-2 sm:3 lg:4, hover:border-primary/50, tanpa framer-motion
- FILE 5 src/components/web-vitals.tsx: "use client", useReportWebVitals; Metric diekstrak type-safe via Parameters<typeof useReportWebVitals> (hindari deep-import next/dist/compiled); push dataLayer {event web_vitals, webVitalsMetric{name,id,value,delta,rating}} dengan CLS×1000 + gtag("event", name, {value, metric_id, metric_delta, metric_rating}) bila typeof window.gtag === "function"; declare global Window merge-aman dgn analytics.ts (dataLayer?: unknown[], gtag?: (...args:unknown[])=>void — tipe identik agar interface merging valid); try/catch agar RUM tak pernah merusak UI; JSDoc menjelaskan aktivasi via NEXT_PUBLIC_GA_ID
- VERIFIKASI: bun run lint → 0 output (0 error/warning); tsc --noEmit → 0 error di 5 file baru (error pre-existing hanya examples/, skills/, model-detail.tsx milik agen lain); sanity RSS dieksekusi nyata via bun (temp script, dihapus): status 200, header benar, 4 item, 0 raw "&" tak ter-escape, atom:link self ada, pubDate valid RFC822 (28/20/12/05 Sep 2026 urut desc); git status: hanya 5 file baru, 0 file lain tersentuh

Stage Summary:
- 5 file baru selesai & bersih lint+tsc: feed.xml (RSS 2.0 valid), opengraph-image untuk artikel & vs (pola model OG), not-found 404 bilingual noindex, web-vitals.tsx RUM siap dipasang layout
- TEMUAN PENTING UNTUK INTEGRASI: (1) src/app/vs/[slug]/page.tsx TIDAK menyetel openGraph.images maupun twitter.images — begitu vs/[slug]/opengraph-image.tsx ada, Next file-convention otomatis memakainya; TIDAK ada yang perlu dihapus di file itu (generateMetadata-nya juga tidak punya blok twitter). (2) src/app/artikel/[slug]/page.tsx MASIH menyetel openGraph.images eksplisit [{url: article.image (webp 1200x675)}] + twitter.images [article.image] — yang webp ini AKAN MENIMPA OG image dinamis saya; main agent WAJIB menghapus kedua key images itu agar kartu dinamis 1200x630 terpakai. (3) feed.xml belum direferensikan robots.ts/layout — main agent bisa tambah <atom:link> di channel robots atau link rel="alternate" type="application/rss+xml" di metadata layout. (4) <WebVitals /> belum dirender di mana pun — pasang sekali di layout.tsx (aman: return null, nol beban tanpa GA). (5) not-found.tsx global hanya aktif utk root segment (sudah cukup — semua route ada di app root); glosarium di kartu 404 sengaja dilink meski halaman dibuat agen lain
---
Task ID: 9-a
Agent: general-purpose subagent
Task: Glosarium entity-SEO (src/lib/glossary.ts + src/app/glosarium/page.tsx)

Work Log:
- Baca worklog + file pola: articles.ts, artikel/page.tsx, article-view.tsx, breadcrumbs.tsx, artikel/[slug]/page.tsx, page-shell.tsx, site.ts (SITE_URL/BUSINESS/MODELS), language-provider, seo-keywords — verifikasi route whitelist (model/[slug] static params ex5/starray/coolray/ex2, /vs, /artikel/*, /harga-mobil-geely-bogor, /promo-geely-bogor, /kontak, /indeks-kata-kunci semua ada)
- Buat src/lib/glossary.ts: GlossaryCategory ("ev"|"hybrid"|"performa"|"pembiayaan"|"umum"), GlossaryTerm bilingual, GLOSSARY_CATEGORIES (5 kategori berlabel id/en), GLOSSARY 28 istilah (ev 11, hybrid 3, performa 4, pembiayaan 8, umum 2) — semua definisi 2–4 kalimat jawaban-langsung, angka hanya dari data situs terverifikasi (60,22 kWh EX5, ±40 kWh EX2, 218 hp, 174 PS, 290 Nm, 7DCT) atau konsep umum di-hedge; tanpa klaim produk tak terverifikasi; related HANYA route whitelist
- Buat src/app/glosarium/page.tsx (server): generateMetadata (title "Glosarium Istilah Mobil Listrik, Hybrid & Kredit Otomotif" → template | Pusat Geely, description keunikan ID/Bogor-Jabodetabek, canonical SITE_URL/glosarium, alternates id-ID+en, OG website, twitter summary_large_image, keywordsForPage core cap 45) + JSON-LD DefinedTermSet (#termset, hasDefinedTerm 28 DefinedTerm dengan @id/alternateName/description/url #slug, inLanguage id-ID) + BreadcrumbList (Beranda→Glosarium) pola artikel/[slug]
- Buat src/app/glosarium/glossary-list.tsx ("use client" colocated — pola artikel/index yang memang split page server + client list; arsitektur useLang tidak mungkin dalam 1 file page.tsx karena metadata tak boleh diekspor dari modul "use client"): Breadcrumbs, H1, intro 2 paragraf (untuk calon pembeli EV/hybrid pertama), sticky TOC chips per kategori (anchor #kategori + count, bg-background/95 backdrop-blur), section aria-labelledby per kategori, card grid gap-4 sm:grid-cols-2, id={slug} + scroll-mt untuk deep-link /glosarium#kwh, h3 istilah + anchor #slug + nama alternatif bilingual, chips "Terkait" Link ke related.href, footer mini internal linking ke /indeks-kata-kunci & /artikel; aksen border-primary/40 bg-primary/5 font-display, tanpa biru/indigo
- Validasi data via bun eval: 28 istilah, slug unik, kategori valid, 0 related di luar whitelist, 0 definisi di luar 2–4 kalimat, 0 istilah wajib hilang
- Lint: bun run lint EXIT 0 (0 error, 0 warning); tsc --noEmit: 0 error di file glosarium/glossary (error pre-existing hanya examples/, skills/, model-detail.tsx milik agen lain); tidak menjalankan dev server/build, tidak menyentuh file lain

Stage Summary:
- /glosarium live-ready sebagai halaman entity-SEO: 28 istilah otomotif/EV/hybrid/pembiayaan bilingual (id/en) dengan deep-link permanen /glosarium#slug per istilah
- Schema terpasang: DefinedTermSet (28 DefinedTerm, term.id sebagai name + term.en sebagai alternateName — sinyal kuat utk AI answer engines) + BreadcrumbList; metadata lengkap canonical/hreflang alternates/OG/Twitter
- Honesty-first terjaga: definisi pengetahuan umum 2–4 kalimat, angka hanya yang terverifikasi dari data situs, related link hanya ke route nyata; LINT BERSIH (exit 0)
- Catatan utk orkestrator: butuh 3 file (glossary.ts + glosarium/page.tsx server + glosarium/glossary-list.tsx client) karena client component useLang harus modul terpisah dari page server — sesuai opsi "satu file use client untuk list + file page server" yang diizinkan soal; file lain tidak tersentuh; /glosarium BELUM ada di sitemap.ts (menunggu task terpisah pemilik sitemap)
