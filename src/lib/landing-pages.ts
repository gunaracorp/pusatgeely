/**
 * ⭐ Lapisan data 8 halaman SEO landing (pintu masuk pencarian).
 *
 * Setiap halaman menjawab SATU niat pembeli (buyer intent) — sesuai
 * strategi arsitektur pencarian: bukan halaman tipis pengulangan
 * kata kunci, melainkan halaman berdiri sendiri dengan konten
 * orisinal, data indikatif yang jujur, FAQ nyata, dan tautan
 * internal yang relevan.
 *
 * Menambah halaman landing baru = menambah 1 entri di sini →
 * route SSG, metadata, sitemap, dan JSON-LD mengikuti otomatis.
 */

export interface Bi {
  id: string;
  en: string;
}

export interface LandingFaq {
  q: Bi;
  a: Bi;
}

export interface LandingSection {
  heading: Bi;
  paragraphs: Bi[];
  bullets?: Bi[];
}

export interface LandingRelated {
  href: string;
  label: Bi;
}

export interface LandingPage {
  slug: string;
  /** Komentar internal: niat pencari yang dijawab halaman ini. */
  intent: string;
  /** Prioritas sitemap (0–1). */
  priority: number;
  title: Bi;
  description: Bi;
  h1: Bi;
  lead: Bi[];
  chips: Bi[];
  /** Bila diisi: tabel harga varian otomatis dari MODELS + simulator kredit. */
  modelId?: string;
  /** Sisipkan PromoSection (tabel program pembiayaan). */
  embedPromos?: boolean;
  /** Sisipkan FinancingSimulator interaktif. */
  embedSimulator?: boolean;
  /** Sisipkan TestDriveSection (form). */
  embedTestDrive?: boolean;
  sections: LandingSection[];
  faq: LandingFaq[];
  related: LandingRelated[];
  ogImage: string;
}

const WA_NOTE: Bi = {
  id: "Semua angka pada halaman ini bersifat indikatif berdasarkan riset sumber publik per September 2026. Konfirmasi harga, promo, dan ketersediaan terbaru langsung via WhatsApp.",
  en: "All figures on this page are indicative based on public-source research as of September 2026. Confirm the latest prices, promos, and availability directly via WhatsApp.",
};

