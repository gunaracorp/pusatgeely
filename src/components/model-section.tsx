"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BatteryCharging,
  Camera,
  Fuel,
  Leaf,
  Palette,
  Tag,
} from "lucide-react";
import { useLang } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { useLeadIntent } from "@/store/lead-intent";
import {
  MODELS,
  POWERTRAIN_LABEL,
  PRICE_DISCLAIMER,
  formatIDR,
  formatJuta,
  waLink,
  type CarModel,
  type Powertrain,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const POWERTRAIN_ICON: Record<Powertrain, React.ComponentType<{ className?: string }>> = {
  ev: BatteryCharging,
  phev: Leaf,
  ice: Fuel,
};

function ModelCard({ model, index }: { model: CarModel; index: number }) {
  const { t, lang } = useLang();
  const setIntentModel = useLeadIntent((s) => s.setIntentModel);
  const PowerIcon = POWERTRAIN_ICON[model.powertrain];

  const colors = model.colors ?? [];
  const [colorIdx, setColorIdx] = useState(0);
  const activeColor = colors[colorIdx] ?? null;
  const activeImage = activeColor?.image ?? model.image;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 focus-within:outline-2 focus-within:outline-ring">
        {/* Visual */}
        <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
          <Image
            key={activeImage}
            src={activeImage}
            alt={`${model.name}${activeColor ? ` — ${activeColor.label[lang]}` : ""}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="animate-in fade-in object-cover duration-500 transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold backdrop-blur">
              <PowerIcon className="size-3.5 text-primary" aria-hidden="true" />
              {POWERTRAIN_LABEL[model.powertrain][lang]}
            </span>
            {model.badge ? (
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                {model.badge[lang]}
              </span>
            ) : null}
          </div>

          {/* Authenticity badge — real photo vs illustration (anti-fabrication) */}
          <div className="absolute right-4 top-4">
            {model.illustrative ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                <Palette className="size-3.5" aria-hidden="true" />
                {t.models.illustrative}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur">
                <Camera className="size-3.5" aria-hidden="true" />
                {t.models.realPhoto}
              </span>
            )}
          </div>

          {/* Color switcher — real unit colors */}
          {colors.length > 0 ? (
            <div className="absolute inset-x-4 bottom-3 flex items-center gap-2 rounded-full bg-background/75 py-1.5 pl-3 pr-3.5 backdrop-blur">
              <span className="text-[11px] font-medium text-muted-foreground">
                {t.models.colorLabel}
              </span>
              <div className="flex items-center gap-1.5" role="group" aria-label={t.models.colorLabel}>
                {colors.map((c, i) => (
                  <button
                    key={c.image}
                    type="button"
                    aria-label={c.label[lang]}
                    aria-pressed={i === colorIdx}
                    onClick={() => setColorIdx(i)}
                    className={cn(
                      "size-4 rounded-full border border-border/50 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      i === colorIdx && "ring-2 ring-primary ring-offset-1 ring-offset-background",
                    )}
                    style={{ backgroundColor: c.swatch }}
                  />
                ))}
              </div>
              <span className="ml-auto truncate text-xs font-semibold">
                {activeColor?.label[lang]}
              </span>
            </div>
          ) : null}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-xl font-bold tracking-tight">
            {model.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {model.blurb[lang]}
          </p>

          {/* Spec chips */}
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Spesifikasi utama">
            {model.specs.map((spec) => (
              <li
                key={spec.id}
                className="rounded-full border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-secondary-foreground sm:text-xs"
              >
                {spec[lang]}
              </li>
            ))}
          </ul>

          {/* Price + variants */}
          <div className="mt-5 border-t pt-4">
            <p className="flex items-baseline gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                {t.models.priceFrom}
              </span>
              <span className="font-display text-2xl font-bold text-primary">
                {formatJuta(model.priceFrom)}
              </span>
              <span className="text-xs text-muted-foreground">*OTR</span>
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Tag className="size-3" aria-hidden="true" />
              {t.models.variants}:{" "}
              {model.variants.map((v, i) => (
                <span key={v.label} className="font-medium text-foreground/80">
                  {v.label} {formatIDR(v.price)}
                  {i < model.variants.length - 1 ? " • " : ""}
                </span>
              ))}
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-auto pt-5">
            <Link
              href={`/model/${model.id}`}
              className="group/d mb-2 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              {t.models.detailCta}
              <ArrowRight className="size-4 transition-transform group-hover/d:translate-x-0.5" aria-hidden="true" />
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="h-10 rounded-full text-sm font-semibold"
                onClick={() => {
                  setIntentModel(model.id);
                  document.getElementById("test-drive")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t.models.ctaTestDrive}
              </Button>
              <Button
                asChild
                className="h-10 rounded-full text-sm font-semibold"
              >
                <a
                  href={waLink(t.models.waAskPrice(model.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="size-4" aria-hidden="true" />
                  {t.models.ctaAskPrice}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function ModelSection() {
  const { t } = useLang();
  return (
    <section id="model" aria-label="Pilihan model Geely" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.models.eyebrow}
          title={t.models.title}
          subtitle={t.models.subtitle}
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {MODELS.map((model, i) => (
            <ModelCard key={model.id} model={model} index={i} />
          ))}
        </div>
        <Reveal delay={0.1} className="mt-8">
          <p className="text-center text-xs text-muted-foreground">{t.models.disclaimer}</p>
          <p className="mt-4 text-center">
            <a
              href="#simulasi"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:opacity-80"
            >
              {t.simulator.title}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
