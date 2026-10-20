import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { KontakPage } from "@/components/kontak-page";
import { BUSINESS, SITE_URL, waLink } from "@/lib/site";
import { keywordsForPage } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: "Kontak Pusat Geely — WhatsApp, Email & Area Layanan Bogor Jabodetabek",
  description:
    "Hubungi Pusat Geely: WhatsApp +62 816-6111-42 (Senin–Minggu 08.00–20.00 WIB), email, dan media sosial. Melayani konsultasi, test drive, kredit, dan trade-in untuk seluruh Bogor & Jabodetabek.",
  keywords: keywordsForPage({ intent: "sales", area: "bogor", cap: 50 }),
  alternates: {
    canonical: `${SITE_URL}/kontak`,
    languages: {
      "id-ID": `${SITE_URL}/kontak`,
      en: `${SITE_URL}/kontak`,
    },
  },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/kontak`,
    title: "Kontak Pusat Geely — Bogor & Jabodetabek",
    description:
      "Chat WhatsApp untuk konsultasi, test drive, simulasi kredit, dan trade-in Geely di Bogor & Jabodetabek.",
    images: [{ url: "/images/hero.webp", width: 1440, height: 720, alt: "Pusat Geely" }],
  },
};

export default function Kontak() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Kontak", item: `${SITE_URL}/kontak` },
    ],
  };

  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/kontak#contact`,
    url: `${SITE_URL}/kontak`,
    name: "Kontak Pusat Geely",
    inLanguage: "id-ID",
    about: { "@id": `${SITE_URL}/#business` },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPage) }}
      />
      <KontakPage
        waHref={waLink("Halo Pusat Geely, saya ingin bertanya tentang mobil Geely.")}
      />
      {/* Referensi bisnis untuk aksesibilitas skema */}
      <span className="sr-only">{BUSINESS.name}</span>
    </PageShell>
  );
}
