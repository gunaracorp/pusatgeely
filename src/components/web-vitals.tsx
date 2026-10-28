"use client";

/**
 * ════════════════════════════════════════════════════════════════════
 *  RUM — Core Web Vitals (LCP, INP, CLS, TTFB, FCP) → dataLayer + GA4
 * ════════════════════════════════════════════════════════════════════
 *
 * Pasang <WebVitals /> sekali di root layout. Setiap metrik dikirim dua arah:
 *  1. `window.dataLayer.push({ event: "web_vitals", webVitalsMetric })` — GTM.
 *  2. `window.gtag("event", <nama metrik>, …)` — GA4 langsung, bila gtag aktif.
 *
 * CLS dikalikan 1000 (GA4 hanya menerima bilangan bulat; 0.08 → 80).
 *
 * Tanpa NEXT_PUBLIC_GA_ID: hanya push ke array lokal — nol beban, nol request,
 * nol error. Aktif otomatis begitu GA di-set di layout.
 */
import { useReportWebVitals } from "next/web-vitals";

/**
 * Tipe Metric diekstrak dari signature useReportWebVitals — type-safe
 * tanpa import internal "next/dist/compiled/web-vitals".
 */
type Metric = Parameters<Parameters<typeof useReportWebVitals>[0]>[0];

/**
 * Augmentasi global minimal — menyatu (interface merging) dengan deklarasi
 * identik di src/lib/analytics.ts; opsional agar aman bila salah satu dihapus.
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function WebVitals(): null {
  useReportWebVitals((metric: Metric) => {
    try {
      // CLS bernilai desimal kecil — dikalikan 1000 agar GA4 (integer) akurat.
      const isCls = metric.name === "CLS";
      const value = Math.round(isCls ? metric.value * 1000 : metric.value);
      const delta = Math.round(isCls ? metric.delta * 1000 : metric.delta);

      // Jalur 1 — dataLayer (GTM-ready).
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "web_vitals",
        webVitalsMetric: {
          name: metric.name,
          id: metric.id,
          value,
          delta,
          rating: metric.rating,
        },
      });

      // Jalur 2 — GA4 langsung (hanya bila script gtag aktif).
      if (typeof window.gtag === "function") {
        window.gtag("event", metric.name, {
          value,
          metric_id: metric.id,
          metric_delta: delta,
          metric_rating: metric.rating,
        });
      }
    } catch {
      // RUM tidak boleh pernah merusak UI — abaikan apa pun yang gagal.
    }
  });

  return null;
}
