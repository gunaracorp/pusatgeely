import { AREAS } from "@/lib/site";

export type Lang = "id" | "en";

/** Bilingual string helper. */
export function tx(value: { id: string; en: string }, lang: Lang): string {
  return value[lang];
}

const ID = {
  nav: {
    models: "Model",
    services: "Layanan",
    sales: "Sales",
    harga: "Harga",
    promo: "Promo",
    artikel: "Artikel",
    gallery: "Galeri",
    simulator: "Simulasi Kredit",
    testDrive: "Test Drive",
    faq: "FAQ",
    contact: "Kontak",
    keywords: "Indeks Kata Kunci",
    compare: "Perbandingan",
    explore: "Jelajah",
    seeAllPrices: "Lihat semua harga & varian",
    hargaDesc: "Harga OTR seluruh varian",
    promoDesc: "Paket kredit leasing terbaru",
    kreditDesc: "Hitung DP & angsuran",
    testDriveDesc: "Jadwalkan di lokasi Anda",
  },
  promo: {
    eyebrow: "Promo & Paket Kredit",
    title: "Simulasi resmi dari 5 perusahaan pembiayaan",
    subtitle:
      "Angsuran dan DP disalin dari lembar simulasi resmi CIMB Niaga, BRI Finance, BNI Finance, Mandiri Utama Finance, dan IMFI — lengkap dengan PDF aslinya.",
    financeLabel: "Pilih perusahaan pembiayaan",
    modelLabel: "Model & varian",
    subProgramLabel: "Varian program",
    tenor: "Tenor (bulan)",
    tenorShort: "Tenor",
    installment: "Angsuran / bulan",
    firstPayment: "Bayar pertama",
    yearlyNote: "Skema 50-50 — angsuran dibayarkan 1× setahun pada bulan ke-12",
    downloadPdf: "Unduh lembar PDF",
    askThis: "Tanya program ini via WA",
    requirementsTitle: "Dokumen persyaratan",
    highlightsTitle: "Sorotan program",
    waMessage: (
      finance: string,
      program: string,
      model: string,
      tenor: number,
      installment: string,
      firstPayment: string
    ) =>
      `Halo Pusat Geely, saya tertarik dengan program ${program} (${finance}) untuk ${model}:\n• Tenor: ${tenor} bulan\n• Angsuran: ${installment}\n• Bayar pertama: ${firstPayment}\n\nMohon dibantu info kelengkapan dokumen & langkah pengajuannya. Terima kasih.`,
    disclaimer:
      "*Angka disalin dari lembar simulasi resmi masing-masing perusahaan pembiayaan tanpa perubahan — indikatif, tidak mengikat, dan dapat berubah sewaktu-waktu. Asumsi OTR antar lembar dapat berbeda; angsuran final mengikuti hasil survei & kebijakan leasing.",
  },
  header: {
    cta: "Chat WhatsApp",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    theme: "Ganti tema",
  },
  hero: {
    eyebrow: "Geely • Bogor & Jabodetabek",
    titleA: "Pusat Geely Anda di",
    titleB: "Bogor & Jabodetabek",
    subtitle:
      "Konsultasi, test drive, simulasi kredit, dan trade-in — ditangani langsung oleh konsultan penjualan yang responsif. Tanpa ribet, tanpa tekanan.",
    ctaPrimary: "Jadwalkan Test Drive",
    ctaSecondary: "Chat WhatsApp",
    chips: [
      "Respons cepat, konsultasi gratis",
      "Tanpa tekanan, tanpa biaya tersembunyi",
      "Melayani Bogor & seluruh Jabodetabek",
    ],
    scroll: "Lihat model",
  },
  models: {
    eyebrow: "Pilihan Model",
    title: "Pilih Geely Anda",
    subtitle:
      "Empat model — dari hatchback listrik lincah sampai SUV super hybrid keluarga. Semua tersedia untuk wilayah Bogor & Jabodetabek.",
    priceFrom: "Mulai",
    variants: "Varian",
    colorLabel: "Warna",
    realPhoto: "Foto Unit Asli",
    illustrative: "Ilustrasi",
    detailCta: "Lihat Detail",
    ctaTestDrive: "Test Drive",
    ctaAskPrice: "Tanya Harga",
    waAskPrice: (model: string) =>
      `Halo Pusat Geely, saya ingin menanyakan harga & penawaran terbaik untuk ${model}. Terima kasih.`,
    disclaimer:
      "*Harga indikatif OTR per September 2026 — konfirmasi harga terbaru via WhatsApp.",
    seeVariants: "Lihat varian",
  },
  services: {
    eyebrow: "Kenapa Pusat Geely",
    title: "Semua kebutuhan pembelian Anda, satu kontak",
    subtitle:
      "Satu orang yang tahu kebutuhan Anda dari awal sampai serah terima kunci — bukan call center yang mengganti-ganti petugas.",
    items: [
      {
        title: "Test Drive Fleksibel",
        desc: "Jadwalkan test drive di rumah atau kantor Anda dalam area layanan — kami yang mendatangi.",
      },
      {
        title: "Harga Transparan",
        desc: "Rincian harga OTR dijelaskan apa adanya, tanpa biaya tersembunyi, dengan penawaran terbaik yang tersedia.",
      },
      {
        title: "Kredit & Leasing",
        desc: "Dibantu dari simulasi angsuran, persiapan dokumen, sampai pengajuan ke perusahaan pembiayaan.",
      },
      {
        title: "Trade-In Mobil Lama",
        desc: "Estimasikan nilai mobil lama Anda untuk dipakai sebagai uang muka kendaraan baru.",
      },
      {
        title: "Pendampingan Proses",
        desc: "Dari pemilihan unit hingga serah terima — setiap langkah didampingi dan dijelaskan.",
      },
      {
        title: "Arahan Purna Jual",
        desc: "Panduan servis dan jaringan layanan resmi Geely agar kendaraan Anda tetap prima.",
      },
    ],
  },
  simulator: {
    eyebrow: "Simulasi Kredit",
    title: "Hitung estimasi angsuran dalam 10 detik",
    subtitle:
      "Simulasi sederhana untuk gambaran awal sebelum konsultasi lebih detail.",
    model: "Pilih model",
    price: "Harga OTR",
    dpPercent: "Uang muka (DP)",
    rate: "Bunga flat / tahun",
    tenor: "Tenor",
    months: (n: number) => `${n} bulan`,
    dpAmount: "Nilai DP",
    installment: "Estimasi angsuran / bulan",
    total: "Total estimasi pembayaran",
    cta: "Minta simulasi resmi via WhatsApp",
    waMessage: (model: string, dp: string, tenor: number, rate: string, installment: string) =>
      `Halo Pusat Geely, saya sudah coba simulasi kredit ${model} di website:\n• DP: ${dp}\n• Tenor: ${tenor} bulan\n• Bunga flat: ${rate}%/tahun\n• Estimasi angsuran: ${installment}/bulan\n\nMohon dibantu simulasi resmi & info promo leasing terbaiknya. Terima kasih.`,
    disclaimer:
      "Simulasi bersifat indikatif (metode bunga flat), bukan penawaran kredit resmi. Angsuran final ditentukan perusahaan pembiayaan berdasarkan profil kredit, asuransi, dan kebijakan yang berlaku.",
  },
  testDrive: {
    eyebrow: "Test Drive & Konsultasi",
    title: "Jadwalkan test drive atau minta penawaran",
    subtitle:
      "Isi form di bawah — permintaan Anda tersimpan langsung dan tim kami menghubungi via WhatsApp untuk konfirmasi jadwal.",
    fields: {
      name: "Nama lengkap",
      namePh: "Contoh: Budi Santoso",
      phone: "Nomor WhatsApp",
      phonePh: "Contoh: 0812xxxxxxx",
      model: "Model yang diminati",
      modelPh: "Pilih model",
      modelAny: "Belum tahu / minta saran",
      interest: "Kebutuhan",
      interests: {
        "test-drive": "Test drive",
        price: "Tanya harga & promo",
        financing: "Simulasi kredit",
        "trade-in": "Trade-in mobil lama",
        general: "Konsultasi umum",
      },
      area: "Area domisili",
      areaPh: "Pilih area",
      date: "Tanggal preferensi (opsional)",
      message: "Catatan tambahan (opsional)",
      messagePh: "Contoh: Preferensi warna, jam yang pas untuk dihubungi, dll.",
    },
    submit: "Kirim Permintaan",
    submitting: "Mengirim…",
    successTitle: "Permintaan Anda sudah kami terima!",
    successDesc:
      "Terima kasih. Untuk respons paling cepat, lanjutkan percakapan via WhatsApp dengan satu klik di bawah.",
    successCta: "Lanjutkan ke WhatsApp",
    again: "Kirim permintaan lain",
    errors: {
      name: "Nama minimal 2 karakter.",
      phone: "Masukkan nomor WhatsApp Indonesia yang valid (contoh: 08xxxx atau 628xxxx).",
      submit: "Terjadi kendala saat mengirim. Coba lagi, atau langsung chat WhatsApp kami.",
    },
    privacy:
      "Data Anda hanya digunakan untuk merespons permintaan ini — tidak dibagikan ke pihak lain.",
    whyItems: [
      "Dikonfirmasi langsung oleh Sena — bukan bot",
      "Slot test drive fleksibel di area Jabodetabek",
      "Penawaran dijelaskan transparan sebelum ke langkah berikutnya",
    ],
  },
  coverage: {
    eyebrow: "Area Layanan",
    title: "Melayani Bogor & Jabodetabek",
    subtitle:
      "Berbasis di Bogor, melayani seluruh Jabodetabek — dari konsultasi, test drive ke lokasi Anda, sampai serah terima unit.",
    notListed: "Area Anda tidak ada di daftar? Chat kami — kalau jadwal memungkinkan, kami usahakan.",
    hoursLabel: "Jam layanan",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Pertanyaan yang sering ditanyakan",
    subtitle: "Belum ketemu jawabannya? Langsung chat WhatsApp — dijawab manusia, bukan bot.",
    items: [
      {
        q: "Model Geely apa saja yang bisa saya beli melalui Pusat Geely?",
        a: "Kami melayani pemesanan seluruh lineup Geely Indonesia saat ini: EX5 (SUV listrik), Starray EM-i (SUV super hybrid), Coolray (crossover turbo), dan EX2 (hatchback listrik). Ketersediaan unit, warna, dan tipe dapat berubah — konfirmasi via WhatsApp untuk stok terbaru.",
      },
      {
        q: "Apakah Pusat Geely dealer resmi Geely?",
        a: "Tidak. Pusat Geely adalah layanan konsultan penjualan independen. Proses pembelian, garansi, dan purna jual dijalankan melalui jaringan dealer resmi Geely Indonesia sesuai ketentuan pabrikan. Peran kami: memandu Anda memilih unit, mengurus penawaran, test drive, kredit, trade-in, dan mendampingi sampai serah terima.",
      },
      {
        q: "Bagaimana cara booking test drive?",
        a: "Isi form test drive di halaman ini atau langsung chat WhatsApp +62 816-6111-42. Sebutkan model yang diminati, area Anda, dan tanggal preferensi. Kami konfirmasi jadwal — test drive bisa di lokasi Anda selama dalam area layanan.",
      },
      {
        q: "Berapa harga Geely hari ini?",
        a: "Harga indikatif OTR per September 2026 tercantum pada masing-masing model di halaman ini. Harga final, diskon, dan paket berubah dari waktu ke waktu — chat WhatsApp untuk mendapatkan penawaran terbaik yang sedang berlaku.",
      },
      {
        q: "Bisa kredit? Berapa DP-nya?",
        a: "Bisa. Umumnya uang muka dimulai dari ±20% dengan tenor hingga 6 tahun, tergantung kebijakan perusahaan pembiayaan dan profil kredit. Gunakan simulasi kredit di halaman ini untuk gambaran awal, lalu kami bantu proses pengajuannya.",
      },
      {
        q: "Bisa trade-in mobil lama saya?",
        a: "Bisa. Kirim data mobil lama Anda (merk, tipe, tahun, kondisi, foto bila perlu) via WhatsApp — kami bantu estimasi nilai trade-in untuk dipakai sebagai uang muka.",
      },
      {
        q: "Melayani area mana saja?",
        a: "Bogor (Kota & Kabupaten), Depok, Jakarta, Tangerang, dan Bekasi — termasuk Sentul, Cibinong, Cibubur, dan sekitarnya. Di luar area itu? Chat kami, kalau jadwal memungkinkan kami usahakan.",
      },
      {
        q: "Apakah garansi tetap berlaku?",
        a: "Ya. Karena proses pembelian berjalan melalui jaringan dealer resmi Geely Indonesia, garansi resmi pabrikan tetap berlaku penuh sesuai ketentuan yang berlaku untuk tiap model.",
      },
    ],
  },
  cta: {
    title: "Siap kenalan dengan Geely Anda?",
    subtitle:
      "Chat sekarang — tanya harga, jadwalkan test drive, atau sekadar konsultasi dulu. Gratis, tanpa komitmen.",
    button: "Chat WhatsApp Sekarang",
  },
  footer: {
    about:
      "Layanan konsultan penjualan independen untuk kendaraan Geely di Bogor & Jabodetabek — fokus pada pengalaman beli mobil yang nyaman, transparan, dan modern.",
    navTitle: "Navigasi",
    contactTitle: "Kontak",
    followLabel: "Ikuti kami",
    legalTitle: "Legal & Transparansi",
    disclaimer: "independence",
    rights: "Pusat Geely. Seluruh hak cipta dilindungi.",
    madeIn: "Melayani Bogor & Jabodetabek",
    visualNote:
      "Sebagian besar visual di situs ini adalah foto unit asli. Visual bertanda “Ilustrasi” adalah gambar generatif, bukan foto produk resmi.",
    popularTitle: "Pencarian Populer",
  },
  gallery: {
    eyebrow: "Galeri",
    title: "Dokumentasi asli",
    subtitle:
      "Foto unit asli Geely & momen serah terima kepada pelanggan di Bogor & Jabodetabek — bukan render, bukan stok foto.",
    tabHandover: "Serah Terima",
    tabUnits: "Unit & Warna",
    tabTikTok: "TikTok",
    tiktokFallback:
      "Feed langsung dari TikTok. Kalau tidak tampil (mis. jaringan memblokir TikTok), buka profil langsung:",
    consent:
      "Foto merupakan dokumentasi layanan yang dipublikasikan dengan izin pelanggan.",
    view: "Perbesar foto",
  },
  floating: {
    wa: "Chat WhatsApp",
    testDrive: "Test Drive",
    open: "Hubungi via WhatsApp — respons cepat di jam layanan",
  },
};