export const LANDING_PAGES: LandingPage[] = [
  /* ── 1. PRIORITY: Sales Geely Bogor ─────────────────────────── */
  {
    slug: "sales-geely-bogor",
    intent: "Calon pembeli ingin langsung menghubungi tenaga penjualan Geely di Bogor.",
    priority: 0.95,
    title: {
      id: "Sales Geely Bogor | Harga dan Konsultasi Pembelian Mobil",
      en: "Geely Sales Bogor | Prices and Car Purchase Consultation",
    },
    description: {
      id: "Hubungi sales konsultan Geely Bogor — Sena Sulaeman. Konsultasi gratis memilih model, simulasi cicilan, info promo terbaru, dan dampingi test drive di Bogor & Jabodetabek via WhatsApp.",
      en: "Talk to a Geely sales consultant in Bogor — Sena Sulaeman. Free consultation on choosing a model, installment simulation, latest promos, and test-drive assistance in Bogor & Greater Jakarta via WhatsApp.",
    },
    h1: {
      id: "Sales Geely Bogor — Konsultasi Pembelian Tanpa Biaya",
      en: "Geely Sales Bogor — Purchase Consultation at No Cost",
    },
    lead: [
      {
        id: "Anda mencari sales Geely di Bogor karena ingin berbicara dengan orang yang paham produk, bukan sekadar mengisi formulir online. Di sini Anda langsung terhubung dengan Sena Sulaeman, konsultan penjualan yang setiap hari mendampingi calon pembeli Geely di Bogor Kota, Kabupaten Bogor, Depok, dan seluruh Jabodetabek. Konsultasi dimulai dari kebutuhan Anda: jarak tempuh harian, jumlah penumpang, anggaran, dan preferensi bahan bakar atau listrik.",
        en: "You are looking for a Geely sales contact in Bogor because you want to talk to someone who understands the product — not just fill in an online form. Here you connect directly with Sena Sulaeman, a sales consultant who daily assists Geely buyers across Bogor City, Bogor Regency, Depok, and the whole Greater Jakarta area. Consultation starts from your needs: daily distance, passenger count, budget, and fuel or electric preference.",
      },
      {
        id: "Peran konsultan independen adalah memastikan Anda memilih varian yang tepat sebelum uang keluar: membandingkan harga antar varian, menghitung estimasi cicilan, mengecek program promo pembiayaan yang sedang berlaku, dan mengatur jadwal test drive. Tidak ada biaya jasa untuk Anda sebagai pembeli — dan seluruh proses pembelian resmi tetap dijalankan melalui jaringan dealer resmi Geely Indonesia.",
        en: "The role of an independent consultant is to make sure you pick the right variant before money leaves your pocket: comparing prices between variants, estimating installments, checking currently active financing promos, and arranging a test drive. There is no service fee for you as a buyer — and the official purchase process is still carried out through Geely Indonesia's official dealer network.",
      },
    ],
    chips: [
      { id: "Sena Sulaeman · Konsultan Penjualan", en: "Sena Sulaeman · Sales Consultant" },
      { id: "WhatsApp +62 816-6111-42", en: "WhatsApp +62 816-6111-42" },
      { id: "Bogor & Jabodetabek", en: "Bogor & Greater Jakarta" },
      { id: "Setiap hari 08.00–20.00 WIB", en: "Daily 08:00–20:00 WIB" },
    ],
    sections: [
      {
        heading: { id: "Apa yang dibantu oleh sales konsultan?", en: "What does the sales consultant help with?" },
        paragraphs: [
          {
            id: "Layanan dimulai jauh sebelum tanda tangan dan tidak berhenti saat unit tiba. Pada tahap awal, konsultan membantu memetakan kebutuhan ke model yang paling cocok — misalnya membedakan kapan SUV listrik seperti EX5 lebih masuk akal daripada super hybrid Starray EM-i, atau kapan hatchback EX2 sudah cukup untuk pola harian Anda.",
            en: "The service starts long before any signature and does not end when the car arrives. Early on, the consultant helps map your needs to the most suitable model — for example, when an electric SUV like the EX5 makes more sense than the Starray EM-i super hybrid, or when the EX2 hatchback is already enough for your daily pattern.",
          },
          {
            id: "Setelah model terpilih, pendampingan berlanjut ke bagian yang paling sering membingungkan pembeli pertama: simulasi angsuran dengan uang muka realistis, perbandingan program dari beberapa perusahaan pembiayaan, estimasi biaya asuransi, hingga pengecekan nilai trade-in untuk kendaraan lama Anda. Saat unit siap, konsultan juga mendampingi proses serah terima dan menjelaskan fitur utama langsung di lokasi.",
            en: "Once a model is chosen, assistance continues to the parts that most confuse first-time buyers: installment simulation with a realistic down payment, comparing programs from several finance companies, insurance cost estimates, up to checking the trade-in value of your old vehicle. When the unit is ready, the consultant also accompanies the handover and explains the key features on site.",
          },
        ],
        bullets: [
          { id: "Konsultasi pemilihan model & varian sesuai kebutuhan harian", en: "Consultation on choosing the right model & variant for daily needs" },
          { id: "Simulasi cicilan: DP, tenor, dan estimasi bunga", en: "Installment simulation: down payment, tenor, and estimated rate" },
          { id: "Info program promo pembiayaan yang sedang berlaku", en: "Information on currently active financing promos" },
          { id: "Koordinasi test drive & pengecekan ketersediaan unit", en: "Test-drive coordination & unit availability checks" },
          { id: "Pendampingan proses pembelian melalui dealer resmi Geely", en: "Assistance through the purchase process via an official Geely dealer" },
          { id: "Penjelasan fitur saat serah terima unit", en: "Feature walkthrough at unit handover" },
        ],
      },
      {
        heading: { id: "Mengapa konsultasi dulu sebelum membeli?", en: "Why consult before buying?" },
        paragraphs: [
          {
            id: "Empat model Geely saat ini menarget kebutuhan yang berbeda, dan keputusan terbaik hampir selalu lahir dari percakapan, bukan dari brosur. Pembeli yang salah memilih biasanya bukan karena mobilnya buruk, melainkan karena pola pakai mereka tidak sesuai karakter kendaraan — misalnya membeli EV murni padahal tiap pekan menempuh rute jauh tanpa akses pengisian daya, atau membayar varian tertinggi padahal fitur andalannya jarang terpakai.",
            en: "The current four Geely models target different needs, and the best decision almost always comes from conversation, not from a brochure. Buyers who choose wrong usually did not pick a bad car — their usage pattern simply does not match the vehicle's character — for example buying a pure EV while commuting long distances weekly without charging access, or paying for the highest variant whose flagship features rarely get used.",
          },
          {
            id: "Konsultasi awal juga menjadi tempat pertanyaan yang sering malu ditanyakan di showroom: berapa sebenarnya biaya selain harga mobil, bagaimana dampak DP terhadap angsuran, apa saja yang terjadi jika pengajuan kredit ditolak, dan bagaimana kondisi kendaraan lama ditaksir. Semua dijelaskan dengan angka indikatif yang jujur dan disertai sumbernya.",
            en: "The initial consultation is also the place for questions people often feel awkward asking in a showroom: what the real costs beyond the car price are, how the down payment affects installments, what happens if a credit application is declined, and how your old car gets appraised. Everything is explained with honest indicative figures and their sources.",
          },
        ],
      },
      {
        heading: { id: "Area layanan Bogor & Jabodetabek", en: "Service area: Bogor & Greater Jakarta" },
        paragraphs: [
          {
            id: "Layanan konsultasi, penawaran harga, dan koordinasi test drive menjangkau sepuluh area utama. Untuk area di luar daftar, konsultasi via WhatsApp tetap bisa dilakukan dan kunjungan dapat didiskusikan kasus per kasus. Unit dan proses pembelian resmi tetap mengikuti ketentuan dealer resmi Geely Indonesia di wilayah masing-masing.",
            en: "Consultation, price offers, and test-drive coordination cover ten main areas. For locations outside the list, WhatsApp consultation remains available and visits can be discussed case by case. Units and the official purchase process follow the terms of Geely Indonesia's official dealer network in each region.",
          },
        ],
        bullets: [
          { id: "Bogor Kota & Kabupaten Bogor (termasuk Cibinong, Cibubur, Sentul)", en: "Bogor City & Bogor Regency (including Cibinong, Cibubur, Sentul)" },
          { id: "Depok, Jakarta, Tangerang, Bekasi", en: "Depok, Jakarta, Tangerang, Bekasi" },
          { id: "BSD dan area Jabodetabek lainnya", en: "BSD and other Greater Jakarta areas" },
        ],
      },
      {
        heading: { id: "Cara memulai — tiga langkah", en: "How to start — three steps" },
        paragraphs: [
          {
            id: "Pertama, kirim pesan WhatsApp dengan menyebutkan model yang menarik (atau sekadar kebutuhan Anda — contoh: mobil listrik untuk harian se-keluarga). Kedua, dapatkan jawaban ringkas: harga indikatif terbaru, estimasi cicilan sesuai DP yang Anda inginkan, dan promo pembiayaan yang sedang berlaku. Ketiga, jika cocok, atur jadwal test drive atau lanjut ke proses penawaran resmi melalui dealer. Tidak ada kewajiban membeli pada tahap mana pun.",
            en: "First, send a WhatsApp message mentioning the model that interests you (or just your needs — e.g. an electric family car for daily use). Second, get a concise answer: the latest indicative price, an installment estimate matching your preferred down payment, and currently active financing promos. Third, if it fits, schedule a test drive or continue to the official offer process through the dealer. There is no purchase obligation at any stage.",
          },
        ],
      },
    ],
    faq: [
      {
        q: { id: "Apakah Pusat Geely adalah dealer resmi?", en: "Is Pusat Geely an official dealer?" },
        a: {
          id: "Bukan. Pusat Geely adalah layanan konsultan penjualan independen — bukan bagian dari PT Geely Mobil Indonesia maupun Geely Holding. Proses pembelian, garansi, dan purna jual dijalankan melalui jaringan dealer resmi Geely Indonesia. Keuntungan Anda: panduan yang independen tanpa tekanan target showroom.",
          en: "No. Pusat Geely is an independent sales-consulting service — not part of PT Geely Mobil Indonesia or Geely Holding. Purchase, warranty, and after-sales run through Geely Indonesia's official dealer network. Your benefit: independent guidance without showroom sales pressure.",
        },
      },
      {
        q: { id: "Apakah saya harus membayar jasa konsultasi?", en: "Do I pay a consultation fee?" },
        a: {
          id: "Tidak ada biaya untuk Anda sebagai calon pembeli. Konsultasi, simulasi cicilan, dan info promo gratis. Komite/komisi yang diterima konsultan berasal dari mekanisme kolaborasi dengan dealer — harga yang Anda bayarkan tetap harga normal sesuai ketentuan dealer resmi.",
          en: "There is no fee for you as a prospective buyer. Consultation, installment simulation, and promo information are free. The consultant's commission comes from dealer collaboration mechanisms — the price you pay remains the normal price under the official dealer's terms.",
        },
      },
      {
        q: { id: "Model apa saja yang bisa dikonsultasikan?", en: "Which models can I consult about?" },
        a: {
          id: "Seluruh lineup Geely Indonesia saat ini: EX5 (SUV listrik), Starray EM-i (SUV super hybrid plug-in), Coolray (crossover turbo bensin), dan EX2 (hatchback listrik). Ketersediaan varian dan warna dapat berubah — konfirmasi via WhatsApp untuk stok terbaru.",
          en: "The entire current Geely Indonesia lineup: EX5 (electric SUV), Starray EM-i (plug-in super-hybrid SUV), Coolray (turbo petrol crossover), and EX2 (electric hatchback). Variant and color availability may change — confirm via WhatsApp for the latest stock.",
        },
      },
      {
        q: { id: "Berapa lama proses dari konsultasi hingga unit tiba?", en: "How long from consultation to delivery?" },
        a: {
          id: "Bergantung model dan status stok: unit yang tersedia di dealer dapat dipercepat, sementara varian/warna tertentu masuk antrean produksi atau alokasi. Setelah konsultasi, Anda diberi estimasi waktu yang jujur untuk pilihan Anda — bukan janji seragam.",
          en: "It depends on the model and stock status: units available at a dealer can be expedited, while certain variants/colors enter production or allocation queues. After consultation you get an honest time estimate for your specific choice — not a uniform promise.",
        },
      },
    ],
    related: [
      { href: "/harga-mobil-geely-bogor", label: { id: "Daftar harga Geely terbaru", en: "Latest Geely price list" } },
      { href: "/kredit-cicilan-geely-bogor", label: { id: "Simulasi cicilan & kredit", en: "Installment & credit simulation" } },
      { href: "/test-drive-geely-bogor", label: { id: "Reservasi test drive", en: "Test-drive reservation" } },
      { href: "/model/ex5", label: { id: "Spesifikasi lengkap EX5", en: "Full EX5 specifications" } },
      { href: "/promo-geely-bogor", label: { id: "Promo pembiayaan berlaku", en: "Active financing promos" } },
    ],
    ogImage: "/images/hero.webp",
  },

  /* ── 2. Kredit & Cicilan Geely Bogor ────────────────────────── */
  {
    slug: "kredit-cicilan-geely-bogor",
    intent: "Calon pembeli ingin menghitung angsuran/DP mobil Geely sebelum menghubungi sales.",
    priority: 0.9,
    title: {
      id: "Cicilan & Kredit Mobil Geely Bogor | Kalkulator DP dan Tenor",
      en: "Geely Car Credit & Installments Bogor | DP and Tenor Calculator",
    },
    description: {
      id: "Hitung sendiri cicilan mobil Geely di Bogor: kalkulator DP 10–50%, tenor 12–72 bulan, dan estimasi angsuran untuk EX5, Starray EM-i, Coolray, EX2 — plus program pembiayaan resmi dan penjelasan biaya di luar angsuran.",
      en: "Calculate Geely installments in Bogor yourself: 10–50% down-payment calculator, 12–72 month tenor, estimated installments for EX5, Starray EM-i, Coolray, EX2 — plus official financing programs and costs beyond installments.",
    },
    h1: {
      id: "Kredit & Cicilan Mobil Geely di Bogor — Hitung Sebelum Putuskan",
      en: "Geely Car Credit & Installments in Bogor — Calculate Before Deciding",
    },
    lead: [
      {
        id: "Sebagian besar pembelian mobil Geely di Bogor dan Jabodetabek dilakukan lewat kredit, dan keputusan finansial terbaik adalah yang bisa Anda hitung sendiri sebelum berbicara dengan siapa pun. Kalkulator di bawah memakai metode bunga flat — metode yang umum dipakai perusahaan pembiayaan otomotif di Indonesia — sehingga angka yang Anda lihat mendekati logika perhitungan leasing pada umumnya.",
        en: "Most Geely purchases in Bogor and Greater Jakarta are financed, and the best financial decision is one you can calculate yourself before talking to anyone. The calculator below uses the flat-interest method — the method commonly used by Indonesian auto finance companies — so the numbers you see approximate how leasing is generally computed.",
      },
      {
        id: "Gunakan kalkulator untuk menjawab pertanyaan yang paling praktis: berapa angsuran bulanan jika DP 20% dan tenor 48 bulan, atau seberapa besar DP agar cicilan masuk ke anggaran bulanan Anda. Setelah menemukan kombinasi yang nyaman, kirim hasilnya ke WhatsApp — konteks perhitungan ikut terbawa sehingga konsultasi berikutnya langsung ke inti.",
        en: "Use the calculator to answer the most practical questions: what the monthly installment is at 20% DP and a 48-month tenor, or how large a down payment keeps the installment within your monthly budget. Once you find a comfortable combination, send it to WhatsApp — the calculation context is carried over, so the next consultation goes straight to the point.",
      },
    ],
    chips: [
      { id: "DP 10–50%", en: "DP 10–50%" },
      { id: "Tenor 12–72 bulan", en: "Tenor 12–72 months" },
      { id: "Metode bunga flat", en: "Flat-interest method" },
      { id: "Hasil terkirim ke WhatsApp", en: "Results sent to WhatsApp" },
    ],
    embedSimulator: true,
    embedPromos: true,
    sections: [
      {
        heading: { id: "Cara membaca hasil simulasi", en: "How to read the simulation results" },
        paragraphs: [
          {
            id: "Angsuran yang ditampilkan adalah estimasi bunga flat: pokok hutang dibagi tenor, ditambah bunga yang dihitung dari harga setelah DP. Dalam praktik, perusahaan pembiayaan juga menerapkan biaya administrasi, biaya provisi, dan asuransi tahun pertama yang nilainya bergantung kebijakan masing-masing lembaga pembiayaan — karena itu angka final selalu keluar dari penawaran resmi, bukan dari kalkulator mana pun.",
            en: "The displayed installment is a flat-interest estimate: principal divided by the tenor, plus interest computed on the price after down payment. In practice, finance companies also charge administrative fees, provision fees, and first-year insurance whose values depend on each finance company's policies — which is why the final figure always comes from an official offer, not from any calculator.",
          },
          {
            id: "Halaman promo pembiayaan di situs ini menampilkan program nyata dari lima perusahaan pembiayaan — DP, angsuran per tenor, dan total bayar pertama disalin apa adanya dari lembar simulasi resmi, dengan periode berlakunya dicantumkan. Bandingkan program tersebut dengan hasil kalkulator Anda untuk melihat mana yang paling masuk akal bagi arus kas bulanan.",
            en: "The financing-promo page on this site shows real programs from five finance companies — down payment, installment per tenor, and total first payment copied verbatim from official simulation sheets, with validity periods stated. Compare those programs with your calculator result to see which one makes the most sense for your monthly cash flow.",
          },
        ],
      },
      {
        heading: { id: "Biaya di luar angsuran yang perlu disiapkan", en: "Costs beyond the installment to prepare" },
        paragraphs: [
          {
            id: "Banyak pembeli pertama menghitung cicilan saja, lalu terkejut dengan pengeluaran awal. Selain DP, biasanya ada asuransi tahun pertama (dibayar di muka untuk kredit berjaminan), biaya administrasi & provisi leasing, pajak progresif untuk nama pertama di keluarga bila berlaku, serta biaya balik nama dan dokumen. Mengetahui daftar ini sejak awal membuat penawaran resmi terasa familiar — tidak ada biaya yang benar-benar mengejutkan.",
            en: "Many first-time buyers count only the installment, then get surprised by initial outlays. Besides the down payment there is usually first-year insurance (paid upfront for financed purchases), leasing admin & provision fees, progressive tax for the first vehicle name in the family where applicable, plus name-transfer and document fees. Knowing this list early makes the official offer feel familiar — nothing truly surprises.",
          },
        ],
        bullets: [
          { id: "DP sesuai program (umumnya mulai 10–20% dari harga OTR)", en: "Down payment per program (commonly from 10–20% of OTR price)" },
          { id: "Asuransi tahun pertama & optional tahun berikutnya", en: "First-year insurance & optionally subsequent years" },
          { id: "Biaya admin, provisi, dan fidusia dari perusahaan pembiayaan", en: "Admin, provision, and fiduciary fees from the finance company" },
          { id: "Pajak progresif (bila bukan kendaraan pertama) & balik nama", en: "Progressive tax (if not the first vehicle) & name transfer" },
        ],
      },
      {
        heading: { id: "Strategi memilih tenor", en: "Choosing a tenor strategy" },
        paragraphs: [
          {
            id: "Tenor panjang menurunkan angsuran bulanan tetapi menaikkan total bunga yang dibayarkan; tenor pendek sebaliknya. Aturan praktis yang sehat: total cicilan seluruh kendaraan dalam rumah tidak lebih dari 30% penghasilan bulanan stabil, dan hindari tenor yang melebihi rencana kepemilikan Anda — jika biasanya ganti mobil dalam 4–5 tahun, tenor 72 bulan justru membuat Anda terikat negatif equity di tahun-tahun akhir.",
            en: "A long tenor lowers the monthly installment but raises total interest paid; a short tenor is the opposite. A healthy rule of thumb: total vehicle installments in the household should stay under 30% of stable monthly income, and avoid tenors exceeding your ownership plan — if you usually change cars every 4–5 years, a 72-month tenor binds you into negative equity in the final years.",
          },
          {
            id: "Untuk model listrik dan hybrid, ada variabel tambahan yang menguntungkan: biaya energi per kilometer jauh lebih rendah daripada bensin, dan beberapa daerah memberikan keringanan pajak kendaraan listrik. Selisih ini sebagian mengimbangi harga beli yang lebih tinggi — mintakan perhitungan perbandingan biaya bulanan total (cicilan + energi + pajak) saat konsultasi.",
            en: "For electric and hybrid models there is an extra favorable variable: energy cost per kilometer is far lower than petrol, and some regions grant electric-vehicle tax relief. This difference partially offsets the higher purchase price — ask for a total-monthly-cost comparison (installment + energy + tax) during consultation.",
          },
        ],
      },
    ],
    faq: [
      {
        q: { id: "Berapa DP minimal untuk kredit Geely?", en: "What is the minimum down payment for Geely credit?" },
        a: {
          id: "Umumnya mulai 10–20% dari harga OTR tergantung kebijakan perusahaan pembiayaan dan profil kredit. Halaman promo di situs ini menampilkan program-program nyata dengan DP dan total bayar pertama masing-masing — angka apa adanya dari lembar resmi.",
          en: "Commonly from 10–20% of OTR price depending on the finance company's policy and credit profile. The promo page on this site shows real programs with each one's down payment and total first payment — figures as-is from official sheets.",
        },
      },
      {
        q: { id: "Apakah bunga di kalkulator sama dengan bunga final?", en: "Is the calculator's rate the final rate?" },
        a: {
          id: "Tidak. Kalkulator memakai rentang bunga flat 3–12% untuk estimasi. Bunga final ditentukan perusahaan pembiayaan berdasarkan tenor, DP, dan profil pengajuan — persetujuan dan angka final mengikuti ketentuan penyedia pembiayaan.",
          en: "No. The calculator uses a 3–12% flat-rate range for estimation. The final rate is set by the finance company based on tenor, down payment, and application profile — approval and final figures follow the financing provider's terms.",
        },
      },
      {
        q: { id: "Bisakah mobil lama saya dijadikan DP?", en: "Can my old car become the down payment?" },
        a: {
          id: "Bisa, melalui skema trade-in. Nilai tukar ditentukan dari kondisi kendaraan saat pemeriksaan, lalu selisihnya mengurangi DP atau pokok kredit. Sebutkan merk, tipe, tahun, dan kondisi mobil lama Anda saat konsultasi agar estimasi trade-in bisa dihitung sejak awal.",
          en: "Yes, via a trade-in scheme. The exchange value is determined at inspection, then the difference reduces the down payment or credit principal. Mention your old car's brand, type, year, and condition during consultation so the trade-in estimate can be computed early.",
        },
      },
      {
        q: { id: "Perusahaan pembiayaan mana yang dipakai?", en: "Which finance company is used?" },
        a: {
          id: "Halaman promo menampilkan program dari lima perusahaan pembiayaan otomotif di Indonesia. Kami membantu membandingkan DP, angsuran, dan total bayar pertama antar program agar Anda memilih yang paling sesuai — keputusan akhir dan persetujuan tetap milik lembaga pembiayaan.",
          en: "The promo page shows programs from five Indonesian auto finance companies. We help compare down payments, installments, and total first payments across programs so you pick the best fit — final approval always belongs to the finance institution.",
        },
      },
    ],
    related: [
      { href: "/promo-geely-bogor", label: { id: "Program pembiayaan berlaku", en: "Active financing programs" } },
      { href: "/harga-mobil-geely-bogor", label: { id: "Daftar harga semua model", en: "All-model price list" } },
      { href: "/sales-geely-bogor", label: { id: "Konsultasi dengan sales", en: "Consult with the sales consultant" } },
      { href: "/artikel/panduan-trade-in-mobil-geely", label: { id: "Panduan trade-in mobil lama", en: "Old-car trade-in guide" } },
    ],
    ogImage: "/images/hero.webp",
  },
  /* ── 3. Harga Geely EX5 Bogor ───────────────────────────────── */
  {
    slug: "geely-ex5-bogor",
    intent: "Calon pembeli mencari harga dan cicilan Geely EX5 khusus wilayah Bogor.",
    priority: 0.9,
    title: {
      id: "Harga Geely EX5 Bogor | Varian Pro & Max, Cicilan, Test Drive",
      en: "Geely EX5 Bogor Price | Pro & Max Variants, Installments, Test Drive",
    },
    description: {
      id: "Harga Geely EX5 di Bogor: mulai Rp 465 juta (Pro) hingga Rp 505 juta (Max) — indikatif OTR per September 2026. Bandingkan varian, hitung cicilan, dan minta penawaran terbaru via WhatsApp.",
      en: "Geely EX5 price in Bogor: from Rp 465 million (Pro) to Rp 505 million (Max) — indicative OTR as of September 2026. Compare variants, calculate installments, and request the latest offer via WhatsApp.",
    },
    h1: {
      id: "Harga Geely EX5 di Bogor — SUV Listrik Keluarga",
      en: "Geely EX5 Price in Bogor — The Family Electric SUV",
    },
    lead: [
      {
        id: "Geely EX5 adalah SUV listrik paling banyak ditanyakan di Bogor dan sekitarnya, dan wajar: jangkauan resmi hingga 495 km (NEDC) membuat kebiasaan keluar-masuk Bogor–Jakarta tidak lagi menimbulkan kecemasan daya, sementara kabinnya senyap untuk kepadatan lalu lintas harian. Di Indonesia EX5 dijual dalam dua varian — Pro dan Max — dengan harga indikatif mulai Rp 465 juta OTR.",
        en: "The Geely EX5 is the most-asked-about electric SUV in Bogor and its surroundings, understandably so: the official range of up to 495 km (NEDC) makes the daily Bogor–Jakarta commute free of range anxiety, while the cabin stays quiet in daily traffic. In Indonesia the EX5 comes in two variants — Pro and Max — with indicative prices from Rp 465 million OTR.",
      },
      {
        id: "Halaman ini fokus pada yang paling praktis bagi pembeli Bogor: perbandingan dua varian, estimasi cicilan yang bisa Anda hitung sendiri, dan biaya kepemilikan khas mobil listrik yang jarang dijelaskan brosur. Spesifikasi lengkap dan galeri foto unit asli tersedia di halaman detail EX5.",
        en: "This page focuses on what Bogor buyers need most: a comparison of the two variants, installments you can calculate yourself, and the electric-specific ownership costs brochures rarely explain. Full specifications and real unit photos are on the EX5 detail page.",
      },
    ],
    chips: [
      { id: "Mulai Rp 465 jt OTR*", en: "From Rp 465 M OTR*" },
      { id: "495 km jangkauan (NEDC)*", en: "495 km range (NEDC)*" },
      { id: "Baterai 60,22 kWh", en: "60.22 kWh battery" },
      { id: "2 varian: Pro & Max", en: "2 variants: Pro & Max" },
    ],
    modelId: "ex5",
    embedSimulator: true,
    sections: [
      {
        heading: { id: "Pro atau Max — mana yang cocok?", en: "Pro or Max — which one fits?" },
        paragraphs: [
          {
            id: "Kedua varian memakai baterai 60,22 kWh dengan jangkauan resmi hingga 495 km (NEDC) dan tenaga sekitar 218 hp. Perbedaannya berada di kelengkapan fitur keselamatan dan kenyamanan: varian Max membawa tingkatan fitur aktif yang lebih lengkap, sedangkan Pro menghadirkan pengalaman inti EX5 dengan harga lebih rendah sekitar Rp 40 juta. Untuk pola pakai harian Bogor–Jabodetabek, keduanya sudah lebih dari cukup; pertimbangkan Max bila fitur pengemudi aktif menjadi prioritas keluarga.",
            en: "Both variants use a 60.22 kWh battery with an official range of up to 495 km (NEDC) and around 218 hp. The difference lies in safety and comfort equipment: the Max carries a fuller set of active features, while the Pro delivers the core EX5 experience at roughly Rp 40 million less. For daily Bogor–Greater Jakarta use, both are more than enough; consider the Max if active driver-assist features are a family priority.",
          },
        ],
        bullets: [
          { id: "Pro — harga indikatif Rp 465 juta OTR*", en: "Pro — indicative price Rp 465 million OTR*" },
          { id: "Max — harga indikatif Rp 505 juta OTR*", en: "Max — indicative price Rp 505 million OTR*" },
          { id: "Warna tersedia: Snowy White, Carbon Black, Frost Grey", en: "Available colors: Snowy White, Carbon Black, Frost Grey" },
        ],
      },
      {
        heading: { id: "Biaya kepemilikan EX5 di Bogor", en: "EX5 ownership costs in Bogor" },
        paragraphs: [
          {
            id: "Mobil listrik mengubah struktur biaya: pengeluaran energi per kilometer jauh lebih rendah daripada bensin — isi daya di rumah dengan tarif listrik rumahan umumnya bersaing dengan bensin di kisaran jauh lebih murah per km, dan pengisian cepat di SPKLU tersedia di sepanjang rute utama Jabodetabek termasuk rest area Tol Jagorawi. Pajak kendaraan listrik di Jawa Barat juga mengikuti kebijakan keringanan yang membuat biaya tahunannya lebih ramah daripada mobil bensin kelasnya. Maintenance rutin cenderung lebih sederhana karena tidak ada oli mesin, busi, maupun timing belt.",
            en: "An electric car changes the cost structure: energy spending per kilometer is far lower than petrol — home charging at residential tariffs generally beats petrol by a wide margin per km, and fast charging at SPKLU stations is available along Greater Jakarta's main routes including the Jagorawi toll rest areas. Electric-vehicle tax in West Java also follows relief policies that make annual costs friendlier than comparable petrol cars. Routine maintenance tends to be simpler since there is no engine oil, spark plugs, or timing belt.",
          },
          {
            id: "Yang perlu dinilai jujur: harga beli EX5 lebih tinggi daripada crossover bensin setara, jadi keunggulan biaya operasional paling terasa bagi pengguna dengan jarak tempuh tahunan besar. Jika Anda menempuh 30–50 km per hari, selisih energi dan pajak mulai mengimbangi harga beli; jika mobil hanya dipakai akhir pekan, pertimbangkan juga Starray EM-i atau Coolray melalui konsultasi singkat.",
            en: "To be honest: the EX5's purchase price is higher than an equivalent petrol crossover, so the operational-cost advantage is most felt by high-mileage users. If you drive 30–50 km per day, energy and tax savings start offsetting the purchase price; if the car is mostly a weekend vehicle, also consider the Starray EM-i or Coolray through a short consultation.",
          },
        ],
      },
      {
        heading: { id: "Test drive EX5 di Bogor", en: "EX5 test drive in Bogor" },
        paragraphs: [
          {
            id: "EX5 adalah model yang paling sering tersedia untuk test drive, dan pengalaman menyetirnya di jalur nyata — bukan hanya di showroom — adalah cara terbaik menilai kenyamanan suspensi untuk permukaan jalan Bogor serta kebiasaan regenerasi rem yang khas mobil listrik. Ketersediaan unit tetap dikonfirmasi lebih dulu: atur jadwal via WhatsApp, sebutkan area Anda (Bogor Kota, Cibinong, Cibubur, atau area Jabodetabek lain), dan kami cek unit terdekat yang bisa dijadwalkan.",
            en: "The EX5 is the model most often available for test drives, and driving it on real roads — not just in a showroom — is the best way to judge suspension comfort for Bogor's road surfaces and the regenerative braking behavior typical of electric cars. Unit availability is still confirmed first: arrange a schedule via WhatsApp, mention your area (Bogor City, Cibinong, Cibubur, or other Greater Jakarta areas), and we check the nearest unit that can be scheduled.",
          },
        ],
      },
    ],
    faq: [
      {
        q: { id: "Berapa harga Geely EX5 di Bogor?", en: "What is the Geely EX5 price in Bogor?" },
        a: {
          id: "Harga indikatif OTR per September 2026: varian Pro mulai Rp 465 juta dan varian Max mulai Rp 505 juta. Harga final dapat berbeda menurut periode dan kebijakan dealer resmi — minta penawaran terbaru via WhatsApp sebelum memutuskan.",
          en: "Indicative OTR prices as of September 2026: the Pro variant from Rp 465 million and the Max variant from Rp 505 million. Final prices may differ by period and official-dealer policy — request the latest offer via WhatsApp before deciding.",
        },
      },
      {
        q: { id: "Berapa perkiraan cicilan EX5?", en: "What is the estimated EX5 installment?" },
        a: {
          id: "Gunakan kalkulator di halaman ini: dengan DP 20% dan tenor 60 bulan pada bunga flat 6%, angsuran berada di kisaran Rp 8 jutaan per bulan untuk varian Pro (estimasi kasar sebelum asuransi dan biaya admin). Program pembiayaan dengan DP lebih rendah tersedia di halaman promo.",
          en: "Use the calculator on this page: at 20% DP, a 60-month tenor, and a 6% flat rate, the installment is around Rp 8 million-plus per month for the Pro variant (rough estimate before insurance and admin fees). Lower-DP financing programs are on the promo page.",
        },
      },
      {
        q: { id: "Apakah EX5 cocok untuk rute Bogor–Jakarta harian?", en: "Is the EX5 suitable for daily Bogor–Jakarta commutes?" },
        a: {
          id: "Sangat cocok menurut parameternya: jangkauan resmi 495 km (NEDC) jauh melebihi rute bolak-balik Bogor–Jakarta, dan pengisian di rumah cukup untuk pemakaian harian. Idealnya Anda memiliki titik daya di tempat parkir utama — rumah atau kantor. Bila tidak ada akses pengisian sama sekali, diskusikan dulu pola pakai Anda dalam konsultasi.",
          en: "Very suitable by its parameters: the official 495 km (NEDC) range far exceeds the Bogor–Jakarta round trip, and home charging covers daily use. Ideally you have a power point at your main parking spot — home or office. If there is no charging access at all, discuss your usage pattern in consultation first.",
        },
      },
      {
        q: { id: "Berapa lama garansi EX5?", en: "How long is the EX5 warranty?" },
        a: {
          id: "Ketentuan garansi kendaraan dan baterai mengikuti kebijakan resmi PT Geely Mobil Indonesia yang berlaku pada periode pembelian — kami jelaskan rinciannya (durasi, jangkauan, dan syarat) saat konsultasi dengan dokumen resmi sebagai rujukan, bukan dari ingatan.",
          en: "Vehicle and battery warranty terms follow the official PT Geely Mobil Indonesia policy in force at the time of purchase — we explain the details (duration, coverage, conditions) during consultation using official documents as reference, not from memory.",
        },
      },
    ],
    related: [
      { href: "/model/ex5", label: { id: "Spesifikasi & galeri lengkap EX5", en: "Full EX5 specs & gallery" } },
      { href: "/kredit-cicilan-geely-bogor", label: { id: "Simulasi kredit EX5", en: "EX5 credit simulation" } },
      { href: "/artikel/ex5-vs-starray-emi", label: { id: "EX5 vs Starray EM-i", en: "EX5 vs Starray EM-i" } },
      { href: "/mobil-listrik-geely-bogor", label: { id: "Panduan mobil listrik", en: "Electric-car guide" } },
      { href: "/test-drive-geely-bogor", label: { id: "Jadwalkan test drive", en: "Schedule a test drive" } },
    ],
    ogImage: "/images/unit-ex5-snowy.webp",
  },

  /* ── 4. Harga Geely Starray EM-i Bogor ──────────────────────── */
  {
    slug: "geely-starray-emi-bogor",
    intent: "Calon pembeli mencari harga dan penjelasan Starray EM-i (hybrid) di Bogor.",
    priority: 0.9,
    title: {
      id: "Harga Geely Starray EM-i Bogor | Hybrid, Biaya Perjalanan & Cicilan",
      en: "Geely Starray EM-i Bogor Price | Hybrid, Trip Costs & Installments",
    },
    description: {
      id: "Harga Geely Starray EM-i di Bogor mulai Rp 499 juta (indikatif OTR). Pahami cara kerja super hybrid plug-in: listrik untuk harian, bensin untuk jarak jauh — plus simulasi cicilan dan test drive.",
      en: "Geely Starray EM-i price in Bogor from Rp 499 million (indicative OTR). Understand how the plug-in super hybrid works: electricity for daily drives, petrol for long trips — plus installment simulation and test drives.",
    },
    h1: {
      id: "Harga Geely Starray EM-i di Bogor — Super Hybrid Plug-in",
      en: "Geely Starray EM-i Price in Bogor — The Plug-in Super Hybrid",
    },
    lead: [
      {
        id: "Starray EM-i menjawab dilema klasik pembeli mobil keluarga di Bogor: ingin biaya harian serendah mobil listrik, tetapi tidak ingin perjalanan luar kota dibatasi jadwal pengisian daya. Sebagai super hybrid plug-in (PHEV), ia bisa dijalankan murni listrik untuk rutinitas harian, lalu mesin bensin mengambil alih tanpa drama saat rute memanjang — total jangkauan melampaui SUV listrik murni.",
        en: "The Starray EM-i answers the classic dilemma of family-car buyers in Bogor: they want daily costs as low as an electric car, but do not want long trips constrained by charging schedules. As a plug-in super hybrid (PHEV), it can run purely on electricity for daily routines, then the petrol engine takes over seamlessly on longer routes — total range exceeding a pure electric SUV.",
      },
      {
        id: "Harga indikatifnya mulai Rp 499 juta OTR — berada di tier SUV keluarga menengah, dengan motor listrik 160 kW yang membuat akselerasinya responsif di kecepatan kota. Halaman ini menjelaskan cara kerja teknologinya dalam bahasa praktis, perkiraan struktur biaya perjalanan, dan simulasi cicilan yang bisa Anda sesuaikan sendiri.",
        en: "Its indicative price starts at Rp 499 million OTR — in the mid-tier family-SUV range, with a 160 kW electric motor making acceleration responsive in city speeds. This page explains the technology in practical terms, the expected trip-cost structure, and an installment simulation you can adjust yourself.",
      },
    ],
    chips: [
      { id: "Mulai Rp 499 jt OTR*", en: "From Rp 499 M OTR*" },
      { id: "Super hybrid plug-in (PHEV)", en: "Plug-in super hybrid (PHEV)" },
      { id: "Motor listrik 160 kW", en: "160 kW electric motor" },
      { id: "Listrik untuk harian, bensin untuk jauh", en: "Electric for daily, petrol for distance" },
    ],
    modelId: "starray",
    embedSimulator: true,
    sections: [
      {
        heading: { id: "Cara kerja EM-i: listrik dulu, bensin sebagai cadangan", en: "How EM-i works: electric first, petrol as backup" },
        paragraphs: [
          {
            id: "Sebagai plug-in hybrid, Starray EM-i membawa baterai yang bisa diisi dari colokan — beda dengan hybrid biasa yang baterainya hanya diisi mesin dan pengereman. Untuk rutinitas harian jarak pendek dan menengah, unit dapat beroperasi murni listrik: senyap, tanpa konsumsi bensin. Ketika daya menipis atau rute memanjang ke luar kota, mesin bensin bekerja sebagai penggerak dan pengisi — tidak perlu berhenti, tidak ada kecemasan jangkauan.",
            en: "As a plug-in hybrid, the Starray EM-i carries a battery that can be charged from an outlet — unlike a regular hybrid whose battery is charged only by the engine and braking. For short-to-medium daily routines the vehicle can run purely electric: quiet, zero petrol use. When the charge runs low or the route extends out of town, the petrol engine works as driver and charger — no stopping, no range anxiety.",
          },
          {
            id: "Bagi pemilik rumah di Bogor yang punya colokan di garasi, pola pemakaian ini sering berarti sebagian besar hari dalam sebulan ditempuh tanpa membeli bensin sama sekali; bensin hanya terpakai saat mudik, ke luar kota, atau ketika lupa mengisi daya. Itulah alasan PHEV sering disebut jembatan terbaik menuju elektrifikasi penuh.",
            en: "For Bogor homeowners with an outlet in the garage, this pattern often means most days of the month are covered without buying petrol at all; fuel is only used for holidays, out-of-town trips, or forgotten charging. That is why PHEVs are often called the best bridge to full electrification.",
          },
        ],
      },
      {
        heading: { id: "Struktur biaya perjalanan: bandingkan dengan jujur", en: "Trip cost structure: compare honestly" },
        paragraphs: [
          {
            id: "Dalam mode listrik, biaya energi per kilometer Starray EM-i berperilaku seperti mobil listrik — jauh lebih murah daripada bensin. Dalam mode bensin, efisiensinya bersaing dengan SUV bensin efisien di kelasnya. Artinya biaya perjalanan bergantung pada disiplin pengisian daya Anda: pengguna yang rajin mengisi rumah menikmati biaya bulanan rendah; pengguna yang selalu mengandalkan bensin pada dasarnya mengendarai SUV bensin biasa dengan segudang fitur tambahan.",
            en: "In electric mode the EM-i's energy cost per kilometer behaves like an electric car — far cheaper than petrol. In petrol mode its efficiency competes with efficient SUVs in its class. That means trip cost depends on your charging discipline: users who diligently charge at home enjoy low monthly costs; users who always rely on petrol are effectively driving a regular petrol SUV with a pile of extra features.",
          },
          {
            id: "Perbandingan paling berguna adalah menghitung rute harian riil Anda: berapa km per hari, apakah bisa diisi daya di tujuan, dan berapa kali per bulan perjalanan jauh. Kirimkan ketiganya via WhatsApp — kami bantu proyeksikan biaya bulanan EM-i versus EX5 versus Coolray dengan angka indikatif yang transparan.",
            en: "The most useful comparison computes your real daily route: how many km per day, whether charging is possible at the destination, and how many long trips per month. Send those three via WhatsApp — we help project the monthly cost of EM-i vs EX5 vs Coolray with transparent indicative figures.",
          },
        ],
      },
      {
        heading: { id: "Untuk siapa Starray EM-i paling cocok?", en: "Who is the Starray EM-i best for?" },
        paragraphs: [
          {
            id: "Paling masuk akal untuk tiga profil: keluarga yang routinernya berada dalam jangkauan listrik tetapi rutin menempuh perjalanan jauh; pengguna yang parkir utamanya memiliki colokan; serta pembeli yang belum siap pada EV murni tetapi ingin mulai menekan biaya energi. Sebaliknya, bila hari Anda sepenuhnya tanpa akses colokan, manfaat PHEV-nya berkurang — Coolray bisa jadi pilihan yang lebih rasional.",
            en: "It makes the most sense for three profiles: families whose routines fall within electric range but who regularly take long trips; users whose main parking has an outlet; and buyers not ready for a pure EV but wanting to start cutting energy costs. Conversely, if your days have zero outlet access, the PHEV benefit shrinks — the Coolray may be the more rational choice.",
          },
        ],
      },
    ],
    faq: [
      {
        q: { id: "Berapa harga Starray EM-i di Bogor?", en: "What is the Starray EM-i price in Bogor?" },
        a: {
          id: "Harga indikatif OTR per September 2026 mulai Rp 499 juta untuk varian EM-i. Angka final mengikuti penawaran dealer resmi pada periode pembelian — minta penawaran terbaru via WhatsApp.",
          en: "The indicative OTR price as of September 2026 starts at Rp 499 million for the EM-i variant. Final figures follow the official dealer's offer at purchase time — request the latest via WhatsApp.",
        },
      },
      {
        q: { id: "Apakah Starray EM-i harus selalu diisi daya?", en: "Must the Starray EM-i always be charged?" },
        a: {
          id: "Tidak wajib. Tanpa pengisian daya sama sekali, EM-i tetap berjalan seperti hybrid biasa — mesin bensin menggerakkan dan mengisi baterai. Pengisian rutin hanyalah cara mendapatkan manfaat maksimal: biaya per km serendah mobil listrik untuk mayoritas hari Anda.",
          en: "No. With zero charging, the EM-i still runs like a regular hybrid — the petrol engine drives and charges the battery. Regular charging is simply how you extract maximum benefit: per-km cost as low as an electric car for most of your days.",
        },
      },
      {
        q: { id: "Apa bedanya Starray EM-i dengan EX5?", en: "How does the Starray EM-i differ from the EX5?" },
        a: {
          id: "EX5 adalah SUV listrik murni — senyap total tanpa mesin bensin, dengan jangkauan 495 km (NEDC) dan biaya energi terendah. Starray EM-i adalah plug-in hybrid — fleksibel untuk perjalanan jauh tanpa bergantung SPKLU. Perbandingan lengkapnya kami tulis di artikel 'EX5 vs Starray EM-i' yang terkait di halaman ini.",
          en: "The EX5 is a pure electric SUV — fully silent with no petrol engine, 495 km (NEDC) range, and the lowest energy cost. The Starray EM-i is a plug-in hybrid — flexible for long trips without depending on charging stations. The full comparison is in the 'EX5 vs Starray EM-i' article linked on this page.",
        },
      },
      {
        q: { id: "Berapa cicilan Starray EM-i?", en: "What is the Starray EM-i installment?" },
        a: {
          id: "Sesuaikan sendiri di kalkulator halaman ini — pilih DP dan tenor yang masuk akal bagi arus kas Anda. Sebagai gambaran kasar dengan DP 20%, tenor 60 bulan, bunga flat 6%, angsurannya berada di kisaran Rp 9 jutaan per bulan sebelum asuransi dan biaya admin; program promo dengan DP berbeda tersedia di halaman promo.",
          en: "Adjust it yourself in this page's calculator — pick a DP and tenor that suit your cash flow. As a rough picture with 20% DP, a 60-month tenor, and a 6% flat rate, the installment is around Rp 9 million-plus per month before insurance and admin fees; promo programs with different down payments are on the promo page.",
        },
      },
    ],
    related: [
      { href: "/model/starray", label: { id: "Spesifikasi lengkap Starray EM-i", en: "Full Starray EM-i specs" } },
      { href: "/artikel/ex5-vs-starray-emi", label: { id: "Perbandingan EX5 vs Starray EM-i", en: "EX5 vs Starray EM-i comparison" } },
      { href: "/geely-ex5-bogor", label: { id: "Harga EX5 di Bogor", en: "EX5 price in Bogor" } },
      { href: "/kredit-cicilan-geely-bogor", label: { id: "Simulasi kredit", en: "Credit simulation" } },
      { href: "/sales-geely-bogor", label: { id: "Konsultasi pemilihan model", en: "Model-selection consultation" } },
    ],
    ogImage: "/images/model-starray.webp",
  },

  /* ── 5. Harga Geely Coolray Bogor ───────────────────────────── */
  {
    slug: "geely-coolray-bogor",
    intent: "Calon pembeli mencari harga dan varian Geely Coolray di Bogor.",
    priority: 0.9,
    title: {
      id: "Harga Geely Coolray Bogor | Standard & Flagship, Cicilan, Test Drive",
      en: "Geely Coolray Bogor Price | Standard & Flagship, Installments, Test Drive",
    },
    description: {
      id: "Harga Geely Coolray di Bogor: Standard mulai Rp 333 juta, Flagship Rp 377 juta — indikatif OTR. Crossover turbo paling populer di kelasnya: 174 PS, 290 Nm, 7DCT. Hitung cicilan & minta penawaran via WhatsApp.",
      en: "Geely Coolray price in Bogor: Standard from Rp 333 million, Flagship Rp 377 million — indicative OTR. The most popular turbo crossover in its class: 174 PS, 290 Nm, 7DCT. Calculate installments & request offers via WhatsApp.",
    },
    h1: {
      id: "Harga Geely Coolray di Bogor — Crossover Turbo Andalan",
      en: "Geely Coolray Price in Bogor — The Flagship Turbo Crossover",
    },
    lead: [
      {
        id: "Coolray adalah model Geely dengan basis penggemar terbesar di Indonesia — crossover turbo kompak yang membawa tenaga 174 PS dan torsi 290 Nm dari mesin 1.5 turbo tiga silinder, digerakkan transmisi kopling ganda 7-percepatan (7DCT). Angka-angka itu menempatkannya di puncak performa segmennya, dan harga indikatif mulai Rp 333 juta OTR membuatnya menjadi pintu masuk termurah ke jajaran Geely.",
        en: "The Coolray is the Geely model with Indonesia's biggest fan base — a compact turbo crossover delivering 174 PS and 290 Nm from a 1.5-liter three-cylinder turbo engine, driven through a 7-speed dual-clutch transmission (7DCT). Those figures put it at the top of its segment's performance, and an indicative price from Rp 333 million OTR makes it the cheapest entry into the Geely lineup.",
      },
      {
        id: "Untuk pembeli di Bogor, Coolray sering menjadi keputusan paling rasional: tidak memerlukan perubahan kebiasaan seperti mobil listrik, konsumsi bahan bakarnya efisien untuk kelas turbo, dan jaringan purna jual Geely kini lebih luas. Halaman ini membahas dua varian yang tersedia dan cara menghitung cicilannya.",
        en: "For buyers in Bogor, the Coolray is often the most rational decision: it demands no habit changes like an electric car, its fuel consumption is efficient for a turbo class, and Geely's after-sales network is now wider. This page covers the two available variants and how to calculate its installments.",
      },
    ],
    chips: [
      { id: "Mulai Rp 333 jt OTR*", en: "From Rp 333 M OTR*" },
      { id: "1.5 Turbo · 174 PS · 290 Nm", en: "1.5 Turbo · 174 PS · 290 Nm" },
      { id: "Transmisi 7DCT", en: "7DCT transmission" },
      { id: "2 varian: Standard & Flagship", en: "2 variants: Standard & Flagship" },
    ],
    modelId: "coolray",
    embedSimulator: true,
    sections: [
      {
        heading: { id: "Standard atau Flagship?", en: "Standard or Flagship?" },
        paragraphs: [
          {
            id: "Kedua varian berbagi basis mekanis yang sama — mesin 1.5 turbo 174 PS/290 Nm dan transmisi 7DCT — sehingga karakter menyetirnya identik. Selisihnya ada di kelengkapan: varian Flagship menaikkan fitur kenyamanan dan keselamatan aktif ke tingkat tertinggi di kelasnya, sementara Standard tetap membawa paket inti dengan harga lebih ramah sekitar Rp 44 juta. Keduanya tersedia dalam pilihan warna yang bisa dicek ketersediaannya saat konsultasi.",
            en: "Both variants share the same mechanical base — the 174 PS/290 Nm 1.5 turbo and 7DCT — so the driving character is identical. The difference is equipment: the Flagship raises comfort and active-safety features to the class's highest level, while the Standard keeps the core package at a friendlier price around Rp 44 million lower. Both come in color options whose availability can be checked during consultation.",
          },
          {
            id: "Jika anggaran menjadi pertimbangan utama dan fitur canggih bukan prioritas, Standard memberi nilai terbaik. Jika kendaraan dipakai keluarga dengan intensitas tinggi dan Anda ingin fitur keselamatan aktif selengkap mungkin, selisih ke Flagship umumnya beralasan.",
            en: "If budget is the main consideration and advanced features are not a priority, the Standard offers the best value. If the car serves a high-intensity family and you want the fullest active-safety package, the Flagship difference is usually justified.",
          },
        ],
      },
      {
        heading: { id: "Konsumsi BBM & biaya pemakaian", en: "Fuel consumption & running costs" },
        paragraphs: [
          {
            id: "Sebagai crossover turbo bensin, Coolray berada di titik seimbang: tenaga besar dari mesin kecil memberi konsumsi yang kompetitif dalam kelasnya, terutama pada kecepatan konstan di Tol Jagorawi atau Darmaga. Angka konsumsi riil selalu bergantung pola pakai — macet Bogor Kota menghasilkan angka berbeda dari perjalanan tol — jadi gunakan data resmi sebagai patokan awal dan minta pengalaman riil pemilik saat konsultasi; kami jelaskan apa adanya, termasuk karakter transmisi DCT dalam lalu lintas padat.",
            en: "As a petrol turbo crossover, the Coolray sits at a balanced point: big power from a small engine gives competitive consumption in its class, especially at constant speeds on the Jagorawi or Darmaga tolls. Real-world consumption always depends on usage patterns — Bogor City traffic produces different numbers from toll trips — so use official figures as a starting benchmark and ask for real owner experience during consultation; we explain things as they are, including dual-clutch behavior in dense traffic.",
          },
          {
            id: "Biaya kepemilikan Coolray mengikuti pola mobil bensin konvensional: servis berkala dengan oli mesin, filter, dan komponen standar — biaya yang sudah matang datanya di jaringan servis resmi, sehingga perencanaan biaya tahunannya mudah diprediksi.",
            en: "Coolray ownership costs follow the conventional petrol pattern: scheduled services with engine oil, filters, and standard parts — figures that are well established in the official service network, making annual cost planning predictable.",
          },
        ],
      },
      {
        heading: { id: "Cocok atau tidak untuk kebutuhan Anda?", en: "Fit or not for your needs?" },
        paragraphs: [
          {
            id: "Coolray paling bersinar bagi pembeli pertama dan keluarga muda yang mengutamakan performa, tampilan, dan harga masuk akal tanpa bergantung pada pengisian daya. Bagi pengguna dengan jarak tempuh harian sangat tinggi yang sensitif biaya energi, model listrik atau hybrid bisa lebih ekonomis dalam jangka panjang — itulah perbandingan yang kami bantu hitung saat konsultasi, dengan asumsi yang jujur di kedua sisi.",
            en: "The Coolray shines most for first-time buyers and young families prioritizing performance, looks, and a sensible price without depending on charging. For very-high-mileage users sensitive to energy costs, an electric or hybrid model can be more economical long-term — that is the comparison we help compute during consultation, with honest assumptions on both sides.",
          },
        ],
      },
    ],
    faq: [
      {
        q: { id: "Berapa harga Coolray di Bogor?", en: "What is the Coolray price in Bogor?" },
        a: {
          id: "Harga indikatif OTR per September 2026: Standard mulai Rp 333 juta dan Flagship mulai Rp 377 juta. Program pembiayaan dengan DP berbeda tersedia di halaman promo — konfirmasi angka final via WhatsApp.",
          en: "Indicative OTR prices as of September 2026: Standard from Rp 333 million and Flagship from Rp 377 million. Financing programs with different down payments are on the promo page — confirm final figures via WhatsApp.",
        },
      },
      {
        q: { id: "Apakah Coolray masih diproduksi dan berlaku di Indonesia?", en: "Is the Coolray still produced and sold in Indonesia?" },
        a: {
          id: "Ya — Coolray masih menjadi bagian aktif jajaran Geely Indonesia saat ini, tersedia dalam varian Standard dan Flagship. Untuk status varian terkini dan ketersediaan unit/warna, konfirmasi via WhatsApp karena lineup dapat berubah seiring waktu.",
          en: "Yes — the Coolray remains an active part of the current Geely Indonesia lineup, available in Standard and Flagship variants. For the latest variant status and unit/color availability, confirm via WhatsApp since lineups change over time.",
        },
      },
      {
        q: { id: "Bagaimana karakter transmisi 7DCT di macet?", en: "How does the 7DCT behave in traffic jams?" },
        a: {
          id: "Transmisi kopling ganda memberi perpindahan cepat pada kecepatan jalan; pada macet ekstrem ia bekerja sedikit berbeda dari otomatis konvensional — ini hal yang paling baik dinilai langsung lewat test drive di rute macet yang biasa Anda lewati, bukan dari teori. Atur test drive melalui halaman reservasi.",
          en: "A dual-clutch transmission shifts fast on open roads; in extreme stop-and-go it behaves slightly differently from a conventional automatic — best judged directly via a test drive on the congested routes you normally take, not from theory. Arrange one through the reservation page.",
        },
      },
      {
        q: { id: "Berapa cicilan Coolray?", en: "What is the Coolray installment?" },
        a: {
          id: "Hitung di kalkulator halaman ini. Sebagai gambaran kasar: DP 20%, tenor 60 bulan, bunga flat 6% menghasilkan angsuran sekitar Rp 6 jutaan per bulan untuk varian Standard sebelum asuransi dan biaya admin — program DP lebih rendah ada di halaman promo.",
          en: "Calculate on this page's calculator. As a rough picture: 20% DP, 60-month tenor, and a 6% flat rate yields around Rp 6 million-plus per month for the Standard variant before insurance and admin fees — lower-DP programs are on the promo page.",
        },
      },
    ],
    related: [
      { href: "/model/coolray", label: { id: "Spesifikasi lengkap Coolray", en: "Full Coolray specs" } },
      { href: "/kredit-cicilan-geely-bogor", label: { id: "Simulasi kredit Coolray", en: "Coolray credit simulation" } },
      { href: "/geely-ex2-bogor", label: { id: "Alternatif murah: EX2", en: "Cheaper alternative: EX2" } },
      { href: "/test-drive-geely-bogor", label: { id: "Reservasi test drive", en: "Test-drive reservation" } },
      { href: "/harga-mobil-geely-bogor", label: { id: "Bandingkan semua harga", en: "Compare all prices" } },
    ],
    ogImage: "/images/model-coolray.webp",
  },

  /* ── 6. Harga Geely EX2 Bogor ───────────────────────────────── */
  {
    slug: "geely-ex2-bogor",
    intent: "Calon pembeli mencari harga EX2 (hatchback listrik termurah) di Bogor.",
    priority: 0.9,
    title: {
      id: "Harga Geely EX2 Bogor | Hatchback Listrik 395 km, Cicilan & Garansi",
      en: "Geely EX2 Bogor Price | 395 km Electric Hatchback, Installments & Warranty",
    },
    description: {
      id: "Harga Geely EX2 di Bogor mulai Rp 239,9 juta (indikatif OTR). Hatchback listrik dengan jangkauan 395 km (NEDC), pengisian cepat 25 menit, dan frunk — paling ramah untuk pemula EV. Hitung cicilan via kalkulator.",
      en: "Geely EX2 price in Bogor from Rp 239.9 million (indicative OTR). An electric hatchback with 395 km range (NEDC), 25-minute fast charging, and a frunk — the friendliest EV for beginners. Calculate installments on the calculator.",
    },
    h1: {
      id: "Harga Geely EX2 di Bogor — Pintu Masuk Mobil Listrik",
      en: "Geely EX2 Price in Bogor — The Entry to Electric Cars",
    },
    lead: [
      {
        id: "EX2 adalah mobil Geely termurah dan sekaligus kendaraan listrik paling terjangkau di kalangan brand merek besar di Indonesia — harga indikatif mulai Rp 239,9 juta OTR. Bentuknya hatchback kompak yang lincah di gang dan parkir Bogor, dengan jangkauan resmi hingga 395 km (NEDC) yang jauh melampaui kebutuhan harian rata-rata pengguna kota.",
        en: "The EX2 is Geely's cheapest car and at the same time among the most affordable electric vehicles from a major brand in Indonesia — indicative prices from Rp 239.9 million OTR. It is a compact hatchback, agile in Bogor's alleys and parking, with an official range of up to 395 km (NEDC) that far exceeds the average city user's daily needs.",
      },
      {
        id: "Yang membuat EX2 menarik bagi pemilik pertama: pengisian cepatnya hanya sekitar 25 menit untuk naik dari level daya rendah ke tinggi di SPKLU, ia memiliki frunk (bagasi depan) yang praktis, dan biaya operasionalnya minimum. Halaman ini membahas kelayakannya untuk kebutuhan harian Anda serta cara menghitung cicilannya.",
        en: "What makes the EX2 attractive for first-time owners: fast charging takes only about 25 minutes from low to high state of charge at an SPKLU, it has a practical frunk (front trunk), and its running costs are minimal. This page covers its suitability for your daily needs and how to calculate installments.",
      },
    ],
    chips: [
      { id: "Mulai Rp 239,9 jt OTR*", en: "From Rp 239.9 M OTR*" },
      { id: "395 km jangkauan (NEDC)*", en: "395 km range (NEDC)*" },
      { id: "Pengisian cepat ±25 menit*", en: "Fast charging ±25 minutes*" },
      { id: "Frunk & hatchback kompak", en: "Frunk & compact hatchback" },
    ],
    modelId: "ex2",
    embedSimulator: true,
    sections: [
      {
        heading: { id: "Cukup atau tidak untuk kebutuhan harian?", en: "Enough or not for daily needs?" },
        paragraphs: [
          {
            id: "Jawaban jujurnya: untuk mayoritas pola pakai urban, lebih dari cukup. Rata-rata jarak tempuh pengguna Jabodetabek berada jauh di bawah 395 km — artinya dengan pengisian di rumah beberapa kali sepekan, Anda tidak akan pernah merasakan kecemasan jangkauan. Pertanyaan yang lebih tepat adalah kapasitas penumpang: EX2 adalah hatchback untuk penggunaan inti keluarga kecil atau individu, bukan pengganti SUV tujuh penumpang.",
            en: "The honest answer: for most urban usage patterns, more than enough. The average Greater Jakarta user's daily distance sits far below 395 km — meaning with home charging a few times a week you will never feel range anxiety. The better question is passenger capacity: the EX2 is a hatchback for a small core family or individual, not a seven-seater SUV replacement.",
          },
          {
            id: "Perhatikan juga jenis perjalanan terjauh yang rutin Anda tempuh. Rute Bogor–Depok, Bogor–Jakarta, atau Cibinong–BSD semuanya nyaman dalam jangkauan. Perjalanan lintas provinsi yang panjang tetap mungkin dengan perhentian pengisian cepat 25 menit — bukan hambatan, tetapi perubahan kebiasaan yang perlu disadari sejak awal.",
            en: "Also consider the longest routine trip you make. Bogor–Depok, Bogor–Jakarta, or Cibinong–BSD routes are all comfortably within range. Long interprovincial trips remain possible with 25-minute fast-charging stops — not a barrier, but a habit change to be aware of from the start.",
          },
        ],
      },
      {
        heading: { id: "Biaya kepemilikan: di mana EX2 paling unggul", en: "Ownership costs: where the EX2 excels" },
        paragraphs: [
          {
            id: "EX2 mengkompress biaya kepemilikan ke titik terendah di jajaran Geely: energi per kilometer sangat murah bila diisi di rumah, tidak ada servis oli mesin dan komponen pembakaran, dan pajak kendaraan listrik mengikuti kebijakan keringanan daerah. Bagi pembeli yang anggarannya ketat tetapi ingin melompat langsung ke kendaraan listrik, EX2 adalah pilihan paling rasional di kelasnya.",
            en: "The EX2 compresses ownership costs to the lowest point in the Geely lineup: energy per kilometer is very cheap when charged at home, there is no engine oil or combustion servicing, and electric-vehicle tax follows regional relief policies. For buyers on a tight budget who want to jump straight to an electric vehicle, the EX2 is the most rational choice in its class.",
          },
          {
            id: "Nilai jual lain yang jarang dibahas: ukuran kompaknya menghemat biaya tidak langsung — mudah parkir, ringan dikendarai di lalu lintas padat, dan praktis untuk kurir-belanja-antar sekolah. Untuk pengguna kedua dalam rumah tangga (mobile ke stasiun, harian ke kantor), EX2 hampir selalu lebih efisien daripada memakai SUV besar.",
            en: "Another under-discussed selling point: its compact size saves indirect costs — easy parking, easy driving in dense traffic, and practical for shopping and school runs. As the second vehicle in a household (station runs, daily commuting), the EX2 is almost always more efficient than using a large SUV.",
          },
        ],
      },
      {
        heading: { id: "Garansi dan pertanyaan umum EV pemula", en: "Warranty and first-time EV questions" },
        paragraphs: [
          {
            id: "Pembeli EX2 pertama kali hampir selalu menanyakan hal yang sama: seberapa awet baterai, aman kah saat hujan dan genangan, dan bagaimana garansinya. Ketentuan garansi resmi mengikuti dokumen PT Geely Mobil Indonesia pada periode pembelian — kami jelaskan rincinya saat konsultasi. Untuk keamanan pengisian dan pemakaian di cuaca ekstrem, panduan lengkapnya kami tulis di artikel perawatan baterai yang terkait di halaman ini.",
            en: "First-time EX2 buyers almost always ask the same things: how long the battery lasts, whether it is safe in rain and puddles, and how the warranty works. Official warranty terms follow PT Geely Mobil Indonesia's documents at purchase time — we explain the details during consultation. For charging safety and extreme-weather use, the full guide is in the battery-care article linked on this page.",
          },
        ],
      },
    ],
    faq: [
      {
        q: { id: "Berapa harga Geely EX2 di Bogor?", en: "What is the Geely EX2 price in Bogor?" },
        a: {
          id: "Harga indikatif OTR per September 2026 mulai Rp 239,9 juta. Ini menjadikannya kendaraan listrik termurah dari merek besar di kelasnya — angka final mengikuti penawaran dealer resmi pada periode pembelian.",
          en: "The indicative OTR price as of September 2026 starts at Rp 239.9 million. That makes it among the cheapest electric vehicles from a major brand in its class — final figures follow the official dealer's offer at purchase time.",
        },
      },
      {
        q: { id: "Berapa lama mengisi daya EX2?", en: "How long does EX2 charging take?" },
        a: {
          id: "Di SPKLU pengisian cepat, waktu naik dari tingkat daya rendah ke tinggi sekitar 25 menit (sesuai spesifikasi resmi). Di rumah dengan charger AC, pengisian penuh semalam adalah pola paling umum — colokkan saat tidur, pagi penuh.",
          en: "At a fast-charging SPKLU, going from low to high state of charge takes about 25 minutes (per official specs). At home with an AC charger, an overnight full charge is the most common pattern — plug in when you sleep, full by morning.",
        },
      },
      {
        q: { id: "EX2 cocok untuk perjalanan mudik jauh?", en: "Is the EX2 suitable for long holiday trips?" },
        a: {
          id: "Bisa, dengan perencanaan: jangkauan 395 km (NEDC) dan pengisian cepat 25 menit membuat perjalanan jauh tetap praktis dengan satu-dua perhentian. Untuk keluarga yang rutin mudik dengan muatan penuh, Starray EM-i bisa lebih nyaman — diskusikan pola perjalanan Anda saat konsultasi.",
          en: "Yes, with planning: the 395 km (NEDC) range and 25-minute fast charging keep long trips practical with one or two stops. For families who regularly travel fully loaded, the Starray EM-i may be more comfortable — discuss your travel pattern during consultation.",
        },
      },
      {
        q: { id: "Berapa cicilan EX2?", en: "What is the EX2 installment?" },
        a: {
          id: "Hitung di kalkulator halaman ini — dengan harga terendah di jajaran Geely, cicilannya juga paling ramah. Sebagai gambaran kasar: DP 20%, tenor 48 bulan, bunga flat 6% menghasilkan angsuran sekitar Rp 4,5 jutaan per bulan sebelum asuransi dan biaya admin.",
          en: "Calculate on this page's calculator — with the lowest price in the Geely lineup, its installment is also the friendliest. As a rough picture: 20% DP, a 48-month tenor, and a 6% flat rate yields around Rp 4.5 million-plus per month before insurance and admin fees.",
        },
      },
    ],
    related: [
      { href: "/model/ex2", label: { id: "Spesifikasi lengkap EX2", en: "Full EX2 specs" } },
      { href: "/mobil-listrik-geely-bogor", label: { id: "Panduan mobil listrik pemula", en: "Beginner electric-car guide" } },
      { href: "/artikel/tips-merawat-baterai-mobil-listrik", label: { id: "Tips merawat baterai EV", en: "EV battery care tips" } },
      { href: "/kredit-cicilan-geely-bogor", label: { id: "Simulasi kredit EX2", en: "EX2 credit simulation" } },
      { href: "/test-drive-geely-bogor", label: { id: "Coba unit EX2", en: "Try the EX2" } },
    ],
    ogImage: "/images/model-ex2.webp",
  },
  /* ── 7. Test Drive Geely Bogor ──────────────────────────────── */
  {
    slug: "test-drive-geely-bogor",
    intent: "Calon pembeli ingin mencoba unit Geely sebelum membeli di Bogor.",
    priority: 0.85,
    title: {
      id: "Test Drive Geely Bogor | Reservasi Coba Unit EX5, Starray, Coolray, EX2",
      en: "Geely Test Drive Bogor | Reserve a Try of the EX5, Starray, Coolray, EX2",
    },
    description: {
      id: "Reservasi test drive Geely di Bogor & Jabodetabek via WhatsApp: pilih model (EX5, Starray EM-i, Coolray, EX2), atur waktu, dan konfirmasi ketersediaan unit lebih dulu — jujur tanpa janji berlebihan.",
      en: "Reserve a Geely test drive in Bogor & Greater Jakarta via WhatsApp: pick a model (EX5, Starray EM-i, Coolray, EX2), set a time, and confirm unit availability first — honestly, without overpromising.",
    },
    h1: {
      id: "Test Drive Geely di Bogor — Coba Dulu, Putuskan Kemudian",
      en: "Geely Test Drive in Bogor — Try First, Decide After",
    },
    lead: [
      {
        id: "Tidak ada keputusan pembelian mobil yang sebaik diambil tanpa mencoba — apalagi untuk mobil listrik, di mana kebiasaan menyetirnya berbeda dari yang selama ini Anda kenal: akselerasi seketika, pengereman regeneratif, dan kebiasaan baru mengecek daya alih-alih melihat indikator bensin. Test drive membuat semua istilah itu berhenti menjadi teori.",
        en: "No car purchase decision should be made without trying it — especially an electric car, whose driving habits differ from what you have always known: instant acceleration, regenerative braking, and the new habit of checking charge instead of a fuel gauge. A test drive stops all those terms from being theory.",
      },
      {
        id: "Reservasi test drive dilakukan langsung via WhatsApp dengan proses yang transparan: Anda memilih model dan waktu, kami memeriksa ketersediaan unit di wilayah Bogor/Jabodetabek, lalu mengonfirmasi jadwalnya. Satu prinsip yang kami pegang: tidak pernah menjanjikan unit tersedia sebelum benar-benar dikonfirmasi — karena waktu Anda terlalu berharga untuk dibuang ke showroom yang kehabisan unit.",
        en: "Test-drive reservation happens directly via WhatsApp with a transparent process: you pick a model and time, we check unit availability in the Bogor/Greater Jakarta area, then confirm the schedule. One principle we keep: never promising a unit is available before it is actually confirmed — because your time is too valuable to waste on a showroom that ran out of units.",
      },
    ],
    chips: [
      { id: "4 model tersedia untuk dicoba*", en: "4 models available to try*" },
      { id: "Reservasi via WhatsApp", en: "Reservation via WhatsApp" },
      { id: "Konfirmasi unit lebih dulu", en: "Unit confirmed first" },
      { id: "Area Bogor & Jabodetabek", en: "Bogor & Greater Jakarta area" },
    ],
    embedTestDrive: true,
    sections: [
      {
        heading: { id: "Model mana yang sebaiknya dicoba?", en: "Which model should you try?" },
        paragraphs: [
          {
            id: "Cobalah model yang paling mendekati pola pakai Anda — bukan yang paling murah atau paling mahal. Untuk komuter harian Bogor–Jakarta dengan akses colokan rumah, EX5 memberi gambaran paling utuh tentang hidup dengan SUV listrik. Untuk keluarga yang sering jalan jauh, Starray EM-i menunjukkan transisi listrik-ke-bensin yang mulus. Coolray wajib dicoba oleh siapa pun yang mengutamakan performa, dan EX2 menjawab apakah ukuran kompak sudah cukup untuk keluarga Anda.",
            en: "Try the model closest to your usage pattern — not the cheapest or the most expensive. For daily Bogor–Jakarta commuting with home charging, the EX5 gives the most complete picture of life with an electric SUV. For families who travel far often, the Starray EM-i shows the seamless electric-to-petrol transition. The Coolray is a must-try for performance-focused buyers, and the EX2 answers whether compact size is enough for your family.",
          },
          {
            id: "Bila masih ragu, jadwalkan dua model dalam satu jadwal yang berdekatan — perbandingan langsung dalam waktu dekat jauh lebih bermakna daripada mencoba satu model hari ini dan model lain tiga pekan kemudian. Sebutkan saat reservasi, dan kami usahakan mengatur keduanya.",
            en: "If unsure, schedule two models close together — a direct comparison within a short window is far more meaningful than trying one model today and the other three weeks later. Mention it when reserving and we will try to arrange both.",
          },
        ],
      },
      {
        heading: { id: "Proses reservasi — langkah demi langkah", en: "The reservation process — step by step" },
        paragraphs: [
          {
            id: "Langkah pertama: kirim pesan WhatsApp melalui formulir di halaman ini atau langsung ke nomor yang tertera — sebutkan model, area Anda (mis. Bogor Kota, Cibinong, Depok), dan waktu yang diinginkan. Langkah kedua: kami cek ketersediaan unit dan konfirmasi kembali, termasuk alternatif bila model yang Anda pilih sedang tidak tersedia. Langkah ketiga: test drive berlangsung di rute yang disepakati — idealnya mencakup jalan padat dan sedikit kecepatan tinggi agar karakter mobil terlihat lengkap. Seluruh proses tanpa biaya dan tanpa kewajiban membeli.",
            en: "Step one: send a WhatsApp message via the form on this page or straight to the listed number — mention the model, your area (e.g. Bogor City, Cibinong, Depok), and preferred time. Step two: we check availability and confirm back, including alternatives if your chosen model is currently unavailable. Step three: the test drive runs on an agreed route — ideally covering dense roads and some higher-speed stretches so the car's character shows fully. The whole process is free and carries no purchase obligation.",
          },
        ],
        bullets: [
          { id: "Siapkan SIM A yang masih berlaku untuk mengemudi sendiri", en: "Bring a valid SIM A to drive yourself" },
          { id: "Bila tidak mengemudi, Anda tetap bisa duduk sebagai penumpang", en: "If not driving, you can still ride as a passenger" },
          { id: "Durasi mencoba cukup biasanya 30–60 menit termasuk penjelasan fitur", en: "A sufficient try usually takes 30–60 minutes including feature explanation" },
          { id: "Ketersediaan unit, warna, dan model selalu dikonfirmasi lebih dulu", en: "Unit, color, and model availability are always confirmed first" },
        ],
      },
      {
        heading: { id: "Kejujuran tentang ketersediaan unit", en: "Honesty about unit availability" },
        paragraphs: [
          {
            id: "Kami sengaja tidak menampilkan tombol 'booking sekarang, pasti tersedia'. Realitanya: unit test drive berpindah lokasi, beberapa varian lebih langka daripada yang lain, dan jadwal perawatan unit juga ada. Alih-alih janji yang bisa rusak, Anda mendapat jawaban status yang akurat saat reservasi — termasuk estimasi kapan unit bisa tersedia atau model alternatif yang siap hari itu. Pendekatan ini menghormati waktu Anda dan menjaga kepercayaan lebih penting daripada satu jadwal test drive.",
            en: "We deliberately avoid a 'book now, guaranteed available' button. Reality: test-drive units move between locations, some variants are rarer than others, and units also have maintenance schedules. Instead of a promise that can break, you get an accurate status answer at reservation — including an estimate of when a unit might be available or an alternative model ready that day. This approach respects your time and keeps trust above any single test-drive slot.",
          },
        ],
      },
    ],
    faq: [
      {
        q: { id: "Apakah test drive berbayar?", en: "Is the test drive charged?" },
        a: {
          id: "Tidak ada biaya untuk test drive. Pilihan menyetir sendiri atau didampingi penjelasan fitur juga bebas — tujuannya memberi Anda informasi cukup untuk memutuskan, bukan tekanan membeli.",
          en: "There is no charge for a test drive. Driving yourself or being accompanied with feature explanation is up to you — the goal is to give you enough information to decide, not purchase pressure.",
        },
      },
      {
        q: { id: "Apakah unit pasti tersedia pada tanggal yang saya minta?", en: "Is the unit guaranteed available on my requested date?" },
        a: {
          id: "Tidak selalu — dan kami tidak akan berpura-pura demikian. Ketersediaan diperiksa terlebih dahulu setelah permintaan masuk; bila tidak tersedia, Anda diberi alternatif tanggal atau model. Konfirmasi final selalu dikirim sebelum jadwal terkunci.",
          en: "Not always — and we will not pretend otherwise. Availability is checked first after your request; if unavailable, you are given alternative dates or models. Final confirmation is always sent before the schedule locks.",
        },
      },
      {
        q: { id: "Apa yang perlu saya bawa saat test drive?", en: "What should I bring to the test drive?" },
        a: {
          id: "SIM A yang masih berlaku bila ingin mengemudi sendiri. Untuk sisanya cukup datang dengan kondisi sepatu yang nyaman untuk mengemudi dan waktu yang tidak terburu-buru — test drive yang baik tidak dilakukan sambil mengejar jadwal berikutnya.",
          en: "A valid SIM A if you want to drive yourself. Otherwise just come with comfortable driving shoes and unhurried time — a good test drive is not done while chasing your next appointment.",
        },
      },
      {
        q: { id: "Bolehkah mencoba lebih dari satu model?", en: "Can I try more than one model?" },
        a: {
          id: "Boleh dan sering kami sarankan — terutama EX5 vs Starray EM-i (listrik murni vs hybrid) atau Coolray vs EX2 (bensin vs listrik kompak). Sebutkan dua model yang ingin dibandingkan saat reservasi agar jadwalnya bisa diatur berdekatan.",
          en: "Yes — and we often recommend it — especially EX5 vs Starray EM-i (pure electric vs hybrid) or Coolray vs EX2 (petrol vs compact electric). Mention the two models you want to compare when reserving so the schedules can be arranged close together.",
        },
      },
    ],
    related: [
      { href: "/sales-geely-bogor", label: { id: "Kenali konsultan Anda", en: "Know your consultant" } },
      { href: "/model/ex5", label: { id: "Baca spesifikasi EX5 dulu", en: "Read EX5 specs first" } },
      { href: "/harga-mobil-geely-bogor", label: { id: "Cek harga semua model", en: "Check all model prices" } },
      { href: "/mobil-listrik-geely-bogor", label: { id: "Panduan sebelum mencoba EV", en: "Guide before trying an EV" } },
    ],
    ogImage: "/images/unit-ex5-snowy.webp",
  },

  /* ── 8. Mobil Listrik Geely Bogor (panduan edukasi) ─────────── */
  {
    slug: "mobil-listrik-geely-bogor",
    intent: "Pencari belum menentukan model; sedang edukasi tentang mobil listrik di Bogor.",
    priority: 0.8,
    title: {
      id: "Mobil Listrik Geely Bogor | Panduan EV vs Hybrid untuk Calon Pembeli",
      en: "Geely Electric Cars Bogor | EV vs Hybrid Guide for Buyers",
    },
    description: {
      id: "Panduan mobil listrik Geely untuk pembeli Bogor: perbedaan EV dan PHEV, cara mengisi daya di rumah & SPKLU, jarak tempuh riil, biaya pemakaian per km, dan cara memilih model yang sesuai kebutuhan Anda.",
      en: "Geely electric-car guide for Bogor buyers: EV vs PHEV differences, home & SPKLU charging, real-world range, cost per km, and how to pick the model that fits your needs.",
    },
    h1: {
      id: "Mobil Listrik Geely di Bogor — Panduan Memilih dengan Tenang",
      en: "Geely Electric Cars in Bogor — A Calm Guide to Choosing",
    },
    lead: [
      {
        id: "Anda mungkin sedang berada di tahap paling penting dari seluruh perjalanan membeli mobil listrik: tahap memahami, sebelum dipengaruhi brosur manapun. Panduan ini ditulis untuk pembeli di Bogor dan Jabodetabek yang ingin memahami perbedaan mobil listrik murni (EV) dan hybrid plug-in (PHEV), cara realistis mengisi daya, jangkauan yang sebenarnya relevan, serta biaya pemakaian yang jujur — tanpa sensasionalisme dari dua sisi.",
        en: "You may be at the most important stage of the whole electric-car journey: the understanding stage, before any brochure sways you. This guide is written for buyers in Bogor and Greater Jakarta who want to understand pure electric (EV) vs plug-in hybrid (PHEV) differences, realistic charging, the range that actually matters, and honest running costs — without sensationalism from either side.",
      },
      {
        id: "Di akhir panduan, Anda akan tahu pertanyaan mana yang perlu dijawab sebelum memilih model — dan bila ingin melanjutkan, konsultasi via WhatsApp menuntun Anda dari pemahaman ke rekomendasi konkret dengan angka yang bisa diverifikasi.",
        en: "By the end of this guide you will know which questions to answer before choosing a model — and if you want to continue, WhatsApp consultation takes you from understanding to a concrete recommendation with verifiable figures.",
      },
    ],
    chips: [
      { id: "EV: EX5 & EX2", en: "EV: EX5 & EX2" },
      { id: "PHEV: Starray EM-i", en: "PHEV: Starray EM-i" },
      { id: "Isi daya rumah & SPKLU", en: "Home & SPKLU charging" },
      { id: "Panduan tanpa jargon", en: "Jargon-free guide" },
    ],
    sections: [
      {
        heading: { id: "EV vs PHEV vs bensin — perbedaan praktisnya", en: "EV vs PHEV vs petrol — the practical differences" },
        paragraphs: [
          {
            id: "Mobil listrik murni (EV) seperti EX5 dan EX2 digerakkan hanya motor listrik dan diisi dari colokan. Konsekuensinya: biaya energi per km terendah, kabin paling senyap, servis paling sederhana — tetapi perjalanan jauh bergantung pada perencanaan pengisian. Mobil hybrid plug-in (PHEV) seperti Starray EM-i memakai kombinasi motor listrik dan mesin bensin: harian bisa murni listrik bila rajin diisi, sementara mesin bensin menghilangkan kecemasan jangkauan sepenuhnya. Mobil bensin konvensional seperti Coolray tetap pilihan paling bebas: isi bensin lima menit, jalan ribuan kilometer.",
            en: "A pure electric car (EV) like the EX5 and EX2 runs only on an electric motor charged from an outlet. The consequences: lowest energy cost per km, the quietest cabin, the simplest servicing — but long trips depend on charging planning. A plug-in hybrid (PHEV) like the Starray EM-i combines an electric motor and petrol engine: daily driving can be fully electric if you charge diligently, while the petrol engine removes range anxiety entirely. A conventional petrol car like the Coolray remains the freest option: five minutes of refueling, thousands of kilometers of travel.",
          },
          {
            id: "Tidak ada yang paling benar untuk semua orang. Yang ada adalah kecocokan dengan tiga variabel kehidupan Anda: akses colokan di tempat parkir utama, jarak tempuh harian, dan frekuensi perjalanan jauh. Jawab ketiganya dengan jujur, dan pilihan modelnya hampir selalu menjadi jelas dengan sendirinya.",
            en: "None is universally right. There is only fit with three variables of your life: outlet access at your main parking, daily distance, and long-trip frequency. Answer those honestly and the model choice almost always becomes clear on its own.",
          },
        ],
      },
      {
        heading: { id: "Mengisi daya di Bogor: rumah, kantor, dan SPKLU", en: "Charging in Bogor: home, office, and SPKLU" },
        paragraphs: [
          {
            id: "Mayoritas pengisian pemilik EV di Indonesia terjadi di rumah — dan pola ini juga berlaku di Bogor. Charger AC di garasi mengisi penuh semalam; listrik rumahan berdaya 2200 VA ke atas sudah cukup untuk pengisian harian yang sehat (perencanaan daya rumah dijelaskan saat konsultasi, termasuk opsi pengisian terjadwal di jam tertentu). Untuk pengisian cepat di perjalanan, SPKLU tersebar di sepanjang koridor utama Jabodetabek — pusat perbelanjaan, rest area Tol Jagorawi dan Darmaga, serta pom bensin tertentu.",
            en: "Most EV owners in Indonesia charge at home — and the pattern holds in Bogor. An AC charger in the garage fills overnight; household power of 2200 VA and above is already enough for healthy daily charging (home power planning is explained during consultation, including scheduled-charging options). For fast charging on the go, SPKLU stations line Greater Jakarta's main corridors — shopping malls, Jagorawi and Darmaga toll rest areas, and certain fuel stations.",
          },
          {
            id: "Kebiasaan yang benar sebenarnya sederhana: perlakukan baterai seperti layaknya ponsel — isi ketika di rumah, jangan menunggu hampir habis. Dengan jangkauan EX5 hingga 495 km atau EX2 hingga 395 km (NEDC), Anda jauh lebih sering mengisi 'karena sempat' daripada 'karena darurat'.",
            en: "The right habit is actually simple: treat the battery like a phone — charge when home, do not wait until nearly empty. With the EX5's up-to-495 km or the EX2's up-to-395 km range (NEDC), you will charge 'because you can' far more often than 'because you must'.",
          },
        ],
        bullets: [
          { id: "Rumah: charger AC, penuh semalam — pola utama sebagian besar pemilik", en: "Home: AC charger, full overnight — the main pattern for most owners" },
          { id: "SPKLU: pengisian cepat puluhan menit — untuk perjalanan jauh", en: "SPKLU: fast charging in tens of minutes — for long trips" },
          { id: "Kantor: bila tersedia, menutup kebutuhan harian tanpa charger rumah", en: "Office: when available, covers daily needs without a home charger" },
          { id: "Perencanaan daya listrik rumah dibahas saat konsultasi — gratis", en: "Home power planning is discussed during consultation — free" },
        ],
      },
      {
        heading: { id: "Jarak tempuh & biaya: angka yang sebenarnya penting", en: "Range & cost: the numbers that actually matter" },
        paragraphs: [
          {
            id: "Jangkauan resmi (NEDC) adalah angka laboratorium yang baik untuk membandingkan antar mobil, tetapi pemakaian riil dipengaruhi kecepatan, pendingin kabin, dan muatan. Pengalaman umum pemilik: jangkauan riil kota berada dekat dengan angka resmi karena kecepatan rendah menguntungkan EV, sementara perjalanan tol berkecepatan tinggi menguranginya beberapa persen. Jangan terpaku satu angka — hitung rute harian Anda, tambahkan buffer sehat, dan bandingkan dengan jangkauan resmi.",
            en: "The official range (NEDC) is a laboratory figure good for comparing cars, but real use is affected by speed, cabin cooling, and load. Common owner experience: real city range sits close to the official figure because low speeds favor EVs, while high-speed toll trips cut it by some percentage. Do not fixate on one number — compute your daily route, add a healthy buffer, and compare with the official range.",
          },
          {
            id: "Untuk biaya, logikanya sederhana: energi listrik per kilometer jauh lebih murah daripada bensin — pengisian rumah adalah mode termurah, SPKLU sedikit lebih mahal tetapi masih jauh di bawah bensin untuk jarak yang sama. Ditambah keringanan pajak kendaraan listrik di sejumlah daerah dan servis yang lebih sederhana, struktur biaya tahunan mobil listrik memang berbeda — yang paling benar melihatnya adalah menghitung kasus Anda sendiri, dan itu bisa dilakukan bersama dalam konsultasi sepuluh menit.",
            en: "For cost, the logic is simple: electricity per kilometer is far cheaper than petrol — home charging is the cheapest mode, SPKLU is a bit more but still well below petrol for the same distance. Add electric-vehicle tax relief in many regions and simpler servicing, and an EV's annual cost structure is genuinely different — the truest way to see it is computing your own case, doable together in a ten-minute consultation.",
          },
        ],
      },
      {
        heading: { id: "Peta keputusan: model Geely mana untuk Anda?", en: "Decision map: which Geely model for you?" },
        paragraphs: [
          {
            id: "Punya colokan di rumah, rute harian di bawah 100 km, anggaran menengah: EX2 sudah sangat melayani. Anggaran lebih besar, butuh ruang keluarga dan jangkauan maksimal: EX5. Sering perjalanan jauh tetapi ingin biaya harian rendah dan bisa mengisi daya: Starray EM-i. Tanpa akses colokan sama sekali atau tidak mau mengubah kebiasaan: Coolray. Peta ini bukan aturan kaku — ini titik mulai percakapan yang baik saat konsultasi.",
            en: "Have a home outlet, daily routes under 100 km, mid budget: the EX2 serves well. Bigger budget, need family space and maximum range: the EX5. Frequent long trips but want low daily costs and can charge: the Starray EM-i. Zero outlet access or unwilling to change habits: the Coolray. This map is not a rigid rule — it is a good conversation starter during consultation.",
          },
          {
            id: "Langkah berikutnya yang kami sarankan: baca halaman harga model yang menarik minat Anda, lalu atur test drive dua kandidat dalam jadwal berdekatan. Membandingkan dua mobil langsung dalam satu hari adalah cara tercepat mengakhiri keraguan.",
            en: "The next step we suggest: read the price page of the models that interest you, then schedule test drives of two candidates close together. Comparing two cars directly in one day is the fastest way to end hesitation.",
          },
        ],
      },
    ],
    faq: [
      {
        q: { id: "Apakah mobil listrik aman saat hujan dan banjir?", en: "Are electric cars safe in rain and floods?" },
        a: {
          id: "Sistem baterai dan pengisian EV dirancang dengan proteksi tingkat tinggi terhadap air — pengisian tidak akan berjalan bila sistem mendeteksi kondisi tidak aman. Untuk panduan pemakaian saat cuaca ekstrem dan genangan, baca artikel perawatan baterai yang kami tautkan; dan seperti mobil pada umumnya, hindari menerobos banjir yang melebihi ketinggian wajar.",
          en: "EV battery and charging systems are designed with high-level water protection — charging will not proceed if the system detects unsafe conditions. For extreme-weather and flood guidance, read the battery-care article we link; and like any car, avoid pushing through floods above reasonable depth.",
        },
      },
      {
        q: { id: "Berapa biaya isi daya di rumah per bulan?", en: "What does home charging cost per month?" },
        a: {
          id: "Bergantung jarak tempuh dan tarif listrik rumah Anda. Sebagai logika kasar: biaya energi listrik per km jauh di bawah biaya bensin untuk jarak yang sama, sehingga pengguna harian 30–50 km menghabiskan biaya energi bulanan yang secara konsisten lebih rendah daripada pengeluaran bensin kendaraan setara. Hitung akuratnya dibuat bersama saat konsultasi memakai tarif riil Anda.",
          en: "It depends on your mileage and home tariff. As rough logic: electricity per km costs far below petrol for the same distance, so a 30–50 km daily user's monthly energy spend is consistently lower than a comparable vehicle's fuel spend. An accurate computation is built together during consultation using your real tariff.",
        },
      },
      {
        q: { id: "Berapa lama umur baterai dan bagaimana garansinya?", en: "How long does the battery last and what about warranty?" },
        a: {
          id: "Baterai modern dirancang untuk umur pemakaian kendaraan dengan degradasi bertahap yang wajar; ketentuan garansi baterai resmi mengikuti dokumen PT Geely Mobil Indonesia pada periode pembelian dan kami jelaskan rincinya saat konsultasi — bukan dari ingatan atau klaim informal.",
          en: "Modern batteries are designed for the vehicle's service life with gradual, normal degradation; official battery-warranty terms follow PT Geely Mobil Indonesia's documents at purchase time and we explain the details during consultation — not from memory or informal claims.",
        },
      },
      {
        q: { id: "Saya masih ragu EV atau hybrid — mulai dari mana?", en: "I am still unsure between EV and hybrid — where to start?" },
        a: {
          id: "Mulai dari tiga jawaban sederhana: apakah ada colokan di tempat parkir utama, berapa km harian Anda, dan berapa kali per bulan perjalanan jauh. Kirim ketiganya via WhatsApp — kami petakan kandidat modelnya, dan bila perlu atur test drive berdampingan untuk membandingkan langsung.",
          en: "Start with three simple answers: is there an outlet at your main parking, what is your daily km, and how many long trips per month. Send those via WhatsApp — we map the candidate models, and if needed arrange back-to-back test drives for a direct comparison.",
        },
      },
    ],
    related: [
      { href: "/geely-ex2-bogor", label: { id: "Harga EX2 — EV termurah", en: "EX2 price — cheapest EV" } },
      { href: "/geely-ex5-bogor", label: { id: "Harga EX5 — SUV EV", en: "EX5 price — EV SUV" } },
      { href: "/geely-starray-emi-bogor", label: { id: "Harga Starray EM-i — PHEV", en: "Starray EM-i price — PHEV" } },
      { href: "/artikel/tips-merawat-baterai-mobil-listrik", label: { id: "Merawat baterai EV", en: "EV battery care" } },
      { href: "/test-drive-geely-bogor", label: { id: "Coba keduanya langsung", en: "Try both directly" } },
    ],
    ogImage: "/images/model-ex2.webp",
  },
];

export { WA_NOTE };
