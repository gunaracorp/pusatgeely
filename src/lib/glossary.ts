/**
 * PUSAT GEELY — Glosarium istilah otomotif, EV/hybrid, & pembiayaan (entity-SEO).
 *
 * Halaman: /glosarium (server wrapper + JSON-LD DefinedTermSet di page.tsx,
 * daftar dirender oleh glossary-list.tsx yang useLang).
 *
 * ATURAN KONTEN (anti-fabrication):
 * - Definisi = pengetahuan umum otomotif/EV/pembiayaan, 2–4 kalimat, jawaban langsung.
 * - Angka hanya yang sudah terverifikasi dari data situs (src/lib/site.ts, stamp
 *   September 2026) atau konsep umum yang di-hedge dengan "umumnya/sering".
 * - TANPA klaim dealer resmi, harga karangan, atau pasal peraturan spesifik.
 * - `related` HANYA berisi route yang benar-benar ada di situs ini.
 */

export type GlossaryCategory = "ev" | "hybrid" | "performa" | "pembiayaan" | "umum";

export interface GlossaryTerm {
  slug: string;
  category: GlossaryCategory;
  term: { id: string; en: string };
  definition: { id: string; en: string };
  related?: { label: { id: string; en: string }; href: string }[];
}

export const GLOSSARY_CATEGORIES: { key: GlossaryCategory; label: { id: string; en: string } }[] = [
  { key: "ev", label: { id: "Mobil Listrik (EV)", en: "Electric Vehicles (EV)" } },
  { key: "hybrid", label: { id: "Hybrid", en: "Hybrid" } },
  { key: "performa", label: { id: "Performa & Spesifikasi", en: "Performance & Specs" } },
  { key: "pembiayaan", label: { id: "Pembiayaan & Kepemilikan", en: "Financing & Ownership" } },
  { key: "umum", label: { id: "Teknologi & Umum", en: "Tech & General" } },
];

const MODEL_EX5 = { label: { id: "GEELY EX5", en: "GEELY EX5" }, href: "/model/ex5" };
const MODEL_STARRAY = { label: { id: "Starray EM-i", en: "Starray EM-i" }, href: "/model/starray" };
const MODEL_COOLRAY = { label: { id: "GEELY Coolray", en: "GEELY Coolray" }, href: "/model/coolray" };
const MODEL_EX2 = { label: { id: "GEELY EX2", en: "GEELY EX2" }, href: "/model/ex2" };
const VS = { label: { id: "Perbandingan Model", en: "Model Comparison" }, href: "/vs" };
const ART_HARGA = {
  label: { id: "Panduan Harga 2026", en: "2026 Pricing Guide" },
  href: "/artikel/harga-geely-bogor-2026",
};
const ART_EMI = {
  label: { id: "EX5 vs Starray EM-i", en: "EX5 vs Starray EM-i" },
  href: "/artikel/ex5-vs-starray-emi",
};
const HARGA = { label: { id: "Harga Geely Bogor", en: "Geely Prices Bogor" }, href: "/harga-mobil-geely-bogor" };
const PROMO = { label: { id: "Promo Geely Bogor", en: "Geely Promos Bogor" }, href: "/promo-geely-bogor" };
const KONTAK = { label: { id: "Kontak Sena", en: "Contact Sena" }, href: "/kontak" };

