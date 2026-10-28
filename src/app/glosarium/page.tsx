import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { GlossaryList } from "./glossary-list";
import { GLOSSARY } from "@/lib/glossary";
import { SITE_URL } from "@/lib/site";
import { keywordsForPage } from "@/lib/seo-keywords";

const GLOSARIUM_TITLE = "Glosarium Istilah Mobil Listrik, Hybrid & Kredit Otomotif";
const GLOSARIUM_DESCRIPTION =
  "Kamus istilah otomotif dalam bahasa Indonesia yang mudah dipahami — dari kWh, SOC, LFP, V2L, dan rem regeneratif sampai DP, tenor, bunga flat, dan pajak progresif — ditulis untuk calon pembeli mobil listrik atau hybrid pertama di Bogor & Jabodetabek.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: GLOSARIUM_TITLE,
    description: GLOSARIUM_DESCRIPTION,
    keywords: keywordsForPage({ core: true, cap: 45 }),
    alternates: {
      canonical: `${SITE_URL}/glosarium`,
      languages: {
        "id-ID": `${SITE_URL}/glosarium`,
        en: `${SITE_URL}/glosarium`,
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/glosarium`,
      title: GLOSARIUM_TITLE,
      description: GLOSARIUM_DESCRIPTION,
      images: [{ url: "/images/hero.webp", width: 1440, height: 720, alt: "Pusat Geely" }],
    },
    twitter: {
      card: "summary_large_image",
      title: GLOSARIUM_TITLE,
      description: GLOSARIUM_DESCRIPTION,
      images: ["/images/hero.webp"],
    },
  };
}

export default function GlosariumPage() {
  const termSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${SITE_URL}/glosarium#termset`,
    name: "Glosarium Otomotif Pusat Geely",
    description: GLOSARIUM_DESCRIPTION,
    url: `${SITE_URL}/glosarium`,
    inLanguage: "id-ID",
    hasDefinedTerm: GLOSSARY.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${SITE_URL}/glosarium#${t.slug}`,
      name: t.term.id,
      alternateName: t.term.en,
      description: t.definition.id,
      url: `${SITE_URL}/glosarium#${t.slug}`,
      inDefinedTermSet: { "@id": `${SITE_URL}/glosarium#termset` },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Glosarium", item: `${SITE_URL}/glosarium` },
    ],
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termSet) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <GlossaryList />
    </PageShell>
  );
}
