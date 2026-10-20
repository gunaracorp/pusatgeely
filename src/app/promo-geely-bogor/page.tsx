import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PromoSection } from "@/components/promo-section";
import { SITE_URL } from "@/lib/site";
import { keywordsForPage } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: "Promo Geely Bogor Terbaru | Program Pembiayaan & Paket Kredit (Indikatif)",
  description:
    "Promo Geely Bogor yang benar-benar berlaku: program pembiayaan dari 5 perusahaan — DP, angsuran per tenor, total bayar pertama, model yang memenuhi syarat, dan cara mengonfirmasi ketersediaannya. Promo kedaluwarsa segera dicabut dari halaman ini.",
  keywords: keywordsForPage({ intent: "promo", cap: 60 }),
  alternates: {
    canonical: `${SITE_URL}/promo-geely-bogor`,
    languages: {
      "id-ID": `${SITE_URL}/promo-geely-bogor`,
      en: `${SITE_URL}/promo-geely-bogor`,
    },
  },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/promo-geely-bogor`,
    title: "Promo Geely Bogor Terbaru — Pusat Geely",
    description:
      "Program pembiayaan berlaku untuk EX5, Starray EM-i, Coolray & EX2 — angka apa adanya dari lembar simulasi resmi perusahaan pembiayaan.",
    images: [{ url: "/images/hero.webp", width: 1440, height: 720, alt: "Pusat Geely" }],
  },
};

export default function Promo() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Promo", item: `${SITE_URL}/promo-geely-bogor` },
    ],
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
          <a href="/" className="rounded px-1 py-0.5 hover:text-foreground">Beranda</a>
          <span aria-hidden="true">/</span>
          <span className="px-1 py-0.5 font-medium text-foreground/80">Promo</span>
        </nav>
      </div>
      <PromoSection />
    </PageShell>
  );
}
