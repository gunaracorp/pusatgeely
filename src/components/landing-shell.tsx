"use client";

import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import { FinancingSimulator } from "@/components/financing-simulator";
import { PromoSection } from "@/components/promo-section";
import { TestDriveSection } from "@/components/test-drive-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { LandingPage } from "@/lib/landing-pages";
import {
  MODELS,
  PRICE_DISCLAIMER,
  INDEPENDENCE_DISCLAIMER,
  formatIDR,
  waLink,
} from "@/lib/site";
import { MessageCircleQuestion } from "lucide-react";

/**
 * Merender halaman landing SEO dari data di landing-pages.ts.
 * Seluruh teks bilingual mengikuti konteks bahasa aktif.
 */
export function LandingShell({ page }: { page: LandingPage }) {
  const { lang, t } = useLang();
  const L = <T extends { id: string; en: string }>(v: T) => v[lang];
  const model = page.modelId ? MODELS.find((m) => m.id === page.modelId) : undefined;

  const waHref = waLink(
    lang === "id"
      ? `Halo Pusat Geely, saya baru membaca halaman "${page.h1.id}". Mohon info harga, promo, dan langkah selanjutnya.`
      : `Hello Pusat Geely, I just read the "${page.h1.en}" page. Please share prices, promos, and next steps.`
  );

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: L(page.h1) }]} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Pusat Geely · Bogor & Jabodetabek
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {L(page.h1)}
        </h1>
        <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          {page.lead.map((p, i) => (
            <p key={i}>{L(p)}</p>
          ))}
        </div>
      </header>

      {/* ── Chips fakta cepat ────────────────────────────────── */}
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Ringkasan cepat">
        {page.chips.map((c, i) => (
          <li
            key={i}
            className="inline-flex items-center rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <Check className="mr-1.5 size-3.5 text-primary" aria-hidden="true" />
            {L(c)}
          </li>
        ))}
      </ul>

      {/* ── Tabel harga varian (halaman model) ───────────────── */}
      {model && (
        <section
          aria-label={lang === "id" ? `Harga varian ${model.name}` : `${model.name} variant prices`}
          className="mt-10 overflow-hidden rounded-2xl border bg-card"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
            <div>
              <h2 className="font-display text-xl font-bold">
                {lang === "id" ? `Harga ${model.name}` : `${model.name} Prices`}
              </h2>
              <p className="text-xs uppercase tracking-wide text-primary">
                {lang === "id" ? "Indikatif OTR per September 2026" : "Indicative OTR as of September 2026"}
              </p>
            </div>
            <Link
              href={`/model/${model.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary"
            >
              {lang === "id" ? "Spesifikasi lengkap" : "Full specifications"}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <table className="w-full text-sm">
            <caption className="sr-only">
              {lang === "id" ? "Harga per varian" : "Price per variant"}
            </caption>
            <tbody>
              {model.variants.map((v) => (
                <tr key={v.label} className="border-b last:border-b-0">
                  <th scope="row" className="px-5 py-3.5 text-left font-medium">
                    {model.name.includes(v.label) ? model.name : `${model.name} ${v.label}`}
                  </th>
                  <td className="px-5 py-3.5 text-right font-display font-bold text-primary">
                    {formatIDR(v.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t bg-muted/40 px-5 py-3 text-[11px] leading-relaxed text-muted-foreground">
            {PRICE_DISCLAIMER[lang]}
          </p>
        </section>
      )}

      {/* ── Bagian konten ────────────────────────────────────── */}
      <div className="mt-12 space-y-10">
        {page.sections.map((s, si) => (
          <Reveal key={si} y={14}>
            <section aria-label={L(s.heading)}>
              <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                {L(s.heading)}
              </h2>
              <div className="mt-3 max-w-3xl space-y-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                {s.paragraphs.map((p, pi) => (
                  <p key={pi}>{L(p)}</p>
                ))}
              </div>
              {s.bullets && (
                <ul className="mt-4 grid max-w-3xl gap-2">
                  {s.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{L(b)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </Reveal>
        ))}
      </div>

      {/* ── Sisipan interaktif ───────────────────────────────── */}
      {page.embedSimulator && (
        <div className="mt-14" id="simulasi">
          <FinancingSimulator />
        </div>
      )}
      {page.embedPromos && (
        <div className="mt-14" id="promo-program">
          <PromoSection />
        </div>
      )}
      {page.embedTestDrive && (
        <div className="mt-14 -mx-4 sm:mx-0" id="test-drive">
          <TestDriveSection />
        </div>
      )}

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section aria-label="Pertanyaan umum" className="mt-14">
        <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          {lang === "id" ? "Pertanyaan yang sering diajukan" : "Frequently asked questions"}
        </h2>
        <div className="mt-5 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {page.faq.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-display text-base font-semibold sm:text-lg [&>svg]:text-primary">
                  <span className="flex items-start gap-3">
                    <MessageCircleQuestion className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    {L(item.q)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {L(item.a)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Tautan terkait ───────────────────────────────────── */}
      <section aria-label="Halaman terkait" className="mt-14">
        <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          {lang === "id" ? "Lanjutkan membaca" : "Keep reading"}
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {page.related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group flex items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
            >
              <span>{L(r.label)}</span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA WhatsApp ─────────────────────────────────────── */}
      <section className="mt-14 overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          {lang === "id" ? "Siap melangkah lebih jauh?" : "Ready for the next step?"}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {lang === "id"
            ? "Tanyakan harga terbaru, promo yang sedang berlaku, atau atur test drive — langsung via WhatsApp, setiap hari 08.00–20.00 WIB."
            : "Ask for the latest prices, active promos, or arrange a test drive — straight via WhatsApp, daily 08:00–20:00 WIB."}
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          {lang === "id" ? "Chat WhatsApp Sekarang" : "Chat on WhatsApp Now"}
        </a>
      </section>

      {/* ── Disclaimer ───────────────────────────────────────── */}
      <div className="mt-10 max-w-3xl space-y-2 rounded-xl border bg-muted/30 p-4 text-[11px] leading-relaxed text-muted-foreground">
        <p>{page.modelId ? PRICE_DISCLAIMER[lang] : ""}</p>
        <p>{INDEPENDENCE_DISCLAIMER[lang]}</p>
      </div>
    </article>
  );
}
