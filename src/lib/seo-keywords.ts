/**
 * ═══════════════════════════════════════════════════════════════════
 *  SEO KEYWORD ENGINE — Pusat Geely (pusatgeely.web.id)
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Mesin kata kunci deterministik: menggabungkan MODEL × NIAT × AREA
 *  menjadi ribuan frasa pencarian nyata (long-tail) yang orang Indonesia
 *  ketik di Google & Bing — setiap frasa dipetakan ke halaman paling
 *  relevan (internal linking = amunisi ranking sesungguhnya).
 *
 *  PRINSIP ANTI-SPAM:
 *  - Tidak ada frasa fiktif / model yang tidak dijual (anti-fabrication).
 *  - Setiap kata kunci SELALU menunjuk ke halaman nyata yang menjawabnya.
 *  - Distribusi per halaman: tiap halaman hanya menerima klaster yang
 *    relevan (keywordsForPage) — tidak menempel semua kata kunci ke
 *    semua halaman.
 *
 *  Semua generasi DETERMINISTIK (tanpa Math.random) agar hasil build
 *  SSG stabil dan sitemap/kata kunci identik antar deploy.
 */

import { MODELS } from "@/lib/site";

export interface KeywordItem {
  /** Frasa pencarian lengkap. */
  t: string;
  /** Route tujuan (halaman nyata yang menjawab frasa ini). */
  h: string;
}

export interface KeywordCluster {
  id: string;
  label: string;
  items: KeywordItem[];
}

/* ── Bahan baku ─────────────────────────────────────────────────── */

/** Model + sebutan populer masyarakat Indonesia. */
const MODEL_TERMS: { id: string; display: string; alias: string[] }[] = [
  { id: "ex5", display: "Geely EX5", alias: ["EX5", "Geely EX 5"] },
  { id: "ex2", display: "Geely EX2", alias: ["EX2", "Geely EX 2"] },
  { id: "starray", display: "Geely Starray EM-i", alias: ["Starray", "Starray EMi", "Starrary EM-i"] },
  { id: "coolray", display: "Geely Coolray", alias: ["Coolray", "Cool Ray"] },
];

/** Area layanan — nama sehari-hari yang diketik orang. */
const AREA_TERMS = [
  "Bogor", "Kota Bogor", "Kabupaten Bogor", "Depok", "Jakarta",
  "Tangerang", "Tangerang Selatan", "Bekasi", "Jabodetabek",
  "Sentul", "Cibinong", "Cibubur", "BSD", "Ciawi", "Caringin",
  "Dramaga", "Citeureup", "Sukaraja", "Kemang", "Bojonggede",
  "Parung", "Leuwiliang", "Gunung Sindur", "Cisarua", "Megamendung",
] as const;

/** Area yang punya halaman landing model khusus (lihat landing-grid.ts). */
const AREA_WITH_PAGE = new Set([
  "jakarta", "depok", "tangerang", "bekasi", "sentul",
  "cibinong", "cibubur", "bsd", "kabupaten bogor",
]);

/** Peta slug area → akhir slug landing. */
const AREA_SLUG: Record<string, string> = {
  "jakarta": "jakarta",
  "depok": "depok",
  "tangerang": "tangerang",
  "bekasi": "bekasi",
  "sentul": "sentul",
  "cibinong": "cibinong",
  "cibubur": "cibubur",
  "bsd": "bsd",
  "kabupaten bogor": "kabupaten-bogor",
};

/** Niat pencari (buyer intent) — 20 frasa inti. */
const INTENTS = [
  "harga", "promo", "diskon", "kredit", "cicilan", "DP", "uang muka",
  "leasing", "pembiayaan", "simulasi kredit", "test drive", "trade-in",
  "tukar tambah", "dealer", "showroom", "sales", "agen", "spesifikasi",
  "warna", "review",
] as const;

