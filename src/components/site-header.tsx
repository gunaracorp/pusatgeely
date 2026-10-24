"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CalendarCheck,
  ChevronDown,
  Images,
  Mail,
  MessageCircleQuestion,
  Moon,
  Search,
  Sun,
  Swords,
  Tag,
  UserRound,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLang } from "@/components/language-provider";
import { SOCIALS } from "@/components/social-icons";
import { MODELS, POWERTRAIN_LABEL, formatJuta, waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Original Pusat Geely emblem — hexagonal "G" mark (not an official Geely logo). */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M24 3 43 13.5v21L24 45 5 34.5v-21L24 3Z"
        className="stroke-primary"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M31.5 19.2c-1.6-2.4-4.3-3.9-7.4-3.9-5 0-9 3.9-9 8.7s4 8.7 9 8.7c4.2 0 7.7-2.8 8.7-6.6h-8.2"
        className="stroke-foreground"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

type GroupKey = "model" | "layanan" | "jelajah";
type LeafKey =
  | "harga"
  | "promo"
  | "simulator"
  | "testDrive"
  | "artikel"
  | "gallery"
  | "faq"
  | "keywords"
  | "sales"
  | "contact"
  | "compare";

/** Layanan — 4 tautan konversi utama. */
const LAYANAN: ReadonlyArray<{
  href: string;
  key: LeafKey;
  desc: "hargaDesc" | "promoDesc" | "kreditDesc" | "testDriveDesc";
  icon: typeof Wallet;
}> = [
  { href: "/harga-mobil-geely-bogor", key: "harga", desc: "hargaDesc", icon: Wallet },
  { href: "/promo-geely-bogor", key: "promo", desc: "promoDesc", icon: Tag },
  { href: "/kredit-cicilan-geely-bogor", key: "simulator", desc: "kreditDesc", icon: Calculator },
  { href: "/test-drive-geely-bogor", key: "testDrive", desc: "testDriveDesc", icon: CalendarCheck },
];

/** Jelajah — konten informasi & halaman pendukung. */
const JELAJAH: ReadonlyArray<{ href: string; key: LeafKey; icon: typeof BookOpen }> = [
  { href: "/vs", key: "compare", icon: Swords },
  { href: "/artikel", key: "artikel", icon: BookOpen },
  { href: "/#galeri", key: "gallery", icon: Images },
  { href: "/#faq", key: "faq", icon: MessageCircleQuestion },
  { href: "/indeks-kata-kunci", key: "keywords", icon: Search },
  { href: "/sales-geely-bogor", key: "sales", icon: UserRound },
  { href: "/kontak", key: "contact", icon: Mail },
];

/** Gaya trigger nav desktop — underline gradient muncul saat hover/aktif. */
function triggerCls(active: boolean) {
  return cn(
    "relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
    "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-emerald-500 after:to-teal-500 after:transition-transform after:duration-200 hover:after:scale-x-100",
    active && "text-foreground after:scale-x-100"
  );
}

/** Entri panel dropdown dengan stagger halus. */
function PanelItem({
  index,
  reduce,
  className,
  children,
}: {
  index: number;
  reduce: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.028 * index, duration: 0.16, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const mobileListVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.22, ease: "easeOut" } },
};

function MobileSection({ label }: { label: string }) {
  return (
    <p className="mt-4 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
      {label}
    </p>
  );
}

function MobileItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={mobileItemVariants} className="flex flex-col">
      {children}
    </motion.div>
  );
}