export type Dictionary = typeof ID;

const EN: Dictionary = {
  nav: {
    models: "Models",
    services: "Services",
    sales: "Sales",
    harga: "Prices",
    promo: "Deals",
    artikel: "Articles",
    gallery: "Gallery",
    simulator: "Financing",
    testDrive: "Test Drive",
    faq: "FAQ",
    contact: "Contact",
    keywords: "Keyword Index",
    compare: "Comparisons",
    explore: "Explore",
    seeAllPrices: "See all prices & variants",
    hargaDesc: "OTR prices for all variants",
    promoDesc: "Latest financing packages",
    kreditDesc: "Estimate DP & installments",
    testDriveDesc: "Schedule at your location",
  },
  promo: {
    eyebrow: "Deals & Financing Packages",
    title: "Official simulations from 5 financing companies",
    subtitle:
      "Installments and down payments copied from the official simulation sheets of CIMB Niaga, BRI Finance, BNI Finance, Mandiri Utama Finance, and IMFI — with the original PDFs included.",
    financeLabel: "Choose a financing company",
    modelLabel: "Model & variant",
    subProgramLabel: "Program variant",
    tenor: "Tenor (months)",
    tenorShort: "Tenor",
    installment: "Installment / month",
    firstPayment: "First payment",
    yearlyNote: "50-50 scheme — installment paid once a year in month 12",
    downloadPdf: "Download PDF sheet",
    askThis: "Ask about this program on WA",
    requirementsTitle: "Required documents",
    highlightsTitle: "Program highlights",
    waMessage: (
      finance: string,
      program: string,
      model: string,
      tenor: number,
      installment: string,
      firstPayment: string
    ) =>
      `Hello Pusat Geely, I am interested in the ${program} program (${finance}) for the ${model}:\n• Tenor: ${tenor} months\n• Installment: ${installment}\n• First payment: ${firstPayment}\n\nPlease help me with the document requirements and application steps. Thank you.`,
    disclaimer:
      "*Figures are copied unchanged from each financing company's official simulation sheet — indicative, non-binding, and subject to change. OTR assumptions may differ between sheets; final installments follow the leasing company's survey results and policies.",
  },
  header: {
    cta: "WhatsApp Chat",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    theme: "Toggle theme",
  },
  hero: {
    eyebrow: "Geely • Bogor & Jabodetabek",
    titleA: "Your Geely hub in",
    titleB: "Bogor & Jabodetabek",
    subtitle:
      "Consultation, test drives, financing estimates, and trade-ins — handled directly by one responsive sales consultant. No hassle, no pressure.",
    ctaPrimary: "Schedule a Test Drive",
    ctaSecondary: "Chat on WhatsApp",
    chips: [
      "Fast response, free consultation",
      "No pressure, no hidden fees",
      "Serving Bogor & all of Jabodetabek",
    ],
    scroll: "See models",
  },
  models: {
    eyebrow: "The Lineup",
    title: "Pick Your Geely",
    subtitle:
      "Four models — from an agile electric hatchback to a family super-hybrid SUV. All available across Bogor & Jabodetabek.",
    priceFrom: "From",
    variants: "Variants",
    colorLabel: "Color",
    realPhoto: "Real Unit Photo",
    illustrative: "Illustration",
    detailCta: "View Details",
    ctaTestDrive: "Test Drive",
    ctaAskPrice: "Ask Price",
    waAskPrice: (model: string) =>
      `Hello Pusat Geely, I would like to ask about the price and best offer for the ${model}. Thank you.`,
    disclaimer:
      "*Indicative OTR prices as of September 2026 — confirm the latest price via WhatsApp.",
    seeVariants: "View variants",
  },
  services: {
    eyebrow: "Why Pusat Geely",
    title: "Everything you need, one point of contact",
    subtitle:
      "One person who knows your needs from first chat to key handover — not a call center rotating strangers.",
    items: [
      {
        title: "Flexible Test Drives",
        desc: "Schedule a test drive at your home or office within our service area — we come to you.",
      },
      {
        title: "Transparent Pricing",
        desc: "OTR price breakdown explained as it is, no hidden fees, with the best available offer.",
      },
      {
        title: "Financing & Leasing",
        desc: "Assisted from installment estimates and document prep to submission with financing companies.",
      },
      {
        title: "Trade-In Your Car",
        desc: "Estimate your current car's value and use it as down payment for your new vehicle.",
      },
      {
        title: "Guided Process",
        desc: "From unit selection to handover — every step accompanied and clearly explained.",
      },
      {
        title: "After-Sales Guidance",
        desc: "Servicing guidance and Geely's official service network so your car stays in top shape.",
      },
    ],
  },
  simulator: {
    eyebrow: "Financing Simulator",
    title: "Estimate your installment in 10 seconds",
    subtitle:
      "A quick simulation for an initial picture before a deeper consultation.",
    model: "Choose a model",
    price: "OTR price",
    dpPercent: "Down payment (DP)",
    rate: "Flat rate / year",
    tenor: "Tenor",
    months: (n: number) => `${n} months`,
    dpAmount: "DP amount",
    installment: "Estimated installment / month",
    total: "Total estimated payment",
    cta: "Request an official quote via WhatsApp",
    waMessage: (model: string, dp: string, tenor: number, rate: string, installment: string) =>
      `Hello Pusat Geely, I tried the financing simulator for the ${model} on your website:\n• Down payment: ${dp}\n• Tenor: ${tenor} months\n• Flat rate: ${rate}%/year\n• Estimated installment: ${installment}/month\n\nPlease help me with an official simulation and the best leasing offers. Thank you.`,
    disclaimer:
      "This simulation is indicative (flat-rate method) and not an official credit offer. Final installments are determined by the financing company based on credit profile, insurance, and applicable policies.",
  },
  testDrive: {
    eyebrow: "Test Drive & Consultation",
    title: "Book a test drive or request an offer",
    subtitle:
      "Fill in the form below — your request is saved directly and our team will contact you via WhatsApp to confirm the schedule.",
    fields: {
      name: "Full name",
      namePh: "e.g. Budi Santoso",
      phone: "WhatsApp number",
      phonePh: "e.g. 0812xxxxxxx",
      model: "Model of interest",
      modelPh: "Select a model",
      modelAny: "Not sure yet / need advice",
      interest: "Your need",
      interests: {
        "test-drive": "Test drive",
        price: "Price & promo inquiry",
        financing: "Financing estimate",
        "trade-in": "Trade-in my car",
        general: "General consultation",
      },
      area: "Home area",
      areaPh: "Select an area",
      date: "Preferred date (optional)",
      message: "Additional notes (optional)",
      messagePh: "e.g. Color preference, best time to call, etc.",
    },
    submit: "Send Request",
    submitting: "Sending…",
    successTitle: "Your request has been received!",
    successDesc:
      "Thank you. For the fastest response, continue the conversation via WhatsApp with one click below.",
    successCta: "Continue to WhatsApp",
    again: "Send another request",
    errors: {
      name: "Name must be at least 2 characters.",
      phone: "Enter a valid Indonesian WhatsApp number (e.g. 08xxxx or 628xxxx).",
      submit: "Something went wrong while sending. Try again, or message us on WhatsApp directly.",
    },
    privacy:
      "Your data is only used to respond to this request — never shared with third parties.",
    whyItems: [
      "Confirmed directly by Sena — not a bot",
      "Flexible test-drive slots across Jabodetabek",
      "Offers explained transparently before the next step",
    ],
  },
  coverage: {
    eyebrow: "Service Area",
    title: "Serving Bogor & Jabodetabek",
    subtitle:
      "Based in Bogor, serving all of Jabodetabek — from consultation and test drives at your location to unit handover.",
    notListed: "Your area isn't listed? Message us — if the schedule allows, we'll make it work.",
    hoursLabel: "Service hours",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    subtitle: "Can't find your answer? Chat us on WhatsApp — answered by a human, not a bot.",
    items: [
      {
        q: "Which Geely models can I buy through Pusat Geely?",
        a: "We handle the full current Geely Indonesia lineup: EX5 (electric SUV), Starray EM-i (super-hybrid SUV), Coolray (turbo crossover), and EX2 (electric hatchback). Unit, color, and variant availability may change — confirm via WhatsApp for the latest stock.",
      },
      {
        q: "Is Pusat Geely an official Geely dealer?",
        a: "No. Pusat Geely is an independent sales-consulting service. Purchase, warranty, and after-sales processes run through Geely Indonesia's official dealer network under the manufacturer's terms. Our role: guiding you through unit selection, offers, test drives, financing, trade-ins, and handover.",
      },
      {
        q: "How do I book a test drive?",
        a: "Fill in the test-drive form on this page or message WhatsApp +62 816-6111-42 directly. Mention the model you're interested in, your area, and preferred date. We'll confirm the schedule — test drives can be at your location within the service area.",
      },
      {
        q: "What is the price of a Geely today?",
        a: "Indicative OTR prices as of September 2026 are listed on each model on this page. Final prices, discounts, and packages change over time — message us on WhatsApp for the best current offer.",
      },
      {
        q: "Can I finance it? How much is the down payment?",
        a: "Yes. Down payments generally start from ±20% with tenors up to 6 years, depending on the financing company's policy and your credit profile. Use the financing simulator on this page for an initial estimate, then we'll help with the application.",
      },
      {
        q: "Can I trade in my old car?",
        a: "Yes. Send your current car's details (brand, model, year, condition, photos if needed) via WhatsApp — we'll help estimate its trade-in value to use as your down payment.",
      },
      {
        q: "Which areas do you serve?",
        a: "Bogor (city & regency), Depok, Jakarta, Tangerang, and Bekasi — including Sentul, Cibinong, Cibubur, and nearby areas. Outside those? Message us; if the schedule allows, we'll make it work.",
      },
      {
        q: "Is the warranty still valid?",
        a: "Yes. Because purchases go through Geely Indonesia's official dealer network, the official manufacturer warranty fully applies according to the terms for each model.",
      },
    ],
  },
  cta: {
    title: "Ready to meet your Geely?",
    subtitle:
      "Chat now — ask prices, schedule a test drive, or just consult first. Free, no commitment.",
    button: "Chat on WhatsApp Now",
  },
  footer: {
    about:
      "An independent sales-consulting service for Geely vehicles in Bogor & Jabodetabek — focused on a comfortable, transparent, modern car-buying experience.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    followLabel: "Follow us",
    legalTitle: "Legal & Transparency",
    disclaimer: "independence",
    rights: "Pusat Geely. All rights reserved.",
    madeIn: "Serving Bogor & Jabodetabek",
    visualNote:
      "Most visuals on this site are real unit photos. Visuals marked “Illustration” are generated images, not official product photos.",
    popularTitle: "Popular Searches",
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Real documentation",
    subtitle:
      "Genuine Geely unit photos & handover moments with customers across Bogor & Jabodetabek — no renders, no stock photos.",
    tabHandover: "Handovers",
    tabUnits: "Units & Colors",
    tabTikTok: "TikTok",
    tiktokFallback:
      "Live feed from TikTok. If it doesn't load (e.g. the network blocks TikTok), open the profile directly:",
    consent:
      "Photos are service documentation, published with customer permission.",
    view: "Enlarge photo",
  },
  floating: {
    wa: "WhatsApp Chat",
    testDrive: "Test Drive",
    open: "Contact via WhatsApp — fast response during service hours",
  },
};

export const DICT: Record<Lang, Dictionary> = { id: ID, en: EN };
