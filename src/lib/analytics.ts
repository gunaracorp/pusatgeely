/**
 * ═══════════════════════════════════════════════════════════════════
 *  Event konversi Pusat Geely — dataLayer push (GA4-ready, tanpa dependensi)
 * ═══════════════════════════════════════════════════════════════════
 *
 * Semua event dikirim dengan dua jalur sekaligus:
 *  1. `window.dataLayer.push({ event, ...params })` — kompatibel GTM.
 *  2. `window.gtag?.("event", name, params)` — diteruskan ke GA4 bila
 *     script gtag aktif (env-gated via NEXT_PUBLIC_GA_ID di layout.tsx,
 *     yang sudah menginisialisasi `window.dataLayer`).
 *
 * Tanpa env → event hanya masuk array lokal: nol beban, nol script
 * pihak ketiga, dan TIDAK PERNAH melempar error ke UI.
 */

/** Parameter event — nilai primitif saja (format parameter GA4). */
export type AnalyticsParams = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Push satu event konversi ke dataLayer + gtag.
 * Aman dipanggil di mana saja (SSR no-op); error ditelan diam-diam —
 * analitik tidak boleh pernah merusak UX.
 */
export function trackEvent(name: string, params?: AnalyticsParams): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
    window.gtag?.("event", name, params);
  } catch {
    // Analitik tidak boleh pernah merusak UX — abaikan apa pun yang gagal.
  }
}
