"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calculator, MessageCircle } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ModelCompareTable } from "@/components/model-compare-table";
import {
  MODELS,
  POWERTRAIN_LABEL,
  PRICE_DISCLAIMER,
  formatIDR,
  formatJuta,
} from "@/lib/site";

export function HargaPage({
  priceMin,
  priceMax,
  waHref,
}: {
  priceMin: number;
  priceMax: number;
  waHref: string;
}) {
  const { lang, t } = useLang();
  const L = <T extends { id: string; en: string }>(v: T) => v[lang];

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t.nav.harga }]} />

      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {lang === "id" ? "Daftar Harga Indikatif" : "Indicative Price List"}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {lang === "id"
            ? "Harga Mobil Geely Terbaru di Bogor & Jabodetabek"
            : "Latest Geely Prices in Bogor & Jabodetabek"}
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {lang === "id"
            ? `Seluruh lineup Geely Indonesia dalam satu tabel — dari hatchback listrik EX2 mulai ${formatJuta(priceMin)} sampai SUV flagship EX5 hingga ${formatJuta(priceMax)}. Semua angka indikatif per September 2026 dan selalu bisa dikonfirmasi via WhatsApp untuk penawaran terbaru.`
            : `The entire Geely Indonesia lineup in one table — from the EX2 electric hatchback from ${formatJuta(priceMin)} to the flagship EX5 SUV up to ${formatJuta(priceMax)}. All figures are indicative as of September 2026 and always confirmable via WhatsApp for the latest offer.`}
        </p>
      </header>

      {/* Tabel harga per model */}
      <div className="mt-10 space-y-6">
        {MODELS.map((m) => (
          <section
            key={m.id}
            className="overflow-hidden rounded-2xl border bg-card"
            aria-label={m.name}
          >
            <div className="grid gap-0 sm:grid-cols-[260px_1fr]">
              <div className="relative">
                <Image
                  src={m.image}
                  alt={m.name}
                  width={520}
                  height={320}
                  className="h-44 w-full object-cover sm:h-full"
                />
                {m.illustrative && (
                  <span className="absolute left-3 top-3 rounded-full border bg-background/90 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
                    {lang === "id" ? "Ilustrasi" : "Illustration"}
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-bold">{m.name}</h2>
                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                      {POWERTRAIN_LABEL[m.powertrain][lang]}
                    </p>
                  </div>
                  <Link
                    href={`/model/${m.id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    {lang === "id" ? "Detail model" : "Model details"}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>

                {/* Varian & harga */}
                <table className="mt-4 w-full text-sm">
                  <caption className="sr-only">
                    {`${m.name} — ${lang === "id" ? "harga per varian" : "price per variant"}`}
                  </caption>
                  <thead>
                    <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th scope="col" className="pb-2 font-medium">
                        {lang === "id" ? "Varian" : "Variant"}
                      </th>
                      <th scope="col" className="pb-2 text-right font-medium">
                        {lang === "id" ? "Harga indikatif" : "Indicative price"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {m.variants.map((v) => (
                      <tr key={v.label} className="border-b last:border-0">
                        <th scope="row" className="py-2.5 text-left font-semibold">
                          {m.name.includes(v.label) ? m.name : `${m.name} ${v.label}`}
                        </th>
                        <td className="py-2.5 text-right font-bold text-primary">
                          {formatIDR(v.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="mt-3 text-xs text-muted-foreground">
                  {m.specs.map((s) => s[lang]).join(" • ")}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <ModelCompareTable />

      <p className="mt-6 rounded-xl border bg-card p-4 text-xs leading-relaxed text-muted-foreground">
        {PRICE_DISCLAIMER[lang]}
      </p>

      {/* CTA */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105"
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          {lang === "id" ? "Minta penawaran terbaru" : "Request the latest offer"}
        </a>
        <Link
          href="/#simulasi"
          className="inline-flex h-12 items-center gap-2 rounded-full border bg-card px-6 text-sm font-semibold transition-colors hover:bg-accent"
        >
          <Calculator className="size-4 text-primary" aria-hidden="true" />
          {t.nav.simulator}
        </Link>
      </div>
    </article>
  );
}
