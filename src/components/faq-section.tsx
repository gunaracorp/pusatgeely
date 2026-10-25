"use client";

import { faqData } from "@/lib/faq-data";
import { MessageCircleQuestion } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const { t, lang } = useLang();

  return (
    <section id="faq" aria-label="Pertanyaan umum" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          subtitle={t.faq.subtitle}
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.04} y={12}>
                <AccordionItem value={item.id}>
                  <AccordionTrigger className="text-left font-display text-base font-semibold sm:text-lg [&>svg]:text-primary">
                    <span className="flex items-start gap-3">
                      <MessageCircleQuestion className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                      {item.q[lang]}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.a[lang]}
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
