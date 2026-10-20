import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { TentangPage } from "@/components/tentang-page";
import { SITE_URL } from "@/lib/site";
import { keywordsForPage } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: "Tentang Pusat Geely — Konsultan Penjualan Independen Geely Bogor",
  description:
    "Kenali Pusat Geely: layanan konsultan penjualan independen untuk kendaraan Geely di Bogor & Jabodetabek — cara kerja kami, nilai yang kami pegang, dan mengapa pendampingan transparan lebih penting daripada promo sekali klaim.",
  keywords: keywordsForPage({ core: true, cap: 40 }),
  alternates: {
    canonical: `${SITE_URL}/tentang`,
    languages: {
      "id-ID": `${SITE_URL}/tentang`,
      en: `${SITE_URL}/tentang`,
    },
  },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/tentang`,
    title: "Tentang Pusat Geely — Konsultan Penjualan Geely Bogor",
    description:
      "Layanan konsultan penjualan independen Geely untuk Bogor & Jabodetabek: transparan, tanpa tekanan, mendampingi sampai serah terima.",
    images: [{ url: "/images/hero.webp", width: 1440, height: 720, alt: "Pusat Geely" }],
  },
};

export default function Tentang() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tentang", item: `${SITE_URL}/tentang` },
    ],
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <TentangPage />
    </PageShell>
  );
}
