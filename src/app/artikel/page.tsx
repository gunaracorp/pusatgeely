import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ArticleList } from "@/components/article-list";
import { SITE_URL } from "@/lib/site";
import { keywordsForPage } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: "Artikel & Panduan Geely — Harga, Perbandingan, Tips, Trade-in",
  description:
    "Kumpulan artikel panduan membeli Geely di Bogor & Jabodetabek: daftar harga terbaru, perbandingan EX5 vs Starray EM-i, tips merawat baterai mobil listrik, dan panduan trade-in lengkap.",
  keywords: keywordsForPage({ core: true, cap: 45 }),
  alternates: {
    canonical: `${SITE_URL}/artikel`,
    languages: {
      "id-ID": `${SITE_URL}/artikel`,
      en: `${SITE_URL}/artikel`,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/artikel`,
    title: "Artikel & Panduan Geely — Pusat Geely Bogor",
    description:
      "Panduan jujur membeli Geely: harga, perbandingan model, perawatan baterai, dan trade-in.",
    images: [{ url: "/images/hero.webp", width: 1440, height: 720, alt: "Pusat Geely" }],
  },
};

export default function Artikel() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Artikel", item: `${SITE_URL}/artikel` },
    ],
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <ArticleList />
    </PageShell>
  );
}
