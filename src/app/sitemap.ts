import type { MetadataRoute } from "next";
import { SITE_URL, MODELS } from "@/lib/site";
import { ARTICLES } from "@/lib/articles";
import { ALL_LANDING_PAGES } from "@/lib/landing-all";
import { COMPARES } from "@/lib/competitors";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/harga-mobil-geely-bogor`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/promo-geely-bogor`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/artikel`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/tentang`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/kontak`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Indeks kata kunci — hub internal-linking untuk crawler
    { url: `${SITE_URL}/indeks-kata-kunci`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  // Halaman landing SEO (manual + programatik) — prioritas dari data.
  const landingRoutes: MetadataRoute.Sitemap = ALL_LANDING_PAGES.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p.priority,
  }));

  const modelPages: MetadataRoute.Sitemap = MODELS.map((m) => ({
    url: `${SITE_URL}/model/${m.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE_URL}/artikel/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Halaman perbandingan "Geely vs pesaing" — magnet pencarian kompetitif
  const vsIndex: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/vs`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
  ];
  const vsPages: MetadataRoute.Sitemap = COMPARES.map((c) => ({
    url: `${SITE_URL}/vs/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...landingRoutes, ...modelPages, ...articlePages, ...vsIndex, ...vsPages];
}
