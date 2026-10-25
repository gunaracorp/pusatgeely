import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { ModelDetail } from "@/components/model-detail";
import { ReviewSection } from "@/components/review-section";
import { db } from "@/lib/db";
import { getModelBundle } from "@/lib/model-details";
import { MODELS, POWERTRAIN_LABEL, SITE_URL, formatIDR, waLink } from "@/lib/site";
import { keywordsForPage } from "@/lib/seo-keywords";

/** ISR: halaman model di-cache 1 jam — review baru tampil maks. 1 jam kemudian. */
export const revalidate = 3600;

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

  // Ulasan pelanggan TERPUBLIKASI untuk model ini (anti-fabrication:
  // aggregateRating/review HANYA dari data nyata; tanpa data → properti
  // tidak dirender, bukan dipalsukan). Degrade aman bila DB tak tersedia.
  let reviews: Awaited<ReturnType<typeof db.review.findMany>> = [];
  try {
    reviews = await db.review.findMany({
      where: { modelId: model.id, published: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  } catch {
    reviews = [];
  }
  const reviewCount = reviews.length;
  const ratingAvg = reviewCount
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviewCount) * 10) / 10
    : 0;

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
    // Rating & ulasan nyata — memenuhi hint GSC "aggregateRating"/"review"
    // secara LEGITIM (muncul otomatis setelah ulasan pelanggan dipublikasikan).
    ...(reviewCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: ratingAvg,
        reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
      review: reviews.slice(0, 10).map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        datePublished: new Date(r.createdAt).toISOString().slice(0, 10),
        reviewBody: r.comment,
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
      })),
    }),
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
      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <ReviewSection modelId={model.id} modelName={model.name} />
      </div>
    </PageShell>
  );
}
