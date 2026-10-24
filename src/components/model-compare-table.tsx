"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { MODELS, POWERTRAIN_LABEL, formatIDR, formatJuta } from "@/lib/site";
import { MODEL_DETAILS } from "@/lib/model-details";

export function ModelCompareTable() {
  const { lang } = useLang();
  const L = <T extends { id: string; en: string }>(v: T) => v[lang];

  const rows: { label: { id: string; en: string }; render: (m: (typeof MODELS)[number]) => React.ReactNode }[] = [
    {
      label: { id: "Harga mulai (indikatif)", en: "Price from (indicative)" },
      render: (m) => <span className="font-bold text-primary">{formatIDR(m.priceFrom)}</span>,
    },
    {
      label: { id: "Powertrain", en: "Powertrain" },
      render: (m) => POWERTRAIN_LABEL[m.powertrain][lang],
    },
    {
      label: { id: "Varian", en: "Variants" },
      render: (m) =>
        m.variants.map((v) => `${v.label} (${formatJuta(v.price)})`).join(" · "),
    },
    {
      label: { id: "Spesifikasi inti", en: "Core specs" },
      render: (m) => m.specs.map((s) => L(s)).join(" · "),
    },
    {
      label: { id: "Paling cocok untuk", en: "Best suited for" },
      render: (m) => {
        const d = MODEL_DETAILS.find((x) => x.id === m.id);
        return d ? L(d.fitFor) : "—";
      },
    },
  ];

  return (
    <section className="mt-14" aria-labelledby="compare-all-h">
      <h2 id="compare-all-h" className="font-display text-2xl font-bold tracking-tight">
        {lang === "id"
          ? "Bandingkan sekilas: 4 model Geely"
          : "Quick compare: all 4 Geely models"}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {lang === "id"
          ? "Satu tabel untuk memutuskan arah: hatchback listrik lincah, crossover turbo sporty, SUV listrik flagship, atau super hybrid jangkauan jauh."
          : "One table to pick your direction: agile electric hatchback, sporty turbo crossover, flagship electric SUV, or long-range super hybrid."}
      </p>

      <div className="mt-5 overflow-x-auto rounded-2xl border">
        <table className="w-full min-w-[760px] text-sm">
          <caption className="sr-only">
            {lang === "id"
              ? "Tabel perbandingan 4 model Geely"
              : "Comparison table of all 4 Geely models"}
          </caption>
          <thead>
            <tr className="border-b bg-secondary/50">
              <th scope="col" className="px-4 py-3 text-left font-semibold">
                {lang === "id" ? "Aspek" : "Aspect"}
              </th>
              {MODELS.map((m) => (
                <th key={m.id} scope="col" className="px-4 py-3 text-left">
                  <Link
                    href={`/model/${m.id}`}
                    className="group inline-flex flex-col gap-1.5"
                  >
                    <Image
                      src={m.image}
                      alt={m.name}
                      width={112}
                      height={64}
                      className="h-12 w-20 rounded-md object-cover transition-transform group-hover:scale-105"
                    />
                    <span className="font-display font-bold text-primary group-hover:underline">
                      {m.name}
                    </span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b align-top last:border-0">
                <th
                  scope="row"
                  className="px-4 py-3 text-left font-medium text-muted-foreground"
                >
                  {L(row.label)}
                </th>
                {MODELS.map((m) => (
                  <td key={m.id} className="bg-primary/[0.03] px-4 py-3 leading-relaxed">
                    {row.render(m)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {lang === "id"
          ? "*Semua angka indikatif OTR per September 2026 — konfirmasi penawaran terbaru via WhatsApp."
          : "*All figures indicative OTR as of September 2026 — confirm the latest offer via WhatsApp."}
      </p>
    </section>
  );
}
