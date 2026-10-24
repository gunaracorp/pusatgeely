"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLang } from "@/components/language-provider";

/**
 * Breadcrumb visual di atas judul halaman (JSON-LD BreadcrumbList
 * dirender terpisah oleh halaman server-nya).
 */
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const { t } = useLang();

  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
      <Link
        href="/"
        className="rounded px-1 py-0.5 transition-colors hover:text-foreground"
      >
        {t.nav.models ? "Beranda" : "Home"}
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="size-3" aria-hidden="true" />
          {item.href ? (
            <Link
              href={item.href}
              className="rounded px-1 py-0.5 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ) : (
            <span className="px-1 py-0.5 font-medium text-foreground/80">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
