"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLang } from "@/components/language-provider";
import { SOCIALS } from "@/components/social-icons";
import { waLink } from "@/lib/site";
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

const NAV = [
  { href: "/sales-geely-bogor", key: "sales" },
  { href: "/#model", key: "models" },
  { href: "/#layanan", key: "services", xlOnly: true },
  { href: "/harga-mobil-geely-bogor", key: "harga" },
  { href: "/promo-geely-bogor", key: "promo" },
  { href: "/#galeri", key: "gallery", xlOnly: true },
  { href: "/kredit-cicilan-geely-bogor", key: "simulator" },
  { href: "/artikel", key: "artikel", xlOnly: true },
  { href: "/test-drive-geely-bogor", key: "testDrive" },
  { href: "/#faq", key: "faq", xlOnly: true },
  { href: "/kontak", key: "contact" },
] as const;

export function SiteHeader() {
  const { t, lang, toggle } = useLang();
  const { resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href="#beranda"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-ring"
          aria-label="Pusat Geely — kembali ke atas"
        >
          <BrandMark className="h-9 w-9" />
          <span className="font-display text-lg font-bold leading-none tracking-tight">
            PUSAT<span className="text-primary">GEELY</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Bogor &amp; Jabodetabek
            </span>
          </span>
        </a>

        {/* Desktop nav — subset di lg, lengkap di xl+ */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring",
                item.xlOnly && "hidden xl:inline-block"
              )}
            >
              {t.nav[item.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Social links — very wide screens only, so the 8-item nav never crowds */}
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

          {/* Language toggle */}
          <div
            role="group"
            aria-label="Bahasa / Language"
            className="hidden rounded-full border p-0.5 sm:flex"
          >
            {(["id", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => (l === lang ? undefined : toggle())}
                aria-pressed={lang === l}
                className={cn(
                  "min-w-9 rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors",
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l}
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
            className="hidden md:inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <WhatsAppIcon className="size-4" aria-hidden="true" />
            {t.header.cta}
          </a>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-10 lg:hidden"
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
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left">
                  <BrandMark className="h-7 w-7" />
                  PUSAT<span className="-ml-1.5 text-primary">GEELY</span>
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Navigasi seluler" className="mt-2 flex flex-col gap-1 px-4">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-accent"
                  >
                    {t.nav[item.key]}
                  </a>
                ))}
                <div className="mt-3 flex items-center gap-1.5 px-1">
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
                  <div role="group" aria-label="Bahasa / Language" className="flex rounded-full border p-0.5">
                    {(["id", "en"] as const).map((l) => (
                      <button
                        key={l}
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
              </nav>
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