/** Peta intent → halaman landing intent. */
const INTENT_HREF: Record<string, string> = {
  "harga": "/harga-mobil-geely-bogor",
  "promo": "/promo-geely-bogor",
  "diskon": "/promo-geely-bogor",
  "kredit": "/kredit-cicilan-geely-bogor",
  "cicilan": "/kredit-cicilan-geely-bogor",
  "DP": "/kredit-cicilan-geely-bogor",
  "uang muka": "/kredit-cicilan-geely-bogor",
  "leasing": "/kredit-cicilan-geely-bogor",
  "pembiayaan": "/kredit-cicilan-geely-bogor",
  "simulasi kredit": "/kredit-cicilan-geely-bogor",
  "test drive": "/test-drive-geely-bogor",
  "trade-in": "/sales-geely-bogor",
  "tukar tambah": "/sales-geely-bogor",
  "dealer": "/sales-geely-bogor",
  "showroom": "/sales-geely-bogor",
  "sales": "/sales-geely-bogor",
  "agen": "/sales-geely-bogor",
};

/** Modifikator tahun & keadaan — memperkaya frasa long-tail. */
const YEAR_MODS = ["2026", "terbaru", "hari ini", "OTR"] as const;

/** Tipe transmisi/energi — klaster kendaraan listrik & hybrid. */
const EV_TERMS = [
  "mobil listrik", "mobil listrik terbaik", "SUV listrik", "mobil EV",
  "EV Indonesia", "mobil listrik murah", "home charging", "baterai mobil listrik",
  "mobil hybrid", "super hybrid", "mobil PHEV", "hemat bahan bakar",
] as const;

/** Pertanyaan alami (natural language) yang diketik di Google. */
function questionTemplates(): KeywordItem[] {
  const q: KeywordItem[] = [];
  const push = (t: string, h: string) => q.push({ t, h });

  for (const m of MODEL_TERMS) {
    const modelHref = `/model/${m.id}`;
    push(`berapa harga ${m.display.toLowerCase()}`, "/harga-mobil-geely-bogor");
    push(`harga ${m.display.toLowerCase()} 2026`, "/harga-mobil-geely-bogor");
    push(`apakah ${m.display.toLowerCase()} layak dibeli`, modelHref);
    push(`review ${m.display.toLowerCase()} indonesia`, modelHref);
    push(`kelebihan dan kekurangan ${m.display.toLowerCase()}`, modelHref);
    push(`spesifikasi lengkap ${m.display.toLowerCase()}`, modelHref);
    push(`dimana beli ${m.display.toLowerCase()} di bogor`, "/sales-geely-bogor");
    push(`cara kredit ${m.display.toLowerCase()}`, "/kredit-cicilan-geely-bogor");
    push(`cicilan ${m.display.toLowerCase()} berapa per bulan`, "/kredit-cicilan-geely-bogor");
    push(`DP ${m.display.toLowerCase()} berapa persen`, "/kredit-cicilan-geely-bogor");
    push(`test drive ${m.display.toLowerCase()} gratis`, "/test-drive-geely-bogor");
    push(`bisa trade-in ${m.display.toLowerCase()}`, "/sales-geely-bogor");
    push(`warna ${m.display.toLowerCase()}`, modelHref);
    push(`promo ${m.display.toLowerCase()} bulan ini`, "/promo-geely-bogor");
    push(`${m.display.toLowerCase()} vs kompetitor`, modelHref);
    push(`apakah ${m.display.toLowerCase()} bisa diisi charger rumah`, modelHref);
    push(`garansi ${m.display.toLowerCase()} berapa lama`, "/artikel");
    push(`biaya servis ${m.display.toLowerCase()}`, "/artikel");
    push(`${m.display.toLowerCase()} untuk keluarga cocok tidak`, modelHref);
    push(`booking ${m.display.toLowerCase()} via whatsapp`, "/kontak");
  }

  // Pertanyaan umum tanpa model
  const generic: [string, string][] = [
    ["berapa harga mobil geely terbaru", "/harga-mobil-geely-bogor"],
    ["mobil geely apa saja yang dijual di indonesia", "/harga-mobil-geely-bogor"],
    ["mobil listrik geely bagus tidak", "/mobil-listrik-geely-bogor"],
    ["apakah geely dealer resmi ada di bogor", "/sales-geely-bogor"],
    ["geely vs byd mana yang lebih baik", "/harga-mobil-geely-bogor"],
    ["geely vs wuling mana yang lebih bagus", "/harga-mobil-geely-bogor"],
    ["mobil listrik range jauh untuk keluarga", "/mobil-listrik-geely-bogor"],
    ["cara hitung cicilan mobil dp 20 persen", "/kredit-cicilan-geely-bogor"],
    ["syarat kredit mobil leasing apa saja", "/kredit-cicilan-geely-bogor"],
    ["test drive mobil bisa di rumah", "/test-drive-geely-bogor"],
    ["berapa lama proses kredit mobil baru", "/kredit-cicilan-geely-bogor"],
    ["apakah trade-in mobil bisa jadi uang muka", "/sales-geely-bogor"],
    ["bagaimana cara beli mobil lewat sales", "/sales-geely-bogor"],
    ["apakah harga otr sudah termasuk ppn", "/harga-mobil-geely-bogor"],
    ["subsidi pajak mobil listrik 2026", "/mobil-listrik-geely-bogor"],
    ["insentif mobil listrik indonesia", "/mobil-listrik-geely-bogor"],
    ["mobil listrik cocok untuk jalanan bogor", "/mobil-listrik-geely-bogor"],
    ["biaya listrik mengisi mobil ev di rumah", "/mobil-listrik-geely-bogor"],
    ["apakah ev aman banjir", "/mobil-listrik-geely-bogor"],
    ["geely punya siapa di indonesia", "/tentang"],
    ["pusat geely itu apa", "/tentang"],
    ["konsultan penjualan mobil itu apa", "/tentang"],
    ["apa bedanya dealer dan konsultan sales", "/tentang"],
    ["kenapa harga mobil bisa berbeda tiap dealer", "/harga-mobil-geely-bogor"],
    ["cara nego harga mobil baru", "/sales-geely-bogor"],
    ["waktu terbaik beli mobil promo", "/promo-geely-bogor"],
    ["apakah mobil baru bisa langsung dipakai", "/artikel"],
  ];
  for (const [t, h] of generic) push(t, h);

  return q;
}

