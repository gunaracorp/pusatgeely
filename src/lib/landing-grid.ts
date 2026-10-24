/**
 * ═══════════════════════════════════════════════════════════════════
 *  PROGRAMMATIC LANDING GRID — model × area
 * ═══════════════════════════════════════════════════════════════════
 *  Menghasilkan 36 halaman landing "Geely {model} di {area}" dari
 *  template + data nyata (harga MODELS, spesifikasi, flavor per-area).
 *
 *  ANTI-THIN-CONTENT:
 *  - Setiap halaman membawa tabel harga varian asli (dari MODELS),
 *    simulator kredit, form test drive, FAQ lokal, dan flavor teks
 *    per-area yang ditulis khusus (bukan spin/paraphrase kosong).
 *  - Rotasi konten DETERMINISTIK (hash slug) agar build stabil.
 *  - internal links ke 3-4 halaman saudara (grid link matrix).
 */

import type {
  Bi,
  LandingFaq,
  LandingPage,
  LandingSection,
} from "@/lib/landing-pages";
import { MODELS, formatIDR } from "@/lib/site";

/* ── Data area (9 area dengan halaman khusus) ───────────────────── */

interface AreaDef {
  name: string;           // Nama tampil (mis. "Jakarta")
  slug: string;           // Akhir slug URL
  flavor: Bi;             // Kalimat khas area — membuat tiap halaman unik
  transit: Bi;            // Kalimat akses/kebiasaan lokal
}

