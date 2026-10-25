/**
 * PUSAT GEELY — Single source of truth untuk data bisnis & produk.
 *
 * ATURAN DATA (anti-fabrication):
 * - Harga & spesifikasi HANYA dari riset multi-sumber publik (stamp: September 2026).
 * - Semua harga ditampilkan sebagai "indikatif" + wajib disclaimer.
 * - TIDAK ADA: klaim dealer resmi, promo fiktif, testimoni fiktif, alamat fiktif.
 */

/**
 * ══ RESOLUSI DOMAIN SITE (SEO-critical) ══
 *
 * Canonical, sitemap, JSON-LD, dan OG image WAJIB menunjuk ke host yang
 * SAMA dengan domain yang diakses crawler. Kalau tidak, Google Search
 * Console menolak sitemap ("Kami mengalami error saat mencoba mengakses
 * peta situs") karena URL di dalamnya berada di host berbeda.
 *
 * Prioritas:
 * 1. NEXT_PUBLIC_SITE_URL          — set manual di Vercel → Settings → Environment Variables
 *                                    (mis. https://pusatgeely.web.id saat domain kustom aktif)
 * 2. VERCEL_PROJECT_PRODUCTION_URL — otomatis tersedia di Vercel (mis. pusatgeely.vercel.app)
 * 3. VERCEL_URL                    — fallback per-deployment preview Vercel
 * 4. https://pusatgeely.web.id     — domain produksi (default)
 */
function normalizeSiteUrl(raw: string): string {
  let url = raw.trim().replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  return url;
}

function resolveSiteUrl(): { url: string; source: "env" | "vercel" | "fallback" } {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl) return { url: normalizeSiteUrl(envUrl), source: "env" };

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) return { url: normalizeSiteUrl(vercelProd), source: "vercel" };

  const vercelAny = process.env.VERCEL_URL?.trim();
  if (vercelAny) return { url: normalizeSiteUrl(vercelAny), source: "vercel" };

  return { url: "https://pusatgeely.web.id", source: "fallback" };
}

const resolvedSite = resolveSiteUrl();

/** Base URL produksi situs (tanpa trailing slash) — sumber canonical/sitemap. */
export const SITE_URL = resolvedSite.url;

/** Asal nilai SITE_URL — dipakai /api/seo-status untuk diagnostik deploy. */
export const SITE_URL_SOURCE = resolvedSite.source;

export const BUSINESS = {
  name: "Pusat Geely",
  tagline: {
    id: "Partner pembelian Geely Anda di Bogor & Jabodetabek",
    en: "Your Geely purchase partner in Bogor & Greater Jakarta",
  },
  pic: "Sena Sulaeman",
  role: {
    id: "Konsultan Penjualan",
    en: "Sales Consultant",
  },
  waNumber: "62816611142",
  waDisplay: "+62 816-6111-42",
  email: "pusatgeely@gmail.com",
  instagram: "@salesconsultant1972",
  instagramUrl: "https://instagram.com/salesconsultant1972",
  facebook: "Eman Sulaeman",
  facebookUrl: "https://www.facebook.com/100008079428678",
  tiktok: "@eman.sulaeman0839",
  tiktokUrl: "https://www.tiktok.com/@eman.sulaeman0839",
  xHandle: "@EmanSulaem79261",
  xUrl: "https://x.com/EmanSulaem79261",
  hours: {
    id: "Setiap hari • 08.00–20.00 WIB",
    en: "Every day • 08:00–20:00 WIB",
  },
  region: {
    id: "Bogor & Jabodetabek",
    en: "Bogor & Jabodetabek",
  },
} as const;

/** Build WhatsApp deep-link with prefilled message. */
export function waLink(text: string): string {
  return `https://wa.me/${BUSINESS.waNumber}?text=${encodeURIComponent(text)}`;
}

export type Powertrain = "ev" | "phev" | "ice";

