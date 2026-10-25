"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Zap, Fuel, PiggyBank } from "lucide-react";
import { useLang } from "@/components/language-provider";

const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(Math.round(n));

interface SliderProps {
  label: { id: string; en: string };
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step, suffix, onChange }: SliderProps) {
  const { lang } = useLang();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-sm font-medium">{label[lang]}</label>
        <span className="text-sm font-bold tabular-nums text-primary">
          {fmt(value)} {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
        aria-label={`${label[lang]}: ${fmt(value)} ${suffix}`}
      />
    </div>
  );
}

export function EvCostCalculator({
  modelName,
  kwhPer100,
}: {
  modelName: string;
  kwhPer100: number;
}) {
  const { lang } = useLang();
  const [kmDay, setKmDay] = useState(40);
  const [tariff, setTariff] = useState(1500);
  const [fuelPrice, setFuelPrice] = useState(12000);
  const [lPer100, setLPer100] = useState(9);

  const r = useMemo(() => {
    const kmMonth = kmDay * 30;
    const evMonth = (kmMonth / 100) * kwhPer100 * tariff;
    const iceMonth = (kmMonth / 100) * lPer100 * fuelPrice;
    const saveMonth = Math.max(iceMonth - evMonth, 0);
    return {
      evKm: (kwhPer100 * tariff) / 100,
      iceKm: (lPer100 * fuelPrice) / 100,
      evMonth,
      iceMonth,
      saveMonth,
      saveYear: saveMonth * 12,
    };
  }, [kmDay, tariff, fuelPrice, lPer100, kwhPer100]);

  const maxBar = Math.max(r.evMonth, r.iceMonth, 1);

  return (
    <section
      className="mt-12 overflow-hidden rounded-2xl border bg-card"
      aria-labelledby="evcalc-h"
    >
      <div className="border-b bg-secondary/40 px-6 py-5">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
          <Calculator className="size-4" aria-hidden="true" />
          {lang === "id" ? "Kalkulator hemat" : "Savings calculator"}
        </p>
        <h2 id="evcalc-h" className="mt-1.5 font-display text-2xl font-bold tracking-tight">
          {lang === "id"
            ? "Berapa hemat listrik vs bensin?"
            : "How much cheaper is electric vs petrol?"}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {lang === "id"
            ? "Geser sesuai kebiasaanmu — hitungan langsung jalan. Konsumsi listrik mengikuti karakter unit ini."
            : "Slide to match your habits — math runs instantly. Electricity consumption follows this unit's profile."}
        </p>
      </div>

      <div className="grid gap-8 p-6 lg:grid-cols-2 sm:p-8">
        {/* Inputs */}
        <div className="space-y-6">
          <Slider
            label={{ id: "Jarak tempuh harian", en: "Daily distance" }}
            value={kmDay}
            min={10}
            max={200}
            step={5}
            suffix="km"
            onChange={setKmDay}
          />
          <Slider
            label={{ id: "Tarif listrik rumah", en: "Home electricity tariff" }}
            value={tariff}
            min={800}
            max={2500}
            step={50}
            suffix={lang === "id" ? "Rp/kWh" : "IDR/kWh"}
            onChange={setTariff}
          />
          <Slider
            label={{ id: "Harga bensin pembanding", en: "Petrol price (comparison)" }}
            value={fuelPrice}
            min={8000}
            max={16000}
            step={250}
            suffix={lang === "id" ? "Rp/liter" : "IDR/L"}
            onChange={setFuelPrice}
          />
          <Slider
            label={{ id: "Konsumsi mobil bensin", en: "Petrol car consumption" }}
            value={lPer100}
            min={5}
            max={15}
            step={1}
            suffix="L/100km"
            onChange={setLPer100}
          />
          <p className="text-xs leading-relaxed text-muted-foreground">
            {lang === "id"
              ? `*Estimasi kasar, bukan janji. Konsumsi ${modelName} ±${kwhPer100} kWh/100 km (pemakaian nyata bergantung rute, kecepatan & AC). Biaya servis & depresiasi tidak dihitung.`
              : `*Rough estimate, not a promise. ${modelName} uses ±${kwhPer100} kWh/100 km (real use depends on route, speed & AC). Servicing & depreciation excluded.`}
          </p>
        </div>

        {/* Results */}
        <div className="flex flex-col justify-center gap-4">
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                  <Zap className="size-4" aria-hidden="true" />
                  {modelName}
                </span>
                <span className="font-bold tabular-nums">
                  {fmt(r.evMonth)}
                  <span className="text-xs font-medium text-muted-foreground">
                    {" "}
                    {lang === "id" ? "Rp/bln" : "IDR/mo"}
                  </span>
                </span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={false}
                  animate={{ width: `${(r.evMonth / maxBar) * 100}%` }}
                  transition={{ type: "spring", stiffness: 180, damping: 26 }}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                ±{fmt(r.evKm)} {lang === "id" ? "Rp/km" : "IDR/km"}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <Fuel className="size-4" aria-hidden="true" />
                  {lang === "id" ? "Mobil bensin (pembanding)" : "Petrol car (comparison)"}
                </span>
                <span className="font-bold tabular-nums">
                  {fmt(r.iceMonth)}
                  <span className="text-xs font-medium text-muted-foreground">
                    {" "}
                    {lang === "id" ? "Rp/bln" : "IDR/mo"}
                  </span>
                </span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full bg-amber-500"
                  initial={false}
                  animate={{ width: `${(r.iceMonth / maxBar) * 100}%` }}
                  transition={{ type: "spring", stiffness: 180, damping: 26 }}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                ±{fmt(r.iceKm)} {lang === "id" ? "Rp/km" : "IDR/km"}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <PiggyBank className="size-4" aria-hidden="true" />
              {lang === "id" ? "Potensi hemat" : "Potential savings"}
            </p>
            <p className="mt-1 font-display text-3xl font-black tracking-tight text-primary">
              {fmt(r.saveYear)}
              <span className="ml-1 text-sm font-bold">
                {lang === "id" ? "Rp/tahun" : "IDR/yr"}
              </span>
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              ≈ {fmt(r.saveMonth)} {lang === "id" ? "Rp per bulan" : "IDR per month"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
