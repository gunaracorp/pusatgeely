/**
 * PUSAT GEELY — Data promo & paket kredit dari lembar simulasi resmi
 * perusahaan pembiayaan (PDF asli diserahkan pemilik, tersimpan di
 * /public/promos/ dan dapat diunduh pengunjung).
 *
 * ATURAN DATA (anti-fabrication):
 * - SEMUA angka disalin verbatim dari lembar PDF masing-masing finance.
 * - Tidak ada angka yang dikarang, dibulatkan, atau diinterpolasi.
 * - Jika lembar tidak memuat suatu tenor, tenor itu tidak ditampilkan.
 * - Seluruh angka bersifat indikatif & wajib disertai disclaimer.
 */

export interface PromoRow {
  /** Tenor dalam bulan, persis seperti tertera di lembar. */
  tenor: number;
  /** Angsuran per bulan (BRI: per tahun). */
  installment: number;
  /** Total bayar pertama / TDP — tergantung label program. */
  firstPayment: number;
}

export interface PromoSubProgram {
  id: string;
  name: { id: string; en: string };
  /** Label kolom "bayar pertama": TDP atau Total Bayar Pertama. */
  firstPaymentLabel: { id: string; en: string };
  rows: Record<string, PromoRow[]>;
}

export interface PromoProgram {
  id: string;
  finance: string;
  program: { id: string; en: string };
  period?: { id: string; en: string };
  badge: { id: string; en: string };
  highlights: { id: string; en: string }[];
  requirements?: { id: string; en: string }[];
  note?: { id: string; en: string };
  pdf: string;
  /** Kunci model yang tersedia pada program ini. */
  models: string[];
  /** Sub-program (IMFI punya 4). Jika satu, UI tidak menampilkan pilihan. */
  subPrograms: PromoSubProgram[];
  /** Warna aksen kartu (hex) — identitas visual tiap finance. */
  accent: string;
}

/** Kunci model lintas-program — nama varian persis seperti di lembar. */
export const PROMO_MODELS: { key: string; label: string; price: number }[] = [
  { key: "ex2-pro", label: "EX2 Pro", price: 239_900_000 },
  { key: "ex2-max", label: "EX2 Max", price: 269_900_000 },
  { key: "coolray-flagship", label: "Coolray Flagship", price: 377_000_000 },
  { key: "ex5-pro", label: "EX5 Pro", price: 465_000_000 },
  { key: "starray-emi", label: "Starray EM-i", price: 499_000_000 },
  { key: "ex5-max", label: "EX5 Max", price: 505_000_000 },
];

