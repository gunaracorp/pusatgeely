/**
 * PUSAT GEELY — Konten detail per model (halaman /model/[slug]).
 *
 * ATURAN DATA (anti-fabrication):
 * - Spesifikasi hanya angka yang dapat diverifikasi dari sumber publik
 *   (situs resmi Geely Indonesia & publikasi pers, per September 2026).
 * - Narasi ditulis orisinal — tidak menyalin kalimat situs lain.
 * - Harga = harga indikatif yang sama dengan kartu model di site.ts.
 */

import type { CarModel } from "@/lib/site";
import { MODELS } from "@/lib/site";

export interface SpecRow {
  label: { id: string; en: string };
  value: { id: string; en: string };
}

export interface ModelFaq {
  q: { id: string; en: string };
  a: { id: string; en: string };
}

export interface ModelDetail {
  id: string;
  /** Sub-judul pendek di bawah nama model. */
  tagline: { id: string; en: string };
  /** 2–3 paragraf pengantar (bagian "Sekilas"). */
  overview: { id: string[]; en: string[] };
  /** Tabel spesifikasi kunci. */
  specs: SpecRow[];
  /** 4 keunggulan utama, satu kalimat per poin. */
  highlights: { id: string; en: string }[];
  /** Pertanyaan umum spesifik model ini. */
  faq: ModelFaq[];
  /** Siapa yang paling cocok dengan model ini. */
  fitFor: { id: string; en: string };
}