export function SiteHeader() {
  const { t, lang, toggle } = useLang();
  const { resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<GroupKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<Record<GroupKey, HTMLButtonElement | null>>({
    model: null,
    layanan: null,
    jelajah: null,
  });
  const reduce = useReducedMotion();

  /** Progress baca halaman — spring tipis di tepi bawah header. */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 380, damping: 34, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Defer the initial check — setState must not run synchronously in the effect body.
    const raf = requestAnimationFrame(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Dropdown terbuka: tutup saat klik di luar nav atau tekan Escape.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        triggerRefs.current[openMenu]?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    },
    []
  );

  const openNow = (key: GroupKey) => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    setOpenMenu(key);
  };
  const closeSoon = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65"
          : "border-b border-transparent bg-transparent"
      )}
    >
      {/* Progress baca — hanya transform (GPU), hormati reduced motion */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400"
        />
      )}

      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-[height] duration-300 sm:px-6 lg:px-8",
          scrolled ? "h-14" : "h-16"
        )}
      >
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-ring"
          aria-label="Pusat Geely — ke beranda"
        >
          <BrandMark className="h-9 w-9 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-105" />
          <span className="font-display text-lg font-bold leading-none tracking-tight">
            PUSAT<span className="text-primary">GEELY</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Bogor &amp; Jabodetabek
            </span>
          </span>
        </Link>

        {/* Desktop nav — 3 grup rapi, panel animasi halus */}
        <nav
          ref={navRef}
          aria-label="Navigasi utama"
          className="hidden items-center gap-1 lg:flex"
        >
          {/* ── MODEL ── */}
          <div className="relative">
            <button
              ref={(el) => {
                triggerRefs.current.model = el;
              }}
              type="button"
              aria-expanded={openMenu === "model"}
              onClick={() => setOpenMenu(openMenu === "model" ? null : "model")}
              onMouseEnter={() => openNow("model")}
              onMouseLeave={closeSoon}
              className={triggerCls(openMenu === "model")}
            >
              {t.nav.models}
              <ChevronDown
                className={cn(
                  "size-3.5 opacity-60 transition-transform duration-200",
                  openMenu === "model" && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            <div
              className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
              onMouseEnter={() => openNow("model")}
              onMouseLeave={closeSoon}
            >
              <AnimatePresence>
                {openMenu === "model" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.985 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="w-[540px] overflow-hidden rounded-2xl border bg-popover/95 p-2 shadow-xl shadow-black/10 backdrop-blur-xl"
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {MODELS.map((m, i) => (
                        <PanelItem key={m.id} index={i} reduce={!!reduce}>
                          <Link
                            href={`/model/${m.id}`}
                            onClick={() => setOpenMenu(null)}
                            className="flex flex-col gap-1 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
                          >
                            <span className="text-sm font-semibold">{m.name}</span>
                            <span className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                              {POWERTRAIN_LABEL[m.powertrain][lang]}
                              <span className="font-display text-xs font-bold text-primary">
                                {lang === "id" ? "Mulai" : "From"} {formatJuta(m.priceFrom)}
                              </span>
                            </span>
                          </Link>
                        </PanelItem>
                      ))}
                    </div>
                    <PanelItem index={MODELS.length} reduce={!!reduce}>
                      <Link
                        href="/harga-mobil-geely-bogor"
                        onClick={() => setOpenMenu(null)}
                        className="mt-1 flex items-center justify-center gap-1.5 rounded-xl border-t bg-primary/5 px-3 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                      >
                        {t.nav.seeAllPrices}
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    </PanelItem>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── LAYANAN ── */}
          <div className="relative">
            <button
              ref={(el) => {
                triggerRefs.current.layanan = el;
              }}
              type="button"
              aria-expanded={openMenu === "layanan"}
              onClick={() => setOpenMenu(openMenu === "layanan" ? null : "layanan")}
              onMouseEnter={() => openNow("layanan")}
              onMouseLeave={closeSoon}
              className={triggerCls(openMenu === "layanan")}
            >
              {t.nav.services}
              <ChevronDown
                className={cn(
                  "size-3.5 opacity-60 transition-transform duration-200",
                  openMenu === "layanan" && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            <div
              className="absolute left-0 top-full z-50 pt-2"
              onMouseEnter={() => openNow("layanan")}
              onMouseLeave={closeSoon}
            >
              <AnimatePresence>
                {openMenu === "layanan" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.985 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="flex w-[320px] flex-col gap-0.5 rounded-2xl border bg-popover/95 p-2 shadow-xl shadow-black/10 backdrop-blur-xl"
                  >
                    {LAYANAN.map((s, i) => (
                      <PanelItem key={s.key} index={i} reduce={!!reduce}>
                        <Link
                          href={s.href}
                          onClick={() => setOpenMenu(null)}
                          className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
                        >
                          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <s.icon className="size-4" aria-hidden="true" />
                          </span>
                          <span className="flex flex-col">
                            <span className="text-sm font-medium text-foreground">
                              {t.nav[s.key]}
                            </span>
                            <span className="text-xs text-muted-foreground">{t.nav[s.desc]}</span>
                          </span>
                        </Link>
                      </PanelItem>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── JELAJAH ── */}
          <div className="relative">
            <button
              ref={(el) => {
                triggerRefs.current.jelajah = el;
              }}
              type="button"
              aria-expanded={openMenu === "jelajah"}
              onClick={() => setOpenMenu(openMenu === "jelajah" ? null : "jelajah")}
              onMouseEnter={() => openNow("jelajah")}
              onMouseLeave={closeSoon}
              className={triggerCls(openMenu === "jelajah")}
            >
              {t.nav.explore}
              <ChevronDown
                className={cn(
                  "size-3.5 opacity-60 transition-transform duration-200",
                  openMenu === "jelajah" && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            <div
              className="absolute right-0 top-full z-50 pt-2"
              onMouseEnter={() => openNow("jelajah")}
              onMouseLeave={closeSoon}
            >
              <AnimatePresence>
                {openMenu === "jelajah" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.985 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="flex w-[250px] flex-col gap-0.5 rounded-2xl border bg-popover/95 p-2 shadow-xl shadow-black/10 backdrop-blur-xl"
                  >
                    {JELAJAH.map((s, i) => (
                      <PanelItem key={s.key} index={i} reduce={!!reduce}>
                        <Link
                          href={s.href}
                          onClick={() => setOpenMenu(null)}
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:bg-accent focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                        >
                          <s.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                          {t.nav[s.key]}
                        </Link>
                      </PanelItem>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          {/* Social links — very wide screens only */}
          <div className="hidden items-center gap-0.5 2xl:flex">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Pusat Geely — ${label}`}
                title={`Pusat Geely — ${label}`}
                className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
            <span aria-hidden="true" className="mx-1.5 h-5 w-px bg-border" />
          </div>

          {/* Language toggle — pill indikator meluncur halus */}
          <div
            role="group"
            aria-label="Bahasa / Language"
            className="hidden rounded-full border p-0.5 sm:flex"
          >
            {(["id", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => (l === lang ? undefined : toggle())}
                aria-pressed={lang === l}
                className="relative min-w-9 rounded-full px-2.5 py-1 text-xs font-semibold uppercase focus-visible:outline-2 focus-visible:outline-ring"
              >
                {lang === l && (
                  <motion.span
                    layoutId="lang-pill"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 38 }}
                    className="absolute inset-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={cn(
                    "relative z-10",
                    lang === l
                      ? "text-primary-foreground"
                      : "text-muted-foreground transition-colors hover:text-foreground"
                  )}
                >
                  {l}
                </span>
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden size-9 sm:inline-flex"
            aria-label={t.header.theme}
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            {/* CSS-driven swap — no mounted state needed, hydration-safe */}
            <Sun className="size-4 dark:hidden" aria-hidden="true" />
            <Moon className="hidden size-4 dark:inline-block" aria-hidden="true" />
          </Button>

          {/* WA CTA */}
          <a
            href={waLink("Halo Pusat Geely, saya ingin konsultasi tentang mobil Geely.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-95 hover:shadow-md hover:shadow-primary/25 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-ring md:inline-flex"
          >
            <WhatsAppIcon className="size-4" aria-hidden="true" />
            {t.header.cta}
          </a>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-10 transition-transform active:scale-95 lg:hidden"
                aria-label={t.header.openMenu}
                /* Radix derives aria-controls from React.useId() inside
                   DialogRoot — it cannot be pinned from outside. In some
                   client environments (browser extensions / stale HMR HTML)
                   that id differs from the SSR one. The value self-corrects
                   on the first re-render when the menu opens, and Radix
                   renders the sheet lazily anyway, so the mismatch is
                   benign — suppress the warning at the source. */
                suppressHydrationWarning
              >
                <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left">
                  <BrandMark className="h-7 w-7" />
                  PUSAT<span className="-ml-1.5 text-primary">GEELY</span>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  {lang === "id"
                    ? "Menu navigasi: model, layanan, dan jelajah."
                    : "Navigation menu: models, services, and explore."}
                </SheetDescription>
              </SheetHeader>
              <motion.nav
                aria-label="Navigasi seluler"
                className="mt-2 flex flex-col pb-8"
                initial={reduce ? false : "hidden"}
                animate="show"
                variants={reduce ? undefined : mobileListVariants}
              >
                {/* MODEL */}
                <MobileSection label={t.nav.models} />
                {MODELS.map((m) => (
                  <MobileItem key={m.id}>
                    <Link
                      href={`/model/${m.id}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-accent"
                    >
                      {m.name}
                      <span className="font-display text-xs font-bold text-primary">
                        {formatJuta(m.priceFrom)}
                      </span>
                    </Link>
                  </MobileItem>
                ))}
                <MobileItem>
                  <Link
                    href="/harga-mobil-geely-bogor"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                  >
                    {t.nav.seeAllPrices}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </MobileItem>

                {/* LAYANAN */}
                <MobileSection label={t.nav.services} />
                {LAYANAN.map((s) => (
                  <MobileItem key={s.key}>
                    <Link
                      href={s.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <s.icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[15px] font-medium">{t.nav[s.key]}</span>
                        <span className="text-[11px] text-muted-foreground">{t.nav[s.desc]}</span>
                      </span>
                    </Link>
                  </MobileItem>
                ))}

                {/* JELAJAH */}
                <MobileSection label={t.nav.explore} />
                {JELAJAH.map((s) => (
                  <MobileItem key={s.key}>
                    <Link
                      href={s.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-accent"
                    >
                      <s.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      {t.nav[s.key]}
                    </Link>
                  </MobileItem>
                ))}

                <div className="mt-4 flex items-center gap-1.5 px-1">
                  {SOCIALS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Pusat Geely — ${label}`}
                      className="inline-flex size-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 border-t pt-4">
                  <div
                    role="group"
                    aria-label="Bahasa / Language"
                    className="flex rounded-full border p-0.5"
                  >
                    {(["id", "en"] as const).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => (l === lang ? undefined : toggle())}
                        aria-pressed={lang === l}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs font-semibold uppercase",
                          lang === l
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-9"
                    aria-label={t.header.theme}
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  >
                    <Sun className="size-4 dark:hidden" />
                    <Moon className="hidden size-4 dark:inline-block" />
                  </Button>
                </div>
              </motion.nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
