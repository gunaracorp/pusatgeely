# 🚀 PANDUAN DEPLOY — Pusat Geely Super Web App ke Vercel

> Paket: 59 URL sitemap · 44 landing SEO · JSON-LD 9 tipe · IndexNow · Bilingual ID/EN · AI Chat Geely Bot · Dynamic OG Image
> Domain produksi: **https://pusatgeely.web.id**

---

## 1. Deploy ke Vercel (±5 menit)

1. Ekstrak `00-pusatgeely-source-lengkap.zip`
2. Push seluruh isi ke repositori GitHub (mis. `prabudanling/pusatgeely`)
3. Buka **https://vercel.com/new** → **Import** repositori tersebut
4. Framework Preset: **Next.js** (terdeteksi otomatis) — biarkan Build Command & Output Default
5. Sebelum klik Deploy → **Environment Variables** → tambahkan:

   | Nama                   | Value                       | Environments        |
   | ---------------------- | --------------------------- | ------------------- |
   | `NEXT_PUBLIC_SITE_URL` | `https://pusatgeely.web.id` | Production + Preview |
   | `REVIEWS_ADMIN_KEY`    | kunci rahasia Anda (min. 8 karakter) | Production |
   | `DATABASE_URL`         | koneksi database produksi (lihat §6) | Production |

6. **Deploy** → tunggu build selesai ✅

> `node_modules` TIDAK perlu di-push — Vercel menjalankan `install` otomatis dari `package.json` + lockfile.

---

## 2. Hubungkan domain kustom

1. Vercel → Project → **Settings → Domains → Add**: `pusatgeely.web.id` dan `www.pusatgeely.web.id`
2. Ikuti instruksi DNS pada registrar:
   - A record `@` → `76.76.21.21`
   - CNAME `www` → `cname.vercel-dns.com`
3. Tunggu DNS propaga + SSL otomatis aktif (umumnya < 1 jam)

---

## 3. Google Search Console — submit sitemap (ATURAN EMAS: host harus SAMA)

Sitemap **wajib** disubmit dari property yang host-nya **identik** dengan URL di dalam `<loc>`.

1. Verifikasi cepat sebelum submit:
   - `https://pusatgeely.web.id/sitemap.xml` → 200, berisi ±59 `<loc>` yang semuanya `https://pusatgeely.web.id/...`
   - `https://pusatgeely.web.id/robots.txt` → memuat `Sitemap: https://pusatgeely.web.id/sitemap.xml`
2. Buka **https://search.google.com/search-console** → property **https://pusatgeely.web.id**
3. Menu **Sitemaps** → ketik `sitemap.xml` → **Submit**
4. Status akan berubah dari "Tidak dapat diambil" → **Berhasil** (bisa beberapa hari)

---

## 4. Kenapa dulu muncul error "Kami mengalami error saat mencoba mengakses peta situs"?

**Penyebab #1 (kasus ini): HOST MISMATCH** — sitemap disubmit dari property `*.vercel.app`, padahal semua `<loc>` menunjuk `pusatgeely.web.id`. Google menolak sitemap yang URL-nya berada di host berbeda.

