/**
 * PUSAT GEELY — RSS 2.0 feed (/feed.xml).
 *
 * Daftar artikel & panduan (ID utama) untuk pembaca dan agregator berita.
 * Escaping XML diterapkan pada SEMUA teks dinamis agar feed selalu valid.
 */
import { ARTICLES } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

/** Regenerasi tiap 1 jam (selaras Cache-Control s-maxage di bawah). */
export const revalidate = 3600;

/** Escape karakter khusus XML: & < > " '. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(): Promise<Response> {
  // ISO date ("2026-09-28") bisa diurutkan leksikal — terbaru dulu.
  const articles = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));

  const items = articles
    .map(
      (article) => `    <item>
      <title>${escapeXml(article.title.id)}</title>
      <link>${SITE_URL}/artikel/${article.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/artikel/${article.slug}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <description>${escapeXml(article.excerpt.id)}</description>
      <category>${escapeXml(article.tag.id)}</category>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pusat Geely — Artikel &amp; Panduan Mobil Geely</title>
    <link>${SITE_URL}</link>
    <description>Panduan jujur membeli mobil Geely di Bogor &amp; Jabodetabek — harga indikatif, perbandingan model, dan tips perawatan. Honest guides for Geely buyers in Indonesia.</description>
    <language>id-ID</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link rel="self" type="application/rss+xml" href="${SITE_URL}/feed.xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