/** Frasa brand + kombinasi lokal yang sering diketik. */
function brandTerms(): KeywordItem[] {
  const b: KeywordItem[] = [];
  const push = (t: string, h: string) => b.push({ t, h });

  const brandBase = [
    "pusat geely", "pusatgeely", "pusat geely bogor", "pusat geely web id",
    "geely bogor", "geely jabodetabek", "geely indonesia",
    "mobil geely bogor", "mobil geely jabodetabek", "harga geely bogor",
    "dealer geely bogor", "showroom geely bogor", "promo geely bogor",
    "kredit geely bogor", "cicilan geely bogor", "test drive geely bogor",
    "sales geely bogor", "agen geely bogor", "geely terdekat",
    "geely dekat sini", "mobil listrik bogor", "suv listrik bogor",
    "mobil listrik depok", "mobil listrik jakarta", "mobil listrik bekasi",
    "mobil listrik tangerang", "geely sentul", "geely cibinong",
    "geely depok", "geely jakarta", "geely bekasi", "geely tangerang",
    "beli geely di bogor", "beli mobil listrik di bogor",
    "sena sulaeman geely", "konsultan geely bogor",
  ];
  for (const t of brandBase) {
    push(t, t.includes("promo") ? "/promo-geely-bogor"
      : t.includes("kredit") || t.includes("cicilan") ? "/kredit-cicilan-geely-bogor"
      : t.includes("test drive") ? "/test-drive-geely-bogor"
      : t.includes("sales") || t.includes("dealer") || t.includes("showroom") || t.includes("agen") || t.includes("beli") || t.includes("nego") ? "/sales-geely-bogor"
      : t.includes("listrik") || t.includes("suv listrik") || t.includes("ev") ? "/mobil-listrik-geely-bogor"
      : t.includes("harga") ? "/harga-mobil-geely-bogor"
      : t.includes("sena") || t.includes("konsultan") || t.includes("itu apa") ? "/tentang"
      : "/");
  }
  return b;
}

/** Frasa warna & spesifikasi per model (hanya yang benar-benar ada). */
function colorSpecTerms(): KeywordItem[] {
  const c: KeywordItem[] = [];
  for (const m of MODELS) {
    const href = `/model/${m.id}`;
    if (m.colors) {
      for (const col of m.colors) {
        c.push({ t: `${m.name.toLowerCase()} warna ${col.label.id.toLowerCase()}`, h: href });
        c.push({ t: `geely ${m.id} ${col.label.id.toLowerCase()}`, h: href });
      }
    }
    for (const s of m.specs) {
      c.push({ t: `${m.name.toLowerCase()} ${s.id.toLowerCase()}`, h: href });
    }
    for (const v of m.variants) {
      c.push({ t: `harga ${m.name.toLowerCase()} ${v.label.toLowerCase()}`, h: href });
      c.push({ t: `${m.name.toLowerCase()} ${v.label.toLowerCase()} 2026`, h: href });
    }
  }
  return c;
}

