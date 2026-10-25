"use client";

import { ArrowDownRight } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/site";

export function CtaBand() {
  const { t } = useLang();

  return (
    <section aria-label="Ajakan kontak" className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border bg-secondary/60 px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="absolute inset-0 -z-10 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_80%_at_50%_50%,black,transparent)]" />
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">
              {t.hero.eyebrow}
            </p>
            <h2 className="mx-auto max-w-2xl font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {t.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
              {t.cta.subtitle}
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full px-9 text-base font-bold shadow-xl shadow-primary/30 transition-transform hover:scale-[1.02]"
              >
                <a
                  href={waLink("Halo Pusat Geely, saya ingin konsultasi mobil Geely. Boleh dibantu?")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="size-5" aria-hidden="true" />
                  {t.cta.button}
                  <ArrowDownRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
