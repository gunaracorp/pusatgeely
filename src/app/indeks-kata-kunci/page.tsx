import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
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
          {/* Navigasi klaster */}
          <nav aria-label="Klaster kata kunci" className="mt-6 flex flex-wrap gap-2">
            {KEYWORD_CLUSTERS.map((c) => (
              <a
                key={c.id}
                href={`#klaster-${c.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary"
              >
                {c.label}
                <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                  {c.items.length}
                </span>
              </a>
            ))}
          </nav>
        </header>

        {/* Klaster */}
        <div className="mt-12 space-y-12">
          {KEYWORD_CLUSTERS.map((c) => (
            <section key={c.id} id={`klaster-${c.id}`} aria-label={c.label}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-3">
                <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {c.label}
                </h2>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {c.items.length.toLocaleString("id-ID")} frasa
                </span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.items.map((k) => (
                  <li key={k.t}>
                    <Link
                      href={k.h}
                      className="inline-flex items-center rounded-full border bg-card px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      title={`Buka halaman: ${k.t}`}
                    >
                      #{k.t}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

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
