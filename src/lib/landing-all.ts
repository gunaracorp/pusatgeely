/**
 * Barrel gabungan halaman landing SEO:
 *  - LANDING_PAGES (8 halaman manual — konten ditulis tangan)
 *  - GENERATED_LANDING_PAGES (36 halaman grid model × area)
 *
 * Konsumen: [landing]/page.tsx, sitemap.ts, indeks-kata-kunci.
 * Route SSG, metadata, dan sitemap mengikuti otomatis.
 */

import { LANDING_PAGES } from "@/lib/landing-pages";
import { GENERATED_LANDING_PAGES } from "@/lib/landing-grid";
import type { LandingPage } from "@/lib/landing-pages";

export const ALL_LANDING_PAGES: LandingPage[] = [
  ...LANDING_PAGES,
  ...GENERATED_LANDING_PAGES,
];

export function findLanding(slug: string): LandingPage | undefined {
  return ALL_LANDING_PAGES.find((p) => p.slug === slug);
}