export interface ModelVariant {
  label: string;
  /** Indicative OTR price in IDR (public research, Sep 2026). */
  price: number;
}

export interface CarModel {
  id: string;
  name: string;
  powertrain: Powertrain;
  image: string;
  priceFrom: number;
  variants: ModelVariant[];
  /** 3 key spec chips — verified figures only. */
  specs: { id: string; en: string }[];
  blurb: { id: string; en: string };
  badge?: { id: string; en: string };
  /** Real unit colors, photographed by the owner. EX5 names are printed on the
   *  source photos (auto-show signage); EX2 uses plain visible-color words. */
  colors?: ModelColor[];
  /** True when no real photo exists yet — the visual is a generated
   *  illustration and MUST be labeled as such on the card. */
  illustrative?: boolean;
}

export interface ModelColor {
  label: { id: string; en: string };
  /** CSS hex for the swatch dot. */
  swatch: string;
  image: string;
}

export const MODELS: CarModel[] = [
  {
    id: "ex5",
    name: "GEELY EX5",
    powertrain: "ev",
    image: "/images/unit-ex5-snowy.webp",
    priceFrom: 465_000_000,
    colors: [
      {
        label: { id: "Snowy White", en: "Snowy White" },
        swatch: "#eef0f0",
        image: "/images/unit-ex5-snowy.webp",
      },
      {
        label: { id: "Carbon Black", en: "Carbon Black" },
        swatch: "#0e1116",
        image: "/images/unit-ex5-carbon.webp",
      },
      {
        label: { id: "Frost Grey", en: "Frost Grey" },
        swatch: "#585f66",
        image: "/images/unit-ex5-frost.webp",
      },
    ],
    variants: [
      { label: "Pro", price: 465_000_000 },
      { label: "Max", price: 505_000_000 },
    ],
    specs: [
      { id: "Listrik • 60,22 kWh", en: "Electric • 60.22 kWh" },
      { id: "Range hingga 495 km", en: "Range up to 495 km" },
      { id: "Tenaga ±218 hp", en: "Power ±218 hp" },
    ],
    blurb: {
      id: "SUV listrik andalan — kabin senyap, jangkauan jauh, dan fitur keterhubungan modern untuk keluarga aktif.",
      en: "Flagship electric SUV — quiet cabin, long range, and modern connectivity for active families.",
    },
  },
  {
    id: "starray",
    name: "GEELY STARRAY EM-i",
    powertrain: "phev",
    image: "/images/model-starray.webp",
    priceFrom: 499_000_000,
    illustrative: true,
    variants: [{ label: "EM-i", price: 499_000_000 }],
    specs: [
      { id: "PHEV • 1.5L + listrik", en: "PHEV • 1.5L + electric" },
      { id: "Kombinasi hingga 1.000 km", en: "Combined up to 1,000 km" },
      { id: "Sistem ±262 hp", en: "System ±262 hp" },
    ],
    blurb: {
      id: "SUV super hybrid keluarga — efisiensi bahan bakar tinggi dengan kabin lega untuk perjalanan Bogor–Jakarta harian maupun jauh.",
      en: "Family super-hybrid SUV — outstanding fuel efficiency with a spacious cabin for daily Bogor–Jakarta runs and long trips.",
    },
  },
  {
    id: "coolray",
    name: "GEELY COOLRAY",
    powertrain: "ice",
    image: "/images/unit-coolray.webp",
    priceFrom: 333_000_000,
    variants: [
      { label: "Standard", price: 333_000_000 },
      { label: "Flagship", price: 377_000_000 },
    ],
    specs: [
      { id: "1.5L Turbo • 174 PS", en: "1.5L Turbo • 174 PS" },
      { id: "290 Nm • Transmisi 7DCT", en: "290 Nm • 7DCT gearbox" },
      { id: "Crossover sporty", en: "Sporty crossover" },
    ],
    blurb: {
      id: "Crossover turbo favorit — respons gesit di perkotaan dengan karakter berkendara yang menyenangkan.",
      en: "The crowd-favorite turbo crossover — agile in the city with a genuinely fun driving character.",
    },
    badge: {
      id: "Terlaris",
      en: "Best Seller",
    },
  },
  {
    id: "ex2",
    name: "GEELY EX2",
    powertrain: "ev",
    image: "/images/unit-ex2-putih.webp",
    priceFrom: 239_900_000,
    colors: [
      {
        label: { id: "Putih", en: "White" },
        swatch: "#f2f1ec",
        image: "/images/unit-ex2-putih.webp",
      },
      {
        label: { id: "Krem", en: "Cream" },
        swatch: "#e9e0cd",
        image: "/images/unit-ex2-krem.webp",
      },
      {
        label: { id: "Hijau", en: "Green" },
        swatch: "#aebf9d",
        image: "/images/unit-ex2-hijau.webp",
      },
    ],
    variants: [
      { label: "Pro", price: 239_900_000 },
      { label: "Max", price: 269_900_000 },
    ],
    specs: [
      { id: "Listrik • ±40 kWh", en: "Electric • ±40 kWh" },
      { id: "Range ±398 km", en: "Range ±398 km" },
      { id: "116 PS • Frunk", en: "116 PS • Frunk" },
    ],
    blurb: {
      id: "Hatchback listrik lincah untuk kota — praktis, efisien, dan nyaman menembus lalu lintas Bogor–Jakarta.",
      en: "Agile electric hatchback for the city — practical, efficient, and comfortable in Bogor–Jakarta traffic.",
    },
  },
];

