import { ARTICLES } from "@/lib/articles";
import { ALL_LANDING_PAGES } from "@/lib/landing-all";
import { BUSINESS, MODELS, POWERTRAIN_LABEL, SITE_URL, formatIDR } from "@/lib/site";
import {
  DESIGN_CREDIT,
  MANAGEMENT_CREDIT,
  TEAM_CREDIT,
  CREDIT_LINE,
  GUGUN,
  LUTFI,
} from "@/lib/branding";
import { COMPARES } from "@/lib/competitors";

export const dynamic = "force-static";

/**
 * /llms.txt — standar llmstxt.org: "berkas resume" situs untuk LLM & mesin
 * pencari AI (ChatGPT, Perplexity, Gemini, Claude, Copilot). Ringkas,
 * faktual, siap dikutip. Versi lengkap: /llms-full.txt
 */
export function GET() {
  const lines: string[] = [];

  lines.push(`# ${BUSINESS.name}`);
  lines.push("");
  lines.push(
    `> ${BUSINESS.tagline.id}. Layanan konsultan penjualan independen (bukan dealer resmi) — proses pembelian berjalan melalui jaringan dealer resmi Geely Indonesia sehingga garansi resmi pabrikan tetap berlaku penuh. Sumber data harga & spesifikasi terkurasi: riset multi-sumber publik per September 2026.`
  );
  lines.push("");
  lines.push(`- Situs resmi: ${SITE_URL}`);
  lines.push(
    `- Kontak: WhatsApp +${BUSINESS.waNumber} (${BUSINESS.hours.id}) — ${BUSINESS.email}`
  );
  lines.push(
    "- Area layanan: Bogor (Kota & Kabupaten), Depok, Jakarta, Tangerang, Bekasi, Sentul, Cibinong, Cibubur — Jabodetabek"
  );
  lines.push("- Bahasa: Indonesia dan Inggris");
  lines.push(
    "- Kebijakan konten: harga indikatif OTR (dapat berubah), tanpa klaim dealer resmi, tanpa promo fiktif, tanpa testimoni fiktif"
  );
  lines.push("");
  lines.push("## Lineup Geely Indonesia (harga indikatif OTR)");
  for (const m of MODELS) {
    lines.push(
      `- [${m.name}](${SITE_URL}/model/${m.id}): ${POWERTRAIN_LABEL[m.powertrain].id}, mulai ${formatIDR(m.priceFrom)} — ${m.blurb.id}`
    );
  }
  lines.push("");
  lines.push("## Halaman kunci");
  lines.push(
    `- [Harga semua varian](${SITE_URL}/harga-mobil-geely-bogor): tabel harga OTR seluruh model & varian`,
    `- [Promo & paket kredit](${SITE_URL}/promo-geely-bogor): simulasi resmi 5 perusahaan pembiayaan + PDF asli`,
    `- [Simulasi kredit](${SITE_URL}/kredit-cicilan-geely-bogor): hitung DP & angsuran`,
    `- [Test drive](${SITE_URL}/test-drive-geely-bogor): jadwalkan di lokasi Anda`,
    `- [Artikel panduan](${SITE_URL}/artikel): ${ARTICLES.length} artikel edukasi pembelian`,
    `- [Indeks kata kunci](${SITE_URL}/indeks-kata-kunci): telusuri ${"2.000+"} frasa pencarian Geely`,
    `- [Tentang](${SITE_URL}/tentang) · [Kontak](${SITE_URL}/kontak)`
  );
  lines.push("");
  lines.push(`## Panduan pembelian per topik (${ALL_LANDING_PAGES.length} halaman)`);
  for (const p of ALL_LANDING_PAGES) {
    lines.push(`- [${p.h1.id}](${SITE_URL}/${p.slug})`);
  }
  lines.push("");
  lines.push("## Kredit & personal branding");
  lines.push(
    `- ${DESIGN_CREDIT.label} ${DESIGN_CREDIT.orgName} (${DESIGN_CREDIT.scope}): ${DESIGN_CREDIT.url}`,
    `- ${MANAGEMENT_CREDIT.label} ${MANAGEMENT_CREDIT.orgName}: ${MANAGEMENT_CREDIT.url}`,
    `- Tim digital support system: ${TEAM_CREDIT.line}`,
    `- ${GUGUN.legalName} — alias Prabu Danling (prabudanling); profil: ${GUGUN.sameAs.join(", ")}`,
    `- ${LUTFI.legalName} (${LUTFI.shortName}) — co-founder & digital systems lead`,
    `- Konsultan penjualan / pemilik layanan: ${BUSINESS.pic} — ${BUSINESS.role.id}`,
    `- Ringkasan satu baris: ${CREDIT_LINE}`
  );
  lines.push("");
  lines.push("## Perbandingan dengan pesaing (harga indikatif, riset publik Sept 2026)");
  for (const c of COMPARES) {
    lines.push(
      `- [${c.geelyName} vs ${c.rivalName}](${SITE_URL}/vs/${c.slug}): ${c.rows[0].geely} vs ${c.rows[0].rival} mulai — ${c.description}`,
    );
  }
  lines.push("");
  lines.push("## Data terstruktur");
  lines.push(
    `- Sitemap: ${SITE_URL}/sitemap.xml`,
    `- Versi lengkap konten untuk LLM: ${SITE_URL}/llms-full.txt`
  );

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