const AREAS_GRID: AreaDef[] = [
  {
    name: "Jakarta",
    slug: "jakarta",
    flavor: {
      id: "Di DKI Jakarta, mobil listrik dan hybrid punya nilai lebih: tanpa emisi di kemacetan, bebas ganjil-genap untuk kendaraan listrik bersertifikat, dan biaya per kilometer jauh di bawah bensin.",
      en: "In DKI Jakarta, electric and hybrid vehicles offer real advantages: zero tailpipe emissions in traffic, EV license-plate benefits, and a per-km cost far below petrol.",
    },
    transit: {
      id: "Layanan test drive dan presentasi unit bisa kami bawa ke rumah atau kantor Anda di seluruh wilayah DKI — dari Jakarta Selatan sampai Jakarta Utara.",
      en: "Test drives and unit presentations can be brought to your home or office anywhere in DKI — from South to North Jakarta.",
    },
  },
  {
    name: "Depok",
    slug: "depok",
    flavor: {
      id: "Depok adalah kampus-kota dengan mobilitas harian tinggi — rute Margonda, Sawangan, hingga Cinere. Konsumsi energi yang efisien menjadi penentu biaya bulanan Anda.",
      en: "Depok is a university city with heavy daily mobility — Margonda, Sawangan, up to Cinere. Efficient energy use decides your monthly cost.",
    },
    transit: {
      id: "Penghuni Depok biasanya mengambil rute tol Cinere–Jagorawi; unit hybrid dan listrik kami nyaman untuk pola berkendara stop-and-go seperti ini.",
      en: "Depok residents usually take the Cinere–Jagorawi toll route; our hybrid and electric units are comfortable for this stop-and-go pattern.",
    },
  },
  {
    name: "Tangerang",
    slug: "tangerang",
    flavor: {
      id: "Dari Bintaro sampai Gading Serpong, aktivitas Tangerang terhubung langsung ke Jakarta. Mobil yang tenang di kabin membuat perjalanan harian tidak melelahkan.",
      en: "From Bintaro to Gading Serpong, Tangerang connects straight to Jakarta. A quiet cabin makes the daily commute far less tiring.",
    },
    transit: {
      id: "Kami rutin menjangkau Tangerang Kota dan Tangerang Selatan untuk test drive — cukup beri tahu area Anda saat booking.",
      en: "We regularly cover Tangerang Kota and Tangerang Selatan for test drives — just mention your area when booking.",
    },
  },
  {
    name: "Bekasi",
    slug: "bekasi",
    flavor: {
      id: "Bekasi adalah rumah bagi komuter Delta–Karawang–Jakarta. Untuk pola harian sepanjang ini, efisiensi hybrid atau listrik memberi penghematan yang terasa di akhir bulan.",
      en: "Bekasi is home to Delta–Karawang–Jakarta commuters. For such daily distances, hybrid or electric efficiency delivers savings you can feel every month.",
    },
    transit: {
      id: "Layanan sampai Summarecon Bekasi, Grand Galaxy, dan Kota Harapan — jadwal fleksibel termasuk akhir pekan.",
      en: "Coverage reaches Summarecon Bekasi, Grand Galaxy, and Kota Harapan — flexible scheduling including weekends.",
    },
  },
  {
    name: "Sentul",
    slug: "sentul",
    flavor: {
      id: "Sentul City, Bukit Sentul, dan kawasan sirkuit adalah kawasan berbukit — torsi motor listrik yang instan sangat membantu di tanjakan, sementara regenerative braking menghemat energi saat turun.",
      en: "Sentul City, Bukit Sentul, and the circuit area are hilly — instant electric torque helps on climbs while regenerative braking saves energy on descents.",
    },
    transit: {
      id: "Akses tol Sentul membuat unit mudah kami bawa dari Bogor untuk test drive di garis depan rumah Anda.",
      en: "The Sentul toll access makes it easy for us to bring units from Bogor for a doorstep test drive.",
    },
  },
  {
    name: "Cibinong",
    slug: "cibinong",
    flavor: {
      id: "Cibinong dan sekitarnya (Pakansari, Nanggewer) berkembang pesat sebagai kawasan hunian keluarga — kabin lega dan fitur keselamatan menjadi prioritas pembeli di sini.",
      en: "Cibinong and surroundings (Pakansari, Nanggewer) grow fast as family housing areas — cabin space and safety features are buyers' priorities here.",
    },
    transit: {
      id: "Rute Cibinong–Bogor atau Cibinong–Jakarta via tol keduanya lancar; kami jelajahi kedua arah untuk jadwal test drive.",
      en: "The Cibinong–Bogor and Cibinong–Jakarta toll routes both flow; we cover both directions for test-drive schedules.",
    },
  },
  {
    name: "Cibubur",
    slug: "cibubur",
    flavor: {
      id: "Kawasan Cibubur (Kota Wisata, Cibubur Country) identik dengan keluarga muda — kombinasi ruang kabin, bagasi, dan biaya isi ulang murah sangat relevan untuk pola akhir pekan ke luar kota.",
      en: "The Cibubur area (Kota Wisata, Cibubur Country) is synonymous with young families — cabin space, trunk room, and cheap recharging matter for weekend trips.",
    },
    transit: {
      id: "Jonggol, Cileungsi, hingga Transyogi kami jangkau — konfirmasi lokasi Anda lewat WhatsApp.",
      en: "We reach Jonggol, Cileungsi, and the Transyogi corridor — confirm your location via WhatsApp.",
    },
  },
  {
    name: "BSD",
    slug: "bsd",
    flavor: {
      id: "BSD City dan Serpong adalah kawasan paling siap-EV di Banten: banyak stasiun pengisian publik, komunitas EV besar, dan perumahan dengan carport privat untuk home charging.",
      en: "BSD City and Serpong are Banten's most EV-ready areas: many public chargers, large EV communities, and homes with private carports for home charging.",
    },
    transit: {
      id: "Test drive di BSD, Alam Sutera, dan Gading Serpong bisa diatur pagi atau sore untuk menghindari kemacetan puncak.",
      en: "Test drives in BSD, Alam Sutera, and Gading Serpong can be scheduled morning or late afternoon to avoid peak traffic.",
    },
  },
  {
    name: "Kabupaten Bogor",
    slug: "kabupaten-bogor",
    flavor: {
      id: "Kabupaten Bogor luas — dari Cibinong, Gunung Sindur, sampai Cisarua. Jarak antar kecamatan panjang; itulah sebabnya efisiensi energi dan range yang realistis jadi pertimbangan utama di sini.",
      en: "Kabupaten Bogor is vast — from Cibinong and Gunung Sindur to Cisarua. Inter-district distances are long; that's why energy efficiency and realistic range matter most here.",
    },
    transit: {
      id: "Kami melayani seluruh kecamatan di Kabupaten Bogor selama jadwal memungkinkan — chat dulu, kami cek rute terdekat.",
      en: "We serve every kecamatan in Kabupaten Bogor when schedules allow — chat first and we'll check the nearest route.",
    },
  },
];

