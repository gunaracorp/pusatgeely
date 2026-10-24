"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CalendarCheck, CheckCircle2, Send, ShieldCheck, UserCheck } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AREAS, INTERESTS, MODELS, waLink } from "@/lib/site";
import { useLeadIntent } from "@/store/lead-intent";

type FormValues = {
  name: string;
  phone: string;
  model: string;
  interest: string;
  area: string;
  preferredDate: string;
  message: string;
  /** honeypot — humans never see or fill this */
  website: string;
};

export function TestDriveSection() {
  const { t, lang } = useLang();
  const intentModel = useLeadIntent((s) => s.intentModel);
  const [submitting, setSubmitting] = useState(false);
  const [successWaUrl, setSuccessWaUrl] = useState<string | null>(null);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    // Deferred — setState must not run synchronously inside the effect body.
    const raf = requestAnimationFrame(() => {
      setMinDate(new Date().toISOString().slice(0, 10));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t.testDrive.errors.name),
        phone: z
          .string()
          .transform((v) => v.replace(/[^0-9+]/g, ""))
          .refine((v) => /^(\+?62|0)8\d{7,12}$/.test(v), {
            message: t.testDrive.errors.phone,
          }),
        model: z.string(),
        interest: z.string(),
        area: z.string(),
        preferredDate: z.string(),
        message: z.string().max(1000),
        website: z.string().max(0),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      model: "any",
      interest: "test-drive",
      area: "",
      preferredDate: "",
      message: "",
      website: "",
    },
  });

  // Sync preselected model from model cards.
  useEffect(() => {
    if (intentModel) setValue("model", intentModel);
  }, [intentModel, setValue]);

  const watchModel = watch("model");
  const watchInterest = watch("interest");
  const watchArea = watch("area");

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, lang }),
      });
      const data = (await res.json()) as { ok: boolean; waUrl?: string; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "failed");
      setSuccessWaUrl(data.waUrl ?? waLink("Halo Pusat Geely, saya baru saja mengirim permintaan lewat website."));
      toast.success(t.testDrive.successTitle);
    } catch {
      toast.error(t.testDrive.errors.submit);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="test-drive"
      aria-label="Form test drive dan konsultasi"
      className="border-y bg-secondary/40 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.testDrive.eyebrow}
          title={t.testDrive.title}
          subtitle={t.testDrive.subtitle}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Trust panel */}
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border bg-card p-6 sm:p-8">
              <ul className="space-y-5">
                {t.testDrive.whyItems.map((item, i) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      {i === 0 ? (
                        <UserCheck className="size-4" aria-hidden="true" />
                      ) : i === 1 ? (
                        <CalendarCheck className="size-4" aria-hidden="true" />
                      ) : (
                        <ShieldCheck className="size-4" aria-hidden="true" />
                      )}
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl bg-accent/60 p-4 text-sm leading-relaxed text-accent-foreground">
                {t.testDrive.privacy}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-2xl border bg-card p-6 sm:p-8">
              {successWaUrl ? (
                <div className="flex flex-col items-center py-8 text-center" role="status">
                  <span className="mb-5 inline-flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <CheckCircle2 className="size-9" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-2xl font-bold">{t.testDrive.successTitle}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {t.testDrive.successDesc}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="mt-7 h-12 rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/25"
                  >
                    <a href={successWaUrl} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon className="size-5" aria-hidden="true" />
                      {t.testDrive.successCta}
                    </a>
                  </Button>
                  <button
                    type="button"
                    onClick={() => {
                      setSuccessWaUrl(null);
                      reset();
                    }}
                    className="mt-4 text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {t.testDrive.again}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  {/* Honeypot */}
                  <input
                    {...register("website")}
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="td-name">{t.testDrive.fields.name} *</Label>
                      <Input
                        id="td-name"
                        placeholder={t.testDrive.fields.namePh}
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        {...register("name")}
                      />
                      {errors.name ? (
                        <p className="text-xs font-medium text-destructive">{errors.name.message}</p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="td-phone">{t.testDrive.fields.phone} *</Label>
                      <Input
                        id="td-phone"
                        type="tel"
                        inputMode="tel"
                        placeholder={t.testDrive.fields.phonePh}
                        autoComplete="tel"
                        aria-invalid={!!errors.phone}
                        {...register("phone")}
                      />
                      {errors.phone ? (
                        <p className="text-xs font-medium text-destructive">{errors.phone.message}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="td-model">{t.testDrive.fields.model}</Label>
                      <Select value={watchModel} onValueChange={(v) => setValue("model", v)}>
                        <SelectTrigger id="td-model" className="w-full" aria-label={t.testDrive.fields.model}>
                          <SelectValue placeholder={t.testDrive.fields.modelPh} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">{t.testDrive.fields.modelAny}</SelectItem>
                          {MODELS.map((m) => (
                            <SelectItem key={m.id} value={m.id}>
                              {m.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="td-interest">{t.testDrive.fields.interest}</Label>
                      <Select value={watchInterest} onValueChange={(v) => setValue("interest", v)}>
                        <SelectTrigger id="td-interest" className="w-full" aria-label={t.testDrive.fields.interest}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {INTERESTS.map((i) => (
                            <SelectItem key={i} value={i}>
                              {t.testDrive.fields.interests[i]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="td-area">{t.testDrive.fields.area}</Label>
                      <Select value={watchArea} onValueChange={(v) => setValue("area", v)}>
                        <SelectTrigger id="td-area" className="w-full" aria-label={t.testDrive.fields.area}>
                          <SelectValue placeholder={t.testDrive.fields.areaPh} />
                        </SelectTrigger>
                        <SelectContent className="max-h-64">
                          {AREAS.map((a) => (
                            <SelectItem key={a} value={a}>
                              {a}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="td-date">{t.testDrive.fields.date}</Label>
                      <Input
                        id="td-date"
                        type="date"
                        min={minDate}
                        {...register("preferredDate")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="td-message">{t.testDrive.fields.message}</Label>
                    <Textarea
                      id="td-message"
                      rows={3}
                      placeholder={t.testDrive.fields.messagePh}
                      {...register("message")}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    size="lg"
                    className="h-12 w-full rounded-full text-base font-semibold shadow-lg shadow-primary/25"
                  >
                    {submitting ? (
                      <>
                        <span
                          className="size-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground"
                          aria-hidden="true"
                        />
                        {t.testDrive.submitting}
                      </>
                    ) : (
                      <>
                        <Send className="size-5" aria-hidden="true" />
                        {t.testDrive.submit}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
