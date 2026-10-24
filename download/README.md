# 📦 Pusat Unduhan — Pusat Geely Super Web App

Seluruh arsip proyek tersedia online melalui aplikasi:

**Buka `/downloads/index.html` pada preview aplikasi** — di sana ada tombol unduh untuk:

| Arsip                           | Isi                                                          |
| ------------------------------- | ------------------------------------------------------------ |
| `00-pusatgeely-source-lengkap.zip` | **SEMUA** source + assets + prisma + config siap deploy (REKOMENDASI) |
| `01-source-code.zip`            | Hanya `src/` (komponen, halaman, API, lib)                   |
| `02-assets-gambar-promo.zip`    | `public/` — foto unit, galeri, brosur PDF promo              |
| `03-database-prisma.zip`        | `prisma/schema.prisma` + `db/custom.db`                      |
| `04-config-deployment.zip`      | `package.json`, lockfile, next.config, vercel.json, dsb.     |

Catatan: arsip TIDAK memuat `node_modules` (±1,2 GB) — cukup jalankan `bun install`
atau `npm install` setelah ekstrak; Vercel juga meng-install dependensi otomatis.

Panduan deploy + troubleshooting Google Search Console: lihat `DEPLOY-VERCEL.md`
(di dalam arsip lengkap, juga tersedia online sebagai `/downloads/PANDUAN-DEPLOY-VERCEL.md`).
