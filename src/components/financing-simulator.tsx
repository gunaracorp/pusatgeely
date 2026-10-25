"use client";

import { useMemo, useState } from "react";
import { Calculator, MessageCircle, Send, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  MODELS,
  formatIDR,
  waLink,
} from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

const TENORS = [12, 24, 36, 48, 60, 72];

export function FinancingSimulator() {
  const { t, lang } = useLang();

  const [modelId, setModelId] = useState<string>(MODELS[0].id);
  const [dpPercent, setDpPercent] = useState(20);
  const [tenor, setTenor] = useState(36);
  const [ratePercent, setRatePercent] = useState(6);

  /* ---- Lead capture opsional (kirim simulasi ke konsultan) ---- */
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadWebsite, setLeadWebsite] = useState(""); // honeypot — harus kosong
  const [leadState, setLeadState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [leadWaUrl, setLeadWaUrl] = useState<string | null>(null);

  /* calculate_credit — kirim sekali pada interaksi pertama (anti-noise) */
  const [calcTracked, setCalcTracked] = useState(false);
  function trackCalc(mid: string) {
    if (calcTracked) return;
    setCalcTracked(true);
    trackEvent("calculate_credit", { model: mid });
  }

  const model = useMemo(
    () => MODELS.find((m) => m.id === modelId) ?? MODELS[0],
    [modelId]
  );

  const result = useMemo(() => {
    const price = model.priceFrom;
    const dp = Math.round((price * dpPercent) / 100);
    const principal = price - dp;
    const totalInterest = principal * (ratePercent / 100) * (tenor / 12);
    const monthly = Math.round((principal + totalInterest) / tenor);
    const total = dp + monthly * tenor;
    return { price, dp, monthly, total };
  }, [model, dpPercent, tenor, ratePercent]);

  const waMessage = t.simulator.waMessage(
    model.name,
    formatIDR(result.dp),
    tenor,
    ratePercent.toFixed(1).replace(".", ","),
    formatIDR(result.monthly)
  );

  /** Ringkasan simulasi untuk konteks konsultan (disimpan sebagai message lead). */
  const leadMessage =
    lang === "id"
      ? `Simulasi kredit ${model.name}: DP ${dpPercent}% (${formatIDR(result.dp)}), tenor ${tenor} bulan, flat ${ratePercent}%, estimasi cicilan ${formatIDR(result.monthly)}/bulan`
      : `Financing simulation ${model.name}: DP ${dpPercent}% (${formatIDR(result.dp)}), tenor ${tenor} months, flat ${ratePercent}%, est. installment ${formatIDR(result.monthly)}/month`;

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (leadState === "sending") return;

    const name = leadName.trim();
    const phone = leadPhone.replace(/[^0-9+]/g, "");
    if (name.length < 2) {
      toast.error(lang === "id" ? "Nama minimal 2 karakter." : "Name must be at least 2 characters.");
      return;
    }
    if (!/^(\+?62|0)8\d{7,12}$/.test(phone)) {
      toast.error(
        lang === "id"
          ? "Nomor WhatsApp tidak valid — contoh: 081234567890."
          : "Invalid WhatsApp number — e.g. 081234567890."
      );
      return;
    }

    setLeadState("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          model: modelId,
          interest: "general",
          message: leadMessage,
          source: "simulator",
          lang,
          website: leadWebsite,
        }),
      });
      const data = (await res.json().catch(() => null)) as { waUrl?: string } | null;
      if (!res.ok) throw new Error(`status ${res.status}`);
      setLeadWaUrl(data?.waUrl ?? null);
      setLeadState("sent");
      trackEvent("generate_lead", { form: "simulator", model: modelId });
      toast.success(
        lang === "id"
          ? "Terima kasih! Simulasi tersimpan — Sena akan menghubungi Anda dengan angka resmi."
          : "Thank you! Simulation saved — Sena will contact you with official figures."
      );
    } catch {
      setLeadState("error");
      toast.error(
        lang === "id"
          ? "Gagal mengirim. Coba lagi, atau lanjut langsung via WhatsApp di atas."
          : "Failed to send. Try again, or continue straight via the WhatsApp button above."
      );
    }
  }

  return (
    <section
      id="simulasi"
      aria-label="Simulasi kredit"
      className="py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.simulator.eyebrow}
          title={t.simulator.title}
          subtitle={t.simulator.subtitle}
        />

        <Reveal className="mt-12">
          <Card className="mx-auto max-w-5xl overflow-hidden border shadow-xl shadow-primary/5">
            <CardContent className="grid gap-8 p-5 sm:p-8 lg:grid-cols-5 lg:gap-10">
              {/* Inputs */}
              <div className="space-y-7 lg:col-span-3">
                {/* Model */}
                <div className="space-y-2">
                  <Label htmlFor="sim-model">{t.simulator.model}</Label>
                  <Select value={modelId} onValueChange={(v) => { setModelId(v); trackCalc(v); }}>
                    <SelectTrigger id="sim-model" className="h-11 w-full" aria-label={t.simulator.model}>
                      <SelectValue placeholder={t.testDrive.fields.modelPh} />
                    </SelectTrigger>
                    <SelectContent>
                      {MODELS.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name} — {formatIDR(m.priceFrom)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* DP slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sim-dp">{t.simulator.dpPercent}</Label>
                    <span className="font-display text-lg font-bold text-primary">
                      {dpPercent}%
                    </span>
                  </div>
                  <Slider
                    id="sim-dp"
                    value={[dpPercent]}
                    onValueChange={([v]) => { setDpPercent(v); trackCalc(modelId); }}
                    min={10}
                    max={50}
                    step={5}
                    aria-label={t.simulator.dpPercent}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground" aria-hidden="true">
                    <span>10%</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Tenor */}
                <div className="space-y-2">
                  <Label>{t.simulator.tenor}</Label>
                  <div
                    role="radiogroup"
                    aria-label={t.simulator.tenor}
                    className="grid grid-cols-3 gap-2 sm:grid-cols-6"
                  >
                    {TENORS.map((n) => (
                      <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={tenor === n}
                        onClick={() => { setTenor(n); trackCalc(modelId); }}
                        className={`rounded-full border px-2 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                          tenor === n
                            ? "border-primary bg-primary text-primary-foreground"
                            : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sim-rate">{t.simulator.rate}</Label>
                    <span className="font-display text-lg font-bold text-primary">
                      {ratePercent.toFixed(1).replace(".", ",")}%
                    </span>
                  </div>
                  <Slider
                    id="sim-rate"
                    value={[ratePercent]}
                    onValueChange={([v]) => { setRatePercent(v); trackCalc(modelId); }}
                    min={3}
                    max={12}
                    step={0.5}
                    aria-label={t.simulator.rate}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground" aria-hidden="true">
                    <span>3%</span>
                    <span>12%</span>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="flex flex-col rounded-2xl bg-secondary/60 p-5 sm:p-6 lg:col-span-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Calculator className="size-4 text-primary" aria-hidden="true" />
                  {t.simulator.installment}
                </div>
                <p
                  className="mt-2 font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl"
                  aria-live="polite"
                >
                  {formatIDR(result.monthly)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {lang === "id" ? "tenor " : "tenor "}{tenor} {lang === "id" ? "bulan" : "months"} • {ratePercent.toFixed(1).replace(".", ",")}% flat
                </p>

                <dl className="mt-6 space-y-3 border-t pt-5 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">{t.simulator.price}</dt>
                    <dd className="font-semibold">{formatIDR(result.price)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">
                      {t.simulator.dpAmount} ({dpPercent}%)
                    </dt>
                    <dd className="font-semibold">{formatIDR(result.dp)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">{t.simulator.total}</dt>
                    <dd className="font-semibold">{formatIDR(result.total)}</dd>
                  </div>
                </dl>

                <Button
                  asChild
                  className="mt-auto h-11 w-full rounded-full pt-0 text-sm font-semibold"
                >
                  <a
                    href={waLink(waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("wa_click", { location: "simulator" })}
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {t.simulator.cta}
                  </a>
                </Button>
              </div>
            </CardContent>

            {/* Lead capture opsional — kirim simulasi ke konsultan (tanpa paksaan) */}
            <div className="border-t bg-muted/30 p-5 sm:p-6 lg:px-8">
              {leadState === "sent" ? (
                <div
                  aria-live="polite"
                  className="flex flex-wrap items-center gap-3 rounded-xl border bg-background/60 px-4 py-3"
                >
                  <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-sm font-medium">
                    {lang === "id"
                      ? "Simulasi tersimpan — lanjutkan via WhatsApp bila ingin respons lebih cepat."
                      : "Simulation saved — continue via WhatsApp for an even faster reply."}
                  </p>
                  {leadWaUrl && (
                    <Button
                      asChild
                      variant="outline"
                      className="ml-auto h-9 rounded-full text-sm font-semibold text-primary"
                    >
                      <a href={leadWaUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("wa_click", { location: "simulator_followup" })}>
                        <MessageCircle className="size-4" aria-hidden="true" />
                        {lang === "id" ? "Buka WhatsApp" : "Open WhatsApp"}
                      </a>
                    </Button>
                  )}
                </div>
              ) : (
                <form
                  onSubmit={submitLead}
                  className="grid gap-4 lg:grid-cols-[auto_1fr_1fr_auto] lg:items-end lg:gap-5"
                >
                  {/* Honeypot — tersembunyi dari manusia, manis untuk bot */}
                  <input
                    type="text"
                    name="website"
                    value={leadWebsite}
                    onChange={(e) => setLeadWebsite(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="flex items-start gap-2.5 lg:max-w-[240px]">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-bold leading-snug">
                        {lang === "id"
                          ? "Kirim simulasi ini ke Sena (konsultan) — dapatkan angka resmi & promo terkini"
                          : "Send this simulation to Sena (consultant) — get official figures & latest promos"}
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                        {lang === "id"
                          ? "Gratis, tanpa paksaan. Angsuran final tergantung profil kredit."
                          : "Free, no pressure. Final installments depend on your credit profile."}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="sim-lead-name">{lang === "id" ? "Nama" : "Name"}</Label>
                    <Input
                      id="sim-lead-name"
                      name="name"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder={lang === "id" ? "Nama Anda" : "Your name"}
                      autoComplete="name"
                      maxLength={80}
                      required
                      minLength={2}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="sim-lead-phone">
                      {lang === "id" ? "No. WhatsApp" : "WhatsApp number"}
                    </Label>
                    <Input
                      id="sim-lead-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="0812xxxxxxx"
                      autoComplete="tel"
                      maxLength={20}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={leadState === "sending"}
                    className="h-10 rounded-full px-5 font-semibold sm:h-11"
                  >
                    {leadState === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        {lang === "id" ? "Mengirim..." : "Sending..."}
                      </>
                    ) : (
                      <>
                        <Send className="size-4" aria-hidden="true" />
                        {lang === "id" ? "Kirim simulasi" : "Send simulation"}
                      </>
                    )}
                  </Button>
                  {/* Region status untuk screen reader */}
                  <p aria-live="polite" className="sr-only">
                    {leadState === "sending"
                      ? lang === "id"
                        ? "Mengirim simulasi…"
                        : "Sending simulation…"
                      : leadState === "error"
                        ? lang === "id"
                          ? "Gagal mengirim, silakan coba lagi."
                          : "Failed to send, please try again."
                        : ""}
                  </p>
                </form>
              )}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
            {t.simulator.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
