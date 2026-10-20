import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { ArticleView } from "@/components/article-view";
import { ARTICLES, getArticle } from "@/lib/articles";
import { SITE_URL, BUSINESS } from "@/lib/site";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title.id,
    description: article.excerpt.id,
    alternates: {
      canonical: `${SITE_URL}/artikel/${article.slug}`,
      languages: {
        "id-ID": `${SITE_URL}/artikel/${article.slug}`,
        en: `${SITE_URL}/artikel/${article.slug}`,
      },
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/artikel/${article.slug}`,
      title: article.title.id,
      description: article.excerpt.id,
      publishedTime: article.date,
      authors: [BUSINESS.pic],
      images: [{ url: article.image, width: 1200, height: 675, alt: article.title.id }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title.id,
      description: article.excerpt.id,
      images: [article.image],
    },
  };
}

export default async function ArtikelDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/artikel/${article.slug}#article`,
    headline: article.title.id,
    description: article.excerpt.id,
    image: `${SITE_URL}${article.image}`,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "id-ID",
    author: {
      "@type": "Person",
      name: BUSINESS.pic,
      jobTitle: BUSINESS.role.id,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/artikel/${article.slug}`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Artikel", item: `${SITE_URL}/artikel` },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title.id,
        item: `${SITE_URL}/artikel/${article.slug}`,
      },
    ],
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <ArticleView slug={article.slug} />
    </PageShell>
  );
}
