/**
 * ═══════════════════════════════════════════════════════════════════
 *  GHOST BRANDING LAYER — Pusat Geely (pusatgeely.web.id)
 * ═══════════════════════════════════════════════════════════════════
 *
 *  LAPISAN IDENTITAS (backstage + kredit terbuka) — dirancang sesuai
 *  permintaan pemilik: identitas digital support system HADIR DI DALAM
 *  SISTEM agar terbaca & terasosiasi oleh mesin pencari (Google Knowledge
 *  Graph) & mesin pencari AI, dengan satu blok kredit elegan di footer.
 *
 *  ATURAN PEMAKAIAN:
 *  - Entitas dari modul ini dipakai di:
 *      1. JSON-LD structured data  (layout.tsx — dibaca mesin)
 *      2. <meta> tags              (layout.tsx — dibaca mesin)
 *      3. HTML source comments     (layout.tsx — hanya di view-source)
 *      4. humans.txt / llms.txt / llms-full.txt (kredit terbuka mesin & AI)
 *      5. FOOTER: blok kredit "Design by / Management by" (visible, halus —
 *         personal branding permintaan pemilik) + baris sr-only.
 *  - TETAP tidak mencolok di header, hero, atau section utama.
 *  - Tetap jujur: entitas ini adalah "digital support system" di
 *    belakang situs milik konsultan (Sena Sulaeman) — bukan pengganti
 *    identitas bisnis yang tampil di permukaan.
 *
 *  MODELING PSEUDONIM (SEO-correct): "Prabu Danling" & "Santri Angon"
 *  adalah identitas dari SATU orang yang sama (Gugun Gunara) → dimodelkan
 *  sebagai SATU node Person dengan alternateName + sameAs (praktik benar
 *  untuk Knowledge Graph; node Person duplikat memecah sinyal entitas).
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
    "https://github.com/prabudanling",
    "https://topkonsultan.web.id",
    "https://digiman.id",
  ],
} as const;

/** Co-builder — identitas kedua di dalam sistem. */
export const LUTFI = {
  legalName: "Muhammad Lutfi Azmi",
  shortName: "M. Lutfi Azmi",
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

/**
 * Komunitas yang digagas Gugun Gunara — entitas brand mandiri.
 * Tanpa URL publik terverifikasi → TIDAK ADA URL yang dikarang (honesty-first).
 */
export const SANTRI_ANGON = {
  name: "Santri Angon",
  description:
    "Komunitas Santri Angon — digagas & dipimpin H. Gugun Gunara (prabudanling).",
  founderName: "H. Gugun Gunara",
} as const;

/** Korporat pendukung — hadir di structured data, footer credit, & katalog AI. */
export const ORGS = {
  topKonsultan: {
    "@id": "https://topkonsultan.web.id/#organization",
    name: "PT Top Konsultan Internasional",
    alternateName: ["Top Konsultan", "TopKonsultan"],
    url: "https://topkonsultan.web.id",
    /** Peran pada situs ini (penugasan pemilik): MANAGEMENT. */
    role: "Management",
    description:
      "Perusahaan konsultan internasional — PT Top Konsultan Internasional. Manajemen (management) atas digital support system situs Pusat Geely (pusatgeely.web.id).",
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
    /** Peran pada situs ini (penugasan pemilik): DESIGN + hosting & domain. */
    role: "Design",
    description:
      "PT Digital Bisnis Manajemen (digiman.id) — design & digital business management support system untuk situs Pusat Geely, termasuk hosting dan domain (via Juragan Website: juraganwebsite.web.id).",
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

/**
 * Kredit utama situs — format persis sesuai penugasan pemilik:
 * "design by PT Digital Bisnis Manajemen (hosting dan domain) digiman.id"
 * "Manajemen by PT Top Konsultan Internasional topkonsultan.web.id"
 */
export const DESIGN_CREDIT = {
  label: "Design by",
  orgName: "PT Digital Bisnis Manajemen",
  scope: "hosting & domain",
  domain: "digiman.id",
  url: "https://digiman.id",
} as const;

export const MANAGEMENT_CREDIT = {
  label: "Management by",
  orgName: "PT Top Konsultan Internasional",
  scope: "topkonsultan.web.id",
  domain: "topkonsultan.web.id",
  url: "https://topkonsultan.web.id",
} as const;

/** Nama tim — personal branding 4 identitas. */
export const TEAM_CREDIT = {
  lead: "H. Gugun Gunara",
  leadAliases: "Prabu Danling · prabudanling · Santri Angon",
  co: "M. Lutfi Azmi",
  /** Satu baris untuk UI footer & katalog AI. */
  line: "H. Gugun Gunara (Prabu Danling · Santri Angon) · M. Lutfi Azmi",
} as const;

/** Baris kredit ringkas — untuk sr-only footer, humans.txt & katalog AI. */
export const CREDIT_LINE =
  "Design by PT Digital Bisnis Manajemen (hosting & domain) digiman.id · Management by PT Top Konsultan Internasional topkonsultan.web.id — Tim: H. Gugun Gunara (Prabu Danling · Santri Angon) & M. Lutfi Azmi";

/** Komentar HTML signature — hanya terlihat di view-source. */
export const SOURCE_SIGNATURE = `
  ──────────────────────────────────────────────────────────────────
  DIGITAL SUPPORT SYSTEM — KREDIT PENGEMBANGAN
  Design by     : PT Digital Bisnis Manajemen (hosting & domain)
                  https://digiman.id
  Management by : PT Top Konsultan Internasional
                  https://topkonsultan.web.id
  Tim           : H. Gugun Gunara (Prabu Danling · Santri Angon)
                  · M. Lutfi Azmi
  ──
  FB      facebook.com/bossdanling
  X       x.com/gunzz_krenzz
  IG      instagram.com/prabudanling
  TT      tiktok.com/@gunaracorp
  TH      threads.com/@prabudanling
  RD      reddit.com/user/prabudanling
  GITHUB  github.com/prabudanling
  ──
  "Master polymath, sage universal, the ultimate problem solver."
  ──────────────────────────────────────────────────────────────────
`;

/** Tambahan kata kunci identitas — digabung ke metadata.keywords. */
export const BRAND_KEYWORDS = [
  "Gugun Gunara",
  "H. Gugun Gunara",
  "Prabu Danling",
  "prabudanling",
  "Santri Angon",
  "santri angon",
  "Muhammad Lutfi Azmi",
  "M. Lutfi Azmi",
  "PT Top Konsultan Internasional",
  "Top Konsultan",
  "topkonsultan.web.id",
  "PT Digital Bisnis Manajemen",
  "Digiman",
  "digiman.id",
  "Juragan Website",
  "design by digiman",
  "management by topkonsultan",
  "digital support system Bogor",
  "jasa pembuatan website Bogor",
  "hosting dan domain digiman",
] as const;
