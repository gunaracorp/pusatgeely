"use client";

import { useMemo, useState } from "react";
import { Calculator, MessageCircle } from "lucide-react";
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
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  MODELS,
  formatIDR,
  waLink,
} from "@/lib/site";

const TENORS = [12, 24, 36, 48, 60, 72];

export function FinancingSimulator() {
  const { t, lang } = useLang();

  const [modelId, setModelId] = useState<string>(MODELS[0].id);
  const [dpPercent, setDpPercent] = useState(20);
  const [tenor, setTenor] = useState(36);
  const [ratePercent, setRatePercent] = useState(6);

  const model = useMemo(
    () => MODELS.find((m) => m.id === modelId) ?? MODELS[0],
    [modelId]
  );

  const result = useMemo(() => {
    const price = model.priceFrom;
    const dp = Math.round((price * dpPercent) / 100);
    const principal = price - dp;
    const totalInterest = principal * (ratePercent / 100) * (tenor / 12);
    const monthly = Math.round((principal + totalInterest) / tenor);
    const total = dp + monthly * tenor;
    return { price, dp, monthly, total };
  }, [model, dpPercent, tenor, ratePercent]);

  const waMessage = t.simulator.waMessage(
    model.name,
    formatIDR(result.dp),
    tenor,
    ratePercent.toFixed(1).replace(".", ","),
    formatIDR(result.monthly)
  );

  return (
    <section
      id="simulasi"
      aria-label="Simulasi kredit"
      className="py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.simulator.eyebrow}
          title={t.simulator.title}
          subtitle={t.simulator.subtitle}
        />

        <Reveal className="mt-12">
          <Card className="mx-auto max-w-5xl overflow-hidden border shadow-xl shadow-primary/5">
            <CardContent className="grid gap-8 p-5 sm:p-8 lg:grid-cols-5 lg:gap-10">
              {/* Inputs */}
              <div className="space-y-7 lg:col-span-3">
                {/* Model */}
                <div className="space-y-2">
                  <Label htmlFor="sim-model">{t.simulator.model}</Label>
                  <Select value={modelId} onValueChange={setModelId}>
                    <SelectTrigger id="sim-model" className="h-11 w-full" aria-label={t.simulator.model}>
                      <SelectValue placeholder={t.testDrive.fields.modelPh} />
                    </SelectTrigger>
                    <SelectContent>
                      {MODELS.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name} — {formatIDR(m.priceFrom)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* DP slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sim-dp">{t.simulator.dpPercent}</Label>
                    <span className="font-display text-lg font-bold text-primary">
                      {dpPercent}%
                    </span>
                  </div>
                  <Slider
                    id="sim-dp"
                    value={[dpPercent]}
                    onValueChange={([v]) => setDpPercent(v)}
                    min={10}
                    max={50}
                    step={5}
                    aria-label={t.simulator.dpPercent}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground" aria-hidden="true">
                    <span>10%</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Tenor */}
                <div className="space-y-2">
                  <Label>{t.simulator.tenor}</Label>
                  <div
                    role="radiogroup"
                    aria-label={t.simulator.tenor}
                    className="grid grid-cols-3 gap-2 sm:grid-cols-6"
                  >
                    {TENORS.map((n) => (
                      <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={tenor === n}
                        onClick={() => setTenor(n)}
                        className={`rounded-full border px-2 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                          tenor === n
                            ? "border-primary bg-primary text-primary-foreground"
                            : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sim-rate">{t.simulator.rate}</Label>
                    <span className="font-display text-lg font-bold text-primary">
                      {ratePercent.toFixed(1).replace(".", ",")}%
                    </span>
                  </div>
                  <Slider
                    id="sim-rate"
                    value={[ratePercent]}
                    onValueChange={([v]) => setRatePercent(v)}
                    min={3}
                    max={12}
                    step={0.5}
                    aria-label={t.simulator.rate}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground" aria-hidden="true">
                    <span>3%</span>
                    <span>12%</span>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="flex flex-col rounded-2xl bg-secondary/60 p-5 sm:p-6 lg:col-span-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Calculator className="size-4 text-primary" aria-hidden="true" />
                  {t.simulator.installment}
                </div>
                <p
                  className="mt-2 font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl"
                  aria-live="polite"
                >
                  {formatIDR(result.monthly)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {lang === "id" ? "tenor " : "tenor "}{tenor} {lang === "id" ? "bulan" : "months"} • {ratePercent.toFixed(1).replace(".", ",")}% flat
                </p>

                <dl className="mt-6 space-y-3 border-t pt-5 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">{t.simulator.price}</dt>
                    <dd className="font-semibold">{formatIDR(result.price)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">
                      {t.simulator.dpAmount} ({dpPercent}%)
                    </dt>
                    <dd className="font-semibold">{formatIDR(result.dp)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">{t.simulator.total}</dt>
                    <dd className="font-semibold">{formatIDR(result.total)}</dd>
                  </div>
                </dl>

                <Button
                  asChild
                  className="mt-auto h-11 w-full rounded-full pt-0 text-sm font-semibold"
                >
                  <a
                    href={waLink(waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {t.simulator.cta}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
            {t.simulator.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
