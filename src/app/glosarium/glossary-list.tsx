"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GLOSSARY, GLOSSARY_CATEGORIES } from "@/lib/glossary";

export function GlossaryList() {
  const { lang } = useLang();

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: lang === "id" ? "Glosarium" : "Glossary" }]}
      />

      <header className="max-w-3xl">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
          <BookOpen className="size-4" aria-hidden="true" />
          {lang === "id" ? "Glosarium Otomotif" : "Automotive Glossary"}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {lang === "id"
            ? "Glosarium Istilah Mobil Listrik, Hybrid & Kredit Otomotif"
            : "Glossary of EV, Hybrid & Auto-Financing Terms"}
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {lang === "id"
            ? "Istilah brosur dan sales sering membingungkan — padahal artinya sederhana. Kamus ini merangkum istilah EV, hybrid, spesifikasi, dan pembiayaan dalam bahasa Indonesia yang jujur dan mudah dipahami, khususnya berguna bagi Anda yang sedang mempertimbangkan mobil listrik atau hybrid pertama."
            : "Brochure and sales jargon can be confusing — even when the meaning is simple. This glossary sums up EV, hybrid, spec, and financing terms in plain, honest language, especially useful if you are considering your first electric or hybrid car."}
        </p>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          {lang === "id"
            ? "Setiap istilah punya tautan tetap (misalnya /glosarium#kwh) sehingga mudah dibagikan, plus rujukan ke halaman relevan di situs ini dengan konteks pembeli Bogor & Jabodetabek."
            : "Every term has a permanent link (e.g. /glosarium#kwh) that is easy to share, plus references to relevant pages on this site with Bogor & Jabodetabek buyer context."}
        </p>
      </header>

      {/* TOC per kategori — sticky */}
      <nav
        aria-label={lang === "id" ? "Kategori istilah" : "Term categories"}
        className="sticky top-20 z-10 mt-8 flex flex-wrap gap-2 rounded-2xl border bg-background/95 p-3 shadow-sm backdrop-blur"
      >
        {GLOSSARY_CATEGORIES.map((cat) => {
          const count = GLOSSARY.filter((t) => t.category === cat.key).length;
          return (
            <a
              key={cat.key}
              href={`#${cat.key}`}
              className="rounded-full border border-primary/40 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              {cat.label[lang]}
              <span className="ml-1 text-muted-foreground">({count})</span>
            </a>
          );
        })}
      </nav>

      {/* Daftar istilah per kategori */}
      {GLOSSARY_CATEGORIES.map((cat) => {
        const terms = GLOSSARY.filter((t) => t.category === cat.key);
        return (
          <section
            key={cat.key}
            id={cat.key}
            aria-labelledby={`${cat.key}-h`}
            className="mt-12 scroll-mt-24"
          >
            <h2
              id={`${cat.key}-h`}
              className="font-display text-2xl font-bold tracking-tight"
            >
              {cat.label[lang]}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {terms.map((term) => (
                <div
                  key={term.slug}
                  id={term.slug}
                  className="group scroll-mt-28 rounded-xl border bg-card p-5 transition-colors hover:border-primary/50"
                >
                  <h3 className="font-display text-lg font-bold leading-snug">
                    <a
                      href={`#${term.slug}`}
                      className="transition-colors hover:text-primary"
                      aria-label={term.term[lang]}
                    >
                      {term.term[lang]}
                    </a>
                    <span className="ml-2 text-xs font-medium text-muted-foreground">
                      {lang === "id" ? term.term.en : term.term.id}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {term.definition[lang]}
                  </p>
                  {term.related && term.related.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {lang === "id" ? "Terkait" : "Related"}
                      </span>
                      {term.related.map((rel) => (
                        <Link
                          key={rel.href}
                          href={rel.href}
                          className="rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                        >
                          {rel.label[lang]}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Footer mini — internal linking */}
      <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="text-base font-bold">
          {lang === "id"
            ? "Lanjutkan riset Anda"
            : "Continue your research"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === "id"
            ? "Telusuri indeks kata kunci lengkap atau baca panduan jujur kami sebelum kirim pertanyaan."
            : "Browse the full keyword index or read our honest guides before sending a question."}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/indeks-kata-kunci"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-6 text-sm font-bold text-primary transition-transform hover:scale-105"
          >
            {lang === "id" ? "Indeks Kata Kunci" : "Keyword Index"}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/artikel"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-6 text-sm font-bold text-primary transition-transform hover:scale-105"
          >
            {lang === "id" ? "Artikel & Panduan" : "Articles & Guides"}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