export const PROMO_PROGRAMS: PromoProgram[] = [
  {
    id: "cimb",
    finance: "CIMB Niaga Finance",
    program: {
      id: "Simulasi ADDM Kombinasi",
      en: "ADDM Combined Simulation",
    },
    period: {
      id: "Lembar simulasi — Juli 2026",
      en: "Simulation sheet — July 2026",
    },
    badge: { id: "Angsuran mulai 4,7 jt", en: "From Rp4.7M / mo" },
    highlights: [
      {
        id: "Tenor 11–59 bulan (5 & 59 bulan tersedia untuk dua varian EX2)",
        en: "Tenors 11–59 months (5 options per model)",
      },
      {
        id: "Struktur ADDM kombinasi — bayar pertama sudah termasuk biaya-biaya awal",
        en: "Combined ADDDM structure — first payment covers initial fees",
      },
      {
        id: "Pilihan tenor panjang hingga ±5 tahun untuk angsuran ringan",
        en: "Long tenors up to ±5 years for lighter installments",
      },
    ],
    requirements: [
      { id: "KTP Suami + Istri", en: "Husband + wife ID cards" },
      { id: "Foto selfi", en: "Selfie photo" },
      { id: "NPWP", en: "Tax ID (NPWP)" },
    ],
    pdf: "/promos/simulasi-cimb-niaga.pdf",
    models: ["starray-emi", "ex5-pro", "ex5-max", "ex2-pro", "ex2-max"],
    subPrograms: [
      {
        id: "adddm",
        name: { id: "ADDM Kombinasi", en: "ADDM Combined" },
        firstPaymentLabel: {
          id: "Total bayar pertama",
          en: "Total first payment",
        },
        rows: {
          "starray-emi": [
            { tenor: 11, installment: 38_204_000, firstPayment: 130_730_000 },
            { tenor: 23, installment: 19_791_000, firstPayment: 114_974_000 },
            { tenor: 35, installment: 13_553_000, firstPayment: 111_755_000 },
            { tenor: 47, installment: 10_809_000, firstPayment: 112_135_000 },
            { tenor: 59, installment: 9_956_000, firstPayment: 114_412_000 },
          ],
          "ex5-pro": [
            { tenor: 11, installment: 36_366_000, firstPayment: 124_521_000 },
            { tenor: 23, installment: 18_839_000, firstPayment: 109_523_000 },
            { tenor: 35, installment: 12_902_000, firstPayment: 106_460_000 },
            { tenor: 47, installment: 10_289_000, firstPayment: 106_831_000 },
            { tenor: 59, installment: 9_477_000, firstPayment: 109_012_000 },
          ],
          "ex5-max": [
            { tenor: 11, installment: 38_663_000, firstPayment: 132_281_000 },
            { tenor: 23, installment: 20_029_000, firstPayment: 116_336_000 },
            { tenor: 35, installment: 13_716_000, firstPayment: 113_079_000 },
            { tenor: 47, installment: 10_939_000, firstPayment: 113_461_000 },
            { tenor: 59, installment: 10_075_000, firstPayment: 115_761_000 },
          ],
          "ex2-pro": [
            { tenor: 11, installment: 18_367_000, firstPayment: 71_365_000 },
            { tenor: 23, installment: 9_515_000, firstPayment: 64_106_000 },
            { tenor: 35, installment: 6_516_000, firstPayment: 62_717_000 },
            { tenor: 47, installment: 5_197_000, firstPayment: 63_155_000 },
            { tenor: 59, installment: 4_787_000, firstPayment: 64_550_000 },
          ],
          "ex2-max": [
            { tenor: 11, installment: 20_664_000, firstPayment: 79_203_000 },
            { tenor: 23, installment: 10_705_000, firstPayment: 71_016_000 },
            { tenor: 35, installment: 7_331_000, firstPayment: 69_311_000 },
            { tenor: 47, installment: 5_847_000, firstPayment: 69_759_000 },
            { tenor: 59, installment: 5_385_000, firstPayment: 71_269_000 },
          ],
        },
      },
    ],
    accent: "#8b1d2c",
  },
  {
    id: "bri",
    finance: "BRI Finance",
    program: {
      id: "Paket Angsuran Briflexy One — 50-50",
      en: "Briflexy One Installment Package — 50-50",
    },
    period: {
      id: "Lembar simulasi — Juli 2026",
      en: "Simulation sheet — July 2026",
    },
    badge: { id: "Setahun bayar 1×", en: "Pay once a year" },
    highlights: [
      {
        id: "Skema 50-50: setahun bayar 1× — angsuran dibayarkan pada bulan ke-12",
        en: "50-50 scheme: pay once a year — installment due in month 12",
      },
      {
        id: "Bayar pertama sudah termasuk biaya administrasi, polis, asuransi & fidusia",
        en: "First payment includes admin, policy, insurance & fiducia fees",
      },
      {
        id: "Asuransi All Risk — terdaftar dan diawasi OJK",
        en: "All-Risk insurance — registered and supervised by OJK",
      },
    ],
    note: {
      id: "ADDB wilayah DKI Jakarta. Harga dapat berubah sewaktu-waktu tanpa pemberitahuan.",
      en: "ADDB for the DKI Jakarta area. Prices may change at any time without notice.",
    },
    pdf: "/promos/bri-briflexy-5050.pdf",
    models: ["ex2-pro", "ex2-max", "starray-emi", "ex5-pro", "ex5-max"],
    subPrograms: [
      {
        id: "briflexy",
        name: { id: "Briflexy One", en: "Briflexy One" },
        firstPaymentLabel: {
          id: "Total bayar pertama",
          en: "Total first payment",
        },
        rows: {
          "ex2-pro": [
            { tenor: 12, installment: 119_950_000, firstPayment: 142_184_820 },
          ],
          "ex2-max": [
            { tenor: 12, installment: 134_950_000, firstPayment: 159_538_820 },
          ],
          "starray-emi": [
            { tenor: 12, installment: 249_500_000, firstPayment: 285_648_000 },
          ],
          "ex5-pro": [
            { tenor: 12, installment: 232_500_000, firstPayment: 266_540_000 },
          ],
          "ex5-max": [
            { tenor: 12, installment: 252_500_000, firstPayment: 289_470_000 },
          ],
        },
      },
    ],
    accent: "#1e4b8f",
  },
  {
    id: "bni",
    finance: "BNI Finance",
    program: {
      id: "Paket Kemerdekaan",
      en: "Independence Package",
    },
    badge: { id: "Termasuk Coolray Flagship", en: "Includes Coolray Flagship" },
    highlights: [
      {
        id: "Tenor 12–60 bulan dengan TDP transparan per tenor",
        en: "12–60 month tenors with transparent down payment per tenor",
      },
      {
        id: "Satu-satunya lembar yang memuat Coolray Flagship",
        en: "The only sheet covering the Coolray Flagship",
      },
      {
        id: "Cocok untuk dokumen lengkap — pengajuan lebih fleksibel",
        en: "Great with complete documents — more flexible submission",
      },
    ],
    requirements: [
      { id: "KTP, KK, NPWP", en: "ID card, family card, tax ID" },
      {
        id: "Slip gaji / SKU / NIB jika usaha",
        en: "Payslip / business registration if self-employed",
      },
      { id: "PBB / AJB / SHM", en: "Property tax / deed / certificate" },
      {
        id: "Rekening koran 3 bulan terakhir",
        en: "Bank statement for the last 3 months",
      },
    ],
    pdf: "/promos/bni-paket-kemerdekaan.pdf",
    models: [
      "ex2-pro",
      "ex2-max",
      "coolray-flagship",
      "ex5-pro",
      "starray-emi",
      "ex5-max",
    ],
    subPrograms: [
      {
        id: "adddb",
        name: { id: "ADDB", en: "ADDB" },
        firstPaymentLabel: { id: "TDP", en: "Down payment" },
        rows: {
          "ex2-pro": [
            { tenor: 12, installment: 18_732_000, firstPayment: 49_335_000 },
            { tenor: 24, installment: 9_853_000, firstPayment: 50_110_000 },
            { tenor: 36, installment: 6_896_000, firstPayment: 50_955_000 },
            { tenor: 48, installment: 5_454_000, firstPayment: 51_746_000 },
            { tenor: 60, installment: 4_676_000, firstPayment: 52_485_000 },
          ],
          "ex2-max": [
            { tenor: 12, installment: 21_074_000, firstPayment: 54_709_000 },
            { tenor: 24, installment: 11_085_000, firstPayment: 55_581_000 },
            { tenor: 36, installment: 7_759_000, firstPayment: 56_402_000 },
            { tenor: 48, installment: 6_136_000, firstPayment: 57_171_000 },
            { tenor: 60, installment: 5_260_000, firstPayment: 58_002_000 },
          ],
          "coolray-flagship": [
            { tenor: 12, installment: 27_705_000, firstPayment: 91_852_000 },
            { tenor: 24, installment: 14_573_000, firstPayment: 93_070_000 },
            { tenor: 36, installment: 10_200_000, firstPayment: 94_216_000 },
            { tenor: 48, installment: 8_067_000, firstPayment: 95_290_000 },
            { tenor: 60, installment: 6_915_000, firstPayment: 96_293_000 },
          ],
          "ex5-pro": [
            { tenor: 12, installment: 36_308_000, firstPayment: 83_940_000 },
            { tenor: 24, installment: 19_097_000, firstPayment: 85_442_000 },
            { tenor: 36, installment: 13_367_000, firstPayment: 86_856_000 },
            { tenor: 60, installment: 9_062_000, firstPayment: 89_418_000 },
          ],
          "starray-emi": [
            { tenor: 12, installment: 36_666_000, firstPayment: 114_348_000 },
            { tenor: 24, installment: 19_286_000, firstPayment: 115_409_000 },
            { tenor: 36, installment: 13_499_000, firstPayment: 116_926_000 },
            { tenor: 48, installment: 10_676_000, firstPayment: 118_348_000 },
            { tenor: 60, installment: 9_152_000, firstPayment: 119_675_000 },
          ],
          "ex5-max": [
            { tenor: 12, installment: 39_431_000, firstPayment: 90_820_000 },
            { tenor: 24, installment: 20_740_000, firstPayment: 91_894_000 },
            { tenor: 36, installment: 14_516_000, firstPayment: 92_904_000 },
            { tenor: 48, installment: 11_481_000, firstPayment: 94_343_000 },
            { tenor: 60, installment: 9_842_000, firstPayment: 95_686_000 },
          ],
        },
      },
    ],
    accent: "#0f6a5f",
  },
  {
    id: "mandiri",
    finance: "Mandiri Utama Finance",
    program: {
      id: "PL EV — KKB Geely",
      en: "PL EV — Geely Installments",
    },
    badge: { id: "EV All Risk + Banjir", en: "EV All-Risk + Flood" },
    highlights: [
      {
        id: "Kendaraan EV sudah menggunakan asuransi All Risk dan perluasan banjir",
        en: "EV units already include All-Risk insurance and flood extension",
      },
      {
        id: "Total DP tercantum jelas untuk tiap tenor 12–60 bulan",
        en: "Clear total down payment for every 12–60 month tenor",
      },
      {
        id: "Angsuran ringan tenor panjang — EX2 Pro mulai Rp4,5 jt/bln",
        en: "Light long-tenor installments — EX2 Pro from Rp4.5M/mo",
      },
    ],
    requirements: [
      { id: "KTP suami dan istri", en: "Husband & wife ID cards" },
      { id: "Kartu keluarga", en: "Family card" },
      { id: "NPWP", en: "Tax ID (NPWP)" },
      {
        id: "Foto asli bukti kepemilikan rumah",
        en: "Original photo of home-ownership proof",
      },
      {
        id: "Foto asli slip gaji bulan terakhir",
        en: "Original photo of the latest payslip",
      },
      {
        id: "Rekening tabungan 3 bulan terakhir",
        en: "Savings account statements for the last 3 months",
      },
    ],
    pdf: "/promos/mandiri-pl-ev-kkb.pdf",
    models: ["ex2-pro", "ex2-max", "ex5-pro", "starray-emi", "ex5-max"],
    subPrograms: [
      {
        id: "kkb",
        name: { id: "KKB", en: "KKB" },
        firstPaymentLabel: { id: "Total DP", en: "Total down payment" },
        rows: {
          "ex2-pro": [
            { tenor: 12, installment: 18_659_000, firstPayment: 37_749_000 },
            { tenor: 24, installment: 9_645_000, firstPayment: 42_398_000 },
            { tenor: 36, installment: 6_646_000, firstPayment: 47_202_000 },
            { tenor: 48, installment: 5_250_000, firstPayment: 51_936_000 },
            { tenor: 60, installment: 4_535_000, firstPayment: 56_100_000 },
          ],
          "ex2-max": [
            { tenor: 12, installment: 20_992_000, firstPayment: 41_686_000 },
            { tenor: 24, installment: 10_851_000, firstPayment: 46_917_000 },
            { tenor: 36, installment: 7_477_000, firstPayment: 51_532_000 },
            { tenor: 48, installment: 5_906_000, firstPayment: 56_577_000 },
            { tenor: 60, installment: 5_101_000, firstPayment: 61_261_000 },
          ],
          "ex5-pro": [
            { tenor: 12, installment: 36_165_000, firstPayment: 61_572_000 },
            { tenor: 24, installment: 18_694_000, firstPayment: 70_584_000 },
            { tenor: 36, installment: 12_881_000, firstPayment: 78_535_000 },
            { tenor: 48, installment: 10_027_000, firstPayment: 88_603_000 },
            { tenor: 60, installment: 8_789_000, firstPayment: 93_248_000 },
          ],
          "starray-emi": [
            { tenor: 12, installment: 38_810_000, firstPayment: 64_952_000 },
            { tenor: 24, installment: 20_061_000, firstPayment: 66_013_000 },
            { tenor: 36, installment: 13_823_000, firstPayment: 67_435_000 },
            { tenor: 48, installment: 10_919_000, firstPayment: 69_162_000 },
            { tenor: 60, installment: 9_431_000, firstPayment: 70_395_000 },
          ],
          "ex5-max": [
            { tenor: 12, installment: 39_276_000, firstPayment: 66_136_000 },
            { tenor: 24, installment: 20_302_000, firstPayment: 72_145_000 },
            { tenor: 36, installment: 13_989_000, firstPayment: 81_181_000 },
            { tenor: 48, installment: 11_050_000, firstPayment: 89_241_000 },
            { tenor: 60, installment: 9_545_000, firstPayment: 96_725_000 },
          ],
        },
      },
    ],
    accent: "#1f3a93",
  },
  {
    id: "imfi",
    finance: "IMFI — Indomobil Finance",
    program: {
      id: "Paket Promo Geely",
      en: "Geely Promo Package",
    },
    period: {
      id: "Lembar promo — Juni 2026",
      en: "Promo sheet — June 2026",
    },
    badge: { id: "Ada bunga 0%", en: "0% interest available" },
    highlights: [
      {
        id: "Bunga 0% tenor 5 & 11 bulan (asuransi All Risk)",
        en: "0% interest for 5 & 11-month tenors (All-Risk insurance)",
      },
      {
        id: "DP ringan mulai Rp48,2 jt untuk EX2 Pro",
        en: "Light down payment from Rp48.2M for the EX2 Pro",
      },
      {
        id: "Promo potongan 2 angsuran — bebas 2 angsuran pertama",
        en: "2-installment cut promo — first 2 installments free",
      },
    ],
    requirements: [
      {
        id: "FC NPWP, KTP pemohon & suami/istri, FC kartu keluarga",
        en: "Copies of tax ID, applicant & spouse IDs, family card",
      },
      {
        id: "FC PBB & rekening listrik, rekening koran 3 bulan terakhir",
        en: "Property-tax & electricity bills, 3-month bank statements",
      },
      {
        id: "Slip gaji (karyawan) / SIUP & TDP (wiraswasta)",
        en: "Payslip (employees) / trade license (entrepreneurs)",
      },
      {
        id: "Status tempat tinggal wajib milik sendiri • SLIK KOL 1 lancar",
        en: "Must own their home • clean SLIK credit record",
      },
      {
        id: "Pembayaran wajib autodebet (Mandiri, BCA & BRI)",
        en: "Auto-debit payment required (Mandiri, BCA & BRI)",
      },
    ],
    pdf: "/promos/imfi-paket-promo.pdf",
    models: ["ex2-pro", "ex2-max", "ex5-pro", "starray-emi", "ex5-max"],
    subPrograms: [
      {
        id: "bunga-ringan",
        name: {
          id: "Bunga Ringan (Asuransi Kombinasi)",
          en: "Low Interest (Combined Insurance)",
        },
        firstPaymentLabel: { id: "TDP", en: "Down payment" },
        rows: {
          "ex2-pro": [
            { tenor: 11, installment: 14_511_000, firstPayment: 102_319_170 },
            { tenor: 23, installment: 7_580_000, firstPayment: 96_505_346 },
            { tenor: 35, installment: 5_301_000, firstPayment: 95_216_375 },
            { tenor: 47, installment: 4_206_000, firstPayment: 94_984_257 },
            { tenor: 59, installment: 3_573_000, firstPayment: 95_150_566 },
          ],
          "ex2-max": [
            { tenor: 11, installment: 16_326_000, firstPayment: 114_283_170 },
            { tenor: 23, installment: 8_528_000, firstPayment: 107_492_034 },
            { tenor: 35, installment: 5_963_000, firstPayment: 106_028_363 },
            { tenor: 47, installment: 4_732_000, firstPayment: 105_755_645 },
            { tenor: 59, installment: 4_020_000, firstPayment: 105_930_404 },
          ],
          "ex5-pro": [
            { tenor: 11, installment: 28_126_000, firstPayment: 188_243_500 },
            { tenor: 23, installment: 14_691_000, firstPayment: 176_470_900 },
            { tenor: 35, installment: 10_274_000, firstPayment: 173_521_000 },
            { tenor: 47, installment: 8_152_000, firstPayment: 172_670_800 },
            { tenor: 59, installment: 6_926_000, firstPayment: 172_618_950 },
          ],
          "ex5-max": [
            { tenor: 11, installment: 30_546_000, firstPayment: 203_843_500 },
            { tenor: 23, installment: 15_955_000, firstPayment: 190_564_500 },
            { tenor: 35, installment: 11_157_000, firstPayment: 187_351_200 },
            { tenor: 47, installment: 8_853_000, firstPayment: 186_419_800 },
            { tenor: 59, installment: 7_521_000, firstPayment: 186_354_350 },
          ],
          "starray-emi": [
            { tenor: 11, installment: 30_183_000, firstPayment: 201_503_500 },
            { tenor: 23, installment: 15_766_000, firstPayment: 188_863_140 },
            { tenor: 35, installment: 11_025_000, firstPayment: 185_689_200 },
            { tenor: 47, installment: 8_748_000, firstPayment: 184_769_680 },
            { tenor: 59, installment: 7_432_000, firstPayment: 184_706_370 },
          ],
        },
      },
      {
        id: "dp-ringan",
        name: {
          id: "DP Ringan (Asuransi Kombinasi)",
          en: "Light Down Payment (Combined Insurance)",
        },
        firstPaymentLabel: { id: "TDP", en: "Down payment" },
        rows: {
          "ex2-pro": [
            { tenor: 12, installment: 18_232_000, firstPayment: 48_230_000 },
            { tenor: 24, installment: 9_790_000, firstPayment: 48_230_000 },
            { tenor: 36, installment: 7_003_000, firstPayment: 48_480_000 },
            { tenor: 48, installment: 5_624_000, firstPayment: 48_480_000 },
            { tenor: 60, installment: 4_951_000, firstPayment: 48_480_000 },
          ],
          "ex2-max": [
            { tenor: 12, installment: 20_442_000, firstPayment: 54_230_000 },
            { tenor: 24, installment: 10_965_000, firstPayment: 54_480_000 },
            { tenor: 36, installment: 7_843_000, firstPayment: 54_480_000 },
            { tenor: 48, installment: 6_298_000, firstPayment: 54_480_000 },
            { tenor: 60, installment: 5_544_000, firstPayment: 54_480_000 },
          ],
          "ex5-pro": [
            { tenor: 12, installment: 34_446_000, firstPayment: 93_500_000 },
            { tenor: 24, installment: 18_475_000, firstPayment: 93_500_000 },
            { tenor: 36, installment: 13_201_000, firstPayment: 93_500_000 },
            { tenor: 48, installment: 10_592_000, firstPayment: 93_900_000 },
            { tenor: 60, installment: 9_317_000, firstPayment: 93_900_000 },
          ],
          "ex5-max": [
            { tenor: 12, installment: 37_361_000, firstPayment: 101_500_000 },
            { tenor: 24, installment: 20_015_000, firstPayment: 101_500_000 },
            { tenor: 36, installment: 14_301_000, firstPayment: 101_900_000 },
            { tenor: 48, installment: 11_474_000, firstPayment: 101_900_000 },
            { tenor: 60, installment: 10_093_000, firstPayment: 101_900_000 },
          ],
          "starray-emi": [
            { tenor: 12, installment: 36_923_000, firstPayment: 100_300_000 },
            { tenor: 24, installment: 19_803_000, firstPayment: 100_300_000 },
            { tenor: 36, installment: 14_150_000, firstPayment: 100_700_000 },
            { tenor: 48, installment: 11_353_000, firstPayment: 100_700_000 },
            { tenor: 60, installment: 9_986_000, firstPayment: 100_700_000 },
          ],
        },
      },
      {
        id: "bunga-0",
        name: {
          id: "Bunga 0% (Asuransi All Risk)",
          en: "0% Interest (All-Risk Insurance)",
        },
        firstPaymentLabel: { id: "TDP", en: "Down payment" },
        rows: {
          "ex2-pro": [
            { tenor: 5, installment: 29_988_000, firstPayment: 106_041_070 },
            { tenor: 11, installment: 14_994_000, firstPayment: 94_645_570 },
          ],
          "ex2-max": [
            { tenor: 5, installment: 33_738_000, firstPayment: 118_470_070 },
            { tenor: 11, installment: 16_869_000, firstPayment: 105_649_570 },
          ],
          "ex5-pro": [
            { tenor: 5, installment: 58_125_000, firstPayment: 195_457_500 },
            { tenor: 11, installment: 29_063_000, firstPayment: 173_370_500 },
          ],
          "ex5-max": [
            { tenor: 5, installment: 63_125_000, firstPayment: 211_677_500 },
            { tenor: 11, installment: 31_563_000, firstPayment: 187_690_500 },
          ],
          "starray-emi": [
            { tenor: 5, installment: 62_375_000, firstPayment: 209_244_500 },
            { tenor: 11, installment: 31_188_000, firstPayment: 185_542_500 },
          ],
        },
      },
      {
        id: "potongan-2",
        name: {
          id: "Potongan 2 Angsuran (Kombinasi)",
          en: "2-Installment Cut (Combined)",
        },
        firstPaymentLabel: { id: "TDP", en: "Down payment" },
        rows: {
          "ex2-pro": [
            { tenor: 10, installment: 21_796_000, firstPayment: 48_230_000 },
            { tenor: 22, installment: 10_704_000, firstPayment: 48_230_000 },
            { tenor: 34, installment: 7_473_000, firstPayment: 48_480_000 },
            { tenor: 46, installment: 5_944_000, firstPayment: 48_480_000 },
            { tenor: 58, installment: 5_203_000, firstPayment: 48_480_000 },
          ],
          "ex2-max": [
            { tenor: 10, installment: 24_437_000, firstPayment: 54_230_000 },
            { tenor: 22, installment: 11_989_000, firstPayment: 54_480_000 },
            { tenor: 34, installment: 8_369_000, firstPayment: 54_480_000 },
            { tenor: 46, installment: 6_656_000, firstPayment: 54_480_000 },
            { tenor: 58, installment: 5_826_000, firstPayment: 54_480_000 },
          ],
          "ex5-pro": [
            { tenor: 10, installment: 41_178_000, firstPayment: 93_500_000 },
            { tenor: 22, installment: 20_200_000, firstPayment: 93_500_000 },
            { tenor: 34, installment: 14_088_000, firstPayment: 93_500_000 },
            { tenor: 46, installment: 11_195_000, firstPayment: 93_900_000 },
            { tenor: 58, installment: 9_791_000, firstPayment: 93_900_000 },
          ],
          "ex5-max": [
            { tenor: 10, installment: 44_662_000, firstPayment: 101_500_000 },
            { tenor: 22, installment: 21_884_000, firstPayment: 101_500_000 },
            { tenor: 34, installment: 15_262_000, firstPayment: 101_900_000 },
            { tenor: 46, installment: 12_127_000, firstPayment: 101_900_000 },
            { tenor: 58, installment: 10_606_000, firstPayment: 101_900_000 },
          ],
          "starray-emi": [
            { tenor: 10, installment: 44_140_000, firstPayment: 100_300_000 },
            { tenor: 22, installment: 21_653_000, firstPayment: 100_300_000 },
            { tenor: 34, installment: 15_100_000, firstPayment: 100_700_000 },
            { tenor: 46, installment: 11_999_000, firstPayment: 100_700_000 },
            { tenor: 58, installment: 10_494_000, firstPayment: 100_700_000 },
          ],
        },
      },
    ],
    accent: "#b45309",
  },
];

/**
 * Disclaimer utama bagian promo — angka disalin dari lembar resmi
 * perusahaan pembiayaan tanpa perubahan.
 */
export const PROMO_DISCLAIMER = {
  id: "*Angka angsuran & DP disalin dari lembar simulasi resmi masing-masing perusahaan pembiayaan (CIMB Niaga Finance, BRI Finance, BNI Finance, Mandiri Utama Finance, dan IMFI) tanpa perubahan. Angka bersifat indikatif/proyeksi, tidak mengikat, dan sewaktu-waktu dapat berubah. Persetujuan akhir, angsuran final, dan biaya mengikuti hasil survei serta kebijakan perusahaan pembiayaan. Asumsi OTR antar lembar dapat sedikit berbeda — minta simulasi resmi terbaru via WhatsApp.",
  en: "*Installment & down-payment figures are copied unchanged from each financing company's official simulation sheet (CIMB Niaga Finance, BRI Finance, BNI Finance, Mandiri Utama Finance, and IMFI). Figures are indicative/projected, non-binding, and may change at any time. Final approval, installments, and fees follow the financing company's survey results and policies. OTR assumptions may differ slightly between sheets — request the latest official simulation via WhatsApp.",
} as const;
