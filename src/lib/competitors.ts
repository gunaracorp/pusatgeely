/**
 * PUSAT GEELY — Data perbandingan "Geely vs pesaing" (halaman /vs/...).
 *
 * ATURAN DATA (anti-fabrication, sama dengan site.ts & model-details.ts):
 * - Angka pesaing = riset multi-sumber publik, bersifat INDIKATIF OTR,
 *   distempel "per September 2026", dan WAJIB disertai disclaimer di UI.
 * - Angka Geely = data terverifikasi yang sama dengan site.ts.
 * - Verdict & poin = panduan keputusan yang adil — tanpa menjatuhkan
 *   merek lain, tanpa klaim yang tidak dapat diverifikasi.
 * - Setiap halaman selalu menutup dengan ajakan konfirmasi via WhatsApp.
 */

export interface CompareRow {
  label: { id: string; en: string };
  /** Nilai untuk model Geely (dari data terverifikasi situs). */
  geely: string;
  /** Nilai untuk pesaing (indikatif riset publik). */
  rival: string;
}

export interface CompareFaq {
  q: { id: string; en: string };
  a: { id: string; en: string };
}

export interface Comparison {
  slug: string;
  /** id model di MODELS (site.ts) — untuk internal linking. */
  modelId: string;
  geelyName: string;
  rivalName: string;
  rivalPowertrain: { id: string; en: string };
  /** Harga indikatif OTR pesaing (riset publik Sept 2026). */
  rivalPriceFrom: number;
  /** 2 chip spesifikasi headline pesaing (indikatif). */
  rivalSpecs: { id: string; en: string }[];
  title: string;
  description: string;
  h1: { id: string; en: string };
  intro: { id: string; en: string };
  rows: CompareRow[];
  verdict: { id: string; en: string };
  geelyEdges: { id: string; en: string }[];
  rivalEdges: { id: string; en: string }[];
  faqs: CompareFaq[];
}

