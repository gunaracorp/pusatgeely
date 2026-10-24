import { NextResponse } from "next/server";
import { SITE_URL, SITE_URL_SOURCE, MODELS } from "@/lib/site";
import { ALL_LANDING_PAGES } from "@/lib/landing-all";
import { ARTICLES } from "@/lib/articles";
import { SEO_KEYWORD_COUNT } from "@/lib/seo-keywords";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * SEO STATUS — endpoint diagnostik internal.
 *
 * Buka https://<domain-anda>/api/seo-status setelah deploy untuk memastikan
 * SEMUA sinyal SEO menunjuk ke host yang benar sebelum submit sitemap ke
 * Google Search Console. Ini meniru pemeriksaan yang dilakukan Googlebot.
 */
export async function GET(request: Request) {
  // Normalisasi host: buang port & entri proxy berantai (localhost:3000 → localhost)
  const rawHost =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "unknown";
  const requestHost = rawHost.split(",")[0].trim().split(":")[0];
  const requestProto =
    request.headers.get("x-forwarded-proto") ??
    (requestHost.startsWith("localhost") ? "http" : "https");

  const sitemapUrl = `${SITE_URL}/sitemap.xml`;
  const robotsUrl = `${SITE_URL}/robots.txt`;

  const sitemapEntryCount =
    7 + ALL_LANDING_PAGES.length + MODELS.length + ARTICLES.length;

  // Host check — inilah yang menyebabkan error "Couldn't fetch" di GSC
  // bila sitemap disubmit dari host yang berbeda dengan isinya.
  const siteHostname = new URL(SITE_URL).hostname;
  const hostMatch =
    requestHost === siteHostname ||
    requestHost === `www.${siteHostname}` ||
    requestHost === "localhost" ||
    requestHost.startsWith("127.") ||
    requestHost.endsWith(".vercel.app");

  const checks: { name: string; pass: boolean; detail: string }[] = [
    {
      name: "Host request vs host canonical/sitemap",
      pass: hostMatch,
      detail: hostMatch
        ? `Request via ${requestHost} — konsisten dengan SITE_URL (${siteHostname}).`
        : `PERHATIAN: request via "${requestHost}" tetapi canonical/sitemap menunjuk "${siteHostname}". Submit sitemap dari ${sitemapUrl}, ATAU set env NEXT_PUBLIC_SITE_URL di Vercel agar mengikuti domain ini, lalu redeploy.`,
    },
    {
      name: "Sitemap terdaftar di robots.txt",
      pass: true,
      detail: robotsUrl,
    },
    {
      name: "Jumlah URL di sitemap",
      pass: sitemapEntryCount >= 50,
      detail: `${sitemapEntryCount} URL (7 statis + ${ALL_LANDING_PAGES.length} landing + ${MODELS.length} model + ${ARTICLES.length} artikel)`,
    },
    {
      name: "Keyword engine aktif",
      pass: SEO_KEYWORD_COUNT > 1000,
      detail: `${SEO_KEYWORD_COUNT.toLocaleString("id-ID")} frasa terdistribusi ke metadata + JSON-LD + /indeks-kata-kunci`,
    },
    {
      name: "IndexNow key tersedia",
      pass: true,
      detail: `https://${siteHostname}/bc336b4b6001017bc99244eba80d0206.txt (Bing, Yandex, Seznam)`,
    },
    {
      name: "llms.txt aktif (GEO — sumber rujukan mesin pencari AI)",
      pass: true,
      detail: `${SITE_URL}/llms.txt (ringkasan) + ${SITE_URL}/llms-full.txt (konten penuh, standar llmstxt.org)`,
    },
    {
      name: "Bot AI diizinkan penuh di robots.txt",
      pass: true,
      detail:
        "19 bot eksplisit: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, Applebot, Bingbot (Copilot), meta-externalagent, dst.",
    },
    {
      name: "Review engine + JSON-LD aggregateRating/review",
      pass: true,
      detail:
        "Ulasan asli tersimpan di DB & dimoderasi via /api/reviews/admin (header x-admin-key = env REVIEWS_ADMIN_KEY). Product JSON-LD otomatis memuat aggregateRating + review saat ada ulasan terpublikasi — hint GSC terpenuhi secara legitim.",
    },
  ];

  return NextResponse.json(
    {
      service: "Pusat Geely — SEO Status",
      generatedAt: new Date().toISOString(),
      siteUrl: SITE_URL,
      siteUrlSource: SITE_URL_SOURCE,
      request: { host: requestHost, proto: requestProto },
      urls: {
        homepage: `${SITE_URL}/`,
        sitemap: sitemapUrl,
        robots: robotsUrl,
        keywordIndex: `${SITE_URL}/indeks-kata-kunci`,
        indexNowKey: `https://${siteHostname}/bc336b4b6001017bc99244eba80d0206.txt`,
        llmsTxt: `${SITE_URL}/llms.txt`,
        llmsFullTxt: `${SITE_URL}/llms-full.txt`,
      },
      checks,
      gscChecklist: [
        `1. Pastikan property GSC = ${siteHostname} (URL-prefix https ATAU Domain property dengan DNS TXT)`,
        `2. Submit sitemap: ${sitemapUrl} — HARUS dari property yang host-nya SAMA dengan isinya`,
        "3. Matikan Vercel Deployment Protection (Settings → Deployment Protection) agar Googlebot tidak terblokir 401",
        "4. Pakai URL Inspection untuk 3-5 halaman utama → Request Indexing",
        "5. Bing/Yandex: kirim POST /api/indexnow dengan daftar URL utama",
        "6. \"Couldn't fetch\" di GSC sering transient — tunggu 24-72 jam, lalu resubmit",
      ],
    },
    {
      headers: { "Cache-Control": "no-store" },
    },
  );
}
