"use client";

import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { SOCIALS } from "@/components/social-icons";
import { WhatsAppIcon } from "@/components/site-header";
import { waLink } from "@/lib/site";

/**
 * Floating conversion shortcuts:
 * - Mobile: sticky bottom action bar (44px+ touch targets).
 * - Desktop: WhatsApp FAB bottom-right.
 */
export function FloatingCta() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop FAB */}
      <a
        href={waLink("Halo Pusat Geely, saya ingin bertanya tentang mobil Geely.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.floating.open}
        className={`fixed bottom-6 right-6 z-40 hidden size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-ring md:inline-flex ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <WhatsAppIcon className="size-7" aria-hidden="true" />
      </a>

      {/* Desktop: social shortcuts stacked above the WhatsApp FAB */}
      <div
        aria-label="Media sosial Pusat Geely"
        className={`fixed right-6 bottom-24 z-40 hidden flex-col gap-2 transition-all duration-300 md:flex ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {SOCIALS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Pusat Geely — ${label}`}
            title={`Pusat Geely — ${label}`}
            className="inline-flex size-10 items-center justify-center rounded-full border bg-background/90 text-muted-foreground shadow-lg backdrop-blur transition-all hover:scale-110 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <Icon className="size-4" aria-hidden="true" />
          </a>
        ))}
      </div>

      {/* Mobile sticky bottom bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t bg-background/90 p-3 backdrop-blur-xl transition-transform duration-300 md:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto grid max-w-md grid-cols-2 gap-2.5">
          <a
            href="#test-drive"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card text-sm font-semibold"
          >
            <CalendarCheck className="size-4 text-primary" aria-hidden="true" />
            {t.floating.testDrive}
          </a>
          <a
            href={waLink("Halo Pusat Geely, saya ingin bertanya tentang mobil Geely.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-bold text-white shadow-lg shadow-[#25D366]/30"
          >
            <WhatsAppIcon className="size-4" aria-hidden="true" />
            {t.floating.wa}
          </a>
        </div>
      </div>
    </>
  );
}
