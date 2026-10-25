import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { ComparisonPage } from "@/components/comparison-page";
import { SITE_URL } from "@/lib/site";
import { COMPARES, getCompare } from "@/lib/competitors";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COMPARES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getCompare(slug);
  if (!comparison) return {};

  return {
    title: comparison.title,
    description: comparison.description,
    keywords: [
      `${comparison.geelyName.toLowerCase()} vs ${comparison.rivalName.toLowerCase()}`,
      `bandingkan ${comparison.geelyName.toLowerCase()}`,
      `${comparison.geelyName.toLowerCase()} atau ${comparison.rivalName.toLowerCase()}`,
      `${comparison.rivalName.toLowerCase()} vs geely`,
      "mobil geely vs pesaing",
    ],
    alternates: {
      canonical: `${SITE_URL}/vs/${comparison.slug}`,
      languages: {
        "id-ID": `${SITE_URL}/vs/${comparison.slug}`,
        en: `${SITE_URL}/vs/${comparison.slug}`,
      },
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/vs/${comparison.slug}`,
      title: comparison.title,
      description: comparison.description,
    },
  };
}

export default async function VsDetail({ params }: Props) {
  const { slug } = await params;
  const comparison = getCompare(slug);
  if (!comparison) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Perbandingan", item: `${SITE_URL}/vs` },
      {
        "@type": "ListItem",
        position: 3,
        name: `${comparison.geelyName} vs ${comparison.rivalName}`,
        item: `${SITE_URL}/vs/${comparison.slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faqs.map((f) => ({
      "@type": "Question",
      name: f.q.id,
      acceptedAnswer: { "@type": "Answer", text: f.a.id },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ComparisonPage comparison={comparison} />
    </PageShell>
  );
}
