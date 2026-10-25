"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight, MessageCircle } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { WhatsAppIcon } from "@/components/site-header";
import { MODELS, POWERTRAIN_LABEL, PRICE_DISCLAIMER, INDEPENDENCE_DISCLAIMER, formatIDR, type CarModel } from "@/lib/site";
import type { ModelDetail as ModelDetailType } from "@/lib/model-details";
import { comparesForModel } from "@/lib/competitors";
import { EvCostCalculator } from "@/components/ev-cost-calculator";
import { Swords } from "lucide-react";
import { cn } from "@/lib/utils";

/** Kartu model lain (internal linking bawah halaman). */
function RelatedCard({ model }: { model: CarModel }) {
  const { lang } = useLang();
  return (
    <Link
      href={`/model/${model.id}`}
      className="group flex items-center gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/50"
    >
      <Image
        src={model.image}
        alt={model.name}
        width={96}
        height={64}
        className="h-14 w-20 rounded-lg object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{model.name}</p>
        <p className="text-xs text-muted-foreground">
          {POWERTRAIN_LABEL[model.powertrain][lang]} • mulai {formatIDR(model.priceFrom)}
        </p>
      </div>
      <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}

export function ModelDetail({
  model,
  detail,
  waHref,
}: {
  model: CarModel;
  detail: ModelDetailType;
  waHref: string;
}) {
  const { lang, t } = useLang();
  const L = <T extends { id: string; en: string }>(v: T) => v[lang];
  const PL = (v: { id: string; en: string }[]) => v[lang];

  const others = MODELS.filter((m) => m.id !== model.id);
  const activeColor = model.colors?.[0];

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: t.nav.models, href: "/#model" },
          { label: model.name },
        ]}
      />

      {/* Hero */}
      <header className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="relative overflow-hidden rounded-2xl border bg-card">
          <Image
            src={activeColor?.image ?? model.image}
            alt={`${model.name} — ${activeColor ? L(activeColor.label) : ""}`}
            width={1200}
            height={800}
            priority
            className="aspect-[3/2] w-full object-cover"
          />
          {model.illustrative && (
            <span className="absolute left-3 top-3 rounded-full border bg-background/90 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
              {lang === "id" ? "Ilustrasi" : "Illustration"}
            </span>
          )}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {POWERTRAIN_LABEL[model.powertrain][lang]}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {model.name}
          </h1>
          <p className="mt-2 text-base text-muted-foreground">{L(detail.tagline)}</p>

          <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-sm text-muted-foreground">
              {lang === "id" ? "Harga mulai" : "Price from"}
            </span>
            <span className="font-display text-3xl font-bold text-primary">
              {formatIDR(model.priceFrom)}
            </span>
          </div>

          {/* Varian */}
          <div className="mt-4 flex flex-wrap gap-2">
            {model.variants.map((v) => (
              <span
                key={v.label}
                className="rounded-full border bg-card px-4 py-1.5 text-sm"
              >
                <strong className="font-semibold">{v.label}</strong>{" "}
                <span className="text-muted-foreground">{formatIDR(v.price)}</span>
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {lang === "id"
                ? `Tanya harga ${model.name}`
                : `Ask about the ${model.name}`}
            </a>
            <Link
              href="/#test-drive"
              className="inline-flex h-11 items-center rounded-lg border bg-card px-5 text-sm font-semibold transition-colors hover:bg-accent"
            >
              {t.nav.testDrive}
            </Link>
          </div>

          {/* Fit-for */}
          <p className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-3 text-sm leading-relaxed">
            {L(detail.fitFor)}
          </p>
        </div>
      </header>

      {/* Sekilas */}
      <section className="mt-14" aria-labelledby="overview-h">
        <h2 id="overview-h" className="font-display text-2xl font-bold tracking-tight">
          {lang === "id" ? "Sekilas" : "Overview"}
        </h2>
        <div className="mt-4 grid gap-4 leading-relaxed text-muted-foreground lg:grid-cols-3">
          {PL(detail.overview).map((para, i) => (
            <p key={i} className={cn(i === 0 && "lg:col-span-2 text-foreground/90")}>
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Spesifikasi */}
      <section className="mt-12 grid gap-8 lg:grid-cols-2" aria-labelledby="specs-h">
        <div>
          <h2 id="specs-h" className="font-display text-2xl font-bold tracking-tight">
            {lang === "id" ? "Spesifikasi Kunci" : "Key Specifications"}
          </h2>
          <dl className="mt-4 divide-y rounded-xl border bg-card">
            {detail.specs.map((row, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 px-4 py-3 text-sm"
              >
                <dt className="shrink-0 text-muted-foreground">{L(row.label)}</dt>
                <dd className="text-right font-semibold">{L(row.value)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {lang === "id"
              ? "*Spesifikasi berdasarkan sumber publik resmi, per September 2026. Verifikasi unit terbaru saat kunjungan/konsultasi."
              : "*Specifications based on official public sources, as of September 2026. Verify the latest unit during your visit/consultation."}
          </p>
        </div>

        {/* Keunggulan */}
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">
            {lang === "id" ? "Kenapa Model Ini" : "Why This Model"}
          </h2>
          <ul className="mt-4 space-y-3">
            {detail.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                {L(h)}
              </li>
            ))}
          </ul>

          {/* Warna (jika ada foto asli) */}
          {model.colors && (
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                {lang === "id" ? "Warna tersedia (foto unit asli)" : "Available colors (real unit photos)"}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {model.colors.map((c) => (
                  <span
                    key={c.swatch}
                    className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium"
                  >
                    <span
                      aria-hidden="true"
                      className="size-4 rounded-full border border-border"
                      style={{ backgroundColor: c.swatch }}
                    />
                    {L(c.label)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Kalkulator hemat — khusus model listrik */}
      {model.powertrain === "ev" && (
        <EvCostCalculator
          modelName={model.name}
          kwhPer100={model.id === "ex5" ? 15 : 11}
        />
      )}

      {/* FAQ model */}
      <section className="mt-12" aria-labelledby="faq-h">
        <h2 id="faq-h" className="font-display text-2xl font-bold tracking-tight">
          {lang === "id" ? `Pertanyaan Umum ${model.name}` : `${model.name} FAQ`}
        </h2>
        <div className="mt-4 space-y-2.5">
          {detail.faq.map((f, i) => (
            <details
              key={i}
              className="group rounded-xl border bg-card px-4 py-3 open:border-primary/40"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                {L(f.q)}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {L(f.a)}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Model lain */}
      <section className="mt-12" aria-labelledby="other-h">
        <h2 id="other-h" className="font-display text-2xl font-bold tracking-tight">
          {lang === "id" ? "Jelajahi Model Lain" : "Explore Other Models"}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {others.map((m) => (
            <RelatedCard key={m.id} model={m} />
          ))}
        </div>
      </section>

      {/* Bandingkan dengan pesaing */}
      {comparesForModel(model.id).length > 0 && (
        <section className="mt-12" aria-labelledby="vs-h">
          <h2 id="vs-h" className="inline-flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
            <Swords className="size-5 text-primary" aria-hidden="true" />
            {lang === "id" ? "Bandingkan dengan Pesaing" : "Compare with Rivals"}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {comparesForModel(model.id).map((c) => (
              <Link
                key={c.slug}
                href={`/vs/${c.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                {model.name} <span className="font-black text-muted-foreground">vs</span> {c.rivalName}
                <ChevronRight
                  className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <footer className="mt-12 space-y-3 rounded-2xl border bg-card p-5 text-xs leading-relaxed text-muted-foreground">
        <p>{INDEPENDENCE_DISCLAIMER[lang]}</p>
        <p>{PRICE_DISCLAIMER[lang]}</p>
      </footer>

      {/* CTA WhatsApp mengambang di ujung */}
      <div className="mt-8 flex justify-center">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105"
        >
          <WhatsAppIcon className="size-5" aria-hidden="true" />
          {t.header.cta}
        </a>
      </div>
    </article>
  );
}
