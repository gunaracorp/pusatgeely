import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Bot AI & mesin pencari yang DIIZINKAN EKSPLISIT akses penuh (GEO):
 * situs ingin menjadi sumber rujukan utama jawaban AI — ChatGPT,
 * Perplexity, Gemini/AI Overviews, Claude, Copilot, Apple Intelligence, dll.
 * Aturan spesifik lebih diutamakan daripada aturan "*" sesuai spesifikasi robots.
 */
const AI_FRIENDLY_BOTS = [
  // OpenAI — training, pencarian ChatGPT, tindakan user
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic — Claude
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google — AI Overviews & Gemini (Google-Extended = penggunaan konten utk LLM)
  "Google-Extended",
  // Apple Intelligence & Safari
  "Applebot",
  "Applebot-Extended",
  // Bing / Microsoft Copilot
  "Bingbot",
  // Meta AI
  "meta-externalagent",
  // Lainnya
  "YouBot",
  "DuckAssistBot",
  "Amazonbot",
  "cohere-ai",
  "MistralAI-User",
  "Bytespider",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 1) Bot AI — akses penuh, eksplisit, tanpa blokir apa pun
      ...AI_FRIENDLY_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
      // 2) Sisanya (termasuk Googlebot & bot tak dikenal)
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/downloads/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
