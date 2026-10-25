"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MessageCircle, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLang } from "@/components/language-provider";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { WhatsAppIcon } from "@/components/site-header";
import { COMPARES, type Comparison } from "@/lib/competitors";
import { MODELS, formatIDR, waLink } from "@/lib/site";

export function ComparisonPage({ comparison }: { comparison: Comparison }) {
  const { lang } = useLang();
  const L = <T extends { id: string; en: string }>(v: T) => v[lang];
  const model = MODELS.find((m) => m.id === comparison.modelId);
  const others = COMPARES.filter((c) => c.slug !== comparison.slug);

  const waHref = waLink(
    lang === "id"
      ? `Halo Pusat Geely, saya sedang membandingkan ${comparison.geelyName} vs ${comparison.rivalName}. Mohon dibantu info penawaran terbaik & jadwal test drive.`
      : `Hello Pusat Geely, I'm comparing the ${comparison.geelyName} vs ${comparison.rivalName}. Please share your best offer & test-drive schedule.`,
  );

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: lang === "id" ? "Perbandingan" : "Comparisons", href: "/vs" },
          { label: `${comparison.geelyName} vs ${comparison.rivalName}` },
        ]}
      />

      {/* ── Header ── */}
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {lang === "id" ? "Perbandingan Model" : "Model Comparison"}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {L(comparison.h1)}
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {L(comparison.intro)}
        </p>
      </header>

      {/* ── Duel cards ── */}
      <div className="mt-10 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
        {/* Geely card */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-card shadow-sm">
          <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            Geely
          </span>
          {model && (
            <Image
              src={model.image}
              alt={comparison.geelyName}
              width={640}
              height={400}
              className="aspect-[8/5] w-full object-cover"
            />
          )}
          <div className="p-5">
            <h2 className="font-display text-xl font-bold">{comparison.geelyName}</h2>
            <p className="mt-1 text-2xl font-bold text-primary">
              {model ? formatIDR(model.priceFrom) : "—"}
              <span className="ml-1 text-xs font-medium text-muted-foreground">
                {lang === "id" ? "mulai (indikatif OTR)" : "from (indicative OTR)"}
              </span>
            </p>
            <Link
              href={model ? `/model/${model.id}` : "/"}
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              {lang === "id" ? "Detail lengkap model" : "Full model details"}
              <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* VS badge */}
        <div className="flex items-center justify-center">
          <span
            aria-hidden="true"
            className="inline-flex size-14 items-center justify-center rounded-full border-2 border-primary/60 bg-background font-display text-lg font-black tracking-tight text-primary shadow-lg"
          >
            VS
          </span>
        </div>

        {/* Rival card */}
        <div className="relative overflow-hidden rounded-2xl border bg-card shadow-sm">
          <span className="absolute left-3 top-3 z-10 rounded-full border bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground backdrop-blur">
            {lang === "id" ? "Pesaing" : "Rival"}
          </span>
          <div className="flex aspect-[8/5] w-full items-center justify-center bg-gradient-to-br from-accent to-secondary">
            <span className="font-display text-4xl font-black tracking-tight text-muted-foreground/50">
              {comparison.rivalName.split(" ").map((w) => w[0]).join("")}
            </span>
          </div>
          <div className="p-5">
            <h2 className="font-display text-xl font-bold">{comparison.rivalName}</h2>
            <p className="mt-1 text-2xl font-bold">
              {formatIDR(comparison.rivalPriceFrom)}
              <span className="ml-1 text-xs font-medium text-muted-foreground">
                {lang === "id" ? "mulai (indikatif OTR)" : "from (indicative OTR)"}
              </span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {comparison.rivalSpecs.map((s) => L(s)).join(" · ")}
            </p>
          </div>
        </div>
      </div>

      {/* ── Spec table ── */}
      <div className="mt-10 overflow-hidden rounded-2xl border">
        <table className="w-full text-sm">
          <caption className="sr-only">
            {L(comparison.h1)} — {lang === "id" ? "tabel spesifikasi" : "spec table"}
          </caption>
          <thead>
            <tr className="border-b bg-secondary/50 text-left">
              <th scope="col" className="px-4 py-3 font-semibold">
                {lang === "id" ? "Aspek" : "Aspect"}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-primary">
                {comparison.geelyName}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {comparison.rivalName}
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row, i) => (
              <tr key={i} className="border-b last:border-0">
                <th scope="row" className="px-4 py-3 text-left font-medium text-muted-foreground">
                  {L(row.label)}
                </th>
                <td className="bg-primary/5 px-4 py-3 font-semibold text-foreground">
                  {row.geely}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{row.rival}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {lang === "id"
          ? "*Angka indikatif berdasarkan riset multi-sumber publik per September 2026, dapat berubah sewaktu-waktu. Harga final & spesifikasi terbaru masing-masing merek dikonfirmasi saat konsultasi."
          : "*Indicative figures from multi-source public research as of September 2026, subject to change. Final prices & latest specs for each brand are confirmed during consultation."}
      </p>

      {/* ── Verdict ── */}
      <section className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6" aria-label="Verdict">
        <h2 className="font-display text-xl font-bold">
          {lang === "id" ? "Pendapat jujur kami" : "Our honest take"}
        </h2>
        <p className="mt-3 leading-relaxed text-foreground/90">{L(comparison.verdict)}</p>
      </section>

      {/* ── Edges ── */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6">
          <h3 className="font-display font-bold text-primary">{comparison.geelyName}</h3>
          <ul className="mt-3 space-y-2.5">
            {comparison.geelyEdges.map((e, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{L(e)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <h3 className="font-display font-bold">{comparison.rivalName}</h3>
          <ul className="mt-3 space-y-2.5">
            {comparison.rivalEdges.map((e, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="text-muted-foreground">{L(e)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border bg-card p-8 text-center">
        <h2 className="font-display text-2xl font-bold">
          {lang === "id" ? "Test drive keduanya sekaligus?" : "Test drive both at once?"}
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          {lang === "id"
            ? `Unit ${comparison.geelyName} bisa kami bawa ke lokasimu di Bogor & Jabodetabek — gratis, tanpa komitmen. Mau kami bantu siapkan data pembanding ${comparison.rivalName} juga saat konsultasi?`
            : `We can bring the ${comparison.geelyName} to your location in Bogor & Greater Jakarta — free, no commitment. Want us to prepare ${comparison.rivalName} comparison data for the consultation too?`}
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          {lang === "id" ? "Tanya via WhatsApp" : "Ask via WhatsApp"}
        </a>
      </div>

      {/* ── FAQ ── */}
      <section className="mt-12" aria-label={lang === "id" ? "Pertanyaan umum" : "FAQ"}>
        <h2 className="font-display text-2xl font-bold">
          {lang === "id" ? "Pertanyaan umum" : "Frequently asked"}
        </h2>
        <Accordion type="single" collapsible className="mt-5">
          {comparison.faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm font-semibold sm:text-base">
                {L(f.q)}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {L(f.a)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ── Other comparisons ── */}
      <nav
        aria-label={lang === "id" ? "Perbandingan lain" : "Other comparisons"}
        className="mt-12 border-t pt-6"
      >
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {lang === "id" ? "Perbandingan lainnya" : "More comparisons"}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {others.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/vs/${c.slug}`}
                className="inline-flex items-center rounded-full border bg-card px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {c.geelyName} vs {c.rivalName}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Independence disclaimer konsisten dengan seluruh situs */}
      <p className="mt-8 text-[11px] leading-relaxed text-muted-foreground">
        {lang === "id"
          ? "Pusat Geely adalah layanan konsultan penjualan independen — bukan bagian dari Geely maupun merek pesaing yang disebut. Semua nama merek adalah milik pemiliknya masing-masing."
          : "Pusat Geely is an independent sales-consulting service — not affiliated with Geely or the rival brands mentioned. All brand names belong to their respective owners."}
      </p>
    </article>
  );
}
