"use client";

import Link from "next/link";
import {
  ArrowUp,
  CalendarCheck,
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
  MODELS,
  POPULAR_SEARCHES,
  PRICE_DISCLAIMER,
  waLink,
} from "@/lib/site";
import {
  CREDIT_LINE,
  DESIGN_CREDIT,
  MANAGEMENT_CREDIT,
  TEAM_CREDIT,
} from "@/lib/branding";

type LeafKey =
  | "harga"
  | "promo"
  | "simulator"
  | "testDrive"
  | "artikel"
  | "glosarium"
  | "keywords"
  | "sales"
  | "compare"
  | "about";

/** Tautan internal/external seragam untuk kolom sitemap footer. */
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  const cls =
    "text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring rounded";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h3 className="font-display text-sm font-bold uppercase tracking-wider">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map(({ href, label }) => (
          <li key={`${href}-${label}`}>
            <FooterLink href={href}>{label}</FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

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

  // ── Kolom sitemap footer (standar situs internasional)
  const modelLinks = [
    ...MODELS.map((m) => ({ href: `/model/${m.id}`, label: m.name })),
    { href: "/harga-mobil-geely-bogor", label: `${t.nav.harga} & Varian` },
  ];
  const serviceLinks: { href: string; label: string }[] = [
    { href: "/harga-mobil-geely-bogor", label: t.nav.harga },
    { href: "/promo-geely-bogor", label: t.nav.promo },
    { href: "/kredit-cicilan-geely-bogor", label: t.nav.simulator },
    { href: "/test-drive-geely-bogor", label: t.nav.testDrive },
    { href: "/sales-geely-bogor", label: t.nav.sales },
  ];
  const insightLinks: { href: string; label: string }[] = [
    { href: "/artikel", label: t.nav.artikel },
    { href: "/glosarium", label: t.nav.glosarium },
    { href: "/vs", label: t.nav.compare },
    { href: "/indeks-kata-kunci", label: t.nav.keywords },
    { href: "/tentang", label: t.nav.about },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        {/* ══ CTA BAND — ajakan utama sebelum sitemap ══ */}
        <div className="overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                {t.cta.title}
              </h2>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {t.cta.subtitle}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <a
                href={waLink("Halo Pusat Geely! Saya siap diskusi soal Geely saya.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-95 active:scale-[0.97]"
              >
                <WhatsAppIcon className="size-4" aria-hidden="true" />
                {t.cta.button}
              </a>
              <Link
                href="/test-drive-geely-bogor"
                className="inline-flex h-11 items-center gap-2 rounded-full border px-6 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                <CalendarCheck className="size-4 text-primary" aria-hidden="true" />
                {t.hero.ctaPrimary}
              </Link>
            </div>
          </div>
        </div>

        {/* ══ SITEMAP GRID — brand · model · layanan · wawasan · kontak ══ */}
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.1fr_1.1fr_1.2fr]">
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

          {/* Sitemap columns */}
          <FooterColumn title={t.footer.modelsTitle} links={modelLinks} />
          <FooterColumn title={t.footer.servicesTitle} links={serviceLinks} />
          <FooterColumn title={t.footer.insightsTitle} links={insightLinks} />

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
            <li>
              <a
                href="/artikel"
                className="inline-flex items-center rounded-full border bg-card px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                #artikel-panduan
              </a>
            </li>
            <li>
              <a
                href="/glosarium"
                className="inline-flex items-center rounded-full border bg-card px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                #glosarium-otomotif
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
          ══ DIGITAL SUPPORT SYSTEM — kredit branding (permintaan pemilik) ══
          Blok elegan & terlihat: digiman.id (Design) · topkonsultan.web.id
          (Management) + tim 4 identitas. Dipasangkan dengan JSON-LD, meta,
          humans.txt, llms.txt & HTML signature di layout (view-source).
        */}
        <div className="mt-10 border-t pt-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-muted-foreground/80">
              {t.footer.supportTitle}
            </p>
            <p className="text-xs text-muted-foreground">{t.footer.supportNote}</p>
            <div className="flex flex-wrap items-stretch justify-center gap-3">
              <a
                href={DESIGN_CREDIT.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border bg-card px-4 py-3 text-left transition-all hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 focus-visible:outline-2 focus-visible:outline-ring"
              >
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 font-display text-sm font-black text-white transition-transform group-hover:scale-105"
                >
                  DG
                </span>
                <span className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {DESIGN_CREDIT.label}
                  </span>
                  <span className="text-sm font-semibold">{DESIGN_CREDIT.orgName}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {DESIGN_CREDIT.scope} · {DESIGN_CREDIT.domain}
                  </span>
                </span>
              </a>
              <a
                href={MANAGEMENT_CREDIT.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border bg-card px-4 py-3 text-left transition-all hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 focus-visible:outline-2 focus-visible:outline-ring"
              >
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-emerald-400 font-display text-sm font-black text-white transition-transform group-hover:scale-105"
                >
                  TK
                </span>
                <span className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {MANAGEMENT_CREDIT.label}
                  </span>
                  <span className="text-sm font-semibold">{MANAGEMENT_CREDIT.orgName}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {MANAGEMENT_CREDIT.domain}
                  </span>
                </span>
              </a>
            </div>
            <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
              {t.footer.teamLabel}:{" "}
              <span className="font-semibold text-foreground/80">{TEAM_CREDIT.line}</span>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <p className="font-medium">{t.footer.madeIn}</p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label={t.footer.backToTop}
            className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all hover:border-primary/50 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            {t.footer.backToTop}
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </button>
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