export const GLOSSARY: GlossaryTerm[] = [
  // ── Mobil Listrik (EV) ────────────────────────────────────────────────
  {
    slug: "ev",
    category: "ev",
    term: { id: "EV (Mobil Listrik)", en: "EV (Electric Vehicle)" },
    definition: {
      id: "EV (electric vehicle) adalah mobil yang digerakkan sepenuhnya oleh motor listrik dengan energi dari baterai besar yang bisa diisi ulang — tidak ada mesin bensin sama sekali. Karena tidak membakar bahan bakar, EV tidak menghasilkan emisi knalpot dan jauh lebih senyap. Di Indonesia, pengisian bisa dilakukan di rumah lewat daya PLN atau di SPKLU. Di jajaran Geely, EX5 dan EX2 adalah mobil listrik murni.",
      en: "An EV (electric vehicle) is a car powered entirely by an electric motor drawing energy from a large rechargeable battery — there is no petrol engine at all. Because nothing is burned, EVs produce no tailpipe emissions and run far more quietly. In Indonesia you can charge at home from the PLN grid or at public charging stations (SPKLU). In the Geely lineup, the EX5 and EX2 are full EVs.",
    },
    related: [MODEL_EX5, MODEL_EX2],
  },
  {
    slug: "kwh",
    category: "ev",
    term: { id: "Kilowatt-hour (kWh)", en: "Kilowatt-hour (kWh)" },
    definition: {
      id: "Kilowatt-hour (kWh) adalah satuan kapasitas energi baterai — ibarat \"ukuran tangki\" pada mobil listrik. Makin besar angkanya, makin banyak listrik yang bisa disimpan, dan itu berpengaruh langsung ke jarak tempuh. Sebagai gambaran di jajaran Geely: EX5 memakai baterai 60,22 kWh sedangkan EX2 sekitar 40 kWh.",
      en: "A kilowatt-hour (kWh) is the unit of battery energy capacity — think of it as the \"tank size\" of an electric car. The bigger the number, the more electricity the pack can store, which strongly influences driving range. As a reference in the Geely lineup: the EX5 carries a 60.22 kWh battery while the EX2 is around 40 kWh.",
    },
    related: [MODEL_EX5, MODEL_EX2],
  },
  {
    slug: "state-of-charge",
    category: "ev",
    term: { id: "State of Charge (SOC)", en: "State of Charge (SOC)" },
    definition: {
      id: "State of Charge (SOC) adalah sisa energi baterai yang dinyatakan dalam persen — padanan jarum bahan bakar pada mobil konvensional. 100% artinya penuh, 0% praktis habis. Banyak produsen menyarankan berhenti fast charging di kisaran 80% karena pengisian melambat mendekati penuh demi melindungi sel, dan menyimpan mobil dengan SOC menengah membantu baterai lebih awet.",
      en: "State of Charge (SOC) is the remaining battery energy expressed as a percentage — the EV equivalent of a fuel gauge. 100% means full, 0% means practically empty. Many manufacturers recommend stopping DC fast charging around 80% because charging slows near full to protect the cells, and storing the car at a moderate SOC helps the battery last longer.",
    },
    related: [MODEL_EX5, MODEL_EX2],
  },
  {
    slug: "lfp",
    category: "ev",
    term: { id: "Baterai LFP", en: "LFP Battery" },
    definition: {
      id: "LFP (lithium iron phosphate) adalah jenis kimia baterai lithium yang populer pada mobil listrik pasar massal. Dibanding varian NMC, LFP dikenal lebih tahan terhadap pengisian penuh yang sering, lebih stabil secara termal, dan umumnya lebih terjangkau — komprominya kepadatan energi lebih rendah sehingga butuh ruang lebih besar untuk kapasitas yang sama.",
      en: "LFP (lithium iron phosphate) is a lithium battery chemistry widely used in modern mass-market EVs. Compared with NMC-type packs, LFP is known for tolerating frequent full charges, being more thermally stable, and generally costing less — the trade-off is lower energy density, so a pack needs more space for the same capacity.",
    },
    related: [MODEL_EX5, MODEL_EX2],
  },
  {
    slug: "bms",
    category: "ev",
    term: { id: "Battery Management System (BMS)", en: "Battery Management System (BMS)" },
    definition: {
      id: "BMS adalah \"otak\" yang mengawasi paket baterai: memastikan tiap sel terisi dan terkuras merata, suhu terjaga, serta memutus aliran saat ada kondisi berbahaya. Sistem inilah yang juga menghitung sisa daya (SOC) yang tampil di panel instrumen. Kualitas BMS berpengaruh besar pada keamanan dan umur panjang baterai.",
      en: "The BMS (battery management system) is the \"brain\" watching over the battery pack: it keeps every cell charging and discharging evenly, monitors temperature, and cuts power under unsafe conditions. It is also what calculates the remaining charge shown on your dashboard. A well-engineered BMS is central to battery safety and longevity.",
    },
    related: [MODEL_EX5, ART_EMI],
  },
  {
    slug: "v2l",
    category: "ev",
    term: { id: "V2L (Vehicle-to-Load)", en: "V2L (Vehicle-to-Load)" },
    definition: {
      id: "V2L (vehicle-to-load) membuat mobil listrik menjadi sumber listrik portabel: Anda bisa mencolok peralatan — kipas, kettle, peralatan camping — langsung dari mobil. Praktis untuk piknik, mati listrik sesaat di rumah, atau bekerja di luar ruangan. Energi yang terpakai otomatis mengurangi sisa baterai untuk berkendara.",
      en: "V2L (vehicle-to-load) turns an electric car into a portable power source: you can plug appliances — a fan, kettle, camping gear — directly into the vehicle. Handy for picnics, short power cuts at home, or working outdoors. Whatever energy is used is simply deducted from the battery available for driving.",
    },
    related: [MODEL_EX5, MODEL_EX2],
  },
  {
    slug: "regenerative-braking",
    category: "ev",
    term: { id: "Rem Regeneratif", en: "Regenerative Braking" },
    definition: {
      id: "Rem regeneratif mengubah energi pengereman menjadi listrik yang mengisi kembali baterai, alih-alih terbuang sebagai panas seperti rem biasa. Inilah alasan mobil listrik dan hybrid sangat efisien di lalu lintas macet. Rasanya seperti pengereman mesin saat kaki dicabut dari pedal gas — pada banyak model, intensitasnya bisa diatur.",
      en: "Regenerative braking converts braking energy into electricity that recharges the battery instead of wasting it as heat, as a conventional brake does. This is why EVs and hybrids are so efficient in stop-and-go traffic. You feel it as gentle engine-braking when you lift off the accelerator — on many cars its intensity can be adjusted.",
    },
    related: [MODEL_EX5, MODEL_STARRAY],
  },
  {
    slug: "dc-fast-charging",
    category: "ev",
    term: { id: "DC Fast Charging", en: "DC Fast Charging" },
    definition: {
      id: "DC fast charging mengisi baterai langsung dengan arus searah (DC) berdaya besar, sehingga persentase isi bisa naik jauh dalam hitungan puluhan menit. Di Indonesia tersedia di SPKLU fast charging, umumnya di rest area, mal, atau stasiun pengisian khusus. Pengisian paling cepat terjadi saat baterai masih kosong-menengah, lalu melambat mendekati penuh untuk melindungi sel.",
      en: "DC fast charging feeds the battery directly with high-power direct current (DC), raising the state of charge substantially within tens of minutes. In Indonesia it is available at fast-charging SPKLU points, typically at rest areas, malls, and dedicated charging stations. Charging is fastest when the battery is relatively empty and slows down as it approaches full to protect the cells.",
    },
    related: [MODEL_EX5, MODEL_EX2],
  },
  {
    slug: "ac-charging",
    category: "ev",
    term: { id: "AC Charging", en: "AC Charging" },
    definition: {
      id: "AC charging mengisi baterai lewat arus bolak-balik (AC) — seperti listrik rumah atau wallbox — dengan daya yang lebih kecil dibanding DC. Cara ini paling cocok untuk pengisian semalam di rumah atau parkir kantor yang berlangsung berjam-jam. Karena lebih pelan, pengisian AC juga lebih ramah terhadap kesehatan baterai dalam jangka panjang.",
      en: "AC charging fills the battery through alternating current (AC) — home power or a wallbox — at lower power than DC. It suits overnight charging at home or long parking at the office. Slower charging is also gentler on long-term battery health.",
    },
    related: [MODEL_EX2, MODEL_EX5],
  },
  {
    slug: "frunk",
    category: "ev",
    term: { id: "Frunk (Bagasi Depan)", en: "Frunk (Front Trunk)" },
    definition: {
      id: "Frunk adalah \"front trunk\" — ruang bagasi tambahan di bagian depan mobil, tepat di tempat mesin biasa berada pada mobil bensin. Karena motor listrik kompak, EV punya ruang bebas ini untuk tas belanja, kabel charger, atau barang kotor yang tak mau menumpuk di kabin. Bonus praktis yang jarang ada pada mobil bensin.",
      en: "A frunk is a \"front trunk\" — extra luggage space under the front hood where a petrol engine would normally sit. Because electric motors are compact, EVs gain this handy cubby for groceries, charging cables, or dirty gear you would rather keep out of the cabin. A practical bonus most petrol cars simply cannot offer.",
    },
    related: [MODEL_EX2, MODEL_EX5],
  },
  {
    slug: "jangkauan-range",
    category: "ev",
    term: { id: "Jangkauan (Range)", en: "Range" },
    definition: {
      id: "Jangkauan atau range adalah jarak maksimum yang bisa ditempuh dengan sekali pengisian penuh. Angka di brosur diukur dengan siklus uji standar (misalnya NEDC atau WLTP) di kondisi ideal, sehingga pemakaian nyata — AC, muatan, kecepatan tol, hawa panas — biasanya menghasilkan angka lebih rendah. Untuk pemakaian harian Jabodetabek yang relatif pendek, range mobil listrik modern umumnya lebih dari cukup; hitung saja dengan margin kenyamanan.",
      en: "Range is the maximum distance a car can travel on one full charge. Brochure figures are measured under standard test cycles (such as NEDC or WLTP) in ideal conditions, so real-world use — air conditioning, load, highway speed, tropical heat — usually yields less. For relatively short daily driving around Jabodetabek, modern EV ranges are generally more than enough; just plan with a comfort margin.",
    },
    related: [ART_EMI, MODEL_EX5],
  },

  // ── Hybrid ────────────────────────────────────────────────────────────
  {
    slug: "super-hybrid-hev",
    category: "hybrid",
    term: { id: "Super Hybrid (HEV)", en: "Super Hybrid (HEV)" },
    definition: {
      id: "HEV (hybrid electric vehicle) menggabungkan mesin bensin dan motor listrik dalam satu sistem yang saling membantu — baterai terisi otomatis dari mesin dan rem regeneratif, tanpa perlu dicolok. Istilah \"super hybrid\" biasanya menegaskan porsi kerja motor listrik yang besar sehingga konsumsi BBM di kota sangat hemat. Cocok bagi yang ingin efisiensi ala EV tanpa mengubah kebiasaan isi bahan bakar.",
      en: "An HEV (hybrid electric vehicle) pairs a petrol engine with an electric motor that support each other — the battery recharges itself from the engine and regenerative braking, no plug needed. The label \"super hybrid\" usually emphasizes a large share of electric work, which makes city fuel consumption very frugal. It suits buyers who want EV-like efficiency without changing refueling habits.",
    },
    related: [MODEL_STARRAY, VS],
  },
  {
    slug: "phev",
    category: "hybrid",
    term: { id: "PHEV (Plug-in Hybrid)", en: "PHEV (Plug-in Hybrid)" },
    definition: {
      id: "PHEV (plug-in hybrid electric vehicle) adalah hybrid yang baterainya bisa diisi langsung dari colokan — rumah atau SPKLU — dan mampu berjalan murni listrik untuk jarak tertentu sebelum mesin bensin masuk. Hasilnya: perjalanan harian pendek nyaris tanpa bensin, sementara perjalanan jauh tetap bebas cemas karena mesin tetap tersedia. Starray EM-i di jajaran Geely termasuk kategori ini.",
      en: "A PHEV (plug-in hybrid electric vehicle) is a hybrid whose battery can be charged directly from an outlet — home or SPKLU — and can drive on pure electricity for a certain distance before the petrol engine joins in. Short daily trips become almost gasoline-free, while long journeys stay worry-free because the engine is always there. The Starray EM-i in the Geely lineup belongs to this category.",
    },
    related: [MODEL_STARRAY, ART_EMI],
  },
  {
    slug: "e-cvt",
    category: "hybrid",
    term: { id: "E-CVT", en: "e-CVT" },
    definition: {
      id: "E-CVT (electronic continuously variable transmission) adalah transmisi tanpa perpindahan gigi pada mobil hybrid yang mencampur daya mesin dan motor listrik sehingga akselerasi terasa mulus dan senyap. Berbeda dari CVT konvensional yang memakai sabuk dan puli, e-CVT bekerja lewat pengaturan elektronik atas dua sumber tenaga. Karena tak ada perpindahan gigi, tidak ada pula rasa tersentak.",
      en: "An e-CVT (electronic continuously variable transmission) is the gearless transmission used in many hybrids, blending engine and motor power so acceleration feels smooth and quiet. Unlike a conventional belt-and-pulley CVT, an e-CVT works through electronic control of the two power sources. With no gear shifts, there is nothing to jolt.",
    },
    related: [MODEL_STARRAY, VS],
  },

  // ── Performa & Spesifikasi ────────────────────────────────────────────
  {
    slug: "horsepower",
    category: "performa",
    term: { id: "Horsepower (DK / hp)", en: "Horsepower (hp)" },
    definition: {
      id: "Horsepower (hp), sering ditulis DK (daya kuda) di Indonesia, adalah ukuran tenaga maksimum yang dihasilkan mesin atau motor listrik — makin besar, makin kuat potensi akselerasinya. Motor listrik menghasilkan torsi penuh seketika sehingga angka hp-nya terasa lebih \"hidup\" saat dikendarai. Sebagai pembanding di jajaran Geely: EX5 sekitar 218 hp dan Coolray 174 PS.",
      en: "Horsepower (hp), often written DK (daya kuda) in Indonesia, measures the maximum power an engine or electric motor produces — the higher, the stronger the potential acceleration. Electric motors deliver full torque instantly, so their hp figure feels more alive on the road. As reference points in the Geely lineup: the EX5 produces about 218 hp and the Coolray 174 PS.",
    },
    related: [MODEL_EX5, MODEL_COOLRAY],
  },
  {
    slug: "torsi",
    category: "performa",
    term: { id: "Torsi", en: "Torque" },
    definition: {
      id: "Torsi adalah gaya putar yang mendorong mobil bergerak — yang Anda rasakan saat menarik dari posisi berhenti atau menanjak. Pada motor listrik, torsi maksimum tersedia sejak putaran nol sehingga responsnya instan; pada mesin bensin, torsi baru maksimum pada putaran tertentu. Coolray, misalnya, menghasilkan 290 Nm dari mesin turbo 1.5L-nya.",
      en: "Torque is the rotational force that moves the car — what you feel when pulling away from a stop or climbing a hill. An electric motor offers maximum torque from zero RPM, so the response is instant; a petrol engine reaches peak torque only at certain revs. The Coolray, for example, produces 290 Nm from its 1.5L turbo engine.",
    },
    related: [MODEL_COOLRAY, VS],
  },
  {
    slug: "dct",
    category: "performa",
    term: { id: "DCT (Dual-Clutch Transmission)", en: "DCT (Dual-Clutch Transmission)" },
    definition: {
      id: "DCT (dual-clutch transmission) memakai dua kopling yang bergantian menyiapkan gigi berikutnya, sehingga perpindahan gigi cepat dan tanpa pedal kopling. Karakternya gesit dan efisien dibanding otomatis konvensional, meski di macet total bisa terasa sedikit tersentak pada beberapa model. Coolray memakai transmisi 7DCT — tujuh percepatan dengan teknologi ini.",
      en: "A DCT (dual-clutch transmission) uses two clutches that take turns preparing the next gear, so shifts are quick and there is no clutch pedal. Its character is sporty and efficient compared with a conventional automatic, though in heavy total gridlock some models can feel slightly jerky. The Coolray uses a 7DCT — seven speeds with this technology.",
    },
    related: [MODEL_COOLRAY],
  },
  {
    slug: "ground-clearance",
    category: "performa",
    term: { id: "Ground Clearance", en: "Ground Clearance" },
    definition: {
      id: "Ground clearance adalah jarak antara titik terendah mobil (biasanya underbody) dengan permukaan jalan. Makin tinggi, makin lega menembus polisi tidur, banjir dangkal, dan jalan rusak — hal yang akrab di banyak kawasan Bogor dan sekitarnya. Komprominya, mobil lebih mudah goyang di tikungan dan posisi naik lebih tinggi.",
      en: "Ground clearance is the distance between the car's lowest point (usually the underbody) and the road surface. The higher it is, the easier speed bumps, shallow flooding, and broken roads become — familiar conditions around Bogor and its surroundings. The trade-off is a taller center of gravity and a higher step to get in.",
    },
    related: [VS, MODEL_COOLRAY],
  },

  // ── Pembiayaan & Kepemilikan ──────────────────────────────────────────
  {
    slug: "otr",
    category: "pembiayaan",
    term: { id: "Harga OTR (On The Road)", en: "OTR (On The Road) Price" },
    definition: {
      id: "OTR (on the road) adalah harga mobil siap pakai: sudah termasuk BBM awal, dokumen, biaya pengurusan (BBN), dan komponen lain agar mobil bisa langsung dijalankan di jalan. Angka OTR inilah yang menjadi dasar perhitungan DP dan angsuran — bukan harga \"mobilnya\" saja. Selisih antar kota bisa terjadi karena komponen biaya wilayah berbeda.",
      en: "OTR (on the road) is the ready-to-drive price: it already includes initial fuel, document and registration costs (BBN), and other items so the car can be driven straight away. OTR is the figure used to calculate down payments and installments — not just the \"bare\" car price. Prices can differ between cities because regional cost components vary.",
    },
    related: [HARGA, ART_HARGA],
  },
  {
    slug: "uang-muka-dp",
    category: "pembiayaan",
    term: { id: "Uang Muka (DP)", en: "Down Payment (DP)" },
    definition: {
      id: "Uang muka (DP) adalah porsi harga yang Anda bayar di depan saat kredit; sisanya dibiayai perusahaan pembiayaan. Semakin besar DP, semakin kecil pokok pinjaman — dan biasanya semakin ringan beban bunganya. Ingat juga asuransi tahun pertama dan dokumen yang masuk dalam TDP (total down payment), jadi minta rinciannya, bukan hanya angka DP-nya.",
      en: "The down payment (DP) is the portion of the price you pay upfront when financing; the rest is carried by the finance company. A bigger DP means a smaller principal — and usually a lighter interest burden. Keep in mind the first-year insurance and documents that make up the TDP (total down payment), so ask for the full breakdown, not just the DP number.",
    },
    related: [HARGA, PROMO],
  },
  {
    slug: "tenor",
    category: "pembiayaan",
    term: { id: "Tenor", en: "Loan Tenor" },
    definition: {
      id: "Tenor adalah jangka waktu kredit, biasanya dihitung dalam bulan — di Indonesia umumnya berkisar 12 hingga 60 bulan untuk mobil baru. Tenor panjang membuat cicilan bulanan ringan, tetapi total bunga yang dibayar lebih besar; tenor pendek sebaliknya. Pilih berdasarkan arus kas bulanan Anda, bukan sekadar cicilan termurah.",
      en: "Tenor is the loan period, usually counted in months — in Indonesia commonly between 12 and 60 months for a new car. A long tenor makes the monthly installment light but raises the total interest paid; a short tenor does the opposite. Choose based on your monthly cash flow, not merely the cheapest installment.",
    },
    related: [HARGA, ART_HARGA],
  },
  {
    slug: "bunga-flat",
    category: "pembiayaan",
    term: { id: "Bunga Flat", en: "Flat Interest Rate" },
    definition: {
      id: "Bunga flat dihitung dari pokok pinjaman yang tetap sepanjang tenor, sehingga cicilan per bulan selalu sama dan mudah diprediksi. Ini berbeda dengan bunga efektif/anuitas yang basisnya mengecil seiring sisa pokok — tampak lebih tinggi di awal tetapi totalnya sering lebih murah. Saat membandingkan penawaran, pastikan dulu jenis bunganya sama; membandingkan flat dengan efektif itu menyesatkan.",
      en: "Flat interest is calculated on the original principal throughout the tenor, so the monthly installment stays identical and easy to predict. It differs from effective/annuity interest, whose base shrinks with the remaining principal — it looks higher at first but often costs less overall. When comparing offers, make sure both figures are the same type; comparing flat against effective is misleading.",
    },
    related: [ART_HARGA, KONTAK],
  },
  {
    slug: "asuransi-comprehensive",
    category: "pembiayaan",
    term: { id: "Asuransi Comprehensive (All Risk)", en: "Comprehensive (All Risk) Insurance" },
    definition: {
      id: "Asuransi comprehensive — sering disebut all risk — menanggung kerusakan mobil mulai dari tabrakan ringan sampai kehilangan, sesuai polis. Umumnya diwajibkan perusahaan pembiayaan pada tahun-tahun awal kredit dan menjadi komponen TDP tahun pertama. Perhatikan nilai pertanggungan dan reputasi klaim perusahaan asuransinya, bukan hanya premi tahunannya.",
      en: "Comprehensive insurance — often called all risk — covers damage ranging from minor collisions to theft, depending on the policy. It is usually required by the finance company in the early years of a loan and becomes part of the first-year TDP. Look at the coverage value and the insurer's claims reputation, not just the annual premium.",
    },
    related: [HARGA, KONTAK],
  },
  {
    slug: "asuransi-tlo",
    category: "pembiayaan",
    term: { id: "Asuransi TLO", en: "TLO Insurance" },
    definition: {
      id: "TLO (total loss only) hanya menanggung kerugian total — mobil hilang, atau rusak ketika biaya perbaikan melebihi batas persentase nilai mobil yang ditentukan polis. Preminya jauh lebih murah daripada comprehensive, karena itu kerap dipakai untuk mobil berusia di atas lima tahun. Kerusakan ringan sampai menengah ditanggung sendiri oleh pemilik.",
      en: "TLO (total loss only) insurance covers only total losses — a stolen car, or damage when repair costs exceed the percentage of the vehicle's value stated in the policy. Its premium is much cheaper than comprehensive, which is why it is often chosen for cars over five years old. Light to moderate damage is then borne by the owner.",
    },
    related: [HARGA, KONTAK],
  },
  {
    slug: "trade-in",
    category: "pembiayaan",
    term: { id: "Trade-in", en: "Trade-in" },
    definition: {
      id: "Trade-in adalah menukar mobil lama sebagai bagian pembayaran mobil baru — nilai mobil lama dipotongkan langsung dari uang muka. Jalurnya jauh lebih cepat daripada jual sendiri, tanpa memasang iklan dan menerima telepon calon pembeli. Untuk penilaian terbaik, siapkan BPKB, STNK, buku servis, dan kondisi mobil yang rapi.",
      en: "Trade-in is exchanging your old car as part of the payment for a new one — the old car's appraisal value is deducted directly from the down payment. The route is far faster than selling privately, with no listings and no calls from strangers. For the best appraisal, prepare the BPKB, STNK, service book, and a clean car.",
    },
    related: [PROMO, HARGA],
  },
  {
    slug: "pajak-progresif-stnk",
    category: "pembiayaan",
    term: { id: "Pajak Progresif (STNK)", en: "Progressive Vehicle Tax (STNK)" },
    definition: {
      id: "Pajak progresif adalah kenaikan tarif pajak kendaraan bermotor ketika satu nama sudah memiliki lebih dari satu kendaraan — kepemilikan kedua, ketiga, dan seterusnya kena tarif makin tinggi. Kewenangannya di tangan pemerintah daerah, jadi detail perhitungannya bisa berbeda antar wilayah. Cek status kepemilikan sebelum perpanjangan STNK di Samsat agar tagihannya tidak mengejutkan.",
      en: "Progressive tax is the rising motor-vehicle tax rate applied when one owner already holds more than one vehicle — the second, third, and so on are taxed at increasingly high rates. The authority lies with regional governments, so the exact calculation can differ between areas. Check your ownership status before renewing the STNK at the Samsat so the bill does not surprise you.",
    },
    related: [HARGA, KONTAK],
  },

  // ── Teknologi & Umum ──────────────────────────────────────────────────
  {
    slug: "adas",
    category: "umum",
    term: { id: "ADAS", en: "ADAS" },
    definition: {
      id: "ADAS (advanced driver assistance systems) adalah kumpulan fitur bantu pengemudi — contohnya peringatan tabrakan, pengereman darurat otomatis, asisten di jalur, dan kamera 360 derajat. Tingkat kemampuannya berbeda antar model dan merek, dan pengemudi tetap jadi pengambil keputusan akhir. Untuk pemula, fitur ini menambah lapisan aman, bukan pengganti kewaspadaan.",
      en: "ADAS (advanced driver assistance systems) is a family of driver-assistance features — for example collision warning, automatic emergency braking, lane assistance, and 360-degree cameras. Their capability varies between models and brands, and the driver remains the final decision-maker. For beginners, these features add a layer of safety rather than replace attention.",
    },
    related: [MODEL_EX5, VS],
  },
  {
    slug: "ota-update",
    category: "umum",
    term: { id: "OTA Update", en: "OTA Update" },
    definition: {
      id: "OTA (over-the-air) update memperbarui perangkat lunak mobil lewat koneksi internet — seperti pembaruan aplikasi di ponsel — tanpa perlu ke bengkel. Pembaruan bisa berisi perbaikan, antarmuka baru, atau penyempurnaan fitur tertentu. Mobil yang rutin diperbarui terasa makin segar karena kemampuannya berkembang seiring waktu.",
      en: "An OTA (over-the-air) update refreshes the car's software over an internet connection — like app updates on a phone — without visiting a workshop. Updates can bring fixes, a new interface, or refinements to certain features. A regularly updated car keeps feeling fresh because its capabilities grow over time.",
    },
    related: [MODEL_EX5, MODEL_EX2],
  },
];
