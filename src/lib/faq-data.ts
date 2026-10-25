/**
 * FAQ content — shared between the interactive accordion (client) and
 * the server-rendered JSON-LD in layout.tsx (kept in sync manually).
 */
export interface FaqItem {
  id: string;
  q: { id: string; en: string };
  a: { id: string; en: string };
}

export const faqData: FaqItem[] = [
  {
    id: "faq-models",
    q: { id: "Model Geely apa saja yang bisa saya beli melalui Pusat Geely?", en: "Which Geely models can I buy through Pusat Geely?" },
    a: {
      id: "Kami melayani pemesanan seluruh lineup Geely Indonesia saat ini: EX5 (SUV listrik), Starray EM-i (SUV super hybrid), Coolray (crossover turbo), dan EX2 (hatchback listrik). Ketersediaan unit, warna, dan tipe dapat berubah — konfirmasi via WhatsApp untuk stok terbaru.",
      en: "We handle the full current Geely Indonesia lineup: EX5 (electric SUV), Starray EM-i (super-hybrid SUV), Coolray (turbo crossover), and EX2 (electric hatchback). Unit, color, and variant availability may change — confirm via WhatsApp for the latest stock.",
    },
  },
  {
    id: "faq-dealer",
    q: { id: "Apakah Pusat Geely dealer resmi Geely?", en: "Is Pusat Geely an official Geely dealer?" },
    a: {
      id: "Tidak. Pusat Geely adalah layanan konsultan penjualan independen. Proses pembelian, garansi, dan purna jual dijalankan melalui jaringan dealer resmi Geely Indonesia sesuai ketentuan pabrikan. Peran kami: memandu Anda memilih unit, mengurus penawaran, test drive, kredit, trade-in, dan mendampingi sampai serah terima.",
      en: "No. Pusat Geely is an independent sales-consulting service. Purchase, warranty, and after-sales processes run through Geely Indonesia's official dealer network under the manufacturer's terms. Our role: guiding you through unit selection, offers, test drives, financing, trade-ins, and handover.",
    },
  },
  {
    id: "faq-booking",
    q: { id: "Bagaimana cara booking test drive?", en: "How do I book a test drive?" },
    a: {
      id: "Isi form test drive di halaman ini atau langsung chat WhatsApp +62 816-6111-42. Sebutkan model yang diminati, area Anda, dan tanggal preferensi. Kami konfirmasi jadwal — test drive bisa di lokasi Anda selama dalam area layanan.",
      en: "Fill in the test-drive form on this page or message WhatsApp +62 816-6111-42 directly. Mention the model you're interested in, your area, and preferred date. We'll confirm the schedule — test drives can be at your location within the service area.",
    },
  },
  {
    id: "faq-price",
    q: { id: "Berapa harga Geely hari ini?", en: "What is the price of a Geely today?" },
    a: {
      id: "Harga indikatif OTR per September 2026 tercantum pada masing-masing model di halaman ini. Harga final, diskon, dan paket berubah dari waktu ke waktu — chat WhatsApp untuk mendapatkan penawaran terbaik yang sedang berlaku.",
      en: "Indicative OTR prices as of September 2026 are listed on each model on this page. Final prices, discounts, and packages change over time — message us on WhatsApp for the best current offer.",
    },
  },
  {
    id: "faq-credit",
    q: { id: "Bisa kredit? Berapa DP-nya?", en: "Can I finance it? How much is the down payment?" },
    a: {
      id: "Bisa. Umumnya uang muka dimulai dari ±20% dengan tenor hingga 6 tahun, tergantung kebijakan perusahaan pembiayaan dan profil kredit. Gunakan simulasi kredit di halaman ini untuk gambaran awal, lalu kami bantu proses pengajuannya.",
      en: "Yes. Down payments generally start from ±20% with tenors up to 6 years, depending on the financing company's policy and your credit profile. Use the financing simulator on this page for an initial estimate, then we'll help with the application.",
    },
  },
  {
    id: "faq-tradein",
    q: { id: "Bisa trade-in mobil lama saya?", en: "Can I trade in my old car?" },
    a: {
      id: "Bisa. Kirim data mobil lama Anda (merk, tipe, tahun, kondisi, foto bila perlu) via WhatsApp — kami bantu estimasi nilai trade-in untuk dipakai sebagai uang muka.",
      en: "Yes. Send your current car's details (brand, model, year, condition, photos if needed) via WhatsApp — we'll help estimate its trade-in value to use as your down payment.",
    },
  },
  {
    id: "faq-area",
    q: { id: "Melayani area mana saja?", en: "Which areas do you serve?" },
    a: {
      id: "Bogor (Kota & Kabupaten), Depok, Jakarta, Tangerang, dan Bekasi — termasuk Sentul, Cibinong, Cibubur, dan sekitarnya. Di luar area itu? Chat kami, kalau jadwal memungkinkan kami usahakan.",
      en: "Bogor (city & regency), Depok, Jakarta, Tangerang, and Bekasi — including Sentul, Cibinong, Cibubur, and nearby areas. Outside those? Message us; if the schedule allows, we'll make it work.",
    },
  },
  {
    id: "faq-warranty",
    q: { id: "Apakah garansi tetap berlaku?", en: "Is the warranty still valid?" },
    a: {
      id: "Ya. Karena proses pembelian berjalan melalui jaringan dealer resmi Geely Indonesia, garansi resmi pabrikan tetap berlaku penuh sesuai ketentuan yang berlaku untuk tiap model.",
      en: "Yes. Because purchases go through Geely Indonesia's official dealer network, the official manufacturer warranty fully applies according to the terms for each model.",
    },
  },
];