export const COMPARES: Comparison[] = [
  {
    slug: "geely-ex5-vs-byd-atto-3",
    modelId: "ex5",
    geelyName: "GEELY EX5",
    rivalName: "BYD Atto 3",
    rivalPowertrain: { id: "Listrik", en: "Electric" },
    rivalPriceFrom: 415_000_000,
    rivalSpecs: [
      { id: "Listrik • ±60,5 kWh", en: "Electric • ±60.5 kWh" },
      { id: "Range ±480 km", en: "Range ±480 km" },
    ],
    title: "Geely EX5 vs BYD Atto 3 — Perbandingan Harga & Spesifikasi 2026",
    description:
      "Bandingkan Geely EX5 dan BYD Atto 3: harga indikatif, jangkauan, tenaga, dan fitur. Panduan memilih SUV listrik Jabodetabek + cek penawaran via WhatsApp.",
    h1: {
      id: "Geely EX5 vs BYD Atto 3",
      en: "Geely EX5 vs BYD Atto 3",
    },
    intro: {
      id: "Dua SUV listrik yang sama-sama jadi bintang di Indonesia. Di sini kami rangkum perbandingan indikatifnya — harga, jangkauan, dan tenaga — supaya kamu punya titik awal yang jernih sebelum test drive keduanya.",
      en: "Two electric SUVs that both shine in Indonesia. Here's an indicative comparison — price, range, and power — as a clear starting point before you test drive both.",
    },
    rows: [
      { label: { id: "Harga mulai (indikatif OTR)", en: "Price from (indicative OTR)" }, geely: "Rp 465 juta", rival: "Rp 415 juta" },
      { label: { id: "Powertrain", en: "Powertrain" }, geely: "Listrik", rival: "Listrik" },
      { label: { id: "Baterai", en: "Battery" }, geely: "±60,22 kWh", rival: "±60,5 kWh" },
      { label: { id: "Jangkauan (klaim)", en: "Range (claimed)" }, geely: "hingga 495 km", rival: "±480 km" },
      { label: { id: "Tenaga", en: "Power" }, geely: "±218 hp", rival: "±204 hp" },
    ],
    verdict: {
      id: "Atto 3 biasanya mulai dari angka yang lebih rendah; EX5 unggul di jangkauan dan tenaga pada riset publik kami. Kalau rute harianmu panjang (Bogor–Jakarta pulang-pergi), jangkauan ekstra EX5 layak dipertimbangkan. Keputusan terbaik tetap lewat test drive langsung — kami bisa atur keduanya di lokasimu.",
      en: "The Atto 3 usually starts lower; the EX5 leads on range and power in our public-source research. If your daily route is long (Bogor–Jakarta round trip), the EX5's extra range is worth considering. The best call is still a direct test drive — we can arrange both at your location.",
    },
    geelyEdges: [
      { id: "Jangkauan terpanjang di kelasnya menurut klaim pabrikan (hingga 495 km)", en: "Longest claimed range in its class (up to 495 km)" },
      { id: "Tenaga lebih besar (±218 hp) untuk overdhoot & tanjakan", en: "Higher power (±218 hp) for overtakes & climbs" },
      { id: "Paket home charging didampingi langsung oleh konsultan", en: "Home-charging package assisted directly by the consultant" },
    ],
    rivalEdges: [
      { id: "Harga masuk biasanya lebih rendah", en: "Lower entry price" },
      { id: "Jaringan layanan BYD terus bertambah di Jabodetabek", en: "BYD service network keeps expanding across Greater Jakarta" },
    ],
    faqs: [
      {
        q: { id: "Mana yang lebih murah, EX5 atau Atto 3?", en: "Which is cheaper, EX5 or Atto 3?" },
        a: { id: "Berdasar riset publik per September 2026, Atto 3 umumnya mulai dari harga yang lebih rendah, sedangkan EX5 menawarkan jangkauan dan tenaga lebih besar. Harga final selalu berubah — konfirmasi via WhatsApp untuk penawaran terbaru keduanya.", en: "Based on public research as of September 2026, the Atto 3 usually starts lower, while the EX5 offers more range and power. Final prices change constantly — confirm via WhatsApp for the latest offer on both." },
      },
      {
        q: { id: "Untuk rute Bogor–Jakarta harian, mana yang lebih cocok?", en: "For daily Bogor–Jakarta, which fits better?" },
        a: { id: "Keduanya cukup untuk ±60 km pulang-pergi. Bedanya terasa saat sisa daya: EX5 memberi ruang lebih leluasa karena jangkauan klaimnya paling jauh di kelasnya. Kalau punya charger di rumah, keduanya sama-sama nyaman.", en: "Both handle a ±60 km round trip easily. The difference shows in reserve: the EX5 gives more headroom with the longest claimed range in its class. With a home charger, both are equally convenient." },
      },
      {
        q: { id: "Bisa test drive EX5 di lokasi saya?", en: "Can I test drive the EX5 at my location?" },
        a: { id: "Bisa. Jadwalkan lewat form test drive atau WhatsApp — unit dibawa ke lokasimu selama dalam area Bogor & Jabodetabek, gratis tanpa komitmen.", en: "Yes. Book via the test-drive form or WhatsApp — the unit comes to your location within Bogor & Greater Jakarta, free with no commitment." },
      },
    ],
  },
  {
    slug: "geely-ex5-vs-chery-omoda-e5",
    modelId: "ex5",
    geelyName: "GEELY EX5",
    rivalName: "Chery Omoda E5",
    rivalPowertrain: { id: "Listrik", en: "Electric" },
    rivalPriceFrom: 400_000_000,
    rivalSpecs: [
      { id: "Listrik • ±61 kWh", en: "Electric • ±61 kWh" },
      { id: "Range ±430 km", en: "Range ±430 km" },
    ],
    title: "Geely EX5 vs Chery Omoda E5 — Perbandingan SUV Listrik 2026",
    description:
      "Geely EX5 vs Chery Omoda E5: harga indikatif, baterai, jangkauan, dan tenaga dibedah jujur. Panduan memilih SUV listrik di Bogor & Jabodetabek.",
    h1: { id: "Geely EX5 vs Chery Omoda E5", en: "Geely EX5 vs Chery Omoda E5" },
    intro: {
      id: "Omoda E5 tampil sporty dan agresif; EX5 mengedepankan jangkauan dan kenyamanan keluarga. Perbandingan indikatif berikut membantu menentukan mana yang lebih pas dengan pola mobilitasmu.",
      en: "The Omoda E5 looks sporty and aggressive; the EX5 leans on range and family comfort. This indicative comparison helps decide which fits your mobility pattern.",
    },
    rows: [
      { label: { id: "Harga mulai (indikatif OTR)", en: "Price from (indicative OTR)" }, geely: "Rp 465 juta", rival: "Rp 400 juta" },
      { label: { id: "Powertrain", en: "Powertrain" }, geely: "Listrik", rival: "Listrik" },
      { label: { id: "Baterai", en: "Battery" }, geely: "±60,22 kWh", rival: "±61 kWh" },
      { label: { id: "Jangkauan (klaim)", en: "Range (claimed)" }, geely: "hingga 495 km", rival: "±430 km" },
      { label: { id: "Tenaga", en: "Power" }, geely: "±218 hp", rival: "±201 hp" },
    ],
    verdict: {
      id: "Kapasitas baterai keduanya nyaris setara, namun EX5 diklaim melaju lebih jauh per pengisian — sinyal efisiensi yang bagus. Omoda E5 masuk lewat harga. Saran kami: bawa keduanya untuk rute rutinmu sendiri; angka brosur berbeda rasa di jalan sungguhan.",
      en: "Battery capacity is nearly identical, but the EX5 claims more distance per charge — a good efficiency signal. The Omoda E5 competes on price. Our advice: take both on your own routine route; brochure numbers feel different on real roads.",
    },
    geelyEdges: [
      { id: "Jangkauan klaim lebih jauh (495 vs ±430 km)", en: "Longer claimed range (495 vs ±430 km)" },
      { id: "Tenaga lebih besar untuk mobil penuh beban", en: "More power when fully loaded" },
      { id: "Kabin senyap dengan fokus kenyamanan keluarga", en: "Quiet cabin tuned for family comfort" },
    ],
    rivalEdges: [
      { id: "Harga masuk lebih ramah", en: "Friendlier entry price" },
      { id: "Desain coupe-sporty yang khas", en: "Distinctive sporty-coupe design" },
    ],
    faqs: [
      {
        q: { id: "Apakah EX5 benar-benar lebih irit dari Omoda E5?", en: "Is the EX5 really more efficient than the Omoda E5?" },
        a: { id: "Klaim jangkauan EX5 (495 km) lebih tinggi dengan kapasitas baterai yang mirip — itu indikasi efisiensi yang baik, namun pemakaian nyata sangat tergantung rute, kecepatan, dan pendingin kabin. Uji sendiri lewat test drive.", en: "The EX5's claimed range (495 km) is higher with similar battery capacity — a good efficiency indicator — but real-world use depends heavily on route, speed, and AC. Test it yourself." },
      },
      {
        q: { id: "Bagaimana garansi keduanya?", en: "How about warranty for both?" },
        a: { id: "Karena pembelian berjalan melalui jaringan dealer resmi masing-masing merek, garansi resmi pabrikan tetap berlaku penuh sesuai ketentuan tiap model. Rincian garansi terbaru kami bantu cek saat konsultasi.", en: "Since purchases go through each brand's official dealer network, the manufacturer warranty applies fully per model terms. We'll help verify the latest warranty details during consultation." },
      },
      {
        q: { id: "Mana yang lebih baik untuk keluarga?", en: "Which is better for a family?" },
        a: { id: "Keduanya SUV kompak listrik. Untuk perjalanan keluarga jauh, jangkauan ekstra EX5 mengurangi frekuensi berhenti isi daya. Untuk pemakaian kota pendek, keduanya setara — coba langsung keduanya untuk merasakan kabinnya.", en: "Both are compact electric SUVs. For long family trips, the EX5's extra range means fewer charging stops. For short city use they're on par — try both cabins directly." },
      },
    ],
  },
  {
    slug: "geely-ex2-vs-byd-dolphin",
    modelId: "ex2",
    geelyName: "GEELY EX2",
    rivalName: "BYD Dolphin",
    rivalPowertrain: { id: "Listrik", en: "Electric" },
    rivalPriceFrom: 290_000_000,
    rivalSpecs: [
      { id: "Listrik • ±44,9 kWh", en: "Electric • ±44.9 kWh" },
      { id: "Range ±427 km", en: "Range ±427 km" },
    ],
    title: "Geely EX2 vs BYD Dolphin — Perbandingan Hatchback Listrik 2026",
    description:
      "Geely EX2 vs BYD Dolphin: harga indikatif, jangkauan, dan fitur dibandingkan jujur. Hatchback listrik terbaik untuk kota — panduan Pusat Geely Bogor.",
    h1: { id: "Geely EX2 vs BYD Dolphin", en: "Geely EX2 vs BYD Dolphin" },
    intro: {
      id: "Dua hatchback listrik favorit untuk kota. EX2 masuk lewat harga yang lebih ringan; Dolphin menawarkan jangkauan lebih. Berikut pemetaan indikatifnya.",
      en: "Two favorite city EV hatchbacks. The EX2 enters with a lighter price; the Dolphin offers more range. Here's the indicative mapping.",
    },
    rows: [
      { label: { id: "Harga mulai (indikatif OTR)", en: "Price from (indicative OTR)" }, geely: "Rp 239,9 juta", rival: "Rp 290 juta" },
      { label: { id: "Powertrain", en: "Powertrain" }, geely: "Listrik", rival: "Listrik" },
      { label: { id: "Baterai", en: "Battery" }, geely: "±40 kWh", rival: "±44,9 kWh" },
      { label: { id: "Jangkauan (klaim)", en: "Range (claimed)" }, geely: "±398 km", rival: "±427 km" },
      { label: { id: "Tenaga", en: "Power" }, geely: "116 PS", rival: "±95–177 PS" },
      { label: { id: "Fitur unik", en: "Unique feature" }, geely: "Frunk (bagasi depan)", rival: "—" },
    ],
    verdict: {
      id: "Untuk anggaran di bawah Rp 250 juta, EX2 nyaris tak punya lawan dengan jangkauan sejauh itu. Kalau kamu butuh performa lebih tinggi dari varian atas Dolphin, konsekuensinya anggaran naik cukup jauh. Untuk mobil harian kota, EX2 adalah pilihan nilai terbaik di riset kami.",
      en: "Under Rp 250 million, the EX2 has almost no rival with that range. If you need the Dolphin's top-variant performance, the budget jumps considerably. For a daily city car, the EX2 is the best-value pick in our research.",
    },
    geelyEdges: [
      { id: "Harga masuk paling terjangkau di segmen listrik kelasnya", en: "Most affordable entry price in its EV segment" },
      { id: "Frunk ekstra — bagasi depan untuk barang kotor/basah", en: "Extra frunk — front trunk for dirty/wet items" },
      { id: "Ringkas & lincah menembus macet Bogor–Depok–Jakarta", en: "Compact & agile in Bogor–Depok–Jakarta traffic" },
    ],
    rivalEdges: [
      { id: "Jangkauan klaim sedikit lebih jauh", en: "Slightly longer claimed range" },
      { id: "Varian atas punya performa tinggi", en: "Top variant offers high performance" },
    ],
    faqs: [
      {
        q: { id: "EX2 cukup untuk perjalanan luar kota?", en: "Is the EX2 enough for out-of-town trips?" },
        a: { id: "Jangkauan klaim ±398 km mencakup Jakarta–Bandung sekali jalan dengan sisa. Dengan peta pengisian yang makin padat di tol, perjalanan jauh semakin nyaman. Konsultasikan rute rutinmu — kami hitungkan skenario is dayanya.", en: "The ±398 km claimed range covers Jakarta–Bandung one-way with reserve. With denser toll-road charging maps, long trips get easier. Share your routine route — we'll map the charging scenario." },
      },
      {
        q: { id: "Kenapa EX2 lebih murah dari Dolphin?", en: "Why is the EX2 cheaper than the Dolphin?" },
        a: { id: "Strategi harga Geely menempatkan EX2 sebagai pintu masuk mobil listrik dengan spesifikasi inti lengkap (baterai ±40 kWh, frunk, fitur keselamatan) tanpa pilihan premium varian atas. Harga indikatif dan dapat berubah.", en: "Geely's pricing positions the EX2 as the EV entry point with complete core specs (±40 kWh battery, frunk, safety features) without top-variant premium options. Prices are indicative and may change." },
      },
      {
        q: { id: "Ada warna apa saja untuk EX2?", en: "What colors does the EX2 come in?" },
        a: { id: "Warna tersedia Putih, Krem, dan Hijau — semuanya ada di halaman model EX2 dengan foto unit asli. Ketersediaan stok warna konfirmasi via WhatsApp.", en: "Colors: White, Cream, and Green — all shown on the EX2 model page with real unit photos. Confirm color stock via WhatsApp." },
      },
    ],
  },
  {
    slug: "geely-ex2-vs-wuling-bingo-ev",
    modelId: "ex2",
    geelyName: "GEELY EX2",
    rivalName: "Wuling Bingo EV",
    rivalPowertrain: { id: "Listrik", en: "Electric" },
    rivalPriceFrom: 250_000_000,
    rivalSpecs: [
      { id: "Listrik • ±31,9 kWh", en: "Electric • ±31.9 kWh" },
      { id: "Range ±301 km", en: "Range ±301 km" },
    ],
    title: "Geely EX2 vs Wuling Bingo EV — Hatchback Listrik Terbaik 2026?",
    description:
      "Geely EX2 vs Wuling Bingo EV: bandingkan harga indikatif, kapasitas baterai, dan jangkauan. Panduan memilih hatchback listrik Bogor & Jabodetabek.",
    h1: { id: "Geely EX2 vs Wuling Bingo EV", en: "Geely EX2 vs Wuling Bingo EV" },
    intro: {
      id: "Bingo EV populer karena harganya; EX2 membalas dengan baterai lebih besar dan jangkauan jauh lebih panjang. Inilah perbandingan indikatif dua hatchback listrik ringan ini.",
      en: "The Bingo EV is popular for its price; the EX2 answers with a bigger battery and far longer range. Here's the indicative comparison of these two compact EV hatchbacks.",
    },
    rows: [
      { label: { id: "Harga mulai (indikatif OTR)", en: "Price from (indicative OTR)" }, geely: "Rp 239,9 juta", rival: "Rp 250 juta" },
      { label: { id: "Powertrain", en: "Powertrain" }, geely: "Listrik", rival: "Listrik" },
      { label: { id: "Baterai", en: "Battery" }, geely: "±40 kWh", rival: "±31,9 kWh" },
      { label: { id: "Jangkauan (klaim)", en: "Range (claimed)" }, geely: "±398 km", rival: "±301 km" },
      { label: { id: "Tenaga", en: "Power" }, geely: "116 PS", rival: "±61–83 PS" },
    ],
    verdict: {
      id: "Selisih harga tipis, selisih kapabilitas besar: baterai ±40 kWh vs ±31,9 kWh, jangkauan ±398 vs ±301 km, tenaga 116 vs ±61–83 PS. Untuk pemakaian harian yang kadang keluar kota, perbedaan ini terasa nyata. Bingo tetap pilihan cerdas untuk murni city car.",
      en: "Thin price gap, big capability gap: ±40 vs ±31.9 kWh battery, ±398 vs ±301 km range, 116 vs ±61–83 PS. For daily use with occasional trips, this difference is tangible. The Bingo stays a smart pick for pure city duty.",
    },
    geelyEdges: [
      { id: "Baterai lebih besar (±40 kWh) dan jangkauan ±398 km", en: "Bigger battery (±40 kWh) with ±398 km range" },
      { id: "Tenaga 116 PS — lebih percaya diri di tanjakan & tol", en: "116 PS — more confident on climbs & tolls" },
      { id: "Frungk tambahan yang tidak dimiliki Bingo", en: "Extra frunk the Bingo doesn't have" },
    ],
    rivalEdges: [
      { id: "Ukuran paling ringkas untuk parkir sempit", en: "Most compact size for tight parking" },
      { id: "Reputasi jaringan layanan Wuling yang luas", en: "Wuling's broad service network reputation" },
    ],
    faqs: [
      {
        q: { id: "Selisih ±Rp 10 juta worth it untuk EX2?", en: "Is the ±Rp 10 million difference worth it for the EX2?" },
        a: { id: "Kalau mobilitasmu kadang melebihi ±50 km sehari atau ingin fleksibilitas perjalanan jauh, baterai & jangkauan lebih besar dari EX2 memberikan nilai lebih dalam pemakaian jangka panjang. Untuk murni antar-jemput kota pendek, Bingo cukup. Semua angka indikatif per September 2026.", en: "If your mobility occasionally exceeds ±50 km/day or you want long-trip flexibility, the EX2's bigger battery and range pay off long-term. For pure short city runs, the Bingo suffices. All figures indicative as of September 2026." },
      },
      {
        q: { id: "Mana yang lebih irit biaya per km?", en: "Which is cheaper per km?" },
        a: { id: "Keduanya listrik — biaya per km sangat murah dan bergantung tarif listrik rumahmu, bukan mereknya. Gunakan kalkulator hemat EV vs bensin di halaman model untuk menghitung skenario jarak harianmu.", en: "Both are electric — cost per km is very low and depends on your home electricity tariff, not the brand. Use the EV-vs-petrol calculator on the model page for your daily-distance scenario." },
      },
      {
        q: { id: "Bisa kredit untuk EX2? Berapa DP-nya?", en: "Can I finance the EX2? What's the down payment?" },
        a: { id: "Bisa. Umumnya DP mulai ±20% dengan tenor hingga 6 tahun tergantung kebijakan pembiayaan. Gunakan simulasi kredit di situs ini untuk gambaran awal, lalu chat WhatsApp untuk pengajuan.", en: "Yes. Typically from ±20% down with up to 6-year tenors depending on the financier. Use the on-site credit simulator for a first estimate, then chat via WhatsApp." },
      },
    ],
  },
  {
    slug: "geely-coolray-vs-honda-hr-v",
    modelId: "coolray",
    geelyName: "GEELY COOLRAY",
    rivalName: "Honda HR-V",
    rivalPowertrain: { id: "Bensin", en: "Petrol" },
    rivalPriceFrom: 290_000_000,
    rivalSpecs: [
      { id: "1.5L NA & Turbo", en: "1.5L NA & Turbo" },
      { id: "±119–177 PS", en: "±119–177 PS" },
    ],
    title: "Geely Coolray vs Honda HR-V — Perbandingan Crossover 2026",
    description:
      "Geely Coolray vs Honda HR-V: harga indikatif, tenaga 174 PS vs rival, transmisi 7DCT, dan fitur. Panduan memilih crossover turbo di Bogor & Jabodetabek.",
    h1: { id: "Geely Coolray vs Honda HR-V", en: "Geely Coolray vs Honda HR-V" },
    intro: {
      id: "Duel klasik crossover kompak turbo. HR-V dikenal karena efisiensi dan harga jual kembali; Coolray menyerang lewat tenaga dan fitur per rupiah. Rangkuman indikatifnya di sini.",
      en: "A classic compact-turbo-crossover duel. The HR-V is known for efficiency and resale value; the Coolray attacks with power and features per rupiah. Here's the indicative summary.",
    },
    rows: [
      { label: { id: "Harga mulai (indikatif OTR)", en: "Price from (indicative OTR)" }, geely: "Rp 333 juta", rival: "Rp 290 juta" },
      { label: { id: "Powertrain", en: "Powertrain" }, geely: "Bensin 1.5L Turbo", rival: "Bensin 1.5L NA & Turbo" },
      { label: { id: "Tenaga", en: "Power" }, geely: "174 PS • 290 Nm", rival: "±119–177 PS" },
      { label: { id: "Transmisi", en: "Gearbox" }, geely: "7DCT", rival: "CVT" },
      { label: { id: "Karakter", en: "Character" }, geely: "Sporty & responsif", rival: "Nyaman & efisien" },
    ],
    verdict: {
      id: "Kalau prioritasmu performa dan fitur di angka serupa, Coolray konsisten unggul di kertas. Kalau kamu mengutamakan biaya kepemilikan jangka panjang dan nama merek yang mapan, HR-V tetap berat. Test drive berdampingan adalah penentu paling jujur — jadwalkan keduanya bersama kami.",
      en: "If performance and features per rupiah lead your list, the Coolray consistently wins on paper. If long-term ownership cost and an established badge matter more, the HR-V remains strong. A side-by-side test drive is the most honest tiebreaker — book both with us.",
    },
    geelyEdges: [
      { id: "Tenaga 174 PS/290 Nm — tertinggi di kelas harga ini", en: "174 PS/290 Nm — among the highest in this price class" },
      { id: "7DCT responsif dengan paddle shift", en: "Responsive 7DCT with paddle shifters" },
      { id: "Fitur keselamatan & layar besar sebagai standar", en: "Safety suite & large screens as standard" },
    ],
    rivalEdges: [
      { id: "Efisiensi bahan bakar baik", en: "Good fuel efficiency" },
      { id: "Resale value & jaringan servis Honda teruji", en: "Proven Honda resale value & service network" },
    ],
    faqs: [
      {
        q: { id: "Apakah Coolray andal untuk pemakaian jangka panjang?", en: "Is the Coolray reliable for long-term use?" },
        a: { id: "Coolray sudah dipakai luas di Indonesia sejak 2019 dan mesin 1.5T-nya terus dikembangkan Geely secara global. Karena pembelian lewat dealer resmi, garansi resmi pabrikan berlaku penuh. Tanyakan paket servis & garansi terbaru saat konsultasi.", en: "The Coolray has been widely used in Indonesia since 2019 and its 1.5T engine keeps evolving globally. Purchases via official dealers carry the full manufacturer warranty. Ask about the latest service packages during consultation." },
      },
      {
        q: { id: "Mana yang lebih hemat bahan bakar?", en: "Which is more fuel efficient?" },
        a: { id: "HR-V NA umumnya lebih irit di kota karena tenaganya lebih kecil; Coolray 1.5T lebih boros saat digas agresif namun tetap wajar di cruize. Angka riil bergantung gaya nyetir — minta tips irit saat test drive dengan kami.", en: "The NA HR-V is generally thriftier in town due to lower output; the 1.5T Coolray drinks more when driven hard but stays reasonable cruising. Real numbers depend on your right foot — ask for tips during the test drive." },
      },
      {
        q: { id: "Bisa trade-in HR-V lama saya untuk Coolray?", en: "Can I trade in my old HR-V for a Coolray?" },
        a: { id: "Bisa. Kirim data mobil (merk, tipe, tahun, kondisi, foto) via WhatsApp — kami bantu estimasi nilai trade-in dan prosesnya bisa dipakai sebagai DP.", en: "Yes. Send your car's details (brand, model, year, condition, photos) via WhatsApp — we'll help estimate the trade-in value usable as down payment." },
      },
    ],
  },
  {
    slug: "geely-coolray-vs-toyota-yaris-cross",
    modelId: "coolray",
    geelyName: "GEELY COOLRAY",
    rivalName: "Toyota Yaris Cross",
    rivalPowertrain: { id: "Bensin & Hybrid", en: "Petrol & Hybrid" },
    rivalPriceFrom: 296_000_000,
    rivalSpecs: [
      { id: "1.5L NA & Hybrid", en: "1.5L NA & Hybrid" },
      { id: "±98–111 PS", en: "±98–111 PS" },
    ],
    title: "Geely Coolray vs Toyota Yaris Cross — Crossover Mana Pilihannya?",
    description:
      "Geely Coolray vs Toyota Yaris Cross: tenaga 174 PS vs efisiensi hybrid, harga indikatif, dan fitur. Perbandingan jujur untuk pembeli Jabodetabek.",
    h1: { id: "Geely Coolray vs Toyota Yaris Cross", en: "Geely Coolray vs Toyota Yaris Cross" },
    intro: {
      id: "Yaris Cross menawarkan opsi hybrid dengan reputasi Toyota; Coolray berdiri di kubu performa turbo. Keduanya crossover kompak — tapi karakternya jauh berbeda. Ini pemetaannya.",
      en: "The Yaris Cross brings hybrid options with Toyota's reputation; the Coolray stands in the turbo-performance camp. Both are compact crossovers — with very different characters. Here's the mapping.",
    },
    rows: [
      { label: { id: "Harga mulai (indikatif OTR)", en: "Price from (indicative OTR)" }, geely: "Rp 333 juta", rival: "Rp 296 juta" },
      { label: { id: "Powertrain", en: "Powertrain" }, geely: "Bensin 1.5L Turbo", rival: "Bensin & Hybrid 1.5L" },
      { label: { id: "Tenaga", en: "Power" }, geely: "174 PS • 290 Nm", rival: "±98–111 PS" },
      { label: { id: "Transmisi", en: "Gearbox" }, geely: "7DCT", rival: "CVT" },
      { label: { id: "Keunggulan inti", en: "Core strength" }, geely: "Performa & fitur", rival: "Efisiensi & reputasi merek" },
    ],
    verdict: {
      id: "Ini bukan soal mana yang 'menang' — tapi pola pakaimu. Butuh sensasi & fitur di harga serupa? Coolray. Prioritas BBM super hemat dan rebrand resale Toyota? Yaris Cross Hybrid. Kami bantu test drive keduanya supaya keputusanmu berdasar pengalaman, bukan brosur.",
      en: "This isn't about which 'wins' — it's your usage pattern. Need thrill & features at similar prices? Coolray. Prioritize fuel savings and Toyota resale? Yaris Cross Hybrid. We'll arrange both test drives so your decision is experience-based, not brochure-based.",
    },
    geelyEdges: [
      { id: "Tenaga jauh lebih besar (174 vs ±98–111 PS)", en: "Far more power (174 vs ±98–111 PS)" },
      { id: "Fitur kabin & infotainment lebih melimpah di kelasnya", en: "Richer cabin & infotainment features for the class" },
      { id: "Handling sporty yang menyenangkan dikendarai", en: "Sporty handling that's genuinely fun" },
    ],
    rivalEdges: [
      { id: "Opsi hybrid — konsumsi BBM super hemat", en: "Hybrid option — ultra-efficient fuel use" },
      { id: "Reputasi keandalan & resale Toyota", en: "Toyota's reliability & resale reputation" },
    ],
    faqs: [
      {
        q: { id: "Coolray turbo apa rentan panas di macet?", en: "Does the turbo Coolray overheat in traffic?" },
        a: { id: "Sistem pendinginan Coolray dirancang untuk iklim tropis dan sudah diuji di Indonesia sejak 2019. Perawatan rutin sesuai jadwal resmi adalah kuncinya. Tanyakan riwayat & paket servis saat konsultasi via WhatsApp.", en: "The Coolray's cooling system is designed for tropical climates and has been tested in Indonesia since 2019. Routine official-schedule maintenance is key. Ask about service history & packages during consultation." },
      },
      {
        q: { id: "Mana yang lebih murah dirawat?", en: "Which is cheaper to maintain?" },
        a: { id: "Ongkos servis keduanya kompetitif; suku cadang Coolray kini tersedia luas di Indonesia. Untuk estimasi biaya kepemilikan 5 tahun, chat kami — kami bantu hitungkan termasuk estimasi trade-in nanti.", en: "Both have competitive servicing; Coolray parts are now widely available in Indonesia. For a 5-year ownership estimate, chat with us — we'll compute it including future trade-in scenarios." },
      },
      {
        q: { id: "Apakah ada promo untuk Coolray bulan ini?", en: "Any Coolray promo this month?" },
        a: { id: "Promo berganti tiap bulan. Halaman promo kami menyajikan simulasi resmi 5 perusahaan pembiayaan — dan penawaran terbaru selalu bisa dikonfirmasi via WhatsApp.", en: "Promos rotate monthly. Our promo page shows official simulations from 5 finance companies — and the latest offers are always confirmable via WhatsApp." },
      },
    ],
  },
  {
    slug: "geely-starray-emi-vs-toyota-corolla-cross",
    modelId: "starray",
    geelyName: "GEELY STARRAY EM-i",
    rivalName: "Toyota Corolla Cross",
    rivalPowertrain: { id: "Bensin & Hybrid", en: "Petrol & Hybrid" },
    rivalPriceFrom: 420_000_000,
    rivalSpecs: [
      { id: "1.8L Bensin & Hybrid", en: "1.8L Petrol & Hybrid" },
      { id: "±138–140 PS", en: "±138–140 PS" },
    ],
    title: "Geely Starray EM-i vs Corolla Cross — SUV Hybrid 2026",
    description:
      "Geely Starray EM-i vs Toyota Corolla Cross: PHEV jangkauan hingga 1.000 km vs HEV mapan. Perbandingan harga & fitur indikatif untuk Jabodetabek.",
    h1: { id: "Geely Starray EM-i vs Toyota Corolla Cross", en: "Geely Starray EM-i vs Toyota Corolla Cross" },
    intro: {
      id: "Dua filosofi efisiensi: Starray EM-i pakai super hybrid PHEV dengan jangkauan gabungan hingga 1.000 km; Corolla Cross mengandalkan HEV mapan Toyota. Mana yang cocok untuk rutinitas panjangmu?",
      en: "Two efficiency philosophies: the Starray EM-i uses a PHEV super hybrid with up to 1,000 km combined range; the Corolla Cross leans on Toyota's established HEV. Which fits your long routine?",
    },
    rows: [
      { label: { id: "Harga mulai (indikatif OTR)", en: "Price from (indicative OTR)" }, geely: "Rp 499 juta", rival: "Rp 420 juta" },
      { label: { id: "Powertrain", en: "Powertrain" }, geely: "PHEV 1.5L + listrik", rival: "Bensin & HEV 1.8L" },
      { label: { id: "Kombinasi jangkauan (klaim)", en: "Combined range (claimed)" }, geely: "hingga 1.000 km", rival: "±1.000 km (BBM penuh)" },
      { label: { id: "Tenaga sistem", en: "System power" }, geely: "±262 hp", rival: "±138–140 PS" },
      { label: { id: "Isi daya eksternal", en: "Plug-in charging" }, geely: "Ya (plug-in)", rival: "Tidak (self-charging)" },
    ],
    verdict: {
      id: "Corolla Cross unggul dari harga masuk dan jaringan Toyota; Starray EM-i balas dengan tenaga sistem jauh lebih besar, kabin lebih lega, dan kemampuan plug-in untuk pemakaian listrik murni harian. Kalau rumahmu bisa pasang charger, EM-i praktis jadi 'mobil listrik' dengan pengaman bensin.",
      en: "The Corolla Cross wins on entry price and Toyota's network; the Starray EM-i answers with far more system power, a roomier cabin, and plug-in capability for daily pure-electric use. If home charging works for you, the EM-i is effectively an EV with a petrol safety net.",
    },
    geelyEdges: [
      { id: "Tenaga sistem ±262 hp — paling kencang di perbandingan ini", en: "±262 hp system output — the strongest here" },
      { id: "Plug-in: komute harian bisa murni listrik", en: "Plug-in: daily commutes can be pure electric" },
      { id: "Kabin SUV paling lega dengan fitur premium", en: "Roomiest SUV cabin with premium features" },
    ],
    rivalEdges: [
      { id: "Harga masuk lebih rendah", en: "Lower entry price" },
      { id: "Reputasi hybrid Toyota & jaringan layanan terluas", en: "Toyota hybrid reputation & widest service network" },
    ],
    faqs: [
      {
        q: { id: "Apakah Starray EM-i harus selalu di-charge?", en: "Does the Starray EM-i always need charging?" },
        a: { id: "Tidak. Sebagai PHEV, mesin bensinnya tetap bekerja — baterai bisa diisi pelan saat melaju. Charge di rumah hanya membuat pemakaian makin irit. Jadi tanpa charger sekalipun tetap nyaman dipakai.", en: "No. As a PHEV, its petrol engine keeps working — the battery charges while driving. Home charging just makes it cheaper to run. It's perfectly usable even without a charger." },
      },
      {
        q: { id: "Mana yang lebih cocok untuk perjalanan luar kota sering?", en: "Which suits frequent long trips?" },
        a: { id: "Keduanya mumpuni untuk jarak jauh. Starray EM-i memberi tenaga lebih besar untuk overtake bawa keluarga penuh; Corolla Cross terkenal stabil & hemat di cruize. Test drive rute tol favoritmu adalah uji paling adil.", en: "Both handle long distances well. The EM-i brings more power for fully-loaded overtakes; the Corolla Cross is famous for stable, efficient cruising. Test driving your favorite toll route is the fairest test." },
      },
      {
        q: { id: "Bagaimana DP dan angsuran Starray EM-i?", en: "What's the DP and installment for the Starray EM-i?" },
        a: { id: "Cek halaman promo & simulasi kredit di situs ini — ada simulasi resmi 5 perusahaan pembiayaan, termasuk untuk model Geely lain. Konfirmasi skema terbaik via WhatsApp.", en: "Check the promo & credit-simulator pages — official simulations from 5 finance companies are listed, including for other Geely models. Confirm the best scheme via WhatsApp." },
      },
    ],
  },
  {
    slug: "geely-starray-emi-vs-honda-crv",
    modelId: "starray",
    geelyName: "GEELY STARRAY EM-i",
    rivalName: "Honda CR-V",
    rivalPowertrain: { id: "Bensin & e:HEV", en: "Petrol & e:HEV" },
    rivalPriceFrom: 420_000_000,
    rivalSpecs: [
      { id: "2.0L NA • 1.5 Turbo • e:HEV", en: "2.0L NA • 1.5 Turbo • e:HEV" },
      { id: "±152–204 PS", en: "±152–204 PS" },
    ],
    title: "Geely Starray EM-i vs Honda CR-V — SUV Keluarga 2026",
    description:
      "Geely Starray EM-i vs Honda CR-V: PHEV ±262 hp vs SUV Honda mapan. Perbandingan harga indikatif, fitur, dan kenyamanan untuk keluarga Jabodetabek.",
    h1: { id: "Geely Starray EM-i vs Honda CR-V", en: "Geely Starray EM-i vs Honda CR-V" },
    intro: {
      id: "CR-V adalah standar emas SUV keluarga di Indonesia; Starray EM-i datang dengan pendekatan berbeda — super hybrid plug-in dengan kabin luas. Inilah perbandingan indikatif keduanya.",
      en: "The CR-V is Indonesia's gold-standard family SUV; the Starray EM-i arrives with a different approach — a plug-in super hybrid with a huge cabin. Here's the indicative comparison.",
    },
    rows: [
      { label: { id: "Harga mulai (indikatif OTR)", en: "Price from (indicative OTR)" }, geely: "Rp 499 juta", rival: "Rp 420 juta" },
      { label: { id: "Powertrain", en: "Powertrain" }, geely: "PHEV 1.5L + listrik", rival: "Bensin & e:HEV" },
      { label: { id: "Tenaga sistem", en: "System power" }, geely: "±262 hp", rival: "±152–204 PS" },
      { label: { id: "Plug-in", en: "Plug-in" }, geely: "Ya", rival: "Hanya varian e:HEV Tidak" },
      { label: { id: "Karakter", en: "Character" }, geely: "Hemat + senyap mode listrik", rival: "Halus & teruji" },
    ],
    verdict: {
      id: "CR-V membawa reputasi, resale value, dan jaringan Honda yang tidak bisa diremehkan. Starray EM-i menawarkan teknologi lebih baru, tenaga lebih besar, dan biaya operasional bisa jauh lebih murah bila rutin di-charge di rumah. Untuk keluarga yang banyak berkendara harian, matematika EM-i menarik — hitung bersama kami.",
      en: "The CR-V carries reputation, resale value, and Honda's network — not to be dismissed. The EM-i offers newer tech, more power, and potentially far lower running costs with routine home charging. For families driving daily, the EM-i math is compelling — compute it with us.",
    },
    geelyEdges: [
      { id: "Mode listrik senyap untuk komute harian", en: "Silent EV mode for daily commutes" },
      { id: "Tenaga sistem ±262 hp dengan kabin paling lega", en: "±262 hp with the roomiest cabin" },
      { id: "Biaya per km bisa jauh lebih murah (charge di rumah)", en: "Far cheaper per km with home charging" },
    ],
    rivalEdges: [
      { id: "Reputasi & resale value CR-V di pasar Indonesia", en: "CR-V reputation & resale value in Indonesia" },
      { id: "Jaringan servis Honda di seluruh Indonesia", en: "Honda service network across Indonesia" },
    ],
    faqs: [
      {
        q: { id: "Apakah Starray EM-i bisa jadi satu-satunya mobil keluarga?", en: "Can the Starray EM-i be the family's only car?" },
        a: { id: "Sangat bisa. Sebagai PHEV dengan jangkauan gabungan hingga 1.000 km, ia menjalankan dua peran: mobil listrik untuk harian dan mobil jauh tanpa cemas isi daya. Konsultasikan pola perjalanan keluargamu — kami cocokkan skenarionya.", en: "Absolutely. As a PHEV with up to 1,000 km combined range, it plays both roles: an EV for daily runs and a long-distance car without charging anxiety. Share your family's travel pattern — we'll match the scenario." },
      },
      {
        q: { id: "Perbandingan ruang kabin ketiganya?", en: "How do the cabins compare?" },
        a: { id: "Starray EM-i adalah SUV midsize dengan kabin paling lega di perbandingan ini; CR-V juga lega di kelasnya. Pengalaman duduk terbaik datang dari mencoba langsung — ajak keluarga ikut test drive.", en: "The Starray EM-i is a midsize SUV with the roomiest cabin here; the CR-V is also spacious for its class. The best verdict comes from sitting in both — bring the family to the test drive." },
      },
      {
        q: { id: "Bisa lihat langsung Starray EM-i di Bogor?", en: "Can I see the Starray EM-i in Bogor?" },
        a: { id: "Bisa. Unit & brosur bisa kami bawa ke lokasimu di Bogor & Jabodetabek — sambil test drive langsung. Jadwalkan via WhatsApp, gratis dan tanpa komitmen.", en: "Yes. We can bring the unit & brochures to your location in Bogor & Greater Jakarta — with an on-the-spot test drive. Schedule via WhatsApp, free and no commitment." },
      },
    ],
  },
];

/** Semua slug — untuk generateStaticParams & sitemap. */
export const COMPARE_SLUGS = COMPARES.map((c) => c.slug);

export function getCompare(slug: string): Comparison | undefined {
  return COMPARES.find((c) => c.slug === slug);
}

/** Perbandingan yang memuat model tertentu (untuk cross-link halaman model). */
export function comparesForModel(modelId: string): Comparison[] {
  return COMPARES.filter((c) => c.modelId === modelId);
}