export const MODEL_DETAILS: ModelDetail[] = [
  {
    id: "ex5",
    tagline: {
      id: "SUV listrik flagship — jangkauan jauh, kabin senyap, teknologi lengkap",
      en: "Flagship electric SUV — long range, quiet cabin, complete tech",
    },
    overview: {
      id: [
        "GEELY EX5 adalah SUV listrik penuh (BEV) yang di Indonesia diposisikan sebagai andalan keluarga aktif. Baterai 60,22 kWh-nya memberi jarak tempuh hingga 495 km (NEDC) — lebih dari cukup untuk satu minggu aktivitas Bogor–Jakarta tanpa harus sering mengisi ulang. Akselerasi 0–100 km/jam dalam 6,9 detik membuatnya tetap responsif saat overtaking di jalan tol.",
        "Yang paling berkesan saat dikendarai adalah ketenangannya: tanpa suara mesin, kabin terasa seperti ruang tamu berjalan. Fitur keterhubungan modern dan sistem bantuan pengemudi menjadikan EX5 pilihan yang nyaman untuk harian maupun mudik.",
        "Di pasar Indonesia, EX5 mendapat pengakuan publik — termasuk gelar 'Best Features Electric Car' dari Carvaganza Editors' Choice Award 2025 sesuai publikasi pers. Bagi kami, itu wajar: perpaduan jangkauan, fitur, dan harganya sulit disaingi di kelasnya.",
      ],
      en: [
        "The GEELY EX5 is a full electric SUV positioned in Indonesia as the go-to family vehicle. Its 60.22 kWh battery delivers up to 495 km of range (NEDC) — comfortably a full week of Bogor–Jakarta activity without frequent recharging, while the 6.9-second 0–100 km/h sprint keeps it confident on highway overtakes.",
        "The most memorable trait behind the wheel is the silence: with no engine noise, the cabin feels like a rolling living room. Modern connectivity features and driver assistance make the EX5 just as comfortable for daily duty as it is for long trips.",
        "The EX5 has earned public recognition in Indonesia — including the 'Best Features Electric Car' title from the Carvaganza Editors' Choice Award 2025, as reported in the press. No surprise to us: the blend of range, features, and price is hard to beat in its class.",
      ],
    },
    specs: [
      { label: { id: "Tipe powertrain", en: "Powertrain" }, value: { id: "Listrik murni (BEV)", en: "Battery electric (BEV)" } },
      { label: { id: "Baterai", en: "Battery" }, value: { id: "60,22 kWh (Short Blade)", en: "60.22 kWh (Short Blade)" } },
      { label: { id: "Jarak tempuh", en: "Range" }, value: { id: "Hingga 495 km (NEDC)", en: "Up to 495 km (NEDC)" } },
      { label: { id: "Motor listrik", en: "Electric motor" }, value: { id: "160 kW (±218 hp) • 320 Nm", en: "160 kW (±218 hp) • 320 Nm" } },
      { label: { id: "Akselerasi 0–100 km/jam", en: "0–100 km/h" }, value: { id: "6,9 detik", en: "6.9 seconds" } },
      { label: { id: "Fast charging", en: "Fast charging" }, value: { id: "30%–80% ±20 menit (DC)", en: "30%–80% ±20 min (DC)" } },
      { label: { id: "Varian", en: "Variants" }, value: { id: "Pro • Max", en: "Pro • Max" } },
    ],
    highlights: [
      { id: "Jangkauan hingga 495 km — santai untuk harian maupun mudik.", en: "Up to 495 km of range — relaxed for daily use or long trips." },
      { id: "Fast charging 30–80% sekitar 20 menit di stasiun DC.", en: "30–80% fast charging in about 20 minutes at DC stations." },
      { id: "Kabin senyap khas EV dengan fitur keterhubungan modern.", en: "Signature EV-quiet cabin with modern connectivity." },
      { id: "Penghargaan 'Best Features Electric Car' — Carvaganza 2025.", en: "'Best Features Electric Car' award — Carvaganza 2025." },
    ],
    faq: [
      {
        q: { id: "Berapa lama waktu pengisian EX5 di rumah?", en: "How long does home charging take on the EX5?" },
        a: {
          id: "Dengan home charging (AC) dari kondisi rendah ke penuh umumnya selesai semalam — Anda tidur, mobil penuh. Untuk perjalanan panjang, fast charging DC 30–80% hanya ±20 menit, cukup untuk sambil makan siang. Kami bantu jelaskan opsi instalasi home charging saat serah terima.",
          en: "With an AC home charger, a full charge typically completes overnight — you sleep, the car fills up. For long trips, DC fast charging from 30–80% takes about 20 minutes, perfect for a lunch stop. We'll walk you through home-charging options at handover.",
        },
      },
      {
        q: { id: "Apa bedanya varian Pro dan Max?", en: "What is the difference between Pro and Max?" },
        a: {
          id: "Keduanya memakai baterai dan motor yang sama. Varian Max menambahkan kenyamanan dan fitur di atas varian Pro. Daftar perbedaan lengkapnya panjang — chat WhatsApp kami dan kami jelaskan mana yang paling masuk akal untuk kebutuhan Anda, tanpa memaksa ambil yang paling mahal.",
          en: "Both share the same battery and motor. The Max adds comfort and feature upgrades on top of the Pro. The full list is long — message us on WhatsApp and we'll explain which one makes the most sense for you, without pushing the priciest option.",
        },
      },
      {
        q: { id: "Apakah EX5 nyaman untuk perjalanan Bogor–Jakarta harian?", en: "Is the EX5 comfortable for daily Bogor–Jakarta commutes?" },
        a: {
          id: "Sangat. Sebagian besar pengguna harian Bogor–Jakarta menempuh 40–80 km per hari — dengan range 495 km, pengisian bisa seminggu sekali saja. Positioning duduk tinggi, kabin senyap, dan pengaturan suspensi yang lembut membuat macet terasa lebih mudah ditoleransi.",
          en: "Very. Most Bogor–Jakarta commuters cover 40–80 km a day — with 495 km of range, you can charge just once a week. The high seating, quiet cabin, and softly tuned suspension make traffic jams far easier to tolerate.",
        },
      },
    ],
    fitFor: {
      id: "Paling cocok untuk: keluarga yang menginginkan SUV listrik kelas menengah dengan jangkauan jauh dan fitur lengkap.",
      en: "Best for: families wanting a mid-range electric SUV with long range and complete features.",
    },
  },
  {
    id: "starray",
    tagline: {
      id: "SUV super hybrid — efisiensi tanpa rasa takut kehabisan daya",
      en: "Super-hybrid SUV — efficiency without range anxiety",
    },
    overview: {
      id: [
        "GEELY Starray EM-i membawa teknologi EM-i Super Hybrid ke kelas SUV keluarga: mesin bensin 1,5 liter bekerja bersama motor listrik untuk efisiensi maksimal, dengan total jarak tempuh gabungan yang bisa mencapai sekitar 1.000 km dalam satu pengisian penuh.",
        "Skor keunggulan PHEV: Anda bisa antar-anak sekolah dan commuter Bogor–Jakarta sepanjang minggu memakai listrik untuk jarak pendek, lalu tanpa drama menempuh perjalanan Bandung–Semarang di akhir pekan — isi bensin seperti mobil biasa, tak perlu memikirkan charger.",
        "Akselerasi 0–100 km/jam dalam 8,0 detik dan tenaga sistem ±262 hp membuatnya tetap lincah meski kabin penuh penumpang dan bagasi. Untuk keluarga besar yang sering jalan jauh, ini kombinasi paling 'aman secara mental' di lineup Geely.",
      ],
      en: [
        "The GEELY Starray EM-i brings EM-i Super Hybrid technology to the family-SUV class: a 1.5-litre petrol engine works with an electric motor for maximum efficiency, delivering a combined range of roughly 1,000 km on a full tank and charge.",
        "The PHEV advantage: run school runs and weekday Bogor–Jakarta commutes on electricity for short distances, then head out on a Bandung–Semarang weekend trip without any drama — refuel like a normal car, no charger planning required.",
        "With an 8.0-second 0–100 km/h time and ±262 hp of system power, it stays lively even with a full cabin and luggage. For big families who travel far often, this is the most 'mentally safe' combination in the Geely lineup.",
      ],
    },
    specs: [
      { label: { id: "Tipe powertrain", en: "Powertrain" }, value: { id: "Plug-in Hybrid (PHEV) EM-i", en: "Plug-in hybrid (PHEV) EM-i" } },
      { label: { id: "Mesin", en: "Engine" }, value: { id: "1.5L + motor listrik", en: "1.5L + electric motor" } },
      { label: { id: "Tenaga sistem", en: "System power" }, value: { id: "±262 hp • motor listrik 160 kW", en: "±262 hp • 160 kW electric motor" } },
      { label: { id: "Jarak gabungan", en: "Combined range" }, value: { id: "Hingga ±1.000 km", en: "Up to ±1,000 km" } },
      { label: { id: "Akselerasi 0–100 km/jam", en: "0–100 km/h" }, value: { id: "8,0 detik", en: "8.0 seconds" } },
      { label: { id: "Kecepatan maksimum", en: "Top speed" }, value: { id: "170 km/jam", en: "170 km/h" } },
    ],
    highlights: [
      { id: "Jarak gabungan hingga ±1.000 km — mudik tanpa hitung-hitungan.", en: "Up to ±1,000 km combined range — road trips without the math." },
      { id: "Teknologi EM-i Super Hybrid: bensin + listrik dalam harmoni.", en: "EM-i Super Hybrid tech: petrol and electric in harmony." },
      { id: "Kabin lega untuk 7 penumpang aktif + bagasi liburan.", en: "Spacious cabin for an active family plus holiday luggage." },
      { id: "Tanpa range anxiety — isi bensin seperti mobil konvensional.", en: "No range anxiety — refuel like any conventional car." },
    ],
    faq: [
      {
        q: { id: "Apakah Starray EM-i harus selalu dicas?", en: "Does the Starray EM-i always need charging?" },
        a: {
          id: "Tidak wajib. Bisa dipakai persis seperti mobil bensin biasa — mesin akan mengisi baterai sendiri saat berkendara. Namun kalau Anda rajin cas di rumah, perjalanan pendek harian bisa nyaris tanpa bensin. Fleksibilitas inilah daya tarik utama PHEV.",
          en: "Not at all. You can drive it exactly like a regular petrol car — the engine charges the battery on the move. But if you do charge at home, daily short trips can happen almost petrol-free. That flexibility is the PHEV's main appeal.",
        },
      },
      {
        q: { id: "Kapan memilih EM-i dibanding EX5 listrik murni?", en: "When should I choose the EM-i over the all-electric EX5?" },
        a: {
          id: "Pilih EM-i jika: sering jalan jauh di luar Jabodetabek, belum punya akses charging, atau ingin satu mobil untuk semua skenario. Pilih EX5 jika: harian pendek-menengah, punya tempat cas di rumah, dan ingin biaya pakai serendah mungkin. Di halaman artikel kami ada perbandingan lengkapnya.",
          en: "Choose the EM-i if: you often travel beyond Jabodetabek, lack charging access, or want one car for every scenario. Choose the EX5 if: your daily runs are short-to-medium, you can charge at home, and you want the lowest running cost. Our article page has the full comparison.",
        },
      },
      {
        q: { id: "Berapa konsumsi bahan bakarnya di jalan tol?", en: "What is its fuel consumption on the highway?" },
        a: {
          id: "Dalam kondisi bensin-hybrid, konsumsinya tetap jauh lebih hemat dibanding SUV bensin konvensional di kelasnya — angka pastinya bergantung gaya berkendara dan beban. Untuk gambaran konkret sesuai pola pemakaian Anda, chat kami dan kami bantu hitung estimasinya.",
          en: "Running as a petrol-hybrid, it stays far more frugal than a conventional petrol SUV in its class — the exact figure depends on driving style and load. For a concrete estimate based on your usage pattern, chat with us and we'll help you work it out.",
        },
      },
    ],
    fitFor: {
      id: "Paling cocok untuk: keluarga besar dan pengguna jarak jauh yang ingin efisiensi tanpa bergantung pada charger.",
      en: "Best for: large families and long-distance drivers who want efficiency without depending on chargers.",
    },
  },
  {
    id: "coolray",
    tagline: {
      id: "Crossover turbo terlaris — gesit di kota, menyenangkan dikendarai",
      en: "Best-selling turbo crossover — city-agile and genuinely fun to drive",
    },
    overview: {
      id: [
        "GEELY Coolray adalah nama yang paling lama dikenal di lineup Geely Indonesia — crossover turbo kompak yang konsisten jadi favorit karena karakter berkendara yang hidup: tenaga 174 PS dan torsi 290 Nm dari mesin 1,5L turbo tersalur lewat transmisi 7-percepatan wet DCT yang responsif.",
        "Ukurannya pas untuk kehidupan kota: mudah diparkir di mall maupun gang kompleks, tapi kabinnya tetap lega untuk lima orang dewasa. Bagi pengguna pertama kali pindah dari mobil LCGC atau sedan lawas, lompatan kenyamanan dan fiturnya langsung terasa.",
        "Dengan harga paling ramah di antara SUV turbo bensin, Coolray kerap jadi 'pintu masuk' keluarga muda ke dunia Geely — dan sering jadi mobil kedua di rumah yang sudah punya EX5 atau EM-i.",
      ],
      en: [
        "The GEELY Coolray is the longest-standing name in Geely's Indonesian lineup — a compact turbo crossover consistently favored for its lively character: 174 PS and 290 Nm from a 1.5L turbo engine, delivered through a responsive 7-speed wet DCT.",
        "Its size is just right for city life: easy to park in malls and tight housing lanes, yet the cabin still fits five adults comfortably. For anyone stepping up from an LCGC or an ageing sedan, the jump in comfort and features is immediately obvious.",
        "With the friendliest price among petrol turbo SUVs, the Coolray often becomes a young family's gateway into the Geely world — and a popular second car in households that already own an EX5 or EM-i.",
      ],
    },
    specs: [
      { label: { id: "Tipe powertrain", en: "Powertrain" }, value: { id: "Bensin turbo (ICE)", en: "Petrol turbo (ICE)" } },
      { label: { id: "Mesin", en: "Engine" }, value: { id: "1.5L Turbocharged", en: "1.5L Turbocharged" } },
      { label: { id: "Tenaga maksimum", en: "Max power" }, value: { id: "174 PS", en: "174 PS" } },
      { label: { id: "Torsi maksimum", en: "Max torque" }, value: { id: "290 Nm", en: "290 Nm" } },
      { label: { id: "Transmisi", en: "Transmission" }, value: { id: "7-percepatan Wet DCT", en: "7-speed Wet DCT" } },
      { label: { id: "Varian", en: "Variants" }, value: { id: "Standard • Flagship", en: "Standard • Flagship" } },
    ],
    highlights: [
      { id: "174 PS & 290 Nm — rasio tenaga terbaik di kelasnya.", en: "174 PS & 290 Nm — best-in-class power-to-weight." },
      { id: "Wet DCT 7-percepatan: pindah gigi cepat dan mulus.", en: "7-speed wet DCT: fast, smooth gear changes." },
      { id: "Ukuran kompak, parkir mudah, kabin tetap lega.", en: "Compact footprint, easy parking, still roomy inside." },
      { id: "Harga masuk akal — favorit pembeli pertama kali.", en: "Friendly pricing — a first-time-buyer favorite." },
    ],
    faq: [
      {
        q: { id: "Coolray hemat bahan bakar untuk harian?", en: "Is the Coolray fuel-efficient for daily use?" },
        a: {
          id: "Untuk kelas turbo bensin, konsumsinya tergolong wajar — dan torsi datang sejak putaran rendah sehingga Anda jarang perlu menekan gas dalam. Di jalan tol dengan kecepatan stabil, konsumsinya justru salah satu yang terbaik di kelas crossover turbo.",
          en: "For a petrol turbo in its class, consumption is reasonable — and torque arrives early, so you rarely need to dig deep into the throttle. At steady highway speeds, it's among the best in the turbo-crossover class.",
        },
      },
      {
        q: { id: "Bedanya Standard dan Flagship apa saja?", en: "What differs between Standard and Flagship?" },
        a: {
          id: "Flagship melengkapi paket kenyamanan dan tampilan di atas varian Standard. Daftar lengkapnya mudah kami jelaskan lewat WhatsApp — sebut saja kebiasaan berkendara Anda, dan kami sarankan varian yang benar-benar terpakai fiturnya, bukan sekadar mahal.",
          en: "The Flagship rounds out the comfort and styling package over the Standard. The full list is easy to explain on WhatsApp — tell us your driving habits and we'll recommend the variant whose features you'll actually use, not just the pricier one.",
        },
      },
      {
        q: { id: "Cocok tidak untuk ibu rumah tangga di area perbukitan Bogor?", en: "Is it suitable for driving around Bogor's hilly areas?" },
        a: {
          id: "Cocok. Torsi 290 Nm sejak putaran rendah membuat tanjakan terasa ringan, ground clearance crossover-nya cukup untuk jalan kompleks, dan ukurannya mudah dimanuver di pasar serta area parkir sempit — kombinasi yang nyaman untuk pemakaian harian area Bogor.",
          en: "Very much so. The 290 Nm of low-end torque makes climbs effortless, the crossover clearance copes with estate roads, and its compact size is easy to maneuver through markets and tight parking — a comfortable mix for daily Bogor-area use.",
        },
      },
    ],
    fitFor: {
      id: "Paling cocok untuk: profesional muda dan keluarga kecil yang ingin crossover turbo seru dengan harga masuk akal.",
      en: "Best for: young professionals and small families wanting a fun turbo crossover at a sensible price.",
    },
  },
  {
    id: "ex2",
    tagline: {
      id: "Hatchback listrik lincah — mobilitas kota paling terjangkau dari Geely",
      en: "Agile electric hatchback — Geely's most affordable urban mobility",
    },
    overview: {
      id: [
        "GEELY EX2 membuktikan bahwa mobil listrik kini benar-benar masuk jangkauan keluarga Indonesia: harga mulai dari kisaran Rp 240 jutaan, dengan jarak tempuh hingga 395 km (NEDC) dan fitur yang biasanya hanya ada di mobil kelas lebih atas — termasuk frunk, ruang muat depan di bawah kap.",
        "Ukurannya kompak namun ruang kakinya efisien berkat platform listrik — artinya empat penumpang dewasa tetap masuk akal. Pengisian cepat DC selesai sekitar 25 menit, praktis untuk top-up sambil makan di perjalanan keluar kota.",
        "Sejak peluncurannya di pasar Indonesia, EX2 cepat diterima pasar (ribuan unit terkirim sesuai publikasi pers) — bukti bahwa formula 'listrik kecil yang masuk akal' memang sedang dicari banyak orang. Sangat cocok sebagai mobil harian rumah tangga atau mobil kedua.",
      ],
      en: [
        "The GEELY EX2 proves that electric cars are now truly within reach of Indonesian families: prices start around Rp 240 million, with up to 395 km of range (NEDC) and features usually reserved for higher classes — including a frunk, the front storage bay under the hood.",
        "It's compact on the outside yet efficient on the inside thanks to its dedicated EV platform — four adults fit comfortably. DC fast charging takes about 25 minutes, perfect for a top-up over a meal on an out-of-town drive.",
        "Since its Indonesian launch, the EX2 was quickly embraced by the market (thousands of units delivered, as reported in the press) — proof that the 'sensible small EV' formula is exactly what many people were looking for. Ideal as a household's daily car or second car.",
      ],
    },
    specs: [
      { label: { id: "Tipe powertrain", en: "Powertrain" }, value: { id: "Listrik murni (BEV)", en: "Battery electric (BEV)" } },
      { label: { id: "Jarak tempuh", en: "Range" }, value: { id: "Hingga 395 km (NEDC)", en: "Up to 395 km (NEDC)" } },
      { label: { id: "Tenaga", en: "Power" }, value: { id: "±116 PS", en: "±116 PS" } },
      { label: { id: "Akselerasi 0–100 km/jam", en: "0–100 km/h" }, value: { id: "±11,5 detik", en: "±11.5 seconds" } },
      { label: { id: "Fast charging", en: "Fast charging" }, value: { id: "±25 menit (DC)", en: "±25 min (DC)" } },
      { label: { id: "Fitur khas", en: "Signature feature" }, value: { id: "Frunk (bagasi depan)", en: "Frunk (front trunk)" } },
      { label: { id: "Varian", en: "Variants" }, value: { id: "Pro • Max", en: "Pro • Max" } },
    ],
    highlights: [
      { id: "Harga paling terjangkau di lineup — mulai Rp 240 jutaan.", en: "Most affordable in the lineup — from around Rp 240 million." },
      { id: "Range 395 km — lebih dari cukup untuk sepekan kota.", en: "395 km of range — more than a week of city driving." },
      { id: "Frunk plus kabin efisien — praktis untuk segala urusan.", en: "Frunk plus an efficient cabin — practical for everything." },
      { id: "Biaya 'bahan bakar' jauh lebih murah dari bensin.", en: "Running cost far cheaper than petrol." },
    ],
    faq: [
      {
        q: { id: "EX2 cukup untuk perjalanan Bogor–Jakarta?", en: "Is the EX2 enough for Bogor–Jakarta trips?" },
        a: {
          id: "Aman dan nyaman. Jarak Bogor–Jakarta pulang-pergi sekitar 60–120 km tergantung titik asal — dengan range 395 km, Anda bisa bolak-balik berkali-kali sebelum perlu mengisi ulang. Kalau rutinitas Anda harian Bogor–Jakarta, EX2 justru salah satu pilihan paling ekonomis.",
          en: "Safe and comfortable. A Bogor–Jakarta round trip is roughly 60–120 km depending on your starting point — with 395 km of range, you can make the trip several times before recharging. If Bogor–Jakarta is your daily routine, the EX2 is one of the most economical choices around.",
        },
      },
      {
        q: { id: "Bagaimana kalau rumah saya tidak bisa pasang charger?", en: "What if my home can't fit a charger?" },
        a: {
          id: "Masih bisa hidup dengan EX2. Banyak pengguna mengisi di stasiun umum atau mall saat berbelanja — 25 menit fast charging selesai bersamaan dengan satu sesi kuliner. Kami bantu petakan stasiun pengisian terdekat dari rumah dan kantor Anda sebelum Anda memutuskan.",
          en: "You can still live happily with an EX2. Many owners charge at public stations or malls while shopping — a 25-minute fast charge lines up neatly with one food session. We'll help map the nearest charging stations to your home and office before you decide.",
        },
      },
      {
        q: { id: "Apa fungsi frunk di EX2?", en: "What is the EX2's frunk for?" },
        a: {
          id: "Frunk adalah ruang bagasi tambahan di bagian depan, di bawah kap. Praktis untuk sepatu, jas hujan, atau barang yang tidak ingin bercampur di bagasi utama — dan karena mesin listrik tidak butuh ruang besar, ruang ini jadi bonus khas mobil listrik.",
          en: "The frunk is an extra storage bay at the front, under the hood. Perfect for shoes, raincoats, or items you don't want mixed into the main trunk — and since an electric motor needs little space, this room is a signature EV bonus.",
        },
      },
    ],
    fitFor: {
      id: "Paling cocok untuk: pembeli mobil pertama, pelajar-keluarga muda, dan siapa pun yang ingin biaya harian serendah mungkin.",
      en: "Best for: first-time buyers, young families, and anyone who wants the lowest possible daily running cost.",
    },
  },
];

/** Ambil pasangan (model kartu + detail) berdasarkan slug. */
export function getModelBundle(slug: string) {
  const model: CarModel | undefined = MODELS.find((m) => m.id === slug);
  const detail: ModelDetail | undefined = MODEL_DETAILS.find((d) => d.id === slug);
  return { model, detail };
}
