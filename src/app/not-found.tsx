import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgePercent,
  BookOpen,
  Car,
  GitCompareArrows,
  Home,
  Newspaper,
  Phone,
  Search,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { WhatsAppIcon } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "404 — Halaman Tidak Ditemukan",
  robots: { index: false, follow: true },
};

interface Suggestion {
  href: string;
  label: string;
  desc: string;
  icon: LucideIcon;
}

/** Halaman tujuan paling sering dicari — semua link nyata di situs ini. */
const SUGGESTIONS: Suggestion[] = [
  { href: "/", label: "Beranda", desc: "Mulai dari halaman utama.", icon: Home },
  {
    href: "/harga-mobil-geely-bogor",
    label: "Harga",
    desc: "Harga indikatif seluruh lineup Geely.",
    icon: Tag,
  },
  {
    href: "/promo-geely-bogor",
    label: "Promo",
    desc: "Program pembiayaan resmi yang sedang berjalan.",
    icon: BadgePercent,
  },
  {
    href: "/vs",
    label: "Perbandingan",
    desc: "Geely vs pesaing — dua arah, jujur.",
    icon: GitCompareArrows,
  },
  {
    href: "/artikel",
    label: "Artikel",
    desc: "Panduan membeli & merawat mobil Geely.",
    icon: Newspaper,
  },
  {
    href: "/indeks-kata-kunci",
    label: "Indeks Kata Kunci",
    desc: "Semua halaman berdasarkan kata kunci.",
    icon: Search,
  },
  {
    href: "/glosarium",
    label: "Glosarium",
    desc: "Istilah otomotif dalam bahasa sederhana.",
    icon: BookOpen,
  },
  {
    href: "/kontak",
    label: "Kontak",
    desc: "Jam operasional, email, & media sosial.",
    icon: Phone,
  },
  {
    href: "/model/ex5",
    label: "Geely EX5",
    desc: "SUV listrik andalan.",
    icon: Car,
  },
  {
    href: "/model/starray",
    label: "Starray EM-i",
    desc: "SUV super hybrid.",
    icon: Car,
  },
  {
    href: "/model/coolray",
    label: "Coolray",
    desc: "Crossover bensin turbo.",
    icon: Car,
  },
  {
    href: "/model/ex2",
    label: "EX2",
    desc: "Hatchback listrik.",
    icon: Car,
  },
];

export default function NotFound() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Kop 404 */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            aria-hidden="true"
            className="bg-gradient-to-br from-[#fafcfa] to-[#10b981] bg-clip-text font-display text-8xl font-extrabold tracking-tight text-transparent sm:text-9xl"
          >
            404
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Halaman tidak ditemukan
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Page not found — the link may be outdated or mistyped.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Tenang, datanya tidak hilang — hanya alamatnya yang salah. Anda bisa
            langsung tanya apa pun lewat WhatsApp, atau lanjut menjelajah lewat
            tautan populer di bawah.
          </p>

          {/* CTA utama */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={waLink(
                "Halo Pusat Geely, saya dari halaman 404 (tautan tidak ditemukan) dan ingin bertanya.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105"
            >
              <WhatsAppIcon className="size-4" aria-hidden="true" />
              Tanya via WhatsApp
            </a>
            <Button asChild>
              <Link href="/">Kembali ke Beranda</Link>
            </Button>
          </div>
        </div>

        {/* Tautan populer */}
        <div className="mt-14">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Mungkin maksud Anda:
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {SUGGESTIONS.map(({ href, label, desc, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-2xl border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-3 font-display text-sm font-bold leading-snug">
                  {label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
