"use client";

import { SOCIALS } from "@/components/social-icons";

/** Baris ikon sosial yang dipakai ulang (halaman kontak & footer). */
export function SocialIconsRow() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {SOCIALS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Pusat Geely — ${label}`}
          title={`Pusat Geely — ${label}`}
          className="inline-flex size-11 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all hover:scale-110 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Icon className="size-5" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
