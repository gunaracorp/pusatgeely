"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, ChevronDown, MapPin, ShieldCheck, Zap } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { WhatsAppIcon } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/site";

export function SiteHero() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  const chips = [
    { icon: Zap, text: t.hero.chips[0] },
    { icon: ShieldCheck, text: t.hero.chips[1] },
    { icon: MapPin, text: t.hero.chips[2] },
  ];

  return (
    <section
      id="beranda"
      aria-label="Perkenalan Pusat Geely"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero.webp"
          alt="SUV premium melintasi jalan pegunungan berkabut di kawasan Bogor saat fajar"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/55 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 md:pb-28 lg:px-8">
        <div className="max-w-3xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground backdrop-blur"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-primary" aria-hidden="true" />
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t.hero.titleA}{" "}
            <span className="text-gradient">{t.hero.titleB}</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full px-7 text-base font-semibold shadow-lg shadow-primary/25"
            >
              <a href="#test-drive">
                <CalendarCheck className="size-5" aria-hidden="true" />
                {t.hero.ctaPrimary}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border/60 bg-background/50 px-7 text-base font-semibold backdrop-blur"
            >
              <a
                href={waLink("Halo Pusat Geely, saya ingin konsultasi mobil Geely untuk wilayah saya.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="size-5" aria-hidden="true" />
                {t.hero.ctaSecondary}
              </a>
            </Button>
          </motion.div>

          <motion.ul
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
          >
            {chips.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="size-4 text-primary" aria-hidden="true" />
                {text}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#model"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground md:flex"
        aria-label={t.hero.scroll}
      >
        {t.hero.scroll}
        <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
