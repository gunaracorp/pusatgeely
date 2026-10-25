"use client";

import { Clock, MapPin, MessageCircle } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { AREAS, BUSINESS, waLink } from "@/lib/site";

export function CoverageSection() {
  const { t, lang } = useLang();

  return (
    <section id="wilayah" aria-label="Area layanan" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.coverage.eyebrow}
          title={t.coverage.title}
          subtitle={t.coverage.subtitle}
        />

        <Reveal className="mt-12">
          <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2.5" aria-label="Daftar area layanan">
            {AREAS.map((area) => (
              <li
                key={area}
                className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:border-primary/50 hover:bg-accent"
              >
                <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-between gap-5 rounded-2xl border bg-card p-6 sm:flex-row sm:p-7">
            <div className="flex items-center gap-4">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Clock className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">{t.coverage.hoursLabel}</p>
                <p className="text-sm text-muted-foreground">{BUSINESS.hours[lang]}</p>
              </div>
            </div>
            <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center">
              <p className="max-w-xs text-center text-xs leading-relaxed text-muted-foreground sm:text-left">
                {t.coverage.notListed}
              </p>
              <Button asChild variant="outline" className="h-10 shrink-0 rounded-full font-semibold">
                <a
                  href={waLink("Halo Pusat Geely, apakah area saya termasuk jangkauan layanan?")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