export const POWERTRAIN_LABEL: Record<Powertrain, { id: string; en: string }> = {
  ev: { id: "Listrik", en: "Electric" },
  phev: { id: "Hybrid (PHEV)", en: "Hybrid (PHEV)" },
  ice: { id: "Bensin Turbo", en: "Petrol Turbo" },
};

export const AREAS = [
  "Bogor Kota",
  "Kabupaten Bogor",
  "Depok",
  "Jakarta",
  "Tangerang",
  "Bekasi",
  "Sentul",
  "Cibinong",
  "Cibubur",
  "BSD",
] as const;

export const INTERESTS = [
  "test-drive",
  "price",
  "financing",
  "trade-in",
  "general",
] as const;

export type Interest = (typeof INTERESTS)[number];

/** Format IDR price, e.g. "Rp 465.000.000". */
export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Compact price like "Rp 465 jt" for cards. */
export function formatJuta(value: number): string {
  const jt = value / 1_000_000;
  const rounded = Number.isInteger(jt) ? jt.toString() : jt.toFixed(1).replace(".", ",");
  return `Rp ${rounded} jt`;
}

export const PRICE_DISCLAIMER = {
  id: "*Harga indikatif OTR berdasarkan riset sumber publik per September 2026. Harga final dapat berubah — konfirmasi via WhatsApp untuk penawaran terbaru.",
  en: "*Indicative on-the-road prices based on public-source research as of September 2026. Final prices may change — confirm via WhatsApp for the latest offer.",
} as const;

export const INDEPENDENCE_DISCLAIMER = {
  id: "Pusat Geely adalah layanan konsultan penjualan independen untuk kendaraan Geely di Bogor & Jabodetabek. Kami bukan bagian dari, dan tidak berafiliasi dengan, PT Geely Mobil Indonesia maupun Geely Holding. Proses pembelian, garansi, dan purna jual dijalankan melalui jaringan dealer resmi Geely Indonesia sesuai ketentuan pabrikan. Nama Geely serta nama model adalah merek dagang milik pemiliknya masing-masing.",
  en: "Pusat Geely is an independent car-sales consulting service for Geely vehicles in Bogor & Jabodetabek. We are not part of, and not affiliated with, PT Geely Mobil Indonesia or Geely Holding. Purchase, warranty, and after-sales processes are carried out through Geely Indonesia's official dealer network under the manufacturer's terms. Geely and model names are trademarks of their respective owners.",
} as const;

