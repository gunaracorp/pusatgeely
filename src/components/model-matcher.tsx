"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Sparkles, Share2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/components/language-provider";
import { WhatsAppIcon } from "@/components/site-header";
import { MODELS, formatIDR, waLink, type Powertrain } from "@/lib/site";

type ModelId = "ex5" | "ex2" | "coolray" | "starray";
type Weights = Partial<Record<ModelId, number>>;

interface Option {
  key: string;
  label: { id: string; en: string };
  weights: Weights;
}
interface Question {
  id: string;
  question: { id: string; en: string };
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: "who",
    question: {
      id: "Mobil ini terutama untuk siapa?",
      en: "Who will mainly use this car?",
    },
    options: [
      {
        key: "solo",
        label: { id: "Saya sendiri / pasangan", en: "Just me / my partner" },
        weights: { ex2: 3, coolray: 2 },
      },
      {
        key: "small",
        label: { id: "Keluarga kecil (2–4 orang)", en: "Small family (2–4)" },
        weights: { ex5: 2, coolray: 2, starray: 1 },
      },
      {
        key: "big",
        label: { id: "Keluarga besar / sering bawa banyak orang", en: "Big family / many passengers" },
        weights: { starray: 3, ex5: 1 },
      },
      {
        key: "biz",
        label: { id: "Bisnis / operasional harian", en: "Business / daily operations" },
        weights: { ex2: 2, coolray: 2, starray: 1 },
      },
    ],
  },
  {
    id: "budget",
    question: { id: "Rentang anggaranmu?", en: "What's your budget range?" },
    options: [
      {
        key: "b1",
        label: { id: "Di bawah Rp 250 juta", en: "Under Rp 250 million" },
        weights: { ex2: 4 },
      },
      {
        key: "b2",
        label: { id: "Rp 250–400 juta", en: "Rp 250–400 million" },
        weights: { coolray: 4, ex2: 1 },
      },
      {
        key: "b3",
        label: { id: "Rp 400–550 juta", en: "Rp 400–550 million" },
        weights: { ex5: 3, starray: 3 },
      },
      {
        key: "b4",
        label: { id: "Fleksibel — yang penting pas", en: "Flexible — the right fit matters most" },
        weights: { starray: 2, ex5: 2 },
      },
    ],
  },
  {
    id: "distance",
    question: { id: "Jarak tempuh harianmu?", en: "Your daily driving distance?" },
    options: [
      {
        key: "d1",
        label: { id: "Pendek — di bawah 30 km", en: "Short — under 30 km" },
        weights: { ex2: 2, coolray: 1 },
      },
      {
        key: "d2",
        label: { id: "Sedang — 30–60 km", en: "Medium — 30–60 km" },
        weights: { ex5: 1, ex2: 1, coolray: 2, starray: 1 },
      },
      {
        key: "d3",
        label: { id: "Jauh — di atas 60 km / antar kota", en: "Long — over 60 km / intercity" },
        weights: { starray: 3, ex5: 2 },
      },
    ],
  },
  {
    id: "charging",
    question: {
      id: "Bisa pasang charger di rumah/kantor?",
      en: "Can you install a charger at home/office?",
    },
    options: [
      {
        key: "yes",
        label: { id: "Bisa", en: "Yes" },
        weights: { ex2: 3, ex5: 2, starray: 1 },
      },
      {
        key: "no",
        label: { id: "Belum bisa / tidak yakin", en: "Not yet / not sure" },
        weights: { coolray: 3, starray: 2 },
      },
    ],
  },
  {
    id: "priority",
    question: { id: "Prioritas utamamu?", en: "Your top priority?" },
    options: [
      {
        key: "save",
        label: { id: "Biaya operasional semurah mungkin", en: "Lowest running cost possible" },
        weights: { ex2: 3, ex5: 2 },
      },
      {
        key: "fun",
        label: { id: "Fitur & keseruan nyetir", en: "Features & driving fun" },
        weights: { coolray: 4 },
      },
      {
        key: "space",
        label: { id: "Ruang & kenyamanan keluarga", en: "Space & family comfort" },
        weights: { starray: 3, ex5: 1 },
      },
      {
        key: "tech",
        label: { id: "Teknologi & kesan premium", en: "Technology & premium feel" },
        weights: { ex5: 3, starray: 2 },
      },
    ],
  },
];

const POWERTRAIN_HINT: Record<Powertrain, { id: string; en: string }> = {
  ev: { id: "Listrik murni — biaya per km paling murah", en: "Pure electric — cheapest cost per km" },
  phev: { id: "Super hybrid — listrik harian, bensin jadi pengaman", en: "Super hybrid — electric daily, petrol as safety net" },
  ice: { id: "Turbo — performa tinggi tanpa perlu charger", en: "Turbo — high performance, no charger needed" },
};

