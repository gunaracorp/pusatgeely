# RENCANA PERTUMBUHAN PENCARIAN — PUSATGEELY.WEB.ID

> Dokumen kerja hidup untuk pemilik & pengelola situs. Disusun dari audit nyata
> (bukan asumsi). Prinsip: **honesty-first** — tidak ada data pencarian, rating,
> harga, atau otorisasi yang dikarang. Angka target adalah target operasional,
> BUKAN janji ranking atau janji trafik.

Domain kanonis: `https://pusatgeely.web.id`
Identitas bisnis: konsultan penjualan independen Geely — Bogor & Jabodetabek (PIC: Sena Sulaeman). BUKAN dealer resmi Geely — positioning ini dipertahankan jujur di seluruh halaman.

---

## 1. RINGKASAN KONDISI (HASIL AUDIT)

**Sudah kuat (terverifikasi di kode + lingkungan lokal):**
- Sitemap otomatis 68 URL, robots.txt + whitelist 19 bot AI, IndexNow, llms.txt + llms-full.txt (katalog untuk AI search).
- JSON-LD: AutoDealer, Organization graph (4 identitas + 3 PT + komunitas), Product per model (aggregateRating HANYA dari ulasan asli termoderasi), BreadcrumbList, FAQ, ItemList.
- Konten: 4 halaman model, 44 landing SEO, artikel, 9 halaman perbandingan (`/vs`), kuis pencocokan model, kalkulator kredit, kalkulator hemat EV, indeks 2.655 frasa kata kunci.
- Konversi: CTA WhatsApp di seluruh situs, form test drive → database Lead, kuis & kalkulator kini ikut menyimpan lead (source: `quiz` / `simulator`).
- Pengukuran: event konversi terpasang (`wa_click`, `generate_lead`, `chat_open`, `quiz_complete`, `calculate_credit`, `ev_cost_calc`, `quiz_share`) + mini-CRM `/api/leads/admin`.
- Kanonisasi host: `www` → apex 308 via `src/proxy.ts` (Next.js 16).

**Temuan kritis yang menuntut tindakan PEMILIK (butuh akses eksternal):**
1. **Deployment live KEDALUWARSA** — sitemap live masih 59 URL, `/llms.txt` & `/vs` 404, robots live belum memuat whitelist bot AI, event konversi & lead capture belum ada di produksi. → **Redeploy segera** (lihat §6).
2. **GA4 belum aktif** — kode sudah env-gated; tinggal set `NEXT_PUBLIC_GA_ID` di Vercel (lihat §5).
3. **Google Business Profile** — buat/klaim bila memenuhi kelayakan; ini pendorong terbesar pencarian lokal "geely bogor".

---

## 2. PETA KATA KUNCI & NIAT PENCARIAN

> ATURAN JUJUR: volume & kesulitan TIDAK ditulis karena tidak ada data terverifikasi.
> Validasi tiap baris dengan Google Search Console (Impressions/CTR/posisi) + Google Trends.
> Isi kolom "Sumber data" SETELAH ada data nyata; tinjau bulanan.

### P0 — Transaksional (calon pembeli; prioritas tertinggi)
| Pola kueri | Halaman target | Status | Catatan |
|---|---|---|---|
| harga geely [model] / harga [model] bogor | `/harga-mobil-geely-bogor`, `/model/[slug]` | ✅ ada | Tampilkan tanggal cek harga; konfirmasi WA |
| cicilan geely [model] / DP geely [model] | `#simulasi` (beranda) + landing kredit | ✅ ada | Kalkulator interaktif + lead capture |
| promo geely bogor | `/promo-geely-bogor` | ✅ ada | Perbarui sesuai periode promo nyata |
| test drive geely bogor | form test drive + landing | ✅ ada | Lead tersimpan + WA |
| sales / konsultan geely bogor | landing sales & kontak | ✅ ada | Positioning jujur: konsultan independen |

### P1 — Komersial/perbandingan
| Pola kueri | Halaman target | Status |
|---|---|---|
| geely coolray vs [pesaing] / geely ex5 vs [pesaing] | `/vs/[slug]` (8 duel) | ✅ ada |
| bandingkan semua model geely | `/harga-mobil-geely-bogor` (tabel 4 model) | ✅ ada |
| geely listrik vs hybrid / pilih geely mana | kuis `#kuis` + tabel model | ✅ ada |
| [pesaing A] vs [pesaing B] dengan geely | roadmap — buat HANYA jika data pesaing terverifikasi & berdampingan bernilai | ⏳ P2 |

