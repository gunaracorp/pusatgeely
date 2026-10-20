"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/components/language-provider";
import { BUSINESS } from "@/lib/site";

/**
 * TikTok creator embed for @eman.sulaeman0839.
 *
 * Hydration-safety: the blockquote element and the embed.js script are
 * injected AFTER mount via DOM APIs — server HTML and first client render
 * are identical (an empty container), so nothing can mismatch. If TikTok
 * is unreachable (blocked network, removed embed), the fallback profile
 * link underneath stays fully functional.
 */
export function TikTokFeed() {
  const { t } = useLang();
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || host.childElementCount > 0) return;

    const bq = document.createElement("blockquote");
    bq.className = "tiktok-embed";
    bq.setAttribute("cite", BUSINESS.tiktokUrl);
    bq.setAttribute("data-unique-id", "eman.sulaeman0839");
    bq.setAttribute("data-embed-type", "creator");
    bq.style.maxWidth = "780px";
    bq.style.minHeight = "550px";

    const section = document.createElement("section");
    const link = document.createElement("a");
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.href = `${BUSINESS.tiktokUrl}?refer=creator_embed`;
    link.textContent = BUSINESS.tiktok;
    section.appendChild(link);
    bq.appendChild(section);
    host.appendChild(bq);

    // Load the official embed script once, even if this component remounts.
    if (
      !document.querySelector(
        'script[src="https://www.tiktok.com/embed.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border bg-card">
      {/* TikTok injects its dark-themed iframe here */}
      <div ref={hostRef} className="flex justify-center py-2" />
      <p className="border-t px-4 py-3 text-center text-xs leading-relaxed text-muted-foreground">
        {t.gallery.tiktokFallback}{" "}
        <a
          href={BUSINESS.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary underline underline-offset-2 hover:opacity-80"
        >
          {BUSINESS.tiktok}
        </a>
      </p>
    </div>
  );
}
