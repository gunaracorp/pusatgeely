"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Swords } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { COMPARES } from "@/lib/competitors";
import { MODELS, formatIDR } from "@/lib/site";

export function VsIndexPage() {
  const { lang } = useLang();

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: lang === "id" ? "Perbandingan" : "Comparisons" }]} />

      <header className="max-w-3xl">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
          <Swords className="size-4" aria-hidden="true" />
          {lang === "id" ? "Geely vs Pesaing" : "Geely vs Rivals"}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {lang === "id"
            ? "Perbandingan Mobil Geely vs Pesaing"
            : "Geely vs the Competition"}
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {lang === "id"
            ? "Pertanyaan paling wajar sebelum membeli: “apa bedanya dengan pesaingnya?” Di sinilah kami membandingkan setiap model Geely dengan lawan utamanya — harga indikatif, spesifikasi kunci, keunggulan masing-masing, dan pendapat jujur. Tanpa menjatuhkan merek lain, tanpa angka karangan."
            : "The most natural question before buying: “how does it compare?” Here we match every Geely model against its main rivals — indicative prices, key specs, each side's strengths, and an honest take. No brand-bashing, no made-up numbers."}
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {COMPARES.map((c) => {
          const model = MODELS.find((m) => m.id === c.modelId);
          return (
            <Link
              key={c.slug}
              href={`/vs/${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="flex items-center gap-4 p-5">
                {model && (
                  <Image
                    src={model.image}
                    alt={c.geelyName}
                    width={120}
                    height={80}
                    className="h-16 w-24 shrink-0 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display font-bold">
                    <span className="text-primary">{c.geelyName}</span>
                    <span className="mx-1.5 font-black text-muted-foreground">vs</span>
                    {c.rivalName}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatIDR(c.rivalPriceFrom > (model?.priceFrom ?? 0) ? (model?.priceFrom ?? 0) : c.rivalPriceFrom)}{" "}
                    {lang === "id" ? "mulai" : "from"} ·{" "}
                    {lang === "id" ? "harga & spesifikasi indikatif" : "indicative price & specs"}
                  </p>
                </div>
                <ArrowRight
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6">
        <h2 className="font-display text-lg font-bold">
          {lang === "id" ? "Kok perbandingannya bisa dipercaya?" : "Why trust these comparisons?"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/90">
          {lang === "id"
            ? "Semua angka berasal dari riset multi-sumber publik per September 2026 dan ditandai indikatif. Kami bukan dealer resmi — posisi kami netral: tugas kami memastikan kamu membeli mobil yang TEPAT, bukan menjualkan satu merek. Verifikasi akhir selalu lewat test drive langsung."
            : "All figures come from multi-source public research as of September 2026 and are marked indicative. We're not an official dealer — our position is neutral: our job is making sure you buy the RIGHT car, not pushing one brand. The final check is always a live test drive."}
        </p>
        <Link
          href="/test-drive-geely-bogor"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
        >
          {lang === "id" ? "Jadwalkan test drive di lokasimu" : "Book a test drive at your place"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
