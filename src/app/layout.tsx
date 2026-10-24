import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/components/language-provider";
import { AiChatWidget } from "@/components/ai-chat-widget";
import {
  BUSINESS,
  INDEPENDENCE_DISCLAIMER,
  SITE_URL,
  MODELS,
  SEO_TAGS,
  formatIDR,
  waLink,
} from "@/lib/site";
import {
  GUGUN,
  LUTFI,
  ORGS,
  SANTRI_ANGON,
  SOURCE_SIGNATURE,
  BRAND_KEYWORDS,
} from "@/lib/branding";
import { SEO_CORE_KEYWORDS, SEO_KEYWORD_COUNT } from "@/lib/seo-keywords";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c1210" },
    { media: "(prefers-color-scheme: light)", color: "#fafcfa" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Pusat Geely — Mobil Geely Bogor & Jabodetabek | Test Drive, Harga & Simulasi Kredit",
    template: "%s | Pusat Geely",
  },
  description:
    "Konsultan penjualan Geely untuk Bogor & Jabodetabek. Panduan memilih Geely EX5, EX2, Starray EM-i, dan Coolray — test drive fleksibel, penawaran harga transparan, simulasi kredit, dan trade-in via WhatsApp.",
  keywords: [
    "Geely Bogor",
    "mobil Geely Jabodetabek",
    "harga Geely EX5",
    "Geely EX2 harga",
    "warna Geely EX5",
    "Geely EX2 warna",
    "Geely Coolray Bogor",
    "Geely Starray EM-i",
    "test drive Geely",
    "kredit mobil Geely",
    "dealer Geely terdekat",
    "mobil listrik Bogor",
    "Pusat Geely",
    "Sena Sulaeman Geely",
    ...SEO_TAGS,
    ...BRAND_KEYWORDS,
    ...SEO_CORE_KEYWORDS,
  ],
  authors: [
    { name: BUSINESS.pic },
    { name: GUGUN.legalName, url: "https://instagram.com/prabudanling" },
    { name: LUTFI.legalName, url: "https://digiman.id" },
  ],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  alternates: {
    canonical: SITE_URL,
    languages: {
      "id-ID": SITE_URL,
      "en": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: BUSINESS.name,
    title: "Pusat Geely — Mobil Geely Bogor & Jabodetabek",
    description:
      "Test drive fleksibel, harga transparan, simulasi kredit, dan trade-in untuk Geely EX5, EX2, Starray EM-i & Coolray. Layanan Bogor & Jabodetabek via WhatsApp.",
    images: [
      {
        url: "/images/hero.webp",
        width: 1440,
        height: 720,
        alt: "SUV premium di jalan pegunungan Bogor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@EmanSulaem79261",
    title: "Pusat Geely — Mobil Geely Bogor & Jabodetabek",
    description:
      "Test drive, harga transparan, simulasi kredit & trade-in Geely untuk Bogor & Jabodetabek.",
    images: ["/images/hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Verifikasi Search Console (Google / Bing / Yandex) — aktif hanya bila
  // env diset: NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION, NEXT_PUBLIC_BING_VERIFICATION,
  // NEXT_PUBLIC_YANDEX_VERIFICATION. Tanpa env = tidak dirender.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  process.env.NEXT_PUBLIC_BING_VERIFICATION ||
  process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
    ? {
        verification: {
          ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
          }),
          ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && {
            other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION },
          }),
          ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && {
            other: { "y-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION },
          }),
        },
      }
    : {}),
};

