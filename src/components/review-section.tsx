"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, MessageSquarePlus, Quote, Star } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ReviewItem {
  modelId: string;
  name: string;
  city: string | null;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Aggregate {
  count: number;
  average: number;
}

/** Bintang rating — terisi sesuai nilai. */
function Stars({
  value,
  className,
  size = "size-3.5",
}: {
  value: number;
  className?: string;
  size?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            size,
            i <= Math.round(value)
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-muted-foreground/40"
          )}
        />
      ))}
    </span>
  );
}

/**
 * Ulasan pelanggan ASLI per model — daftar terpublikasi + form submit
 * (dimoderasi pemilik). JSON-LD aggregateRating/review dibangkitkan
 * server-side dari data yang sama (lihat model/[slug]/page.tsx).
 */
export function ReviewSection({
  modelId,
  modelName,
}: {
  modelId: string;
  modelName: string;
}) {
  const { lang } = useLang();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [aggregate, setAggregate] = useState<Aggregate | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?model=${encodeURIComponent(modelId)}`, {
        cache: "no-store",
      });
      const data = (await res.json()) as {
        reviews: ReviewItem[];
        aggregate: Aggregate | null;
      };
      setReviews(data.reviews ?? []);
      setAggregate(data.aggregate ?? null);
    } catch {
      setReviews([]);
      setAggregate(null);
    } finally {
      setLoading(false);
    }
  }, [modelId]);

  useEffect(() => {
    load();
  }, [load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelId, name, city, rating, comment, website }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (data.ok) {
        toast.success(data.message ?? "Terima kasih!");
        setName("");
        setCity("");
        setComment("");
        setRating(5);
        setFormOpen(false);
      } else {
        toast.error(data.message ?? "Gagal mengirim ulasan.");
      }
    } catch {
      toast.error(
        lang === "id" ? "Koneksi bermasalah, coba lagi." : "Connection issue, try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const t = {
    title: lang === "id" ? "Ulasan Pemilik Unit" : "Owner Reviews",
    subtitle:
      lang === "id"
        ? `Pengalaman nyata pembeli ${modelName} yang didampingi Pusat Geely.`
        : `Real experiences of ${modelName} buyers assisted by Pusat Geely.`,
    reviews: lang === "id" ? "ulasan" : "reviews",
    empty:
      lang === "id"
        ? "Belum ada ulasan terpublikasi untuk model ini. Pernah dilayani kami? Bagikan pengalaman Anda — ulasan asli membantu pembeli lain."
        : "No published reviews for this model yet. Have we assisted you? Share your experience — genuine reviews help other buyers.",
    write: lang === "id" ? "Tulis Ulasan" : "Write a Review",
    yourName: lang === "id" ? "Nama Anda" : "Your name",
    cityLabel: lang === "id" ? "Kota (opsional)" : "City (optional)",
    yourReview: lang === "id" ? "Pengalaman Anda" : "Your experience",
    placeholderReview:
      lang === "id"
        ? "Contoh: Proses dibantu dari pilih tipe sampai serah terima, respons cepat via WhatsApp…"
        : "e.g. Assisted from choosing the variant to handover, fast WhatsApp responses…",
    send: lang === "id" ? "Kirim Ulasan" : "Submit Review",
    sending: lang === "id" ? "Mengirim…" : "Sending…",
    moderated:
      lang === "id"
        ? "Ulasan dimoderasi ringan untuk menyaring spam — hanya pengalaman asli yang ditayangkan."
        : "Reviews are lightly moderated to filter spam — only genuine experiences are published.",
  };

  return (
    <section
      id="ulasan"
      aria-label={t.title}
      className="mt-14 overflow-hidden rounded-2xl border bg-card"
    >
      {/* ── Header + agregat ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight">{t.title}</h2>
          <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{t.subtitle}</p>
        </div>
        {aggregate && (
          <div className="flex items-center gap-2.5 rounded-full border bg-background/60 px-4 py-2">
            <span className="font-display text-2xl font-bold text-amber-500">
              {aggregate.average.toFixed(1)}
            </span>
            <span className="flex flex-col leading-tight">
              <Stars value={aggregate.average} size="size-4" />
              <span className="text-[11px] text-muted-foreground">
                {aggregate.count} {t.reviews}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* ── Daftar ulasan ── */}
      <div className="max-h-96 overflow-y-auto p-5 pt-4 [scrollbar-width:thin]">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            {lang === "id" ? "Memuat ulasan…" : "Loading reviews…"}
          </div>
        ) : reviews.length === 0 ? (
          <p className="py-6 text-center text-sm leading-relaxed text-muted-foreground">
            {t.empty}
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {reviews.map((r) => (
              <li
                key={`${r.name}-${r.createdAt}`}
                className="rounded-xl border bg-background/50 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                      {r.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold">{r.name}</span>
                      {r.city && (
                        <span className="text-[11px] text-muted-foreground">{r.city}</span>
                      )}
                    </span>
                  </div>
                  <Stars value={r.rating} />
                </div>
                <p className="mt-2.5 flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <Quote className="mt-0.5 size-3.5 shrink-0 text-primary/50" aria-hidden="true" />
                  {r.comment}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Form tulis ulasan ── */}
      <div className="border-t bg-muted/30 p-5">
        {!formOpen ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setFormOpen(true)}
            className="w-full gap-2 sm:w-auto"
          >
            <MessageSquarePlus className="size-4" aria-hidden="true" />
            {t.write}
          </Button>
        ) : (
          <form onSubmit={submit} className="grid gap-4">
            {/* Honeypot — tersembunyi dari manusia, manis untuk bot */}
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="flex flex-wrap items-center gap-3">
              <Label className="text-sm">
                {lang === "id" ? "Rating Anda" : "Your rating"}
              </Label>
              <div className="flex items-center gap-1" role="radiogroup" aria-label={t.title}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    type="button"
                    role="radio"
                    aria-checked={rating === i}
                    aria-label={`${i} / 5`}
                    onClick={() => setRating(i)}
                    onMouseEnter={() => setHoverRating(i)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="rounded p-0.5 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <Star
                      className={cn(
                        "size-6 transition-colors",
                        i <= (hoverRating || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-transparent text-muted-foreground/40"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor={`rv-name-${modelId}`}>{t.yourName}</Label>
                <Input
                  id={`rv-name-${modelId}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={40}
                  required
                  minLength={2}
                  autoComplete="name"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor={`rv-city-${modelId}`}>{t.cityLabel}</Label>
                <Input
                  id={`rv-city-${modelId}`}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  maxLength={40}
                  autoComplete="address-level2"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor={`rv-comment-${modelId}`}>{t.yourReview}</Label>
              <Textarea
                id={`rv-comment-${modelId}`}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={600}
                rows={3}
                required
                minLength={10}
                placeholder={t.placeholderReview}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" disabled={submitting} className="gap-2">
                {submitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                {submitting ? t.sending : t.send}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setFormOpen(false)}
                disabled={submitting}
              >
                {lang === "id" ? "Batal" : "Cancel"}
              </Button>
              <p className="text-[11px] leading-snug text-muted-foreground">{t.moderated}</p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
