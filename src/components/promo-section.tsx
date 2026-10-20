"use client";

import { useMemo, useState } from "react";
import { Check, Download, MessageCircle, Sparkles } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROMO_DISCLAIMER, PROMO_MODELS, PROMO_PROGRAMS } from "@/lib/promos";
import { formatIDR, waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PromoSection() {
  const { t, lang } = useLang();
  const [programId, setProgramId] = useState<string>(PROMO_PROGRAMS[0].id);
  const [subId, setSubId] = useState<string>(PROMO_PROGRAMS[0].subPrograms[0].id);
  const [modelKey, setModelKey] = useState<string>(PROMO_PROGRAMS[0].models[0]);

  const program = useMemo(
    () => PROMO_PROGRAMS.find((p) => p.id === programId) ?? PROMO_PROGRAMS[0],
    [programId]
  );

  const subProgram = useMemo(
    () =>
      program.subPrograms.find((s) => s.id === subId) ?? program.subPrograms[0],
    [program, subId]
  );

  const rows = useMemo(() => subProgram.rows[modelKey] ?? [], [subProgram, modelKey]);

  const model = PROMO_MODELS.find((m) => m.key === modelKey);
  const modelName = model ? `Geely ${model.label}` : modelKey;

  const waMessage = t.promo.waMessage(
    program.finance,
    lang === "id" ? program.program.id : program.program.en,
    modelName,
    rows[0]?.tenor ?? 0,
    rows[0] ? formatIDR(rows[0].installment) : "-",
    rows[0] ? formatIDR(rows[0].firstPayment) : "-"
  );

  const pickProgram = (id: string) => {
    const next = PROMO_PROGRAMS.find((p) => p.id === id);
    if (!next) return;
    setProgramId(id);
    setSubId(next.subPrograms[0].id);
    setModelKey(next.models[0]);
  };

  return (
    <section
      id="promo"
      aria-label="Promo dan paket kredit"
      className="bg-secondary/40 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.promo.eyebrow}
          title={t.promo.title}
          subtitle={t.promo.subtitle}
        />

        {/* Finance selector */}
        <Reveal className="mt-10">
          <Label className="mb-3 block text-center text-xs uppercase tracking-wider text-muted-foreground">
            {t.promo.financeLabel}
          </Label>
          <div
            role="tablist"
            aria-label={t.promo.financeLabel}
            className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5"
          >
            {PROMO_PROGRAMS.map((p) => {
              const active = p.id === program.id;
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => pickProgram(p.id)}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-ring",
                    active
                      ? "border-transparent bg-background shadow-lg shadow-primary/10 ring-2"
                      : "border-border/60 bg-background/60 hover:bg-background hover:shadow-md"
                  )}
                  style={active ? { boxShadow: `0 8px 30px -12px ${p.accent}66` } : undefined}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ backgroundColor: p.accent }}
                  />
                  <span className="block text-sm font-bold leading-tight">
                    {p.finance}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                    {lang === "id" ? p.program.id : p.program.en}
                  </span>
                  <span
                    className="mt-2.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                    style={{ backgroundColor: p.accent }}
                  >
                    {lang === "id" ? p.badge.id : p.badge.en}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Program detail */}
        <Reveal delay={0.08} className="mt-6">
          <Card className="overflow-hidden border shadow-xl shadow-primary/5">
            {/* Accent header */}
            <div
              className="px-5 py-4 sm:px-8"
              style={{ backgroundColor: program.accent }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-lg font-bold text-white sm:text-xl">
                    {program.finance}
                  </p>
                  <p className="text-sm text-white/85">
                    {lang === "id" ? program.program.id : program.program.en}
                    {program.period ? ` • ${lang === "id" ? program.period.id : program.period.en}` : ""}
                  </p>
                </div>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {lang === "id" ? program.badge.id : program.badge.en}
                </span>
              </div>
            </div>

            <CardContent className="grid gap-8 p-5 sm:p-8 lg:grid-cols-5 lg:gap-10">
              {/* Left: info */}
              <div className="space-y-6 lg:col-span-2">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                    <Sparkles className="size-4 text-primary" aria-hidden="true" />
                    {t.promo.highlightsTitle}
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {program.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>{lang === "id" ? h.id : h.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {program.requirements && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      {t.promo.requirementsTitle}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {program.requirements.map((r, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                          <span
                            aria-hidden="true"
                            className="mt-[7px] size-1.5 shrink-0 rounded-full bg-muted-foreground/50"
                          />
                          <span>{lang === "id" ? r.id : r.en}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {program.note && (
                  <p className="rounded-xl bg-secondary/70 p-3 text-xs leading-relaxed text-muted-foreground">
                    {lang === "id" ? program.note.id : program.note.en}
                  </p>
                )}

                <div className="flex flex-col gap-2.5">
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 w-full rounded-full text-sm font-semibold"
                  >
                    <a href={program.pdf} target="_blank" rel="noopener noreferrer" download>
                      <Download className="size-4" aria-hidden="true" />
                      {t.promo.downloadPdf}
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="h-11 w-full rounded-full text-sm font-semibold"
                    disabled={rows.length === 0}
                  >
                    <a
                      href={rows.length > 0 ? waLink(waMessage) : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-disabled={rows.length === 0}
                    >
                      <MessageCircle className="size-4" aria-hidden="true" />
                      {t.promo.askThis}
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right: rates table */}
              <div className="space-y-5 lg:col-span-3">
                {/* Sub-program pills (IMFI has 4) */}
                {program.subPrograms.length > 1 && (
                  <div className="space-y-2">
                    <Label>{t.promo.subProgramLabel}</Label>
                    <div
                      role="radiogroup"
                      aria-label={t.promo.subProgramLabel}
                      className="flex flex-wrap gap-2"
                    >
                      {program.subPrograms.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          role="radio"
                          aria-checked={s.id === subProgram.id}
                          onClick={() => setSubId(s.id)}
                          className={cn(
                            "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm",
                            s.id === subProgram.id
                              ? "border-primary bg-primary text-primary-foreground"
                              : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                          )}
                        >
                          {lang === "id" ? s.name.id : s.name.en}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Model select */}
                <div className="space-y-2">
                  <Label htmlFor="promo-model">{t.promo.modelLabel}</Label>
                  <Select value={modelKey} onValueChange={setModelKey}>
                    <SelectTrigger id="promo-model" className="h-11 w-full" aria-label={t.promo.modelLabel}>
                      <SelectValue placeholder={t.promo.modelLabel} />
                    </SelectTrigger>
                    <SelectContent>
                      {PROMO_MODELS.filter((m) => program.models.includes(m.key)).map(
                        (m) => (
                          <SelectItem key={m.key} value={m.key}>
                            Geely {m.label} — {formatIDR(m.price)}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rates table */}
                <div className="overflow-hidden rounded-2xl border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr
                        className="text-left text-xs uppercase tracking-wide text-white"
                        style={{ backgroundColor: program.accent }}
                      >
                        <th scope="col" className="px-4 py-3 font-semibold">
                          {t.promo.tenorShort}
                        </th>
                        <th scope="col" className="px-4 py-3 font-semibold">
                          {t.promo.installment}
                        </th>
                        <th scope="col" className="px-4 py-3 text-right font-semibold">
                          {lang === "id"
                            ? subProgram.firstPaymentLabel.id
                            : subProgram.firstPaymentLabel.en}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r, i) => (
                        <tr
                          key={`${r.tenor}-${i}`}
                          className={cn(
                            "border-t transition-colors hover:bg-accent/50",
                            i % 2 === 1 && "bg-secondary/40"
                          )}
                        >
                          <td className="px-4 py-3 font-bold tabular-nums">
                            {r.tenor}
                            {program.id === "bri" ? "" : " bln"}
                          </td>
                          <td className="px-4 py-3 font-semibold tabular-nums text-primary">
                            {formatIDR(r.installment)}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                            {formatIDR(r.firstPayment)}
                          </td>
                        </tr>
                      ))}
                      {rows.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">
                            —
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {program.id === "bri" && (
                  <p className="rounded-xl bg-primary/10 p-3 text-xs font-medium leading-relaxed text-primary">
                    {t.promo.yearlyNote}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-4xl text-center text-xs leading-relaxed text-muted-foreground">
            {lang === "id" ? PROMO_DISCLAIMER.id : PROMO_DISCLAIMER.en}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