/* ── Generator utama ────────────────────────────────────────────── */

/** Route untuk frasa model × area (memakai halaman landing bila ada). */
function modelAreaHref(modelId: string, areaLower: string): string {
  // Slug landing bogor mengikuti konvensi existing (starray = "starray-emi").
  const slugModel = modelId === "starray" ? "starray-emi" : modelId;
  if (areaLower === "bogor") return `/geely-${slugModel}-bogor`;
  if (AREA_WITH_PAGE.has(areaLower)) {
    return `/geely-${slugModel}-${AREA_SLUG[areaLower] ?? "bogor"}`;
  }
  return "/harga-mobil-geely-bogor";
}

/** Grid A — model × intent × area (jantung long-tail). */
function gridModelIntentArea(): KeywordItem[] {
  const items: KeywordItem[] = [];
  for (const m of MODEL_TERMS) {
    for (const intent of INTENTS) {
      for (const area of AREA_TERMS) {
        const areaLower = area.toLowerCase();
        const href =
          INTENT_HREF[intent] ??
          (m.id ? `/model/${m.id}` : "/harga-mobil-geely-bogor");
        // Frasa inti
        items.push({
          t: `${intent} ${m.display.toLowerCase()} ${areaLower}`,
          h: intent === "harga" || intent === "spesifikasi" || intent === "warna" || intent === "review"
            ? modelAreaHref(m.id, areaLower)
            : href,
        });
      }
    }
  }
  return items;
}

/** Grid A+ — modifikator tahun untuk frasa harga per model (long-tail tahunan). */
function gridModelYear(): KeywordItem[] {
  const items: KeywordItem[] = [];
  for (const m of MODEL_TERMS) {
    for (const mod of YEAR_MODS) {
      for (const area of ["bogor", "jakarta", "depok", "bekasi", "tangerang"]) {
        items.push({
          t: `harga ${m.display.toLowerCase()} ${area} ${mod}`,
          h: modelAreaHref(m.id, area),
        });
      }
    }
  }
  return items;
}

/** Grid B — intent × area tanpa model (penjaring umum). */
function gridIntentArea(): KeywordItem[] {
  const items: KeywordItem[] = [];
  const areas = ["bogor", "kota bogor", "kabupaten bogor", "depok", "jakarta", "tangerang", "bekasi", "jabodetabek", "sentul", "cibinong", "cibubur", "bsd", "ciawi", "caringin", "dramaga", "citeureup", "sukaraja", "kemang", "bojonggede", "parung", "leuwiliang", "gunung sindur", "cisarua", "megamendung", "tangerang selatan"];
  const intents = ["dealer mobil", "showroom mobil", "sales mobil", "kredit mobil", "cicilan mobil", "promo mobil", "test drive mobil", "trade in mobil", "mobil listrik", "harga mobil baru", "agen mobil", "pembelian mobil"];
  for (const intent of intents) {
    for (const area of areas) {
      const href =
        intent.includes("kredit") || intent.includes("cicilan") ? "/kredit-cicilan-geely-bogor"
        : intent.includes("promo") ? "/promo-geely-bogor"
        : intent.includes("test drive") ? "/test-drive-geely-bogor"
        : intent.includes("trade in") ? "/sales-geely-bogor"
        : intent.includes("listrik") ? "/mobil-listrik-geely-bogor"
        : intent.includes("harga") ? "/harga-mobil-geely-bogor"
        : "/sales-geely-bogor";
      items.push({ t: `${intent} ${area}`, h: href });
    }
  }
  return items;
}

/** Grid C — klaster EV & hybrid. */
function gridEv(): KeywordItem[] {
  const items: KeywordItem[] = [];
  const areas = ["bogor", "depok", "jakarta", "bekasi", "tangerang", "jabodetabek", "sentul", "cibinong"];
  for (const term of EV_TERMS) {
    items.push({ t: term, h: "/mobil-listrik-geely-bogor" });
    for (const area of areas) {
      items.push({ t: `${term} ${area}`, h: "/mobil-listrik-geely-bogor" });
    }
  }
  return items;
}