/** Local-SEO tags (owner-provided) — used in metadata keywords & JSON-LD. */
export const SEO_TAGS = [
  "showroom geely bogor",
  "dealer geely bogor",
  "promo geely bogor",
  "harga geely bogor",
  "dealer mobil geely",
  "showroom mobil geely",
  "info geely",
  "geely jabodetabek",
] as const;

/**
 * Popular-search chips for the footer — keyword-rich internal links,
 * each pointing to its most relevant section. Diperluas: mencakup grid
 * landing programatik (model × area). Indeks lengkap 2.600+ frasa ada
 * di /indeks-kata-kunci.
 */
export const POPULAR_SEARCHES: { label: string; href: string }[] = [
  { label: "sales geely bogor", href: "/sales-geely-bogor" },
  { label: "showroom geely bogor", href: "/sales-geely-bogor" },
  { label: "dealer geely bogor", href: "/harga-mobil-geely-bogor" },
  { label: "promo geely bogor", href: "/promo-geely-bogor" },
  { label: "harga geely bogor", href: "/harga-mobil-geely-bogor" },
  { label: "kredit mobil geely", href: "/kredit-cicilan-geely-bogor" },
  { label: "test drive geely bogor", href: "/test-drive-geely-bogor" },
  { label: "mobil listrik geely", href: "/mobil-listrik-geely-bogor" },
  { label: "showroom mobil geely", href: "/model/ex5" },
  { label: "info geely", href: "/artikel" },
  { label: "geely jabodetabek", href: "/#wilayah" },
  // Grid programatik — model × area
  { label: "geely ex5 jakarta", href: "/geely-ex5-jakarta" },
  { label: "geely ex5 depok", href: "/geely-ex5-depok" },
  { label: "geely ex5 tangerang", href: "/geely-ex5-tangerang" },
  { label: "geely ex5 bekasi", href: "/geely-ex5-bekasi" },
  { label: "geely ex5 sentul", href: "/geely-ex5-sentul" },
  { label: "geely ex5 cibinong", href: "/geely-ex5-cibinong" },
  { label: "geely ex5 bsd", href: "/geely-ex5-bsd" },
  { label: "geely starray jakarta", href: "/geely-starray-emi-jakarta" },
  { label: "geely starray bekasi", href: "/geely-starray-emi-bekasi" },
  { label: "geely starray depok", href: "/geely-starray-emi-depok" },
  { label: "geely coolray jakarta", href: "/geely-coolray-jakarta" },
  { label: "geely coolray bekasi", href: "/geely-coolray-bekasi" },
  { label: "geely coolray tangerang", href: "/geely-coolray-tangerang" },
  { label: "geely coolray depok", href: "/geely-coolray-depok" },
  { label: "geely ex2 jakarta", href: "/geely-ex2-jakarta" },
  { label: "geely ex2 depok", href: "/geely-ex2-depok" },
  { label: "geely ex2 bekasi", href: "/geely-ex2-bekasi" },
  { label: "geely ex2 tangerang", href: "/geely-ex2-tangerang" },
  { label: "geely sentul", href: "/geely-ex5-sentul" },
  { label: "geely cibubur", href: "/geely-ex5-cibubur" },
  { label: "geely kabupaten bogor", href: "/geely-ex5-kabupaten-bogor" },
  { label: "harga geely ex5", href: "/harga-mobil-geely-bogor" },
  { label: "harga geely ex2", href: "/harga-mobil-geely-bogor" },
  { label: "harga geely coolray", href: "/harga-mobil-geely-bogor" },
  { label: "harga geely starray em-i", href: "/harga-mobil-geely-bogor" },
  { label: "cicilan geely ex5", href: "/kredit-cicilan-geely-bogor" },
  { label: "DP geely ex2", href: "/kredit-cicilan-geely-bogor" },
  { label: "leasing geely bogor", href: "/kredit-cicilan-geely-bogor" },
  { label: "trade-in geely", href: "/sales-geely-bogor" },
  { label: "agen geely terdekat", href: "/sales-geely-bogor" },
  // Halaman perbandingan "vs" — pencarian kompetitif volume tinggi
  { label: "geely ex5 vs atto 3", href: "/vs/geely-ex5-vs-byd-atto-3" },
  { label: "geely ex2 vs dolphin", href: "/vs/geely-ex2-vs-byd-dolphin" },
  { label: "coolray vs hrv", href: "/vs/geely-coolray-vs-honda-hr-v" },
  { label: "starray vs corolla cross", href: "/vs/geely-starray-emi-vs-toyota-corolla-cross" },
  { label: "mobil listrik jakarta", href: "/mobil-listrik-geely-bogor" },
  { label: "suv listrik bogor", href: "/mobil-listrik-geely-bogor" },
  { label: "indeks kata kunci geely", href: "/indeks-kata-kunci" },
] as const;

