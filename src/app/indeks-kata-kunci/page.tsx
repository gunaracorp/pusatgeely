import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { KeywordExplorer } from "@/components/keyword-explorer";
import {
  KEYWORD_CLUSTERS,
  SEO_KEYWORD_COUNT,
} from "@/lib/seo-keywords";
import { SITE_URL } from "@/lib/site";

/**
 * INDEKS KATA KUNCI — "peta niat pencari".
 *
 * Hub internal-linking: setiap frasa pencarian nyata menunjuk ke halaman
 * yang menjawabnya. Pola ini yang membuat crawler memahami cakupan topik
 * situs secara menyeluruh (topical authority) — bukan keyword stuffing,
 * karena setiap tautan menuju konten nyata yang relevan.
 */

const title = `1.000+ Kata Kunci Geely — Indeks Pencarian Lengkap | Pusat Geely`;
const description = `Indeks lengkap ${SEO_KEYWORD_COUNT.toLocaleString("id-ID")} kata kunci & tagar pencarian Geely: harga, promo, kredit, test drive, dealer — Bogor, Jakarta, Depok, Tangerang, Bekasi & Jabodetabek. Semua mengarah ke halaman resmi yang menjawabnya.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "kata kunci geely",
    "indeks geely",
    "tagar geely",
    "pencarian geely",
    "geely bogor",
    "pusat geely",
    "daftar harga geely",
    "seo geely indonesia",
  ],
  alternates: {
    canonical: `${SITE_URL}/indeks-kata-kunci`,
    languages: { "id-ID": `${SITE_URL}/indeks-kata-kunci` },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/indeks-kata-kunci`,
    title,
    description,
  },
};

export default function IndeksKataKunciPage() {
  return (
    <PageShell>
      {/* JSON-LD ringkas: hint struktur untuk mesin pencari (klaster, bukan 2.655 item) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Indeks Kata Kunci Geely",
            url: `${SITE_URL}/indeks-kata-kunci`,
            description,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: SEO_KEYWORD_COUNT,
              itemListElement: KEYWORD_CLUSTERS.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: `${c.label} (${c.items.length} frasa)`,
              })),
            },
          }),
        }}
      />

      <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <header className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Pusat Geely · Indeks Pencarian
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Indeks {SEO_KEYWORD_COUNT.toLocaleString("id-ID")} Kata Kunci Geely
          </h1>
          <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Inilah peta lengkap semua pencarian yang bisa kami jawab — dari
              &ldquo;harga geely ex5 bogor&rdquo; sampai &ldquo;cara kredit geely
              coolray jakarta&rdquo;. Setiap frasa di bawah adalah pintu masuk:
              klik untuk langsung menuju halaman yang membahasnya. Jika frasa
              yang Anda cari belum ada di sini, chat WhatsApp kami — kami jawab
              langsung.
            </p>
          </div>
        </header>

        {/* Pencarian instan + klaster (SSR default) */}
        <KeywordExplorer clusters={KEYWORD_CLUSTERS} />

        {/* Catatan */}
        <div className="mt-12 max-w-3xl rounded-xl border bg-muted/30 p-4 text-[11px] leading-relaxed text-muted-foreground">
          <p>
            Indeks ini dibuat agar setiap frasa pencarian yang relevan memiliki
            halaman tujuan yang benar-benar menjawabnya — bukan daftar kata
            tanpa konteks. Harga bersifat indikatif (riset sumber publik,
            September 2026) dan dapat berubah; konfirmasi via WhatsApp untuk
            penawaran terkini.
          </p>
        </div>
      </article>
    </PageShell>
  );
}