/* ── Template konten ────────────────────────────────────────────── */

function leadPool(modelName: string, area: string, priceFrom: string): Bi[][] {
  return [
    [
      {
        id: `Mencari ${modelName} di ${area}? Anda berada di halaman yang tepat. Pusat Geely adalah layanan konsultan penjualan independen yang memandu Anda memilih unit, mengurus penawaran, dan mendampingi sampai serah terima — tanpa biaya layanan tersembunyi.`,
        en: `Looking for the ${modelName} in ${area}? You're in the right place. Pusat Geely is an independent sales-consulting service that guides you from unit selection and pricing to handover — with no hidden fees.`,
      },
      {
        id: `Harga indikatif ${modelName} mulai ${priceFrom} OTR. Angka final menyesuaikan promo pembiayaan yang sedang berlaku — dan itulah tugas kami: memastikan Anda mendapatkan penawaran terbaik dari jaringan dealer resmi Geely Indonesia.`,
        en: `The indicative ${modelName} price starts at ${priceFrom} OTR. The final figure follows the financing promotions currently active — and that is our job: to secure the best offer from Geely Indonesia's official dealer network.`,
      },
    ],
    [
      {
        id: `${modelName} termasuk lini produk Geely yang paling banyak ditanyakan di ${area}. Sebelum memutuskan, ada baiknya Anda memahami tiga hal: harga indikatif per varian, pilihan warna yang tersedia, dan skema kredit yang paling ringan untuk profil keuangan Anda.`,
        en: `The ${modelName} is among the most-asked Geely models in ${area}. Before deciding, understand three things: indicative prices per variant, available colors, and the financing scheme that best fits your budget.`,
      },
      {
        id: `Kami bantu menghitung semuanya secara transparan — termasuk estimasi DP, cicilan, dan nilai trade-in mobil lama Anda. Cukup lewat WhatsApp, tanpa perlu datang ke showroom lebih dulu.`,
        en: `We help you calculate everything transparently — including down-payment estimates, monthly installments, and your old car's trade-in value. All via WhatsApp, no showroom visit required.`,
      },
    ],
    [
      {
        id: `Banyak pembeli di ${area} bertanya: apakah bisa test drive di rumah? Bisa. Kami layani test drive fleksibel di lokasi Anda selama masih dalam area operasional Bogor & Jabodetabek — setiap hari pukul 08.00–20.00 WIB.`,
        en: `Many buyers in ${area} ask: can I test drive at home? Yes. Flexible at-location test drives are available across Bogor & Jabodetabek — daily 08:00–20:00 WIB.`,
      },
      {
        id: `Prosesnya sederhana: chat WhatsApp → tentukan model dan jadwal → unit kami bawa → Anda coba langsung di rute harian Anda. Tidak ada kewajiban membeli.`,
        en: `The process is simple: WhatsApp us → pick a model and schedule → we bring the unit → you drive it on your own daily route. No purchase obligation.`,
      },
    ],
  ];
}

