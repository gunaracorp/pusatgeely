import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { LandingShell } from "@/components/landing-shell";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { AREAS, BUSINESS, MODELS, SITE_URL, POWERTRAIN_LABEL } from "@/lib/site";

/**
 * Route dinamis halaman landing SEO. Hanya slug yang terdaftar di
 * LANDING_PAGES yang di-prerender — slug lain otomatis 404
 * (mencegah halaman tipis tak sengaja terindeks).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_PAGES.map((p) => ({ landing: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ landing: string }>;
}): Promise<Metadata> {
  const { landing } = await params;
  const page = LANDING_PAGES.find((p) => p.slug === landing);
  if (!page) return {};

  const title = page.title.id;
  const description = page.description.id;
  const url = `${SITE_URL}/${page.slug}`;

  return {
    title,
    description,
    keywords: [
      page.title.id,
      page.slug.replace(/-/g, " "),
      "geely bogor",
      "pusat geely",
      "geely jabodetabek",
    ],
    alternates: {
      canonical: url,
      languages: {
        "id-ID": url,
        en: url,
      },
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: page.ogImage, width: 1200, height: 675, alt: page.h1.id }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [page.ogImage],
    },
  };
}

export default async function LandingRoute({
  params,
}: {
  params: Promise<{ landing: string }>;
}) {
  const { landing } = await params;
  const page = LANDING_PAGES.find((p) => p.slug === landing);
  if (!page) notFound();

  const url = `${SITE_URL}/${page.slug}`;
  const model = page.modelId ? MODELS.find((m) => m.id === page.modelId) : undefined;

  // JSON-LD: BreadcrumbList (semua halaman).
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: page.h1.id, item: url },
    ],
  };

  // JSON-LD: FAQPage (semua halaman punya FAQ asli).
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.q.id,
      acceptedAnswer: { "@type": "Answer", text: item.a.id },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />

      {/* Halaman sales: skema Service + area layanan */}
      {page.slug === "sales-geely-bogor" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Konsultasi Pembelian Geely — Bogor & Jabodetabek",
              serviceType: "Konsultan penjualan kendaraan",
              url,
              description: page.description.id,
              provider: {
                "@type": "Person",
                name: BUSINESS.pic,
                jobTitle: BUSINESS.role.id,
                telephone: `+${BUSINESS.waNumber}`,
                url: SITE_URL,
              },
              areaServed: AREAS.map((a) => ({ "@type": "Place", name: a })),
            }),
          }}
        />
      )}

      {/* Halaman model: ItemList varian → halaman detail model */}
      {model && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: `Harga ${model.name} di Bogor (${POWERTRAIN_LABEL[model.powertrain].id}, indikatif)`,
              url,
              itemListElement: model.variants.map((v, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: model.name.includes(v.label) ? model.name : `${model.name} ${v.label}`,
                url: `${SITE_URL}/model/${model.id}`,
              })),
            }),
          }}
        />
      )}

      <LandingShell page={page} />
    </PageShell>
  );
}
