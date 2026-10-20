"use client";

import Link from "next/link";
import {
  CheckCircle2,
  FileSearch,
  Handshake,
  KeyRound,
  MessageCircle,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { useLang } from "@/components/language-provider";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { WhatsAppIcon } from "@/components/site-header";
import { BUSINESS, INDEPENDENCE_DISCLAIMER, waLink } from "@/lib/site";

const STEPS = [
  {
    Icon: MessageCircle,
    title: { id: "1. Konsultasi Awal", en: "1. Initial Consultation" },
    body: {
      id: "Ceritakan kebutuhan, anggaran, dan pola pemakaian Anda via WhatsApp atau form test drive. Kami dengarkan dulu — bukan langsung menawarkan unit paling mahal.",
      en: "Tell us your needs, budget, and usage pattern via WhatsApp or the test-drive form. We listen first — we don't jump to pitching the priciest unit.",
    },
  },
  {
    Icon: FileSearch,
    title: { id: "2. Rekomendasi & Penawaran", en: "2. Recommendation & Offer" },
    body: {
      id: "Kami cocokkan dengan lineup Geely yang tepat, jelaskan perbandingan model secara jujur, lalu kirimkan penawaran terkini beserta program pembiayaan resmi yang tersedia.",
      en: "We match you with the right Geely model, explain comparisons honestly, then send the latest offer along with the official financing programs available.",
    },
  },
  {
    Icon: KeyRound,
    title: { id: "3. Test Drive & Negosiasi", en: "3. Test Drive & Negotiation" },
    body: {
      id: "Rasakan mobilnya langsung — di lokasi Anda selama dalam area layanan. Semua angka dijelaskan terbuka: harga, DP, angsuran, biaya-biaya di luar harga mobil.",
      en: "Feel the car yourself — at your location within the service area. Every figure is explained openly: price, down payment, installments, and the costs beyond the car's price.",
    },
  },
  {
    Icon: Handshake,
    title: { id: "4. Pengurusan sampai Serah Terima", en: "4. Processing to Handover" },
    body: {
      id: "Kredit atau cash, trade-in atau tanpa — kami dampingi prosesnya sampai kunci berpindah tangan. Termasuk menjelaskan fitur mobil dan opsi home charging untuk unit listrik.",
      en: "Credit or cash, trade-in or not — we accompany the process until the key changes hands. Including explaining the car's features and home-charging options for electric units.",
    },
  },
] as const;

const VALUES = [
  {
    Icon: ShieldCheck,
    title: { id: "Transparan di Setiap Angka", en: "Transparent in Every Figure" },
    body: {
      id: "Harga kami tampilkan sebagai angka indikatif dengan sumber dan tanggal — bukan harga misterius yang berubah di meja. Program pembiayaan disalin apa adanya dari lembar resminya.",
      en: "We display prices as indicative figures with sources and dates — not mystery numbers that change at the table. Financing programs are copied verbatim from their official sheets.",
    },
  },
  {
    Icon: Users,
    title: { id: "Pendampingan, Bukan Penjualan Tekanan", en: "Accompaniment, Not Pressure Sales" },
    body: {
      id: "Tidak ada taktik \"hari ini terakhir\". Kalau mobil yang Anda mau memang bukan yang paling cocok untuk Anda, kami akan mengatakannya — reputasi jangka panjang lebih berharga daripada satu deal.",
      en: "No \"today is the last day\" tactics. If the car you want genuinely isn't the right fit, we'll say so — long-term reputation is worth more than one deal.",
    },
  },
  {
    Icon: Target,
    title: { id: "Fokus Bogor & Jabodetabek", en: "Focused on Bogor & Jabodetabek" },
    body: {
      id: "Kami memilih mendalami satu wilayah agar layanannya cepat: test drive bisa ke lokasi Anda, serah terima bisa di rumah, dan kendala purna jual bisa kami dampingi langsung.",
      en: "We choose to go deep on one region for fast service: test drives come to your location, handovers can happen at home, and after-sales issues get our direct attention.",
    },
  },
] as const;

export function TentangPage() {
  const { lang, t } = useLang();
  const L = <T extends { id: string; en: string }>(v: T) => v[lang];

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: lang === "id" ? "Tentang" : "About" }]} />

      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {lang === "id" ? "Tentang Kami" : "About Us"}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {lang === "id"
            ? "Membantu Orang Memilih Geely dengan Tenang"
            : "Helping People Choose a Geely, Calmly"}
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {lang === "id"
            ? `Pusat Geely adalah layanan konsultan penjualan independen yang dijalankan oleh ${BUSINESS.pic} (${BUSINESS.role.id}) untuk wilayah Bogor & Jabodetabek. Kami berdiri di sisi Anda — pembeli — sejak pertanyaan pertama sampai serah terima kunci. Proses pembelian tetap berjalan melalui jaringan dealer resmi Geely Indonesia, sehingga garansi pabrikan berlaku penuh; peran kami adalah memastikan Anda masuk ke proses itu dengan informasi yang benar dan posisi tawar yang sehat.`
            : `Pusat Geely is an independent sales-consulting service run by ${BUSINESS.pic} (${BUSINESS.role.en}) for Bogor & Jabodetabek. We stand on your side — the buyer's — from the first question to the key handover. The purchase itself runs through Geely Indonesia's official dealer network, so the manufacturer warranty applies in full; our role is making sure you enter that process with correct information and a healthy negotiating position.`}
        </p>
      </header>

      {/* Cara kerja */}
      <section className="mt-12" aria-labelledby="how-h">
        <h2 id="how-h" className="font-display text-2xl font-bold tracking-tight">
          {lang === "id" ? "Cara Kami Bekerja" : "How We Work"}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {STEPS.map((s, i) => (
            <div key={i} className="rounded-2xl border bg-card p-5">
              <s.Icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-base font-bold">{L(s.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {L(s.body)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Nilai */}
      <section className="mt-12" aria-labelledby="values-h">
        <h2 id="values-h" className="font-display text-2xl font-bold tracking-tight">
          {lang === "id" ? "Nilai yang Kami Pegang" : "What We Stand For"}
        </h2>
        <div className="mt-5 space-y-4">
          {VALUES.map((v, i) => (
            <div key={i} className="flex gap-4 rounded-2xl border bg-card p-5">
              <v.Icon className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-base font-bold">{L(v.title)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {L(v.body)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kapan menghubungi kami */}
      <section className="mt-12" aria-labelledby="when-h">
        <h2 id="when-h" className="font-display text-2xl font-bold tracking-tight">
          {lang === "id" ? "Kapan Sebaiknya Menghubungi Kami" : "When Should You Reach Out"}
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {(lang === "id"
            ? [
                "Masih membandingkan model dan ingin perbandingan yang jujur, bukan pamflet.",
                "Sudah punya pilihan dan ingin harga terbaik yang sedang berlaku.",
                "Butuh simulasi kredit dengan angka yang realistis untuk anggaran Anda.",
                "Punya mobil lama dan ingin tahu nilainya sebagai uang muka (trade-in).",
                "Ingin test drive di lokasi Anda, di hari dan jam yang Anda tentukan.",
                "Baru pindah ke Bogor/Jabodetabek dan butuh panduan mobil listrik lokal (charging, garansi, servis).",
              ]
            : [
                "You're still comparing models and want an honest comparison, not a brochure.",
                "You've picked one and want the best currently valid price.",
                "You need a credit simulation with numbers that fit your budget.",
                "You have an old car and want its trade-in value as a down payment.",
                "You want a test drive at your location, on your chosen day and time.",
                "You just moved to Bogor/Jabodetabek and need a local EV guide (charging, warranty, service).",
              ]
          ).map((item, i) => (
            <li key={i} className="flex gap-3 rounded-xl border bg-card p-4 text-sm leading-relaxed">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA + disclaimer */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <a
          href={waLink("Halo Pusat Geely, saya sudah baca halaman Tentang dan ingin konsultasi.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105"
        >
          <WhatsAppIcon className="size-5" aria-hidden="true" />
          {t.header.cta}
        </a>
        <Link
          href="/kontak"
          className="inline-flex h-12 items-center rounded-full border bg-card px-6 text-sm font-semibold transition-colors hover:bg-accent"
        >
          {t.nav.contact}
        </Link>
      </div>

      <p className="mt-8 rounded-2xl border bg-card p-5 text-xs leading-relaxed text-muted-foreground">
        {INDEPENDENCE_DISCLAIMER[lang]}
      </p>
    </article>
  );
}