export interface GalleryItem {
  src: string;
  alt: { id: string; en: string };
  caption: { id: string; en: string };
}

/**
 * Real unit photos (owner-provided). Captions only state what is
 * verifiable in the photo — no fabricated claims.
 */
export const GALLERY_UNITS: GalleryItem[] = [
  {
    src: "/images/unit-ex5-snowy.webp",
    alt: {
      id: "GEELY EX5 berwarna Snowy White",
      en: "GEELY EX5 in Snowy White",
    },
    caption: {
      id: "GEELY EX5 — Snowy White",
      en: "GEELY EX5 — Snowy White",
    },
  },
  {
    src: "/images/unit-ex5-carbon.webp",
    alt: {
      id: "GEELY EX5 berwarna Carbon Black, tampak belakang",
      en: "GEELY EX5 in Carbon Black, rear view",
    },
    caption: {
      id: "GEELY EX5 — Carbon Black",
      en: "GEELY EX5 — Carbon Black",
    },
  },
  {
    src: "/images/unit-ex5-frost.webp",
    alt: {
      id: "GEELY EX5 berwarna Frost Grey",
      en: "GEELY EX5 in Frost Grey",
    },
    caption: {
      id: "GEELY EX5 — Frost Grey",
      en: "GEELY EX5 — Frost Grey",
    },
  },
  {
    src: "/images/unit-coolray.webp",
    alt: {
      id: "GEELY Coolray merah, tampilan depan",
      en: "Red GEELY Coolray, front view",
    },
    caption: {
      id: "GEELY Coolray — warna merah",
      en: "GEELY Coolray — red",
    },
  },
  {
    src: "/images/unit-ex2-putih.webp",
    alt: {
      id: "GEELY EX2 putih di ruang pamer",
      en: "White GEELY EX2 in the showroom",
    },
    caption: {
      id: "GEELY EX2 — di ruang pamer",
      en: "GEELY EX2 — in the showroom",
    },
  },
  {
    src: "/images/unit-ex2-krem.webp",
    alt: {
      id: "GEELY EX2 warna krem, tampilan depan",
      en: "Cream GEELY EX2, front view",
    },
    caption: {
      id: "GEELY EX2 krem — tampilan depan",
      en: "Cream GEELY EX2 — front view",
    },
  },
  {
    src: "/images/unit-ex2-krem-belakang.webp",
    alt: {
      id: "GEELY EX2 warna krem, tampilan belakang tiga per empat",
      en: "Cream GEELY EX2, rear three-quarter view",
    },
    caption: {
      id: "GEELY EX2 krem — tampak belakang",
      en: "Cream GEELY EX2 — rear three-quarter",
    },
  },
  {
    src: "/images/unit-ex2-belakang.webp",
    alt: {
      id: "GEELY EX2 warna krem, tampilan belakang",
      en: "Cream GEELY EX2, rear view",
    },
    caption: {
      id: "GEELY EX2 krem — tampilan belakang",
      en: "Cream GEELY EX2 — rear view",
    },
  },
  {
    src: "/images/unit-ex2-hijau.webp",
    alt: {
      id: "GEELY EX2 warna hijau terhubung ke home charging",
      en: "Green GEELY EX2 connected to a home charger",
    },
    caption: {
      id: "GEELY EX2 hijau — terhubung home charging",
      en: "Green GEELY EX2 — home charging",
    },
  },
];