/** Structured data — honesty-first: independent consultant, NOT an official dealer. */
function StructuredData() {
  const priceMin = Math.min(...MODELS.map((m) => m.priceFrom));
  const priceMax = Math.max(...MODELS.map((m) => m.priceFrom));

  const autoDealer = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    description: INDEPENDENCE_DISCLAIMER.id,
    url: SITE_URL,
    image: `${SITE_URL}/images/hero.webp`,
    telephone: `+${BUSINESS.waNumber}`,
    email: BUSINESS.email,
    priceRange: `${formatIDR(priceMin)} – ${formatIDR(priceMax)}`,
    keywords: [
      ...SEO_TAGS,
      ...SEO_CORE_KEYWORDS,
      `indeks ${SEO_KEYWORD_COUNT} kata kunci geely`,
    ],
    founder: {
      "@type": "Person",
      name: BUSINESS.pic,
      jobTitle: BUSINESS.role.id,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogor",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
    areaServed: [
      "Bogor",
      "Kabupaten Bogor",
      "Depok",
      "Jakarta",
      "Tangerang",
      "Bekasi",
      "Jabodetabek",
    ].map((name) => ({ "@type": "City", name })),
    openingHours: "Mo-Su 08:00-20:00",
    sameAs: [
      BUSINESS.instagramUrl,
      BUSINESS.facebookUrl,
      BUSINESS.tiktokUrl,
      BUSINESS.xUrl,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+${BUSINESS.waNumber}`,
      email: BUSINESS.email,
      areaServed: "ID",
      availableLanguage: ["id", "en"],
    },
    slogan: BUSINESS.tagline.id,
    // Sinyal keahlian (E-E-A-T) untuk AI Overviews & mesin pencari AI
    knowsAbout: [
      "Geely EX5",
      "Geely EX2",
      "Geely Starray EM-i",
      "Geely Coolray",
      "mobil listrik Indonesia",
      "SUV hybrid Indonesia",
      "kredit mobil Geely",
      "trade-in mobil Bekasi",
      "test drive Jabodetabek",
    ],
  };

  const faqItems = [
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
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  // ══ GHOST BRANDING: Person entities — dideklarasikan lebih awal karena
  // direferensikan oleh schema website & organizations (@id link graph).
  const personGugun = {
    "@type": "Person",
    "@id": "https://topkonsultan.web.id/#gugun-gunara",
    name: GUGUN.honorificName,
    alternateName: GUGUN.alternateNames.filter(
      (n) => n !== GUGUN.honorificName,
    ),
    honorificPrefix: "H.",
    givenName: "Gugun",
    familyName: "Gunara",
    jobTitle: GUGUN.jobTitle,
    description: GUGUN.description,
    url: GUGUN.url,
    nationality: { "@type": "Country", name: "Indonesia" },
    knowsAbout: [
      "Digital business",
      "Konsultan bisnis",
      "Pengembangan website",
      "SEO",
      "Digital marketing",
      "Automotive consulting",
    ],
    worksFor: [
      { "@id": ORGS.topKonsultan["@id"] },
      { "@id": ORGS.digiman["@id"] },
    ],
    sameAs: GUGUN.sameAs,
  };

  const personLutfi = {
    "@type": "Person",
    "@id": "https://digiman.id/#muhammad-lutfi-azmi",
    name: LUTFI.legalName,
    alternateName: LUTFI.alternateNames.filter((n) => n !== LUTFI.legalName),
    givenName: "Muhammad Lutfi",
    familyName: "Azmi",
    jobTitle: LUTFI.jobTitle,
    description: LUTFI.description,
    url: LUTFI.url,
    nationality: { "@type": "Country", name: "Indonesia" },
    worksFor: [
      { "@id": ORGS.digiman["@id"] },
      { "@id": ORGS.topKonsultan["@id"] },
    ],
    knowsAbout: [
      "Digital systems",
      "Web development",
      "Business management",
    ],
    sameAs: LUTFI.sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS.name,
    inLanguage: "id-ID",
    publisher: { "@id": `${SITE_URL}/#business` },
    // Sitelinks SearchAction — kandidat search box Google di hasil pencarian
    // merek. Target-nya NYATA: /indeks-kata-kunci?q= memfilter 2.000+ frasa.
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/indeks-kata-kunci?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    // Relasi tersembunyi: penyedia dukungan digital situs ini (terbaca mesin)
    provider: [
      { "@id": ORGS.digiman["@id"] },
      { "@id": ORGS.topKonsultan["@id"] },
    ],
    author: [
      { "@id": personGugun["@id"] },
      { "@id": personLutfi["@id"] },
    ],
  };

  // LAPISAN TERSEMBUNYI (belakang layar): entitas korporat & personal
  // digital support system HANYA di structured data — dibaca mesin pencari,
  // tidak ditampilkan di UI sesuai permintaan pemilik.
  // Jangan render entitas ini sebagai teks/tautan terlihat.
  const organizations = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGS.digiman["@id"],
        name: ORGS.digiman.name,
        alternateName: ORGS.digiman.alternateName,
        url: ORGS.digiman.url,
        description: ORGS.digiman.description,
        foundingDate: ORGS.digiman.foundingDate,
        founder: { "@id": personGugun["@id"] },
        leader: { "@id": personGugun["@id"] },
        employee: [{ "@id": personLutfi["@id"] }],
        sameAs: ORGS.digiman.sameAs,
      },
      {
        "@type": "Organization",
        "@id": ORGS.topKonsultan["@id"],
        name: ORGS.topKonsultan.name,
        alternateName: ORGS.topKonsultan.alternateName,
        url: ORGS.topKonsultan.url,
        description: ORGS.topKonsultan.description,
        foundingDate: ORGS.topKonsultan.foundingDate,
        founder: { "@id": personGugun["@id"] },
        leader: { "@id": personGugun["@id"] },
        employee: [{ "@id": personLutfi["@id"] }],
        sameAs: ORGS.topKonsultan.sameAs,
      },
      {
        "@type": "Organization",
        "@id": ORGS.juraganWebsite["@id"],
        name: ORGS.juraganWebsite.name,
        url: ORGS.juraganWebsite.url,
        description: ORGS.juraganWebsite.description,
        parentOrganization: { "@id": ORGS.digiman["@id"] },
        founder: { "@id": personGugun["@id"] },
      },
      // Komunitas yang digagas Gugun Gunara — entitas personal branding.
      // Tanpa URL terverifikasi → tidak ada url yang dikarang (honesty-first).
      {
        "@type": "Organization",
        name: SANTRI_ANGON.name,
        alternateName: ["santri angon", "Komunitas Santri Angon"],
        description: SANTRI_ANGON.description,
        founder: { "@id": personGugun["@id"] },
        leader: { "@id": personGugun["@id"] },
      },
      personGugun,
      personLutfi,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(autoDealer) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizations) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${grotesk.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            {/* Geely Bot — asisten AI instan di seluruh halaman */}
            <AiChatWidget />
            <Toaster position="bottom-center" richColors closeButton />
          </LanguageProvider>
        </ThemeProvider>
        <StructuredData />
        {/*
          ══ GHOST BRANDING — HTML source signature ══
          Hanya terlihat di view-source: kredit digital support system.
          Tidak dirender di permukaan UI (permintaan pemilik).
        */}
        <div
          aria-hidden="true"
          hidden
          dangerouslySetInnerHTML={{ __html: `<!--${SOURCE_SIGNATURE}-->` }}
        />
        {/*
          Google Analytics 4 — opsional. Set NEXT_PUBLIC_GA_ID (mis. G-XXXXXXX)
          di environment untuk mengaktifkan. Tanpa env = nol script = nol beban.
        */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
