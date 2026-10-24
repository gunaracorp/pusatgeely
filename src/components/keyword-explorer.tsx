"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X, MessageCircleQuestion } from "lucide-react";
import type { KeywordCluster } from "@/lib/seo-keywords";
import { waLink } from "@/lib/site";

/**
 * KEYWORD EXPLORER — pencarian instan di atas 2.000+ frasa indeks.
 *
 * - SSR penuh: tanpa query, seluruh klaster & tautan tetap dirender di HTML
 *   awal (crawler melihat peta topik lengkap).
 * - Dengan query (?q= dari Sitelinks SearchAction atau input manual):
 *   hasil difilter instan + URL diperbarui via replaceState agar bisa dibagikan.
 */
export function KeywordExplorer({ clusters }: { clusters: KeywordCluster[] }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const hydrated = useRef(false);

  // Baca ?q= saat mount — target Sitelinks SearchAction Google.
  // Deferred via rAF agar setState tidak dipanggil sinkron di dalam effect.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      try {
        const q = new URLSearchParams(window.location.search).get("q");
        if (q) setQuery(q);
      } catch {
        /* ignore */
      }
      hydrated.current = true;
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Sinkronkan ?q= di URL (shareable) — debounce ringan.
  useEffect(() => {
    if (!hydrated.current) return;
    const id = window.setTimeout(() => {
      try {
        const url = new URL(window.location.href);
        if (query.trim()) url.searchParams.set("q", query.trim());
        else url.searchParams.delete("q");
        window.history.replaceState(null, "", url.toString());
      } catch {
        /* ignore */
      }
    }, 250);
    return () => window.clearTimeout(id);
  }, [query]);

  const trimmed = query.trim().toLowerCase();

  // Word-based matching: setiap kata query harus ada di frasa (urutan bebas).
  // "kredit coolray" → cocok dengan "kredit geely coolray jakarta". ✅
  const queryWords = useMemo(
    () => trimmed.split(/\s+/).filter(Boolean),
    [trimmed]
  );

  const results = useMemo(() => {
    if (queryWords.length === 0) return [];
    const seen = new Set<string>();
    const out: { t: string; h: string }[] = [];
    for (const c of clusters) {
      for (const k of c.items) {
        const phrase = k.t.toLowerCase();
        if (
          queryWords.every((w) => phrase.includes(w)) &&
          !seen.has(k.h + k.t)
        ) {
          seen.add(k.h + k.t);
          out.push(k);
        }
      }
    }
    return out;
  }, [clusters, queryWords]);

  const MAX_RENDER = 240;
  const shown = results.slice(0, MAX_RENDER);

  return (
    <>
      {/* ── Search bar ── */}
      <div className="sticky top-[4.25rem] z-30 -mx-2 bg-background/85 px-2 py-3 backdrop-blur-md sm:top-20">
        <div className="relative">
          <label htmlFor="keyword-search" className="sr-only">
            Cari frasa di indeks kata kunci
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id="keyword-search"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari frasa… mis. “harga ex5”, “kredit coolray”, “test drive jakarta”"
            autoComplete="off"
            className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-11 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60 focus-visible:outline-2 focus-visible:outline-ring"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Bersihkan pencarian"
              className="absolute right-3 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
        {trimmed && (
          <p className="mt-2 px-1 text-xs text-muted-foreground" aria-live="polite">
            <strong className="text-foreground">{results.length.toLocaleString("id-ID")}</strong>{" "}
            frasa cocok untuk &ldquo;{query.trim()}&rdquo;
            {results.length > MAX_RENDER &&
              ` — menampilkan ${MAX_RENDER.toLocaleString("id-ID")} teratas`}
          </p>
        )}
      </div>

      {/* ── Mode hasil pencarian ── */}
      {trimmed ? (
        <div className="mt-6">
          {shown.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {shown.map((k) => (
                <li key={`${k.h}-${k.t}`}>
                  <Link
                    href={k.h}
                    className="inline-flex items-center rounded-full border bg-card px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    title={`Buka halaman: ${k.t}`}
                  >
                    #{k.t}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            /* Empty state — frasa belum ada → CTA WhatsApp (zero dead-ends) */
            <div className="mx-auto max-w-lg rounded-2xl border bg-card p-6 text-center">
              <MessageCircleQuestion
                aria-hidden="true"
                className="mx-auto size-8 text-primary"
              />
              <p className="mt-3 font-semibold">
                Frasa &ldquo;{query.trim()}&rdquo; belum ada di indeks
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tidak apa-apa — tim kami jawab langsung. Chat WhatsApp, sebutkan
                pertanyaan Anda, kami bantu pilih unit & penawaran terbaik.
              </p>
              <a
                href={waLink(
                  `Halo Pusat Geely, saya mencari info: "${query.trim()}". Mohon dibantu ya.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-ring"
              >
                Tanya via WhatsApp
              </a>
            </div>
          )}
        </div>
      ) : (
        /* ── Mode penuh: klaster SSR (default, crawler-friendly) ── */
        <div className="mt-12 space-y-12">
          {clusters.map((c) => (
            <section key={c.id} id={`klaster-${c.id}`} aria-label={c.label}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-3">
                <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {c.label}
                </h2>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {c.items.length.toLocaleString("id-ID")} frasa
                </span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.items.map((k) => (
                  <li key={k.t}>
                    <Link
                      href={k.h}
                      className="inline-flex items-center rounded-full border bg-card px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      title={`Buka halaman: ${k.t}`}
                    >
                      #{k.t}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
