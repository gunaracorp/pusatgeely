"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { WhatsAppIcon } from "@/components/site-header";
import { ARTICLES } from "@/lib/articles";
import { waLink } from "@/lib/site";

export function ArticleView({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return null;

  const dateLabel = new Date(article.date).toLocaleDateString(
    lang === "id" ? "id-ID" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
  const others = ARTICLES.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: t.nav.artikel, href: "/artikel" }, { label: article.tag[lang] }]}
      />

      <header>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full border border-primary/40 bg-primary/5 px-3 py-1 font-semibold text-primary">
            {article.tag[lang]}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            <time dateTime={article.date}>{dateLabel}</time>
          </span>
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {article.title[lang]}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {article.excerpt[lang]}
        </p>
      </header>

      <Image
        src={article.image}
        alt={article.title[lang]}
        width={1200}
        height={675}
        priority
        className="mt-8 aspect-[16/9] w-full rounded-2xl border object-cover"
      />

      {/* Isi artikel */}
      <div className="mt-10 space-y-8">
        {article.sections.map((sec, i) => (
          <section key={i}>
            {sec.h && (
              <h2 className="font-display text-2xl font-bold tracking-tight">
                {sec.h[lang]}
              </h2>
            )}
            <div className={sec.h ? "mt-3 space-y-4" : "space-y-4"}>
              {sec.p.map((para, j) => (
                <p key={j} className="leading-relaxed text-foreground/90">
                  {para[lang]}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA dalam artikel */}
      <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="text-base font-bold">
          {lang === "id"
            ? "Masih ada pertanyaan setelah membaca?"
            : "Still have questions after reading?"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === "id"
            ? "Tanya langsung — gratis, tanpa kewajiban, dibalas manusia bukan bot."
            : "Ask directly — free, no obligation, answered by a human not a bot."}
        </p>
        <a
          href={waLink(
            `Halo Pusat Geely, saya baru membaca artikel "${article.title.id}" dan ingin bertanya.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105"
        >
          <WhatsAppIcon className="size-4" aria-hidden="true" />
          {t.header.cta}
        </a>
      </div>

      {/* Artikel lain */}
      <section className="mt-12" aria-labelledby="more-h">
        <h2 id="more-h" className="font-display text-2xl font-bold tracking-tight">
          {lang === "id" ? "Baca Juga" : "Read Next"}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {others.map((a) => (
            <Link
              key={a.slug}
              href={`/artikel/${a.slug}`}
              className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/50"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                {a.tag[lang]}
              </span>
              <p className="mt-1.5 text-sm font-bold leading-snug">{a.title[lang]}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                {lang === "id" ? "Baca" : "Read"}
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
