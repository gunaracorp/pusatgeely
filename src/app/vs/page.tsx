import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { VsIndexPage } from "@/components/vs-index-page";
import { SITE_URL } from "@/lib/site";
import { COMPARES } from "@/lib/competitors";

export const metadata: Metadata = {
  title: "Perbandingan Mobil Geely vs Pesaing — Jujur & Berbasis Data",
  description:
    "Bandingkan Geely dengan pesaing utamanya: EX5 vs Atto 3, EX2 vs Dolphin & Bingo, Coolray vs HR-V & Yaris Cross, Starray EM-i vs Corolla Cross & CR-V — harga indikatif, spesifikasi, dan panduan memilih.",
  alternates: {
    canonical: `${SITE_URL}/vs`,
    languages: {
      "id-ID": `${SITE_URL}/vs`,
      en: `${SITE_URL}/vs`,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/vs`,
    title: "Perbandingan Geely vs Pesaing — EX5, EX2, Coolray, Starray",
    description:
      "8 perbandingan jujur berbasis data riset publik: harga indikatif, spesifikasi kunci, dan pendapat jujur untuk pembeli Bogor & Jabodetabek.",
  },
};

export default function VsIndex() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Perbandingan", item: `${SITE_URL}/vs` },
    ],
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Perbandingan Mobil Geely vs Pesaing",
    itemListElement: COMPARES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${c.geelyName} vs ${c.rivalName}`,
      url: `${SITE_URL}/vs/${c.slug}`,
    })),
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <VsIndexPage />
    </PageShell>
  );
}