### P2 — Informasional (topical authority)
| Pola kueri | Halaman target | Status |
|---|---|---|
| spesifikasi geely [model] | `/model/[slug]` | ✅ ada |
| biaya pengisian mobil listrik / mahalkah listrik mobil | kalkulator EV di `/model/ex5`, `/model/ex2` | ✅ ada |
| cara menghitung cicilan mobil | artikel + kalkulator | ✅ ada (artikel) |
| biaya servis / garansi baterai geely | roadmap artikel — WAJIB bersumber resmi Geely Indonesia + tanggal verifikasi | ⏳ P2 |
| pertanyaan sebelum beli mobil listrik | roadmap artikel | ⏳ P2 |

### P3 — Lokal (Bogor & Jabodetabek)
| Pola kueri | Halaman target | Status |
|---|---|---|
| geely bogor / mobil listrik bogor | landing lokal existing | ✅ ada |
| geely depok/bekasi/jakarta/tangerang | HANYA buat halaman area jika ada info lokal nyata yang berbeda (testimoni pelanggan daerah itu, rute kunjungan, kasus nyata). JANGAN doorway page. | ⏳ selektif |
| [brand] geely near me | Google Business Profile + konsistensi NAP | ⏳ eksternal |

**Anti-kanibalisasi:** satu niat pencarian = satu halaman. Kalkulator kredit tidak
bersaing dengan landing kredit — kalkulator ditanam DI DALAM halaman terkait.

---

## 3. ARSITEKTUR HALAMAN & INTERNAL LINKING

```
Beranda (hub utama)
├─ /model/[coolray|ex5|starray|ex2]   ← Product + review engine
│   └─ chip "Bandingkan dengan pesaing" → /vs/[slug]
├─ /harga-mobil-geely-bogor           ← tabel 4 model + harga (snippet magnet)
├─ /promo-geely-bogor                 ← periode promo nyata + tanggal
├─ #simulasi (beranda) + landing kredit ← kalkulator + lead capture
├─ /vs (indeks 8 duel) → /vs/[slug]
├─ /artikel → /artikel/[slug]         ← hub konten informasional
├─ /indeks-kata-kunci                 ← 2.655 frasa, halaman utilitas internal
├─ /kontak · /tentang · kebijakan privasi
└─ downloads (noindex)
```
Aturan linking: setiap halaman baru minimal 2 tautan masuk dari halaman relevan
(menu/footer dianggap global). Anchor deskriptif, bukan "klik di sini".

---

## 4. ROADMAP 90 HARI

**FASE 1 — Hari 1–7: Fondasi (sebagian besar SELESAI di kode)**
- [ ] PEMILIK: redeploy → verifikasi `/api/seo-status` semua PASS di produksi
- [ ] PEMILIK: submit sitemap dari property GSC yang host-nya SAMA
- [ ] PEMILIK: set `NEXT_PUBLIC_GA_ID` + `REVIEWS_ADMIN_KEY` di Vercel
- [ ] PEMILIK: Bing Webmaster Tools — import dari GSC + kirim IndexNow batch
- [ ] Verifikasi redirect www→apex di produksi (`curl -I https://www.pusatgeely.web.id/`)

**FASE 2 — Hari 8–30: Halaman prioritas & lokal sah**
- [ ] Kumpulkan 5-10 ulasan pelanggan ASLI → moderasi via `/api/reviews/admin` → bintang Product JSON-LD aktif
- [ ] Harga & promo: cantumkan tanggal pemeriksaan (rutin tiap ada perubahan)
- [ ] GBP (bila layak): foto asli, Q&A; minta ulasan pelanggan secara etis
- [ ] Halaman area Jabodetabek: MULAI dari area dengan bukti pelanggan nyata (1-2 dulu, bukan 9 sekaligus)

