"use client";

import Image from "next/image";
import { Camera, Expand } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GALLERY, GALLERY_UNITS, type GalleryItem } from "@/lib/site";
import { TikTokFeed } from "@/components/tiktok-feed";
import { cn } from "@/lib/utils";

function GalleryGrid({
  items,
  aspect,
}: {
  items: GalleryItem[];
  /** "landscape" → 4/3 tiles for unit photos, "portrait" → 3/4 for handover docs. */
  aspect: "landscape" | "portrait";
}) {
  const { t, lang } = useLang();

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.src} delay={(i % 3) * 0.08}>
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label={`${t.gallery.view}: ${item.caption[lang]}`}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-2xl border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  aspect === "landscape" ? "aspect-[4/3]" : "aspect-[3/4]",
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt[lang]}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-background/70 text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
                >
                  <Expand className="size-4" />
                </span>
                <span className="absolute inset-x-0 bottom-0 line-clamp-2 p-3 text-left text-xs font-semibold leading-snug sm:p-4 sm:text-sm">
                  {item.caption[lang]}
                </span>
              </button>
            </DialogTrigger>
            <DialogContent
              aria-describedby={undefined}
              className="max-w-lg border bg-card p-2 sm:max-w-xl sm:p-2"
            >
              <DialogTitle className="sr-only">
                {item.caption[lang]}
              </DialogTitle>
              <div className="relative mx-auto h-[70vh] w-full overflow-hidden rounded-xl bg-secondary/40">
                <Image
                  src={item.src}
                  alt={item.alt[lang]}
                  fill
                  sizes="(max-width: 768px) 90vw, 576px"
                  className="object-contain"
                />
              </div>
              <p className="px-2 pb-1 pt-3 text-center text-sm font-semibold">
                {item.caption[lang]}
              </p>
            </DialogContent>
          </Dialog>
        </Reveal>
      ))}
    </div>
  );
}

export function GallerySection() {
  const { t } = useLang();

  return (
    <section
      id="galeri"
      aria-label={t.gallery.title}
      className="py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />

        <Tabs defaultValue="units" className="mt-12">
          <div className="flex justify-center">
            <TabsList className="h-11 rounded-full p-1">
              <TabsTrigger
                value="units"
                className="h-9 rounded-full px-4 text-sm font-semibold sm:px-6"
              >
                {t.gallery.tabUnits}
              </TabsTrigger>
              <TabsTrigger
                value="handover"
                className="h-9 rounded-full px-4 text-sm font-semibold sm:px-6"
              >
                {t.gallery.tabHandover}
              </TabsTrigger>
              <TabsTrigger
                value="tiktok"
                className="h-9 rounded-full px-4 text-sm font-semibold sm:px-6"
              >
                {t.gallery.tabTikTok}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="units" className="mt-8">
            <GalleryGrid items={GALLERY_UNITS} aspect="landscape" />
          </TabsContent>
          <TabsContent value="handover" className="mt-8">
            <GalleryGrid items={GALLERY} aspect="portrait" />
          </TabsContent>
          <TabsContent value="tiktok" className="mt-8">
            <TikTokFeed />
          </TabsContent>
        </Tabs>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <Camera className="size-3.5 shrink-0" aria-hidden="true" />
          {t.gallery.consent}
        </p>
      </div>
    </section>
  );
}
