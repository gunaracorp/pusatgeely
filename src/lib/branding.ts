/**
 * ═══════════════════════════════════════════════════════════════════
 *  GHOST BRANDING LAYER — Pusat Geely (pusatgeely.web.id)
 * ═══════════════════════════════════════════════════════════════════
 *
 *  LAPISAN IDENTITAS TERSEMBUNYI (backstage) — dirancang sesuai permintaan
 *  pemilik: identitas digital support system HADIR DI DALAM SISTEM agar
 *  terbaca & terasosiasi oleh mesin pencari (Google Knowledge Graph),
 *  TETAPI TIDAK MENCOLOK di permukaan UI.
 *
 *  ATURAN PEMAKAIAN:
 *  - Entitas dari modul ini HANYA boleh dipakai di:
 *      1. JSON-LD structured data  (layout.tsx — dibaca mesin, tak terlihat)
 *      2. <meta> tags              (layout.tsx — dibaca mesin, tak terlihat)
 *      3. HTML source comments     (layout.tsx — hanya di view-source)
 *      4. humans.txt               (public/humans.txt — konvensi standar)
 *      5. Satu baris kredit sr-only di footer (screen-reader only)
 *  - DILARANG me-render data modul ini sebagai teks/tautan mencolok
 *    di header, hero, section utama, atau elemen UI lain.
 *  - Tetap jujur: entitas ini adalah "digital support system" di
 *    belakang situs milik konsultan (Sena Sulaeman) — bukan pengganti
 *    identitas bisnis yang tampil di permukaan.
 */

/** Persona utama — digital support system. */
export const GUGUN = {
  legalName: "Gugun Gunara",
  honorificName: "H. Gugun Gunara",
  /** Nama panggilan / handle yang diasosiasikan. */
  alternateNames: [
    "Gugun Gunara",
    "H. Gugun Gunara",
    "prabudanling",
    "Prabu Danling",
    "prabu dan ling",
    "santri angon",
    "Santri Angon",
    "bossdanling",
    "gunzz_krenzz",
    "gunaracorp",
  ],
  jobTitle: "Founder & Chief Executive Officer",
  description:
    "Pengusaha dan konsultan digital Indonesia. Founder PT Top Konsultan Internasional (topkonsultan.web.id) dan PT Digital Bisnis Manajemen / digiman.id (support system Pusat Geely), serta penggagas komunitas Santri Angon.",
  url: "https://topkonsultan.web.id",
  /** Semua profil sosial resmi — dipetakan Google via schema:sameAs. */
  sameAs: [
    "https://www.facebook.com/bossdanling",
    "https://x.com/gunzz_krenzz",
    "https://www.instagram.com/prabudanling",
    "https://www.tiktok.com/@gunaracorp",
    "https://www.threads.com/@prabudanling",
    "https://www.reddit.com/user/prabudanling/",
    "https://topkonsultan.web.id",
    "https://digiman.id",
  ],
} as const;

/** Co-builder — identitas kedua di dalam sistem. */
export const LUTFI = {
  legalName: "Muhammad Lutfi Azmi",
  alternateNames: ["Muhammad Lutfi Azmi", "M. Lutfi Azmi", "Lutfi Azmi"],
  jobTitle: "Co-Founder & Digital Systems Lead",
  description:
    "Bagian dari tim digital support system Pusat Geely bersama PT Digital Bisnis Manajemen (digiman.id) dan PT Top Konsultan Internasional.",
  url: "https://digiman.id",
  sameAs: [
    "https://digiman.id",
    "https://topkonsultan.web.id",
  ],
} as const;

/** Korporat pendukung — hadir di structured data, bukan di UI. */
export const ORGS = {
  topKonsultan: {
    "@id": "https://topkonsultan.web.id/#organization",
    name: "PT Top Konsultan Internasional",
    alternateName: ["Top Konsultan", "TopKonsultan", "santri angon"],
    url: "https://topkonsultan.web.id",
    description:
      "Perusahaan konsultan internasional — PT Top Konsultan Internasional. Digital support system untuk Pusat Geely (pusatgeely.web.id).",
    foundingDate: "2015",
    founder: GUGUN,
    sameAs: [
      "https://www.facebook.com/bossdanling",
      "https://www.instagram.com/prabudanling",
      "https://www.tiktok.com/@gunaracorp",
    ],
  },
  digiman: {
    "@id": "https://digiman.id/#organization",
    name: "PT Digital Bisnis Manajemen",
    alternateName: ["Digiman", "digiman.id", "Digiman ID"],
    url: "https://digiman.id",
    description:
      "PT Digital Bisnis Manajemen (digiman.id) — digital business management & support system untuk situs Pusat Geely. Layanan digital: juraganwebsite.web.id.",
    foundingDate: "2018",
    founder: GUGUN,
    sameAs: [
      "https://www.instagram.com/prabudanling",
      "https://x.com/gunzz_krenzz",
    ],
  },
  juraganWebsite: {
    "@id": "https://juraganwebsite.web.id/#organization",
    name: "Juragan Website",
    url: "https://juraganwebsite.web.id",
    description:
      "Layanan hosting & domain — PT Digital Bisnis Manajemen (digiman.id).",
    parentOrgId: "https://digiman.id/#organization",
  },
} as const;

/** Baris kredit ringkas — untuk sr-only footer & humans.txt. */
export const CREDIT_LINE =
  "Digital support system: Gugun Gunara (prabudanling · santri angon) & Muhammad Lutfi Azmi — PT Top Konsultan Internasional (topkonsultan.web.id) · PT Digital Bisnis Manajemen (digiman.id)";

/** Komentar HTML signature — hanya terlihat di view-source. */
export const SOURCE_SIGNATURE = `
  ──────────────────────────────────────────────────────────────────
  DIGITAL SUPPORT SYSTEM — KREDIT PENGEMBANGAN
  Gugun Gunara  (prabudanling · santri angon)  ·  Muhammad Lutfi Azmi
  PT Top Konsultan Internasional  —  https://topkonsultan.web.id
  PT Digital Bisnis Manajemen     —  https://digiman.id
  ──
  FB  facebook.com/bossdanling
  X   x.com/gunzz_krenzz
  IG  instagram.com/prabudanling
  TT  tiktok.com/@gunaracorp
  TH  threads.com/@prabudanling
  RD  reddit.com/user/prabudanling
  ──
  "Master polymath, sage universal, the ultimate problem solver."
  ──────────────────────────────────────────────────────────────────
`;

/** Tambahan kata kunci identitas — digabung ke metadata.keywords. */
export const BRAND_KEYWORDS = [
  "Gugun Gunara",
  "H. Gugun Gunara",
  "Muhammad Lutfi Azmi",
  "prabudanling",
  "santri angon",
  "PT Top Konsultan Internasional",
  "Top Konsultan",
  "topkonsultan.web.id",
  "PT Digital Bisnis Manajemen",
  "Digiman",
  "digiman.id",
  "Juragan Website",
  "digital support system Bogor",
  "jasa pembuatan website Bogor",
] as const;