/* ── Rakit & rapikan ────────────────────────────────────────────── */

function dedupe(items: KeywordItem[]): KeywordItem[] {
  const seen = new Set<string>();
  const out: KeywordItem[] = [];
  for (const it of items) {
    const key = it.t.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push({ t: it.t.trim().toLowerCase(), h: it.h });
  }
  return out;
}

/** Semua klaster terpisah — untuk halaman indeks & distribusi per halaman. */
export const KEYWORD_CLUSTERS: KeywordCluster[] = (() => {
  const gridA = dedupe(gridModelIntentArea());
  const gridYear = dedupe(gridModelYear());
  const gridB = dedupe(gridIntentArea());
  const gridC = dedupe(gridEv());
  const questions = dedupe(questionTemplates());
  const brand = dedupe(brandTerms());
  const colorSpec = dedupe(colorSpecTerms());

  return [
    { id: "model-area-intent", label: "Model × Niat × Area", items: gridA },
    { id: "model-year", label: "Harga Model per Tahun & Area", items: gridYear },
    { id: "intent-area", label: "Niat × Area", items: gridB },
    { id: "ev-hybrid", label: "Kendaraan Listrik & Hybrid", items: gridC },
    { id: "pertanyaan", label: "Pertanyaan Alami (Natural Language)", items: questions },
    { id: "brand", label: "Brand & Pencarian Lokal", items: brand },
    { id: "warna-spesifikasi", label: "Warna & Spesifikasi", items: colorSpec },
  ];
})();

/** Seluruh kata kunci unik (semua klaster digabung). */
export const SEO_KEYWORDS: KeywordItem[] = dedupe(
  KEYWORD_CLUSTERS.flatMap((c) => c.items),
);

/** Jumlah total — dipakai UI & README (dihitung saat build, bukan hardcode). */
export const SEO_KEYWORD_COUNT = SEO_KEYWORDS.length;

/**
 * Distribusi per halaman: ambil subset relevan berdasarkan konteks.
 * - modelId  → semua frasa model tsb (grid A slice + warna/spec + tahun)
 * - intentId → frasa intent tsb lintas area
 * - area     → frasa area tsb
 * - core     → frasa brand inti selalu ikut
 * Dibatasi `cap` agar <head> tetap ramping.
 */
export function keywordsForPage(opts: {
  modelId?: string;
  intent?: string;
  area?: string;
  core?: boolean;
  cap?: number;
}): string[] {
  const { modelId, intent, area, core = true, cap = 60 } = opts;
  const picked: string[] = [];

  const add = (items: KeywordItem[]) => {
    for (const it of items) {
      if (picked.length >= cap) return;
      if (!picked.includes(it.t)) picked.push(it.t);
    }
  };

  if (core) {
    add(KEYWORD_CLUSTERS.find((c) => c.id === "brand")!.items.slice(0, 12));
  }
  if (modelId) {
    const m = MODEL_TERMS.find((x) => x.id === modelId);
    if (m) {
      add(
        KEYWORD_CLUSTERS.find((c) => c.id === "model-area-intent")!.items
          .filter((k) => k.t.includes(m.display.toLowerCase()) || k.t.includes(m.id)),
      );
      add(KEYWORD_CLUSTERS.find((c) => c.id === "warna-spesifikasi")!.items
        .filter((k) => k.t.includes(m.id)));
      add(KEYWORD_CLUSTERS.find((c) => c.id === "model-year")!.items
        .filter((k) => k.t.includes(m.display.toLowerCase())));
    }
  }
  if (intent) {
    add(SEO_KEYWORDS.filter((k) => k.t.startsWith(intent.toLowerCase())));
  }
  if (area) {
    add(SEO_KEYWORDS.filter((k) => k.t.includes(area.toLowerCase())));
  }
  return picked;
}

/** Frasa inti untuk meta beranda + JSON-LD AutoDealer/WebSite. */
export const SEO_CORE_KEYWORDS: string[] = [
  ...brandTerms().map((b) => b.t).slice(0, 30),
  ...EV_TERMS,
  "geely ex5", "geely ex2", "geely starray em-i", "geely coolray",
  "harga geely ex5", "harga geely ex2", "harga geely starray", "harga geely coolray",
  "suv listrik", "mobil super hybrid", "test drive geely", "kredit mobil geely",
];
