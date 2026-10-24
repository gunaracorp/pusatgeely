/**
 * PUSAT GEELY — Artikel blog SEO (halaman /artikel/[slug]).
 * Seluruh naskah ditulis orisinal; angka hanya yang dapat diverifikasi
 * dari sumber publik (per September 2026) dan selalu disertai disclaimer.
 */

export interface ArticleSection {
  h?: { id: string; en: string };
  p: { id: string; en: string }[];
}

export interface Article {
  slug: string;
  image: string;
  /** Tanggal publikasi (ISO) — dipakai JSON-LD & metadata. */
  date: string;
  title: { id: string; en: string };
  excerpt: { id: string; en: string };
  tag: { id: string; en: string };
  sections: ArticleSection[];
}

export const ARTICLES: Article[] = [
  {
    slug: "harga-geely-bogor-2026",
    date: "2026-09-28",
    image: "/images/unit-ex5-snowy.webp",
    tag: { id: "Panduan Harga", en: "Pricing Guide" },
    title: {
      id: "Harga Mobil Geely Terbaru di Bogor & Jabodetabek: Panduan Lengkap Sebelum Anda Tanya DP",
      en: "Latest Geely Prices in Bogor & Jabodetabek: A Complete Guide Before You Ask About the Down Payment",
    },
    excerpt: {
      id: "Daftar harga indikatif seluruh lineup Geely Indonesia — EX5, Starray EM-i, Coolray, dan EX2 — plus cara menghitung cicilan yang realistis agar tidak menyesal di tengah jalan.",
      en: "Indicative prices for the entire Geely Indonesia lineup — EX5, Starray EM-i, Coolray, and EX2 — plus how to work out a realistic monthly installment so you never regret your purchase.",
    },
    sections: [
      {
        p: [
          {
            id: "Pertanyaan paling sering masuk ke WhatsApp kami bukan \"mobilnya bagus tidak\" — melainkan \"berapa harga sebenarnya\". Wajar. Di internet beredar banyak angka: ada yang menulis harga lama, ada yang menulis harga promo wilayah lain, ada pula yang sekadar menyalin tanpa sumber. Artikel ini merangkum harga indikatif seluruh lineup Geely Indonesia per September 2026, sekaligus menjelaskan cara membacanya dengan benar.",
            en: "The most frequent question that lands in our WhatsApp is not \"is the car good\" — it is \"what is the real price\". Fair enough. The internet is full of numbers: outdated prices, promo prices from other regions, and figures copied without sources. This article compiles indicative prices for the whole Geely Indonesia lineup as of September 2026, and explains how to read them correctly.",
          },
        ],
      },
      {
        h: { id: "Daftar Harga Indikatif (OTR, September 2026)", en: "Indicative Price List (OTR, September 2026)" },
        p: [
          {
            id: "GEELY EX5 (SUV listrik) mulai Rp 465 juta untuk varian Pro, dan Rp 505 juta untuk varian Max. GEELY Starray EM-i (SUV super hybrid) satu varian di kisaran Rp 499 juta. GEELY Coolray (crossover bensin turbo) mulai Rp 333 juta untuk Standard hingga Rp 377 juta untuk Flagship. GEELY EX2 (hatchback listrik) mulai Rp 239,9 juta untuk Pro dan Rp 269,9 juta untuk Max.",
            en: "The GEELY EX5 (electric SUV) starts at Rp 465 million for the Pro variant and Rp 505 million for the Max. The GEELY Starray EM-i (super-hybrid SUV) comes in one variant at around Rp 499 million. The GEELY Coolray (petrol turbo crossover) starts at Rp 333 million for the Standard up to Rp 377 million for the Flagship. The GEELY EX2 (electric hatchback) starts at Rp 239.9 million for the Pro and Rp 269.9 million for the Max.",
          },
          {
            id: "Semua angka di atas adalah harga indikatif OTR berdasarkan riset sumber publik — bukan penawaran final. Harga riil bisa bergerak karena program promo pembiayaan, stok warna, maupun kebijakan pabrikan. Karena itu, perlakukan tabel ini sebagai titik awal negosiasi, bukan angka pamungkas.",
            en: "All figures above are indicative on-the-road prices based on public-source research — not final offers. Real prices can move due to financing promos, color stock, or manufacturer policy. Treat this table as the starting point of a negotiation, never the final word.",
          },
        ],
      },
      {
        h: { id: "Membaca Cicilan dengan Jujur", en: "Reading Installments Honestly" },
        p: [
          {
            id: "Iklan \"cicilan mulai 5 jutaan\" sering memakai tenor terpanjang, DP terendah, dan tanpa asuransi komprehensif di hitungannya. Dalam praktiknya, angsuran nyaman adalah yang totalnya tidak lebih dari 25–30% penghasilan bulanan rumah tangga. Lewat dari itu, mobil yang tadinya membawa senang bisa berubah jadi beban tiap tanggal 10.",
            en: "\"Installments from 5 million\" ads usually use the longest tenor, the lowest down payment, and exclude comprehensive insurance from the math. In practice, a comfortable installment totals no more than 25–30% of your household's monthly income. Beyond that, the car that once brought joy becomes a burden every month.",
          },
          {
            id: "Kabar baiknya, program pembiayaan resmi untuk Geely saat ini cukup beragam — ada paket DP rendah, ada paket angsuran tetap, termasuk program dari beberapa perusahaan pembiayaan besar. Di halaman promo kami, angka-angka tersebut kami tampilkan apa adanya dari lembar simulasi resminya, tanpa dibulatkan — termasuk keterbatasan tenornya.",
            en: "The good news: current official financing programs for Geely are quite varied — low-DP packages, flat-installment packages, including programs from several major finance companies. On our promo page, we present those numbers exactly as printed on the official simulation sheets, unrounded — including their tenor limitations.",
          },
        ],
      },
      {
        h: { id: "Biaya yang Sering Lupa Dihitung", en: "Costs People Forget to Count" },
        p: [
          {
            id: "Selain angsuran, siapkan tiga pos lagi: asuransi tahunan (biasanya masuk TDP tahun pertama), pajak progresif saat perpanjangan STNK, dan biaya pakai harian. Untuk model listrik seperti EX5 dan EX2, pos ketiga ini justru titik terangnya — biaya \"bahan bakar\" per kilometer bisa sepersekian harga bensin, terutama jika Anda mengisi di rumah.",
            en: "Beyond installments, prepare three more lines: annual insurance (usually part of the first-year down payment), progressive tax at STNK renewal, and daily running cost. For electric models like the EX5 and EX2, that third line is the bright spot — the per-kilometer \"fuel\" cost can be a fraction of petrol, especially when charging at home.",
          },
          {
            id: "Model hybrid seperti Starray EM-i berada di tengah: tanpa perlu bergantung charger, konsumsi bensinnya tetap jauh lebih hemat dibanding SUV bensin konvensional. Sedangkan Coolray justru unggul di harga awal — total pembiayaan terkecil di titik masuk.",
            en: "Hybrid models like the Starray EM-i sit in the middle: without depending on chargers, its petrol consumption stays far below a conventional petrol SUV's. The Coolray, meanwhile, wins on entry price — the smallest total financing at the starting line.",
          },
        ],
      },
      {
        h: { id: "Langkah Selanjutnya", en: "The Next Step" },
        p: [
          {
            id: "Kalau angka di artikel ini sudah membentuk gambaran, langkah paling produktif adalah simulasi kredit dengan angka Anda sendiri: gunakan kalkulator di halaman simulasi, lalu chat WhatsApp kami untuk mendapatkan penawaran terbaru yang sedang berlaku. Kami tidak akan memaksa — tugas kami memastikan angka yang Anda bawa pulang adalah angka yang benar-benar nyaman, bukan yang sekadar lolos pengajuan.",
            en: "If the numbers in this article have shaped a picture, the most productive next step is running a credit simulation with your own figures: use the calculator on our simulator page, then message us on WhatsApp for the latest valid offer. We won't push you — our job is to make sure the number you take home is one you're truly comfortable with, not merely one that gets approved.",
          },
        ],
      },
    ],
  },
  {
    slug: "ex5-vs-starray-emi",
    date: "2026-09-20",
    image: "/images/model-starray.webp",
    tag: { id: "Perbandingan", en: "Comparison" },
    title: {
      id: "Geely EX5 vs Starray EM-i: Pilih Listrik Murni atau Super Hybrid untuk Keluarga di Bogor?",
      en: "Geely EX5 vs Starray EM-i: Full-Electric or Super Hybrid for Your Bogor Family?",
    },
    excerpt: {
      id: "Dua SUV terbesar Geely Indonesia menyasar keluarga yang sama — tapi dengan filosofi berbeda. Begini cara memilihnya berdasarkan pola pemakaian, bukan sekadar selera.",
      en: "Geely's two largest SUVs in Indonesia target the same family — with different philosophies. Here's how to choose based on usage patterns, not just taste.",
    },
    sections: [
      {
        p: [
          {
            id: "Hampir setiap minggu kami mendampingi keluarga di Bogor dan sekitarnya yang berdiri persis di persimpangan ini: EX5 atau Starray EM-i. Keduanya SUV, keduanya lega, keduanya dari Geely — tapi jawabannya sangat bergantung pada satu hal yang sering dilupakan pembeli: pola pemakaian yang sebenarnya, bukan yang diimajinasikan saat showroom.",
            en: "Nearly every week we accompany families in Bogor and around it standing exactly at this crossroads: the EX5 or the Starray EM-i. Both are SUVs, both are spacious, both are Geely — but the answer depends heavily on one thing buyers often forget: their real usage pattern, not the imagined one at the showroom.",
          },
        ],
      },
      {
        h: { id: "Karakter Keduanya dalam Satu Pandangan", en: "Both Characters at a Glance" },
        p: [
          {
            id: "EX5 adalah mobil listrik murni: baterai 60,22 kWh, jarak tempuh hingga 495 km (NEDC), akselerasi 6,9 detik, dan pengisian cepat 30–80% dalam ±20 menit. Starray EM-i adalah plug-in hybrid: mesin 1,5L bekerja dengan motor listrik 160 kW, tenaga sistem ±262 hp, dan jarak gabungan yang bisa menyentuh kisaran 1.000 km tanpa perencanaan charger sama sekali.",
            en: "The EX5 is fully electric: a 60.22 kWh battery, up to 495 km of range (NEDC), 6.9-second acceleration, and 30–80% fast charging in about 20 minutes. The Starray EM-i is a plug-in hybrid: a 1.5L engine working with a 160 kW electric motor, ±262 hp of system power, and a combined range touching around 1,000 km with zero charger planning.",
          },
        ],
      },
      {
        h: { id: "Pilih EX5 Jika…", en: "Choose the EX5 If…" },
        p: [
          {
            id: "Rutinitas Anda berputar di Jabodetabek — rumah, sekolah anak, kantor, mall — dan rumah Anda memiliki titik listrik yang bisa dipakai mengisi malam hari. Dalam pola ini, range 495 km artinya Anda mengisi seminggu sekali seperti mengisi ponsel, dan biaya per kilometer menjadi jauh di bawah bensin. EX5 juga pilihan tepat bila Anda menginginkan kesan berkendara paling senyap dan teknologi paling lengkap di lineup.",
            en: "Your routine revolves around Jabodetabek — home, school, office, mall — and your home has a power point for overnight charging. In this pattern, 495 km of range means charging once a week like you charge your phone, and the per-kilometer cost drops far below petrol. The EX5 is also the right pick if you want the quietest drive and the most complete tech in the lineup.",
          },
        ],
      },
      {
        h: { id: "Pilih Starray EM-i Jika…", en: "Choose the Starray EM-i If…" },
        p: [
          {
            id: "Kalender Anda penuh perjalanan jauh — mudik rutin ke Bandung atau Semarang, trip akhir pekan ke Puncak dan pantai selatan, atau kerja antar kota. EM-i memberi kebebasan yang tidak bisa dibeli: hari kerja bisa hemat-hematnya dengan listrik, akhir pekan tinggal isi bensin dan jalan. Tidak ada perencanaan rute di sekitar charger, tidak ada perubahan kebiasaan apa pun.",
            en: "Your calendar is full of long trips — regular mudik to Bandung or Semarang, weekend trips to Puncak and the southern coast, or intercity work. The EM-i gives you freedom you can't put a price on: weekday savings on electricity, then just fill up and go on weekends. No route planning around chargers, no habit changes whatsoever.",
          },
          {
            id: "EM-i juga jawaban yang realistis jika rumah Anda tidak memungkinkan memasang charger pribadi — misalnya tinggal di apartemen atau hunian sewa. Mobilnya tetap bisa dipakai penuh 100% fungsinya sejak hari pertama.",
            en: "The EM-i is also the realistic answer if your home can't fit a private charger — say an apartment or rented housing. The car delivers 100% of its function from day one regardless.",
          },
        ],
      },
      {
        h: { id: "Pertanyaan Penentu untuk Ditanya ke Diri Sendiri", en: "The Deciding Question to Ask Yourself" },
        p: [
          {
            id: "\"Dalam sebulan terakhir, berapa kali saya bepergian lebih dari 150 km sekaligus?\" Jika jawabannya nol sampai satu kali, EX5 hampir pasti lebih ekonomis untuk Anda. Jika dua kali atau lebih, EM-i akan menghemat banyak energi mental — dan itu juga nilai uang. Mau kami bantu hitung dengan pola pemakaian Anda yang sebenarnya? Chat kami kapan saja; perbandingannya kami buat terbuka, bukan untuk memaksa pilih yang lebih mahal.",
            en: "\"In the last month, how many trips over 150 km did I take?\" If the answer is zero to one, the EX5 is almost certainly the more economical car for you. Two or more, and the EM-i will save you a lot of mental energy — which is also worth money. Want us to run the numbers on your real usage? Chat us anytime; our comparison is open and honest, never engineered to push the pricier option.",
          },
        ],
      },
    ],
  },
  {
    slug: "tips-merawat-baterai-mobil-listrik",
    date: "2026-09-12",
    image: "/images/unit-ex2-hijau.webp",
    tag: { id: "Tips & Perawatan", en: "Tips & Care" },
    title: {
      id: "7 Kebiasaan Sehari-hari yang Membuat Baterai Mobil Listrik Anda Awet Bertahun-tahun",
      en: "7 Everyday Habits That Keep Your EV Battery Healthy for Years",
    },
    excerpt: {
      id: "Baterai adalah komponen termahal di mobil listrik — dan kebiasaan kecil sehari-hari menentukan usianya. Tujuh kebiasaan ini mudah diterapkan mulai besok pagi.",
      en: "The battery is the most expensive component in an EV — and small daily habits decide its lifespan. These seven habits are easy to start tomorrow morning.",
    },
    sections: [
      {
        p: [
          {
            id: "Banyak pembeli mobil listrik pertama cemas soal satu hal: \"kalau baterainya rusak, biaya gantinya selangit\". Kekhawatiran itu bisa diredam dengan fakta dan kebiasaan yang benar. Baterai modern — termasuk teknologi Short Blade Battery pada Geely yang dirancang untuk ketahanan siklus pengisian tinggi — dirancang untuk hidup selama umur mobil. Tugas Anda hanyalah tidak mempercepat penuanya.",
            en: "Most first-time EV buyers fear exactly one thing: \"if the battery fails, replacing it costs a fortune\". That worry is manageable with facts and good habits. Modern batteries — including the Short Blade Battery technology on Geely vehicles, engineered for high charge-cycle endurance — are designed to live as long as the car itself. Your job is simply not to accelerate their aging.",
          },
        ],
      },
      {
        h: { id: "1. Hidup di Kisaran 20–80%, Bukan Selalu 100%", en: "1. Live in the 20–80% Range, Not Always 100%" },
        p: [
          {
            id: "Baterai lithium paling nyaman bekerja di tengah. Mengisi penuh sampai 100% setiap hari — seperti yang banyak orang lakukan karena terasa \"aman\" — justru memberi tekanan ekstra. Untuk pemakaian harian, batasi charging harian di sekitar 80% dan simpan 100% untuk rencana perjalanan jauh. Di EX5 dan EX2, batas pengisian bisa diatur langsung dari layar mobil.",
            en: "Lithium batteries are most comfortable working in the middle. Charging to 100% every day — as many people do because it feels \"safe\" — actually adds extra stress. For daily use, cap routine charging around 80% and save 100% for planned long trips. On the EX5 and EX2, the charging limit can be set right from the car's screen.",
          },
        ],
      },
      {
        h: { id: "2. Jangan Biarkan Baterai Nyaris Kosong Sering-sering", en: "2. Don't Let the Battery Run Nearly Empty Often" },
        p: [
          {
            id: "Berbeda dengan mobil bensin yang tak masalah sampai tangki habis, mobil listrik lebih baik dicas ketika tersisa sekitar 20%. Kalah dalam \"permainan ember\" berkali-kali memaksa baterai bekerja di zona stresnya. Kebiasaan mudahnya: jadikan stasiun pengisian rumah Anda seperti charger ponsel — nyalakan malam, penuh pagi, berangkat tenang.",
            en: "Unlike a petrol car that can run its tank dry, an EV is happier charging from around 20%. Losing the \"bucket game\" repeatedly forces the battery to operate in its stress zone. The easy habit: treat your home charger like a phone charger — plug in at night, full by morning, leave home calm.",
          },
        ],
      },
      {
        h: { id: "3. Fast Charging Itu untuk Jalan Jauh, Bukan Rutinitas", en: "3. Fast Charging Is for Road Trips, Not Routine" },
        p: [
          {
            id: "Fast charging DC yang 20–25 menit itu teknologi yang luar biasa — untuk situasi tertentu: perjalanan panjang, agenda mendadak, atau sengaja mampir sambil makan. Namun menjadikannya rutinitas mingguan saat rumah bisa dipasangi charger AC adalah pemborosan dua sisi: biaya per kWh di stasiun DC lebih mahal, dan panas dari pengisian super cepat menambah penuaian sel. Pakai secukupnya.",
            en: "The 20–25-minute DC fast charging is wonderful technology — for certain situations: long trips, sudden agendas, or an intentional stop over a meal. But making it a weekly routine when your home can fit an AC charger is a double waste: per-kWh costs at DC stations are higher, and the heat from ultra-fast charging adds cell aging. Use it in moderation.",
          },
        ],
      },
      {
        h: { id: "4. Perhatikan Suhu Parkir", en: "4. Mind Parking Temperatures" },
        p: [
          {
            id: "Iklim Indonesia bersahabat untuk EV, tetapi parkir berjam-jam di bawah terik langsung setiap hari tetap bukan teman baterai. Sistem termal mobil bekerja menstabilkannya, namun Anda bisa membantu: pilih parkir teduh atau basement bila tersedia. Kebiasaan kecil ini berdampak besar dalam skala tahun — terutama di area parkir terbuka kantor.",
            en: "Indonesia's climate is friendly to EVs, but hours of direct-sun parking every day is still no friend to the battery. The car's thermal system works to stabilize it, but you can help: pick shaded or basement parking when available. This tiny habit compounds hugely across years — especially in open office parking lots.",
          },
        ],
      },
      {
        h: { id: "5. Isi ke 100% Hanya Sebelum Perjalanan Jauh — lalu Langsung Jalan", en: "5. Charge to 100% Only Before Long Trips — Then Drive" },
        p: [
          {
            id: "Kalau memang perlu mengisi penuh untuk mudik, berangkatlah segera setelah penuh. Baterai yang dibiarkan berdiri lama di 100% (berhari-hari di bandara, misalnya) mengalami tekanan yang tidak perlu. Prinsipnya sederhana: 100% itu untuk dipakai, bukan untuk disimpan.",
            en: "If you do need a full charge for a road trip, depart soon after reaching full. A battery left sitting at 100% for days (say, at an airport lot) endures unnecessary stress. The principle is simple: 100% is for using, not for storing.",
          },
        ],
      },
      {
        h: { id: "6. Ikuti Jadwal Servis Resmi", en: "6. Follow the Official Service Schedule" },
        p: [
          {
            id: "Mobil listrik terkenal minim perawatan — tidak ada oli mesin, tidak ada busi. Tetapi pemeriksaan rutin tetap penting: kesehatan sel baterai dibaca lewat diagnostik, sistem pendinginnya dicek, dan software-nya diperbarui. Karena proses pembelian melalui dealer resmi, garansi pabrikan Anda mencakup servis tersebut — manfaatkan, jangan menunda.",
            en: "EVs are famously low-maintenance — no engine oil, no spark plugs. But routine checks still matter: battery cell health is read via diagnostics, the cooling system is inspected, and software gets updated. Since your purchase goes through the official dealer network, your manufacturer warranty covers those services — use them, don't postpone.",
          },
        ],
      },
      {
        h: { id: "7. Gunakan Fitur di Mobilnya, Bukan Kira-kira Sendiri", en: "7. Use the Car's Built-in Features, Not Guesswork" },
        p: [
          {
            id: "EX5 dan EX2 punya pengaturan batas pengisian, pratinjau jangkauan berdasarkan pemakaian nyata, dan notifikasi kesehatan. Banyak pemilik baru mengabaikannya lalu menghitung sendiri secara kasar. Luangkan 15 menit membaca fiturnya (atau tanyakan pada kami lewat WhatsApp — dengan senang hati kami jelaskan); mobil Anda lebih pintar dari yang Anda pikirkan.",
            en: "The EX5 and EX2 offer charging-limit settings, range previews based on real usage, and health notifications. Many new owners ignore them and do rough mental math instead. Spend 15 minutes reading the features (or ask us on WhatsApp — we're happy to explain); your car is smarter than you think.",
          },
        ],
      },
    ],
  },
  {
    slug: "panduan-trade-in-mobil-geely",
    date: "2026-09-05",
    image: "/images/galeri-6.webp",
    tag: { id: "Panduan Pembelian", en: "Buying Guide" },
    title: {
      id: "Panduan Trade-in Mobil Lama ke Geely: Persiapan, Penilaian, sampai Serah Terima",
      en: "Trading In Your Old Car for a Geely: Preparation, Valuation, to Handover",
    },
    excerpt: {
      id: "Mobil lama bisa jadi uang muka baru. Begini alur trade-in yang benar — dari dokumen yang disiapkan sampai cara mendapatkan penilaian paling adil.",
      en: "Your old car can become your new down payment. Here's the right trade-in flow — from preparing documents to getting the fairest valuation.",
    },
    sections: [
      {
        p: [
          {
            id: "Banyak orang menunda ganti mobil karena satu hambatan: \"mobil lama dulu bagaimana?\" Padahal trade-in justru salah satu jalur paling efisien — mobil lama dikonversi langsung menjadi bagian dari uang muka, tanpa drama jual-sendiril yang berbulan-bulan. Panduan ini merangkum alur yang kami dampingi setiap minggu di Bogor & Jabodetabek.",
            en: "Many people postpone upgrading their car because of one hurdle: \"but first, what about my old car?\" In fact, trade-in is one of the most efficient routes — the old car converts directly into part of the down payment, without months of tiring private-sale drama. This guide summarizes the flow we assist with every week in Bogor & Jabodetabek.",
          },
        ],
      },
      {
        h: { id: "Langkah 1 — Kenali Kondisi Mobil Anda dengan Jujur", en: "Step 1 — Know Your Car's Condition Honestly" },
        p: [
          {
            id: "Tiga hal paling menentukan nilai trade-in: tahun dan tipe, kilometer, dan riwayat servis. Sebelum bertanya ke mana pun, siapkan data dasarnya — buku servis, kondisi ban dan aki, apakah ada penyok atau cat ulang. Kejujuran di tahap ini mempercepat semuanya; penilai berpengalaman akan menemukan apa pun yang disembunyikan, dan kepercayaan itu sulit dikembalikan.",
            en: "Three things most determine trade-in value: year and model, mileage, and service history. Before asking anyone, prepare the basics — the service book, tire and battery condition, whether there are dents or repainted panels. Honesty at this stage speeds everything up; experienced appraisers will find whatever is hidden, and that trust is hard to win back.",
          },
        ],
      },
      {
        h: { id: "Langkah 2 — Kirim Data via WhatsApp, Dapatkan Estimasi Awal", en: "Step 2 — Send Your Data via WhatsApp, Get a Preliminary Estimate" },
        p: [
          {
            id: "Anda tidak perlu langsung datang ke showroom. Kirim merk, tipe, tahun, kilometer, kondisi umum, dan foto bagian depan-belakang-dalam kabin via WhatsApp — kami bantu estimasi rentang nilainya sebelum Anda memutuskan apa pun. Estimasi ini gratis dan tanpa kewajiban; tujuannya memberi Anda angka awal yang realistis untuk merencanakan anggaran mobil baru.",
            en: "You don't need to visit a showroom right away. Send the make, model, year, mileage, general condition, and front-rear-interior photos via WhatsApp — we'll help estimate its value range before you decide anything. This estimate is free with no obligation; its purpose is to give you a realistic starting number for budgeting the new car.",
          },
        ],
      },
      {
        h: { id: "Langkah 3 — Inspeksi dan Penawaran Final", en: "Step 3 — Inspection and Final Offer" },
        p: [
          {
            id: "Kalau estimasi awal masuk akal, jadwalkan inspeksi fisik — bisa di lokasi Anda dalam area layanan. Prosesnya biasanya 30–45 menit: pengecekan eksterior, mesin/komponen, dan tes jalan singkat. Dari situ keluar angka final. Tips dari pengalaman: bawa buku servis dan kelengkapan dokumen (STNK, BPKB, KTP) — kelengkapan ini sering menaikkan nilai lebih dari yang orang duga.",
            en: "If the preliminary estimate makes sense, schedule a physical inspection — it can be at your location within the service area. It usually takes 30–45 minutes: exterior check, engine/components, and a short test drive. The final figure comes out of that. A tip from experience: bring the service book and complete documents (STNK, BPKB, ID) — completeness often raises the value more than people expect.",
          },
        ],
      },
      {
        h: { id: "Langkah 4 — Nilai Trade-in Jadi Uang Muka", en: "Step 4 — Trade-in Value Becomes the Down Payment" },
        p: [
          {
            id: "Di sinilah trade-in unggul dibanding jual sendiri: nilai mobil lama langsung diperhitungkan sebagai bagian dari uang muka mobil baru. Contoh sederhananya — kalau mobil lama dinilai Rp 80 juta dan DP mobil baru butuh Rp 100 juta, Anda hanya menyiapkan selisihnya, sisanya diselesaikan mekanisme trade-in. Angsuran pun langsung dihitung dari sisa pembiayaan yang nyata, sehingga tidak ada guncangan arus kas di awal.",
            en: "This is where trade-in beats selling privately: the old car's value counts directly toward the new car's down payment. A simple example — if your old car is valued at Rp 80 million and the new car needs a Rp 100 million down payment, you only prepare the difference; the rest is settled through the trade-in mechanism. Installments are then calculated on the real remaining financing, so there's no cash-flow shock at the start.",
          },
        ],
      },
      {
        h: { id: "Langkah 5 — Serah Terima Ganda yang Rapi", en: "Step 5 — A Clean Two-Way Handover" },
        p: [
          {
            id: "Hari serah terima mencakup dua arah: mobil baru ke Anda, dan pengurusan administrasi mobil lama dari Anda. Pastikan semua berjalan dengan dokumen tanda terima yang jelas. Dan satu hal yang selalu kami ingatkan: foto kondisi mobil lama saat penyerahan — kebiasaan kecil yang menyelamatkan dari diskusi tak perlu di kemudian hari.",
            en: "Handover day covers two directions: the new car to you, and the old car's paperwork away from you. Make sure everything runs with clear receipts. And one thing we always remind: photograph the old car's condition at handover — a small habit that prevents unnecessary disputes later.",
          },
        ],
      },
      {
        h: { id: "Siap Menghitung?", en: "Ready to Run the Numbers?" },
        p: [
          {
            id: "Kirim data mobil lama Anda sekarang — lima menit via WhatsApp, dan minggu ini Anda sudah bisa test drive mobil baru dengan uang muka yang nyaris beres. Kami bantu dari estimasi pertama sampai kunci berpindah tangan, tanpa tekanan dan tanpa biaya konsultasi.",
            en: "Send your old car's details now — five minutes on WhatsApp, and this week you could be test-driving a new car with the down payment nearly settled. We assist from the first estimate to the key changing hands — no pressure, no consultation fees.",
          },
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