function sectionPool(modelName: string, area: string): LandingSection[] {
  return [
    {
      heading: { id: `Kenapa ${modelName} diminati di ${area}?`, en: `Why is the ${modelName} popular in ${area}?` },
      paragraphs: [
        {
          id: `Tiga alasan paling sering muncul dari pembeli: pertama, nilai paket — fitur keselamatan dan kenyamanan yang biasanya ada di segmen lebih mahal; kedua, biaya operasional rendah untuk varian listrik dan hybrid; ketiga, garansi resmi pabrikan tetap berlaku penuh karena pembelian melalui jaringan dealer resmi Geely Indonesia.`,
          en: `Three reasons surface most among buyers: first, package value — safety and comfort features usually found in higher segments; second, low running costs for EV and hybrid variants; third, the full manufacturer warranty applies because purchases go through Geely Indonesia's official dealer network.`,
        },
      ],
      bullets: [
        { id: "Fitur keselamatan aktif lengkap per varian", en: "Comprehensive active safety features per variant" },
        { id: "Garansi resmi pabrikan tetap berlaku", en: "Full official manufacturer warranty" },
        { id: "Biaya per km efisien (varian EV/hybrid)", en: "Efficient cost per km (EV/hybrid variants)" },
      ],
    },
    {
      heading: { id: `Cara beli ${modelName} di ${area} lewat kami`, en: `How to buy the ${modelName} in ${area} through us` },
      paragraphs: [
        {
          id: `Alurnya empat langkah dan semuanya bisa dimulai dari WhatsApp. Anda sebutkan model dan area, kami kirim penawaran terkini beserta simulasi kredit, lalu test drive dijadwalkan di lokasi Anda. Setelah deal, seluruh administrasi pembelian dijalankan melalui dealer resmi — Anda tetap menerima semua dokumen dan garansi resmi.`,
          en: `The flow is four steps, all starting from WhatsApp. Tell us the model and area, we send the latest offer with a financing simulation, then the test drive is scheduled at your location. Once you decide, all purchase administration runs through the official dealer — you still receive every official document and warranty.`,
        },
        {
          id: `Tidak ada perbedaan harga resmi antara membeli langsung di dealer atau didampingi kami — yang membedakan adalah pengalaman: kami yang mengejar penawaran terbaik, mengatur jadwal, dan mendampingi sampai kunci tangan.`,
          en: `There is no official price difference between buying directly at a dealer or with our assistance — the difference is experience: we chase the best offer, arrange schedules, and accompany you until keys change hands.`,
        },
      ],
    },
    {
      heading: { id: `Simulasi kredit & trade-in untuk pembeli ${area}`, en: `Financing simulation & trade-in for ${area} buyers` },
      paragraphs: [
        {
          id: `Gunakan simulator kredit di halaman ini untuk menghitung estimasi cicilan berdasarkan DP dan tenor pilihan Anda. Umumnya uang muka dimulai dari ±20% dengan tenor hingga 6 tahun, tergantung kebijakan perusahaan pembiayaan dan profil kredit.`,
          en: `Use the financing simulator on this page to estimate installments based on your down payment and tenor. Down payments generally start at ±20% with tenors up to 6 years, subject to the finance company's policy and your credit profile.`,
        },
        {
          id: `Punya mobil lama? Kirim data unit (merk, tipe, tahun, kondisi) via WhatsApp — kami bantu estimasi nilai trade-in yang bisa dipakai sebagai pengurang uang muka.`,
          en: `Have an old car? Send its details (brand, model, year, condition) via WhatsApp — we'll help estimate a trade-in value that can reduce your down payment.`,
        },
      ],
    },
    {
      heading: { id: `Area lain dekat ${area}?`, en: `Nearby areas beyond ${area}?` },
      paragraphs: [
        {
          id: `Selain ${area}, kami melayani seluruh Bogor (Kota & Kabupaten), Depok, Jakarta, Tangerang, dan Bekasi — termasuk Sentul, Cibinong, Cibubur, dan BSD. Di luar area itu? Chat kami; kalau jadwal memungkinkan, kami usahakan.`,
          en: `Beyond ${area}, we cover all of Bogor (city & regency), Depok, Jakarta, Tangerang, and Bekasi — including Sentul, Cibinong, Cibubur, and BSD. Outside the area? Chat us; if schedules allow, we'll make it work.`,
        },
      ],
    },
    {
      heading: { id: `Test drive ${modelName} — atur jadwalnya sekarang`, en: `${modelName} test drive — set your schedule now` },
      paragraphs: [
        {
          id: `Form test drive di halaman ini langsung terhubung ke WhatsApp kami. Sebutkan ${modelName}, area Anda di ${area}, dan tanggal preferensi — kami konfirmasi jadwal dan membawa unit ke lokasi Anda.`,
          en: `The test-drive form on this page connects straight to our WhatsApp. Mention the ${modelName}, your area in ${area}, and preferred dates — we confirm the schedule and bring the unit to you.`,
        },
      ],
    },
    {
      heading: { id: `Warna & varian ${modelName} yang tersedia`, en: `Available ${modelName} colors & variants` },
      paragraphs: [
        {
          id: `Ketersediaan warna dan tipe bergerak — unit ready berubah dari minggu ke minggu. Tabel varian di atas merangkum pilihan resmi beserta harga indikatifnya; konfirmasi via WhatsApp untuk stok terbaru sebelum Anda memutuskan warna.`,
          en: `Color and variant availability moves weekly. The variant table above summarizes official options with indicative prices; confirm current stock via WhatsApp before settling on a color.`,
        },
      ],
    },
  ];
}