**Solusi permanen sudah ada di kode**: `SITE_URL` dinamis di `src/lib/site.ts`
(`NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → `VERCEL_URL` → fallback).
Canonical, sitemap, JSON-LD, dan OG otomatis mengikuti domain deployment — tidak ada lagi hardcode.

Penyebab lain yang perlu dicek bila masih error:
- robots.txt memblokir `/sitemap.xml` (build ini TIDAK memblokir)
- sitemap balas 404/500 saat di-fetch Google → cek log Vercel + `/api/seo-status`
- Domain belum terverifikasi di GSC / DNS belum propaga

---

## 5. Diagnostik pasca-deploy (1 klik)

Buka **`https://DOMAIN-ANDA/api/seo-status`** → JSON berisi:
host aktif vs canonical, sumber `SITE_URL`, jumlah URL sitemap, status robots,
keyword engine, dan checklist GSC 6 langkah.

---

## 6. ⚠️ Catatan database di Vercel (PENTING)

- **Lokal**: Prisma + SQLite (`db/custom.db`) — form test drive & lead tersimpan normal.
- **Vercel serverless**: filesystem **read-only/ephemeral** → SQLite tidak bertahan antar-request.
  Agar data lead tersimpan permanen di produksi, migrasikan ke Postgres/MySQL/Turso:
  1. Ubah `provider` di `prisma/schema.prisma` (`"sqlite"` → `"postgresql"`)
  2. Set `DATABASE_URL` di Vercel Environment Variables
  3. Jalankan `bunx prisma db push` lalu redeploy

---

## 7. IndexNow &OG aman Vercel

- Key IndexNow tersedia di `public/bc336b4b6001017bc99244eba80d0206.txt` — endpoint `/api/indexnow` siap ping.
- OG image beranda + per-model sudah **Vercel-safe**: baca foto dari disk bila tersedia, otomatis fallback ke kartu gradient branded murni (tanpa file) bila filesystem tidak memuat `public/` — tidak akan pernah 500.

---

## 8. Checklist go-live akhir

- [ ] `NEXT_PUBLIC_SITE_URL` terisi → `/api/seo-status` menunjukkan `source: "env"`
- [ ] Domain kustom aktif + HTTPS
- [ ] `sitemap.xml` 200 & semua `<loc>` pakai domain produksi
- [ ] `robots.txt` 200 & baris `Sitemap:` benar
- [ ] GSC: submit `sitemap.xml` dari property `https://pusatgeely.web.id`
- [ ] Uji manual: beranda, 3 landing harga/promo, 3 halaman model, 1 submit lead, 1 chat AI
- [ ] GSC → URL Inspection → Request Indexing untuk 10 URL prioritas (beranda, harga, promo, coolray, ex5, starray, ex2, tentang, kontak, artikel)

---

## 9. Review Engine — jawaban warning GSC `aggregateRating` & `review`

Hint "Kolom aggregateRating/review tidak ada" di GSC adalah **saran penyempurnaan** (bukan error) — bintang hanya boleh muncul dari **ulasan pelanggan nyata**. Rating palsu = pelanggaran spam policy Google → risiko manual action.

Situs ini kini punya **mesin review lengkap**:

1. **Form ulasan** di setiap halaman model (section "Ulasan Pemilik Unit") → tersimpan `published=false`
2. **Moderasi pemilik** via API admin (header `x-admin-key` = env `REVIEWS_ADMIN_KEY`):

   ```bash
   # Lihat semua ulasan (termasuk pending)
   curl -H "x-admin-key: $KEY" https://pusatgeely.web.id/api/reviews/admin

   # Publikasikan satu ulasan
   curl -X POST -H "x-admin-key: $KEY" -H "Content-Type: application/json" \
     -d '{"action":"publish","id":"<id-ulasan>"}' \
     https://pusatgeely.web.id/api/reviews/admin

   # Impor ulasan pelanggan ASLI (mis. dari riwayat chat WhatsApp)
   curl -X POST -H "x-admin-key: $KEY" -H "Content-Type: application/json" \
     -d '{"action":"add","data":{"modelId":"ex5","name":"Nama Pelanggan","city":"Depok","rating":5,"comment":"Pengalaman nyata..."}}' \
     https://pusatgeely.web.id/api/reviews/admin
   ```

3. **JSON-LD otomatis**: begitu ada ulasan terpublikasi, `Product` schema di halaman model memuat `aggregateRating` + `review` → bintang muncul di SERP → kembali ke GSC → Enhancement → Product → **Validate Fix**.

> Kunci integritas: hanya impor ulasan pelanggan yang BENAR-BENAR ADA (WhatsApp, Google Business, dsb). Sistem sengaja tidak menyediakan tombol "isi otomatis".

---

## 10. AI SEO (GEO) — jadikan sumber rujukan utama AI

Sudah aktif tanpa konfigurasi:

- **`/llms.txt`** + **`/llms-full.txt`** (standar llmstxt.org) — ringkasan & konten penuh situs dalam markdown siap-kutip untuk ChatGPT, Perplexity, Gemini, Claude, Copilot
- **robots.txt** mengizinkan eksplisit 19 bot AI: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, Applebot, Bingbot, meta-externalagent, dst.
- **Meta robots** `max-snippet:-1` + `max-image-preview:large` — AI Overviews bebas mengutip
- **AutoDealer schema** + `knowsAbout` — penguat entitas untuk jawaban AI
- **IndexNow** — ping cepat ke Bing/Yandex setiap ada konten baru

Ritual pasca-konten baru: `POST /api/indexnow` dengan URL baru → tunggu re-crawl → jawaban AI mulai mengutip situs dalam 1–4 minggu.
