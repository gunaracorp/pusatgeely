"use client";

import {
  ArrowUpRight,
  Clock,
  Instagram,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { SOCIALS } from "@/components/social-icons";
import { useLang } from "@/components/language-provider";
import { BrandMark, WhatsAppIcon } from "@/components/site-header";
import {
  BUSINESS,
  INDEPENDENCE_DISCLAIMER,
  POPULAR_SEARCHES,
  PRICE_DISCLAIMER,
  waLink,
} from "@/lib/site";
import { CREDIT_LINE, DESIGN_CREDIT, MANAGEMENT_CREDIT, TEAM_CREDIT } from "@/lib/branding";

const NAV_LINKS = [
  { href: "#model", key: "models" },
  { href: "#layanan", key: "services" },
  { href: "#galeri", key: "gallery" },
  { href: "#simulasi", key: "simulator" },
  { href: "#test-drive", key: "testDrive" },
  { href: "#faq", key: "faq" },
  { href: "#wilayah", key: "contact" },
] as const;

export function ContactFooter() {
  const { t, lang } = useLang();

  const contactRows = [
    {
      icon: Phone,
      label: "WhatsApp",
      value: BUSINESS.waDisplay,
      href: waLink("Halo Pusat Geely, saya ingin bertanya tentang mobil Geely."),
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: BUSINESS.email,
      href: `mailto:${BUSINESS.email}`,
      external: false,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: BUSINESS.instagram,
      href: BUSINESS.instagramUrl,
      external: true,
    },
  ];

  return (
    <footer
      id="kontak"
      className="relative mt-auto overflow-hidden border-t bg-secondary/40"
    >
      {/* Emerald glow accent line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 pb-6 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a
              href="#beranda"
              className="group inline-flex items-center gap-2.5"
              aria-label="Pusat Geely"
            >
              <BrandMark className="h-9 w-9 transition-transform group-hover:scale-105" />
              <span className="font-display text-lg font-bold tracking-tight">
                PUSAT<span className="text-primary">GEELY</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t.footer.about}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium">
              <UserRound className="size-3.5 text-primary" aria-hidden="true" />
              {BUSINESS.pic} — {BUSINESS.role[lang]}
            </p>
            <div className="mt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t.footer.followLabel}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Pusat Geely — ${label}`}
                    title={`Pusat Geely — ${label}`}
                    className="inline-flex size-10 items-center justify-center rounded-full border bg-card text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Navigasi footer">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider">
              {t.footer.navTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t.nav[link.key]}
                    <ArrowUpRight
                      className="size-3.5 -translate-x-1 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              {contactRows.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-3 text-sm"
                  >
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted-foreground">{label}</span>
                      <span className="font-medium">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3 text-sm">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Clock className="size-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">{t.coverage.hoursLabel}</span>
                  <span className="font-medium">{BUSINESS.hours[lang]}</span>
                </span>
              </li>
            </ul>
          </div>

          {/* WA card */}
          <div className="flex flex-col justify-between gap-5 rounded-2xl border bg-card p-5">
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider">
                {t.header.cta}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t.cta.subtitle}
              </p>
            </div>
            <a
              href={waLink("Halo Pusat Geely!")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon className="size-4" aria-hidden="true" />
              {BUSINESS.waDisplay}
            </a>
          </div>
        </div>

        {/* Popular searches — keyword-rich internal links */}
        <nav
          aria-label={t.footer.popularTitle}
          className="mt-10 border-t pt-6"
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t.footer.popularTitle}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="inline-flex items-center rounded-full border bg-card px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  #{label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/indeks-kata-kunci"
                className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                #lihat-semua-2.600+kata-kunci →
              </a>
            </li>
          </ul>
        </nav>

        {/* Legal */}
        <div className="mt-8 space-y-3 border-t pt-6 text-[11px] leading-relaxed text-muted-foreground">
          <p>
            <span className="font-bold uppercase tracking-wide">
              {t.footer.legalTitle}:{" "}
            </span>
            {INDEPENDENCE_DISCLAIMER[lang]}
          </p>
          <p>{PRICE_DISCLAIMER[lang]}</p>
          <p>{t.footer.visualNote}</p>
        </div>

        {/*
          Personal branding — kredit design & management (permintaan pemilik).
          Tampak halus: teks kecil, tautan netral, tetap elegan di footer.
        */}
        <div className="mt-6 space-y-1.5 border-t pt-4 text-[11px] leading-relaxed text-muted-foreground">
          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
            <span className="font-bold uppercase tracking-wider">
              {DESIGN_CREDIT.label}
            </span>
            <a
              href={DESIGN_CREDIT.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground/75 underline-offset-2 transition-colors hover:text-primary hover:underline"
            >
              {DESIGN_CREDIT.orgName}
            </a>
            <span aria-hidden="true">·</span>
            <span>
              {DESIGN_CREDIT.scope} — {DESIGN_CREDIT.domain}
            </span>
          </p>
          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
            <span className="font-bold uppercase tracking-wider">
              {MANAGEMENT_CREDIT.label}
            </span>
            <a
              href={MANAGEMENT_CREDIT.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground/75 underline-offset-2 transition-colors hover:text-primary hover:underline"
            >
              {MANAGEMENT_CREDIT.orgName}
            </a>
            <span aria-hidden="true">·</span>
            <span>{MANAGEMENT_CREDIT.domain}</span>
          </p>
          <p>
            <span className="font-bold uppercase tracking-wider">Tim </span>
            {TEAM_CREDIT.line}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <p className="font-medium">{t.footer.madeIn}</p>
        </div>

        {/*
          GHOST BRANDING — kredit support system (versi mesin, satu baris).
          sr-only: pelengkap blok kredit visible di atas.
        */}
        <p className="sr-only">{CREDIT_LINE}</p>
      </div>

      {/* Giant decorative wordmark */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="translate-y-[16%] whitespace-nowrap bg-gradient-to-b from-foreground/[0.08] to-foreground/[0.015] bg-clip-text text-center font-display text-[clamp(2.5rem,11vw,10rem)] font-black leading-[0.8] tracking-tighter text-transparent">
          PUSAT GEELY
        </p>
      </div>
    </footer>
  );
}