export function ModelMatcher() {
  const { lang } = useLang();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = step >= QUESTIONS.length;

  const result = useMemo(() => {
    if (!done) return null;
    const totals: Record<ModelId, number> = { ex5: 0, ex2: 0, coolray: 0, starray: 0 };
    for (const q of QUESTIONS) {
      const opt = q.options.find((o) => o.key === answers[q.id]);
      if (!opt) continue;
      for (const [id, w] of Object.entries(opt.weights)) {
        totals[id as ModelId] += w ?? 0;
      }
    }
    const ranked = (Object.entries(totals) as [ModelId, number][]).sort(
      (a, b) => b[1] - a[1],
    );
    return { winner: ranked[0][0], runnerUp: ranked[1][0] };
  }, [done, answers]);

  const model = MODELS.find((m) => m.id === result?.winner);
  const runner = MODELS.find((m) => m.id === result?.runnerUp);

  /** Alasan hasil — disusun dari jawaban nyata user (bukan template kosong). */
  const reasons = useMemo(() => {
    if (!done || !result) return [];
    const out: { id: string; en: string }[] = [];
    const budget = answers.budget;
    const charge = answers.charging;
    const prio = answers.priority;

    if (budget === "b1" && result.winner === "ex2")
      out.push({
        id: "Anggaran di bawah Rp 250 juta — hanya EX2 yang masuk dengan jangkauan ±398 km.",
        en: "Budget under Rp 250 million — only the EX2 fits with ±398 km of range.",
      });
    if (budget === "b2" && result.winner === "coolray")
      out.push({
        id: "Di rentang Rp 250–400 juta, Coolray memberi performa & fitur terbanyak.",
        en: "Within Rp 250–400 million, the Coolray packs the most performance & features.",
      });
    if ((budget === "b3" || budget === "b4") && (result.winner === "ex5" || result.winner === "starray"))
      out.push({
        id: "Anggaranmu membuka kelas atas: EX5 (listrik) atau Starray EM-i (super hybrid).",
        en: "Your budget unlocks the top class: EX5 (electric) or Starray EM-i (super hybrid).",
      });
    if (charge === "no")
      out.push({
        id: "Karena belum ada charger, pilihanmu aman untuk dipakai tanpa isi daya rutin.",
        en: "With no charger yet, your pick stays practical without routine charging.",
      });
    if (charge === "yes" && (result.winner === "ex2" || result.winner === "ex5"))
      out.push({
        id: "Punya charger = biaya per km paling murah dengan mobil listrik.",
        en: "Having a charger = the cheapest cost per km with an EV.",
      });
    if (prio === "space")
      out.push({
        id: "Prioritas ruang & kenyamanan terjawab oleh kabin model ini.",
        en: "Your space & comfort priority is answered by this model's cabin.",
      });
    if (prio === "fun" && result.winner === "coolray")
      out.push({
        id: "174 PS & 7DCT menjawab hasrat keseruan nyetirmu.",
        en: "174 PS & the 7DCT answer your driving-fun wish.",
      });
    if (prio === "tech" && (result.winner === "ex5" || result.winner === "starray"))
      out.push({
        id: "Teknologi & kesan premium adalah kekuatan utama model ini.",
        en: "Technology & premium feel are this model's core strengths.",
      });
    if (prio === "save")
      out.push({
        id: "Untuk hemat operasional, powertrain model ini paling efisien di kelasnya.",
        en: "For running-cost savings, this model's powertrain is its class's most efficient.",
      });
    return out.slice(0, 3);
  }, [done, result, answers]);

  function pick(qId: string, key: string) {
    setAnswers((a) => ({ ...a, [qId]: key }));
    setStep((s) => s + 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
  }

  async function shareResult() {
    if (!model) return;
    const text =
      lang === "id"
        ? `Hasil kuis "Pilih Geely-mu": ${model.name} — mulai ${formatIDR(model.priceFrom)}. Cek di pusatgeely.web.id`
        : `My "Find your Geely" quiz result: ${model.name} — from ${formatIDR(model.priceFrom)}. Check pusatgeely.web.id`;
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        toast.success(lang === "id" ? "Hasil disalin!" : "Result copied!");
      }
    } catch {
      /* user dismissed — ignore */
    }
  }

  const waHref = model
    ? waLink(
        lang === "id"
          ? `Halo Pusat Geely, dari kuis pencocokan hasilnya ${model.name}. Kebutuhan saya: ${QUESTIONS[1].options.find((o) => o.key === answers.budget)?.label.id ?? "-"}${answers.charging ? `, charger: ${QUESTIONS[3].options.find((o) => o.key === answers.charging)?.label.id.toLowerCase() ?? "-"}` : ""}. Mohon info penawaran & jadwal test drive.`
          : `Hello Pusat Geely, my quiz match is the ${model.name}. My needs: ${QUESTIONS[1].options.find((o) => o.key === answers.budget)?.label.en ?? "-"}${answers.charging ? `, charger: ${QUESTIONS[3].options.find((o) => o.key === answers.charging)?.label.en.toLowerCase() ?? "-"}` : ""}. Please share your best offer & test-drive slots.`,
      )
    : "#";

  const q = QUESTIONS[step];
  const progress = Math.min(step / QUESTIONS.length, 1);

  return (
    <section id="kuis" className="scroll-mt-20" aria-labelledby="matcher-h">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border bg-card">
          <div className="border-b bg-secondary/40 px-6 py-5 sm:px-8">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="size-4" aria-hidden="true" />
              {lang === "id" ? "Pencocok pintar" : "Smart matcher"}
            </p>
            <h2
              id="matcher-h"
              className="mt-1.5 font-display text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {lang === "id"
                ? "Pilih Geely-mu dalam 60 detik"
                : "Find your Geely in 60 seconds"}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {lang === "id"
                ? "5 pertanyaan singkat — jawabanmu langsung dipetakan ke model yang paling cocok."
                : "5 quick questions — your answers map straight to the best-fitting model."}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {!done && (
              <>
                {/* Progress */}
                <div className="flex items-center gap-3">
                  <div
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary"
                    role="progressbar"
                    aria-valuenow={Math.round(progress * 100)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={false}
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ type: "spring", stiffness: 220, damping: 28 }}
                    />
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                    {step + 1}/{QUESTIONS.length + 1}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <h3 className="mt-6 font-display text-xl font-bold">
                      {q.question[lang]}
                    </h3>
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => pick(q.id, opt.key)}
                          className="group rounded-xl border bg-background px-4 py-3.5 text-left text-sm font-medium transition-all hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-ring"
                        >
                          <span className="flex items-center justify-between gap-2">
                            {opt.label[lang]}
                            <ArrowRight
                              className="size-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                              aria-hidden="true"
                            />
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </>
            )}

            {done && model && (
              <AnimatePresence>
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    {lang === "id" ? "Rekomendasi untukmu" : "Your match"}
                  </p>
                  <div className="mt-4 grid gap-6 lg:grid-cols-[280px_1fr]">
                    <Link
                      href={`/model/${model.id}`}
                      className="group relative overflow-hidden rounded-2xl border"
                      aria-label={model.name}
                    >
                      <Image
                        src={model.image}
                        alt={model.name}
                        width={560}
                        height={350}
                        className="aspect-[8/5] w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </Link>
                    <div>
                      <h3 className="font-display text-2xl font-bold tracking-tight">
                        {model.name}
                      </h3>
                      <p className="mt-1 text-lg font-bold text-primary">
                        {formatIDR(model.priceFrom)}
                        <span className="ml-1 text-xs font-medium text-muted-foreground">
                          {lang === "id" ? "mulai (indikatif OTR)" : "from (indicative OTR)"}
                        </span>
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {POWERTRAIN_HINT[model.powertrain][lang]}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {reasons.map((r, i) => (
                          <li key={i} className="flex gap-2 text-sm leading-relaxed">
                            <Sparkles
                              className="mt-0.5 size-4 shrink-0 text-primary"
                              aria-hidden="true"
                            />
                            {r[lang]}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-2.5">
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          <WhatsAppIcon className="size-4" aria-hidden="true" />
                          {lang === "id" ? "Tanya model ini" : "Ask about this model"}
                        </a>
                        <button
                          type="button"
                          onClick={shareResult}
                          className="inline-flex h-11 items-center gap-2 rounded-full border bg-background px-5 text-sm font-semibold transition-colors hover:border-primary/50"
                        >
                          <Share2 className="size-4" aria-hidden="true" />
                          {lang === "id" ? "Bagikan hasil" : "Share result"}
                        </button>
                        <button
                          type="button"
                          onClick={restart}
                          className="inline-flex h-11 items-center gap-2 rounded-full border bg-background px-5 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                        >
                          <RotateCcw className="size-4" aria-hidden="true" />
                          {lang === "id" ? "Ulangi" : "Restart"}
                        </button>
                      </div>
                      {runner && (
                        <p className="mt-4 text-xs text-muted-foreground">
                          {lang === "id" ? "Cocok juga:" : "Also fits:"}{" "}
                          <Link
                            href={`/model/${runner.id}`}
                            className="font-semibold text-primary hover:underline"
                          >
                            {runner.name}
                          </Link>
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