function faqPool(modelName: string, area: string, priceFrom: string): LandingFaq[] {
  return [
    {
      q: { id: `Berapa harga ${modelName} di ${area}?`, en: `What is the ${modelName} price in ${area}?` },
      a: {
        id: `Harga indikatif mulai ${priceFrom} OTR berdasarkan riset sumber publik per September 2026. Harga final bergerak mengikuti promo pembiayaan — chat WhatsApp kami untuk penawaran yang sedang berlaku di ${area}.`,
        en: `Indicative prices start at ${priceFrom} OTR based on public-source research as of September 2026. Final prices move with financing promos — WhatsApp us for the current offer in ${area}.`,
      },
    },
    {
      q: { id: `Apakah test drive bisa di lokasi saya di ${area}?`, en: `Can I test drive at my location in ${area}?` },
      a: {
        id: `Bisa. Kami melayani test drive fleksibel di ${area} dan sekitarnya selama dalam area operasional Bogor & Jabodetabek. Cukup jadwalkan lewat WhatsApp atau form di halaman ini.`,
        en: `Yes. Flexible test drives are available in ${area} and surroundings within our Bogor & Jabodetabek coverage. Schedule via WhatsApp or the form on this page.`,
      },
    },
    {
      q: { id: `Bisa kredit? DP-nya berapa?`, en: `Can I finance it? What's the down payment?` },
      a: {
        id: `Bisa. Umumnya DP mulai ±20% dengan tenor hingga 6 tahun tergantung kebijakan perusahaan pembiayaan dan profil kredit. Simulator di halaman ini membantu menghitung estimasi cicilannya.`,
        en: `Yes. Down payments generally start at ±20% with tenors up to 6 years, subject to the finance company and your credit profile. The simulator on this page estimates your installments.`,
      },
    },
    {
      q: { id: `Apakah Pusat Geely dealer resmi?`, en: `Is Pusat Geely an official dealer?` },
      a: {
        id: `Bukan. Kami konsultan penjualan independen — proses pembelian, garansi, dan purna jual dijalankan melalui jaringan dealer resmi Geely Indonesia sesuai ketentuan pabrikan. Anda tetap mendapat garansi resmi penuh.`,
        en: `No. We are an independent sales consultancy — purchase, warranty, and after-sales run through Geely Indonesia's official dealer network under manufacturer terms. You still receive the full official warranty.`,
      },
    },
    {
      q: { id: `Mobil lama saya bisa di-trade-in?`, en: `Can I trade in my old car?` },
      a: {
        id: `Bisa. Kirim data mobil lama (merk, tipe, tahun, kondisi, foto bila perlu) via WhatsApp — kami bantu estimasi nilai trade-in untuk dipakai sebagai pengurang uang muka.`,
        en: `Yes. Send your car's details (brand, model, year, condition, photos if needed) via WhatsApp — we help estimate its trade-in value to reduce your down payment.`,
      },
    },
    {
      q: { id: `Berapa lama proses dari booking sampai serah terima?`, en: `How long from booking to handover?` },
      a: {
        id: `Tergantung ketersediaan unit dan proses kredit. Untuk unit ready dengan kredit cair, umumnya 3–7 hari kerja. Kami beri update progres tiap tahap lewat WhatsApp.`,
        en: `It depends on unit availability and financing approval. For ready stock with approved credit, typically 3–7 working days. We update you at every stage via WhatsApp.`,
      },
    },
    {
      q: { id: `Apakah garansi tetap berlaku jika beli lewat konsultan?`, en: `Does the warranty hold if I buy through a consultant?` },
      a: {
        id: `Tetap berlaku penuh. Karena transaksi resmi dijalankan melalui dealer resmi Geely Indonesia, garansi pabrikan mengikuti ketentuan resmi untuk tiap model — tidak berkurang sedikit pun.`,
        en: `Fully valid. Because the official transaction runs through an authorized Geely dealer, the manufacturer warranty follows official terms for each model — no reduction whatsoever.`,
      },
    },
    {
      q: { id: `Area mana saja yang dilayani selain ${area}?`, en: `Which areas are served besides ${area}?` },
      a: {
        id: `Bogor (Kota & Kabupaten), Depok, Jakarta, Tangerang, dan Bekasi — termasuk Sentul, Cibinong, Cibubur, dan BSD. Di luar itu kami usahakan sesuai jadwal.`,
        en: `Bogor (city & regency), Depok, Jakarta, Tangerang, and Bekasi — including Sentul, Cibinong, Cibubur, and BSD. Beyond that we try to accommodate by schedule.`,
      },
    },
  ];
}

