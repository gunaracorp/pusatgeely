"use client";

import Image from "next/image";
import {
  BadgeDollarSign,
  CalendarCheck,
  FileCheck2,
  KeyRound,
  RefreshCcw,
  Wrench,
} from "lucide-react";
import { useLang } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const ICONS = [
  CalendarCheck,
  BadgeDollarSign,
  FileCheck2,
  RefreshCcw,
  KeyRound,
  Wrench,
];

export function ServicesSection() {
  const { t } = useLang();

  return (
    <section
      id="layanan"
      aria-label="Layanan Pusat Geely"
      className="border-y bg-secondary/40 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Services grid — 2x3 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {t.services.items.map((item, i) => {
              const Icon = ICONS[i] ?? Wrench;
              return (
                <Reveal key={item.title} delay={i * 0.06} className="h-full">
                  <div className="group flex h-full flex-col rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 sm:p-6">
                    <span className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-base font-bold tracking-tight sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                    <span
                      className="ml-auto mt-3 font-display text-3xl font-bold text-primary/15"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Visual */}
          <Reveal delay={0.15} className="lg:col-span-2">
            <figure className="relative h-full min-h-72 overflow-hidden rounded-2xl border shadow-sm lg:min-h-full">
              <Image
                src="/images/galeri-6.webp"
                alt="Dokumentasi asli serah terima kunci & dokumen Geely antara konsultan dan pelanggan"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-lg font-bold leading-snug">
                  {t.testDrive.whyItems[0]}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t.testDrive.whyItems[2]}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