/**
 * Real handover documentation photos (provided by the owner, published
 * with customer permission). Captions only state what is verifiable
 * in the photo — no fabricated claims.
 */
export const GALLERY: GalleryItem[] = [
  {
    src: "/images/galeri-1.webp",
    alt: {
      id: "Pelanggan berfoto bersama konsultan di samping GEELY EX5",
      en: "Customer photographed with the consultant next to a GEELY EX5",
    },
    caption: {
      id: "Deal GEELY EX5 — foto bersama pelanggan",
      en: "GEELY EX5 deal — photo with the customer",
    },
  },
  {
    src: "/images/galeri-2.webp",
    alt: {
      id: "Kesepakatan pembelian di booth Geely",
      en: "Purchase deal at a Geely booth",
    },
    caption: {
      id: "Kesepakatan pembelian di booth Geely",
      en: "Purchase deal at a Geely booth",
    },
  },
  {
    src: "/images/galeri-3.webp",
    alt: {
      id: "Penyerahan unit di carport rumah pelanggan",
      en: "Vehicle handover at the customer's carport",
    },
    caption: {
      id: "Penyerahan unit di rumah pelanggan",
      en: "Vehicle handover at the customer's home",
    },
  },
  {
    src: "/images/galeri-4.webp",
    alt: {
      id: "Dokumentasi delivery Geely — Thank You for Choosing GEELY",
      en: "Geely delivery documentation — Thank You for Choosing GEELY",
    },
    caption: {
      id: "Delivery Geely — Thank You for Choosing GEELY",
      en: "Geely delivery — Thank You for Choosing GEELY",
    },
  },
  {
    src: "/images/galeri-5.webp",
    alt: {
      id: "Serah terima paket home charging GEELY EX5",
      en: "GEELY EX5 home-charging kit handover",
    },
    caption: {
      id: "Serah terima home charging — GEELY EX5",
      en: "Home-charging handover — GEELY EX5",
    },
  },
  {
    src: "/images/galeri-6.webp",
    alt: {
      id: "Serah terima kunci dan dokumen GEELY EX5",
      en: "GEELY EX5 key and document handover",
    },
    caption: {
      id: "Serah terima kunci & dokumen — GEELY EX5",
      en: "Key & document handover — GEELY EX5",
    },
  },
  {
    src: "/images/galeri-7.webp",
    alt: {
      id: "GEELY EX5 tampak belakang",
      en: "GEELY EX5 rear view",
    },
    caption: {
      id: "GEELY EX5 — eksterior belakang",
      en: "GEELY EX5 — rear exterior",
    },
  },
  {
    src: "/images/galeri-8.webp",
    alt: {
      id: "GEELY Coolray merah di showroom",
      en: "Red GEELY Coolray in the showroom",
    },
    caption: {
      id: "GEELY Coolray di showroom",
      en: "GEELY Coolray in the showroom",
    },
  },
  {
    src: "/images/galeri-9.webp",
    alt: {
      id: "GEELY EX5 tampak belakang tiga per empat",
      en: "GEELY EX5 rear three-quarter view",
    },
    caption: {
      id: "GEELY EX5 — tampilan belakang",
      en: "GEELY EX5 — rear three-quarter",
    },
  },
];