**FASE 3 — Hari 31–60: Konten & reputasi**
- [ ] 2-4 artikel prioritas (lihat §2 P2): biaya servis, garansi baterai, checklist beli EV — bersumber resmi Geely Indonesia + tanggal verifikasi
- [ ] Distribusi: 1 konten IG/video pendek per artikel; tautkan balik ke halaman model
- [ ] Komunitas otomotif lokal: bagikan kalkulator/kuis (aset yang layak dibagikan), tanpa spam

**FASE 4 — Hari 61–90: Optimasi berbasis data**
- [ ] GSC: query impresi tinggi + CTR rendah → perbaiki title/meta
- [ ] GSC: halaman posisi 5-15 → perkuat konten + internal link
- [ ] Leads admin: evaluasi source mana yang menghasilkan → perkuat jalur itu
- [ ] Perbarui/gabungkan konten yang tidak berperforma (jangan menumpuk halaman lemah)

---

## 5. ANALITIK & KONVERSI

**Aktivasi GA4 (pemilik, ±10 menit):**
1. Buat properti GA4 → dapat Measurement ID `G-XXXXXXX`
2. Vercel → Settings → Environment Variables → `NEXT_PUBLIC_GA_ID` → Redeploy
3. Verifikasi: Reports → Realtime (buka situs, kunjungan muncul ±30 detik)
4. Admin → Events → tandai sebagai key event: `generate_lead`, `wa_click`, `quiz_complete`

**Event terlacak (otomatis via dataLayer, kode sudah terpasang):**
| Event | Parameter | Pemicu |
|---|---|---|
| `wa_click` | location (floating_cta / ai_chat / quiz / simulator / simulator_followup) | klik CTA WhatsApp |
| `generate_lead` | form (test_drive / quiz / simulator), model | lead tersimpan di DB |
| `chat_open` | — | panel AI chat dibuka |
| `quiz_complete` | model | kuis selesai |
| `calculate_credit` | model | interaksi pertama kalkulator kredit |
| `ev_cost_calc` | model | penggunaan kalkulator EV |
| `quiz_share` | model | hasil kuis dibagikan |

**Mini-CRM prospek:** `GET/PATCH/DELETE /api/leads/admin` (header `x-admin-key` = `REVIEWS_ADMIN_KEY`) — statistik per source/status/interest + 100 lead terbaru; alur status: new → contacted → qualified → won/lost. Panduan curl lengkap di `DEPLOY-VERCEL.md` §11.

**Dashboard mingguan (15 menit/minggu):** impresi & klik GSC · CTR · prospek per source · event GA4 · CVR prospek→test drive.

---

## 6. CHECKLIST DEPLOYMENT (PENTING — live saat ini KEDALUWARSA)

1. Push kode (atau upload arsip 00 dari /downloads) → Vercel deploy
2. Env Vercel: `NEXT_PUBLIC_SITE_URL=https://pusatgeely.web.id`, `REVIEWS_ADMIN_KEY`, (opsional) `NEXT_PUBLIC_GA_ID`
3. Setelah live, verifikasi:
   - `curl -s https://pusatgeely.web.id/api/seo-status` → semua PASS
   - `curl -sI https://www.pusatgeely.web.id/ | head -3` → **HTTP 308** + `location: https://pusatgeely.web.id/`
   - `curl -s https://pusatgeely.web.id/sitemap.xml | grep -c loc` → **68**
   - `curl -I https://pusatgeely.web.id/llms.txt` → 200
   - `curl -s https://pusatgeely.web.id/robots.txt | grep -c GPTBot` → ≥1
4. GSC: resubmit sitemap → URL Inspection untuk /vs, /model/ex5, /harga-mobil-geely-bogor → Request Indexing
5. IndexNow batch untuk URL baru (panduan di DEPLOY-VERCEL.md)

---

## 7. PENGAMAN SEO (guardrails yang sudah diterapkan)

- ❌ Tidak ada rating/review/harga/URL palsu — aggregateRating hanya dari ulasan nyata termoderasi
- ❌ Tidak ada doorway page massal — halaman lokal hanya jika ada info lokal nyata
- ❌ Tidak ada keyword stuffing — kata kunci di title/H1/meta secara alami
- ❌ Tidak ada cloaking/traffic bot/PBN
- ✅ Disclaimer pada semua estimasi (kredit/EV): angka indikatif, bukan penawaran resmi
- ✅ Positioning jujur: konsultan penjualan independen, bukan dealer resmi
