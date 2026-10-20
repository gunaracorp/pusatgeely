PERBAIKAN SITEMAP PUSAT GEELY

Apa yang berubah:
- Mengganti src/app/sitemap.ts dengan Route Handler pada src/app/sitemap.xml/route.ts.
- Mempertahankan URL beranda, halaman statis, landing SEO, model, dan artikel.
- Mengirim Content-Type application/xml secara eksplisit serta cache selama 1 jam.

CARA PALING AMAN (dari folder repo pusatgeely):
1. Simpan file pusatgeely-sitemap-route-fix.patch di folder repo.
2. Jalankan:
   git apply pusatgeely-sitemap-route-fix.patch
3. Pastikan perubahan terlihat:
   git status --short
4. Commit dan push:
   git add -A
   git commit -m "fix: serve sitemap XML through explicit route handler"
   git push origin main
5. Tunggu deployment production Vercel berstatus Ready.
6. Buka https://pusatgeely.web.id/sitemap.xml dan pastikan tampak XML.
7. Kembali ke Google Search Console lalu submit ulang sitemap.xml sekali.

PENTING:
- Patch ini menghapus src/app/sitemap.ts karena kedua file akan bertabrakan pada URL /sitemap.xml jika dibiarkan bersamaan.
- Patch ini adalah workaround untuk melewati metadata sitemap route. Ia tidak bisa memperbaiki domain/DNS Vercel yang belum tersambung atau deployment yang gagal.
- Jika git apply gagal, jangan paksa; periksa bahwa repo berada di commit/versi file yang sama dengan GitHub main saat patch dibuat.
