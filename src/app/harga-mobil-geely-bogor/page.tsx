import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { HargaPage } from "@/components/harga-page";
import { MODELS, SITE_URL, waLink } from "@/lib/site";
import { keywordsForPage } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: "Harga Mobil Geely Bogor | EX5, Starray EM-i, Coolray, EX2 (Indikatif OTR)",
  description:
    "Daftar harga mobil Geely di Bogor & Jabodetabek per September 2026: EX5 mulai Rp 465 juta, Starray EM-i Rp 499 juta, Coolray Rp 333 juta, EX2 Rp 239,9 juta — per varian, biaya yang perlu disiapkan, dan cara meminta penawaran terbaru.",
  keywords: keywordsForPage({ intent: "harga", cap: 60 }),
  alternates: {
    canonical: `${SITE_URL}/harga-mobil-geely-bogor`,
    languages: {
      "id-ID": `${SITE_URL}/harga-mobil-geely-bogor`,
      en: `${SITE_URL}/harga-mobil-geely-bogor`,
    },
  },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/harga-mobil-geely-bogor`,
    title: "Harga Mobil Geely Bogor (Indikatif OTR) — Pusat Geely",
    description:
      "Tabel harga indikatif seluruh model & varian Geely di Bogor per September 2026 + simulasi cicilan via WhatsApp.",
    images: [{ url: "/images/unit-ex5-snowy.webp", width: 1200, height: 675, alt: "Geely EX5" }],
  },
};

export default function Harga() {
  const priceMin = Math.min(...MODELS.map((m) => m.priceFrom));
  const priceMax = Math.max(
    ...MODELS.map((m) => Math.max(...m.variants.map((v) => v.price)))
  );

  const catalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${SITE_URL}/harga-mobil-geely-bogor#catalog`,
    name: "Daftar Harga Geely Indonesia (Indikatif OTR)",
    url: `${SITE_URL}/harga-mobil-geely-bogor`,
    itemListElement: MODELS.map((m, i) => ({
      "@type": "OfferCatalog",
      position: i + 1,
      name: m.name,
      url: `${SITE_URL}/model/${m.id}`,
      itemListElement: m.variants.map((v) => ({
        "@type": "Offer",
        name: m.name.includes(v.label) ? m.name : `${m.name} ${v.label}`,
        priceCurrency: "IDR",
        price: v.price,
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/model/${m.id}`,
      })),
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Harga", item: `${SITE_URL}/harga-mobil-geely-bogor` },
    ],
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalog) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <HargaPage
        priceMin={priceMin}
        priceMax={priceMax}
        waHref={waLink(
          "Halo Pusat Geely, saya ingin menanyakan daftar harga & promo terbaru."
        )}
      />
    </PageShell>
  );
}