/* ── Util rotasi deterministik ──────────────────────────────────── */

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pick<T>(pool: T[], seed: number, offset: number): T {
  return pool[(seed + offset) % pool.length];
}

/* ── Generator ──────────────────────────────────────────────────── */

/** Model yang di-grid: id → slug penamaan landing (konvensi existing). */
const GRID_MODELS = MODELS.map((m) => ({
  id: m.id,
  slugPart: m.id === "starray" ? "starray-emi" : m.id,
  name: m.name,
  priceFrom: m.priceFrom,
  image: m.image,
  blurb: m.blurb.id,
}));

function buildGridPage(model: (typeof GRID_MODELS)[number], area: AreaDef): LandingPage {
  const slug = `geely-${model.slugPart}-${area.slug}`;
  const seed = hash(slug);
  const priceFrom = formatIDR(model.priceFrom);
  const modelSlugBogor = `geely-${model.slugPart}-bogor`;
  const detailHref = `/model/${model.id}`;

  const leads = pick(leadPool(model.name, area.name, priceFrom), seed, 0);
  const leadExtra = pick(leadPool(model.name, area.name, priceFrom), seed, 1);

  const sections = [
    pick(sectionPool(model.name, area.name), seed, 0),
    pick(sectionPool(model.name, area.name), seed, 1),
    {
      heading: { id: `${area.name} dalam cakupan layanan kami`, en: `${area.name} within our service coverage` },
      paragraphs: [area.flavor, area.transit],
    },
    pick(sectionPool(model.name, area.name), seed, 2),
  ];

  const faqAll = faqPool(model.name, area.name, priceFrom);
  const faq: LandingFaq[] = [0, 1, 2, 3, 4].map((i) => faqAll[(seed + i) % faqAll.length]);

  // Related: area saudara (2), halaman model bogor, detail model, harga hub
  const siblingAreas = AREAS_GRID.filter((a) => a.slug !== area.slug);
  const s1 = pick(siblingAreas, seed, 0);
  const s2 = pick(siblingAreas, seed, 1);
  const related = [
    {
      href: `/geely-${model.slugPart}-${s1.slug}`,
      label: { id: `Geely ${model.name.replace("GEELY ", "")} di ${s1.name}`, en: `Geely ${model.name.replace("GEELY ", "")} in ${s1.name}` } as Bi,
    },
    {
      href: `/geely-${model.slugPart}-${s2.slug}`,
      label: { id: `Geely ${model.name.replace("GEELY ", "")} di ${s2.name}`, en: `Geely ${model.name.replace("GEELY ", "")} in ${s2.name}` } as Bi,
    },
    {
      href: modelSlugBogor,
      label: { id: `Geely ${model.name.replace("GEELY ", "")} di Bogor (pusat)`, en: `Geely ${model.name.replace("GEELY ", "")} in Bogor (hub)` } as Bi,
    },
    { href: detailHref, label: { id: `Spesifikasi lengkap ${model.name}`, en: `${model.name} full specifications` } as Bi },
    { href: "/harga-mobil-geely-bogor", label: { id: "Daftar harga semua model Geely", en: "All Geely model prices" } as Bi },
  ];

  return {
    slug,
    intent: `Pencari ${model.name} di ${area.name} — harga, promo, test drive lokal`,
    priority: 0.75,
    title: {
      id: `Geely ${model.name.replace("GEELY ", "")} ${area.name} — Harga, Promo & Test Drive`,
      en: `Geely ${model.name.replace("GEELY ", "")} ${area.name} — Prices, Deals & Test Drive`,
    },
    description: {
      id: `${modelNameForMeta(model)} di ${area.name}: harga indikatif mulai ${priceFrom}, promo pembiayaan, simulasi kredit, trade-in, dan test drive di lokasi Anda. Layanan konsultan penjualan independen Bogor & Jabodetabek.`,
      en: `${model.name} in ${area.name}: indicative prices from ${priceFrom}, financing deals, credit simulation, trade-in, and at-location test drives. Independent sales consulting for Bogor & Jabodetabek.`,
    },
    h1: {
      id: `Geely ${model.name.replace("GEELY ", "")} di ${area.name} — Harga, Promo & Test Drive`,
      en: `Geely ${model.name.replace("GEELY ", "")} in ${area.name} — Prices, Deals & Test Drive`,
    },
    lead: [...leads, leadExtra[1]],
    chips: [
      { id: `Mulai ${priceFrom} OTR`, en: `From ${priceFrom} OTR` },
      { id: "Test drive di lokasi Anda", en: "Test drive at your location" },
      { id: "Kredit mulai ±20% DP", en: "Financing from ±20% DP" },
      { id: "Trade-in diterima", en: "Trade-in accepted" },
      { id: `Area: ${area.name}`, en: `Area: ${area.name}` },
      { id: "Garansi resmi pabrikan", en: "Official manufacturer warranty" },
    ],
    modelId: model.id,
    embedPromos: seed % 2 === 0,
    embedSimulator: true,
    embedTestDrive: true,
    sections,
    faq,
    related,
    ogImage: model.image,
  };

  function modelNameForMeta(m: (typeof GRID_MODELS)[number]): string {
    return `Geely ${m.name.replace("GEELY ", "")}`;
  }
}

/** 36 halaman grid: 4 model × 9 area (Bogor sudah ada di LANDING_PAGES). */
export const GENERATED_LANDING_PAGES: LandingPage[] = GRID_MODELS.flatMap((model) =>
  AREAS_GRID.map((area) => buildGridPage(model, area)),
);
