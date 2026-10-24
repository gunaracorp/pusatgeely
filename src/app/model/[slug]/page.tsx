import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { ModelDetail } from "@/components/model-detail";
import { getModelBundle } from "@/lib/model-details";
import { MODELS, POWERTRAIN_LABEL, SITE_URL, formatIDR, waLink } from "@/lib/site";
import { keywordsForPage } from "@/lib/seo-keywords";

export function generateStaticParams() {
  return MODELS.map((m) => ({ slug: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { model } = getModelBundle(slug);
  if (!model) return {};

  const title = `${model.name} — Harga, Spesifikasi & Test Drive Bogor`;
  const description = `${model.blurb.id} Harga mulai ${formatIDR(model.priceFrom)}. Test drive, simulasi kredit, dan trade-in untuk ${model.name} di Bogor & Jabodetabek via WhatsApp.`;

  // Kata kunci terdistribusi: brand inti + seluruh frasa model × niat × area
  // yang relevan untuk model ini (harga, kredit, test drive, warna, dsb).
  const kw = keywordsForPage({ modelId: model.id, cap: 90 });

  return {
    title,
    description,
    keywords: [
      model.name.toLowerCase(),
      `harga ${model.name.toLowerCase()}`,
      `${model.name.toLowerCase()} bogor`,
      `kredit ${model.name.toLowerCase()}`,
      `test drive ${model.name.toLowerCase()}`,
      ...kw,
    ],
    alternates: {
      canonical: `${SITE_URL}/model/${model.id}`,
      languages: {
        "id-ID": `${SITE_URL}/model/${model.id}`,
        en: `${SITE_URL}/model/${model.id}`,
      },
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/model/${model.id}`,
      title,
      description,
      // og:image diambil otomatis dari opengraph-image.tsx (kartu dinamis)
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { model, detail } = getModelBundle(slug);
  if (!model || !detail) notFound();

  const priceMin = Math.min(...model.variants.map((v) => v.price));
  const priceMax = Math.max(...model.variants.map((v) => v.price));

  // JSON-LD: Product + penawaran per varian.
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/model/${model.id}#product`,
    name: model.name,
    description: model.blurb.id,
    image: `${SITE_URL}${model.image}`,
    brand: { "@type": "Brand", name: "Geely" },
    category: POWERTRAIN_LABEL[model.powertrain].id,
    offers: {
      "@type": "AggregateOffer",
      url: `${SITE_URL}/model/${model.id}`,
      priceCurrency: "IDR",
      lowPrice: priceMin,
      highPrice: priceMax,
      offerCount: model.variants.length,
      offers: model.variants.map((v) => ({
        "@type": "Offer",
        name: model.name.includes(v.label) ? model.name : `${model.name} ${v.label}`,
        priceCurrency: "IDR",
        price: v.price,
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/model/${model.id}`,
      })),
    },
  };

  // JSON-LD: BreadcrumbList.
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Model", item: `${SITE_URL}/#model` },
      { "@type": "ListItem", position: 3, name: model.name, item: `${SITE_URL}/model/${model.id}` },
    ],
  };

  // JSON-LD: FAQPage per model.
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faq.map((item) => ({
      "@type": "Question",
      name: item.q.id,
      acceptedAnswer: { "@type": "Answer", text: item.a.id },
    })),
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <ModelDetail
        model={model}
        detail={detail}
        waHref={waLink(
          `Halo Pusat Geely, saya tertarik dengan ${model.name}. Mohon info harga & promo terbaru.`
        )}
      />
    </PageShell>
  );
}
