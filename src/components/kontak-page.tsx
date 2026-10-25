"use client";

import { Mail, MapPin, MessageCircle } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SocialIconsRow } from "@/components/social-icons-row";
import { WhatsAppIcon } from "@/components/site-header";
import { AREAS, BUSINESS } from "@/lib/site";

export function KontakPage({ waHref }: { waHref: string }) {
  const { lang, t } = useLang();

  const channels = [
    {
      Icon: MessageCircle,
      label: "WhatsApp",
      value: BUSINESS.waDisplay,
      href: waHref,
      note:
        lang === "id"
          ? "Jalur tercepat — biasanya dibalas dalam hitungan menit pada jam kerja."
          : "Fastest channel — usually replied within minutes during working hours.",
      primary: true,
    },
    {
      Icon: Mail,
      label: "Email",
      value: BUSINESS.email,
      href: `mailto:${BUSINESS.email}`,
      note:
        lang === "id"
          ? "Untuk dokumen, undangan kerja sama, atau pertanyaan tertulis yang tidak tergesa."
          : "For documents, partnership invitations, or written questions without hurry.",
      primary: false,
    },
  ] as const;

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t.nav.contact }]} />

      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {lang === "id" ? "Hubungi Kami" : "Contact Us"}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {lang === "id"
            ? "Satu Chat, Semua Pertanyaan Geely Anda Terjawab"
            : "One Chat, Every Geely Question Answered"}
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {lang === "id"
            ? `Konsultasi, test drive, simulasi kredit, trade-in, atau sekadar bertanya "EX2 vs Coolray lebih cocok yang mana?" — semuanya bisa dimulai dari satu pesan. Layanan kami gratis, tanpa kewajiban, dan ${BUSINESS.pic} sendiri yang membalas.`
            : `Consultations, test drives, credit simulations, trade-ins, or simply asking "EX2 vs Coolray — which fits me?" — it all starts with one message. Our service is free, with no obligation, and ${BUSINESS.pic} answers personally.`}
        </p>
      </header>

      {/* Kanal kontak */}
      <section className="mt-10 grid gap-4 md:grid-cols-2" aria-label="Kanal kontak">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`group rounded-2xl border p-6 transition-colors ${
              c.primary
                ? "border-[#25D366]/40 bg-[#25D366]/5 hover:border-[#25D366]"
                : "bg-card hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-3">
              {c.primary ? (
                <WhatsAppIcon className="size-6 text-[#25D366]" aria-hidden="true" />
              ) : (
                <c.Icon className="size-6 text-primary" aria-hidden="true" />
              )}
              <span className="text-sm font-bold uppercase tracking-wide">{c.label}</span>
            </div>
            <p className="mt-3 font-display text-lg font-bold">{c.value}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.note}</p>
          </a>
        ))}
      </section>

      {/* Jam & area */}
      <section className="mt-8 grid gap-4 md:grid-cols-2" aria-label="Jam layanan dan area">
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-base font-bold">
            {lang === "id" ? "Jam Layanan" : "Service Hours"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{BUSINESS.hours[lang]}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {lang === "id"
              ? "Di luar jam tersebut? Kirim saja pesan — kami balas begitu jadwal membuka. Test drive dan serah terima dijadwalkan sesuai kesepakatan, termasuk akhir pekan."
              : "Outside those hours? Send the message anyway — we reply as soon as the schedule opens. Test drives and handovers are scheduled by agreement, weekends included."}
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <h2 className="flex items-center gap-2 text-base font-bold">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            {lang === "id" ? "Area Layanan" : "Service Area"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{BUSINESS.region[lang]}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {AREAS.map((a) => (
              <li
                key={a}
                className="rounded-full border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
              >
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {lang === "id"
              ? "Di luar daftar di atas tetap boleh chat — kalau jadwal memungkinkan, kami usahakan."
              : "Outside the list above you can still chat — if the schedule allows, we'll make it work."}
          </p>
        </div>
      </section>

      {/* Sosial */}
      <section className="mt-8 rounded-2xl border bg-card p-6" aria-label="Media sosial">
        <h2 className="text-base font-bold">
          {lang === "id" ? "Ikuti Aktivitas Kami" : "Follow Our Activity"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {lang === "id"
            ? "Dokumentasi serah terima, review jujur, dan update promo di-publish rutin di sosial media kami."
            : "Handover documentation, honest reviews, and promo updates are published regularly on our socials."}
        </p>
        <div className="mt-4">
          <SocialIconsRow />
        </div>
      </section>

      {/* CTA besar */}
      <div className="mt-10 flex justify-center">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-8 text-base font-bold text-white shadow-xl shadow-[#25D366]/30 transition-transform hover:scale-105"
        >
          <WhatsAppIcon className="size-6" aria-hidden="true" />
          {t.header.cta}
        </a>
      </div>
    </article>
  );
}
