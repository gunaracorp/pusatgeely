"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ARTICLES } from "@/lib/articles";

export function ArticleList() {
  const { lang, t } = useLang();

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t.nav.artikel }]} />

      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {lang === "id" ? "Artikel & Panduan" : "Articles & Guides"}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {lang === "id"
            ? "Panduan Jujur Sebelum Membeli Geely"
            : "Honest Guides Before Buying a Geely"}
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {lang === "id"
            ? "Ditulis dari pengalaman mendampingi pembeli setiap minggu — bukan salinan brosur. Mulai dari membaca harga dengan benar sampai merawat baterai agar awet bertahun-tahun."
            : "Written from weeks of real buyer accompaniment — not brochure copies. From reading prices correctly to keeping your battery healthy for years."}
        </p>
      </header>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {ARTICLES.map((a) => (
          <Link
            key={a.slug}
            href={`/artikel/${a.slug}`}
            className="group overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/50"
          >
            <div className="relative">
              <Image
                src={a.image}
                alt={a.title[lang]}
                width={640}
                height={360}
                className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="absolute left-3 top-3 rounded-full border bg-background/90 px-3 py-1 text-[11px] font-semibold text-primary backdrop-blur">
                {a.tag[lang]}
              </span>
            </div>
            <div className="p-5">
              <h2 className="font-display text-lg font-bold leading-snug">
                {a.title[lang]}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {a.excerpt[lang]}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                {lang === "id" ? "Baca artikel" : "Read article"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
}
