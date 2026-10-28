import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ARTICLES } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

export const alt = "Pusat Geely — Artikel & Panduan Mobil Geely";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SITE_HOSTNAME = new URL(SITE_URL).hostname;

/** Baca gambar dari /public → data URI PNG (satori tidak mendukung webp). */
async function toDataUri(webPath: string): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), "public", webPath.replace(/^\//, ""));
    const buf = await readFile(filePath);
    // Lazy import: di Vercel sharp tetap ter-trace; bila bundel tidak memuatnya,
    // kartu tetap dirender tanpa foto (bukan 500).
    const { default: sharp } = await import("sharp");
    const png = await sharp(buf).png().toBuffer();
    return `data:image/png;base64,${png.toString("base64")}`;
  } catch {
    return null;
  }
}

/** Batasi judul ±90 karakter agar muat di kartu. */
function clampTitle(text: string, max = 90): string {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/** "2026-09-28" → "28 Sep 2026" (id-ID); fallback aman ke ISO. */
function formatTanggal(iso: string): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/** Dynamic OG image per artikel — kartu branded + foto artikel asli. */
export default async function ArtikelOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug) ?? ARTICLES[0];
  const headline = clampTitle(article.title.id);
  const photo = await toDataUri(article.image);

  // Font responsif terhadap panjang judul.
  const headlineSize = headline.length > 70 ? 40 : headline.length > 45 ? 48 : 56;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #0c1210 0%, #10181a 55%, #0d1a14 100%)",
          fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* ── Kolom teks (kiri) ── */}
        <div
          style={{
            width: photo ? 640 : "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 48px",
          }}
        >
          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                borderRadius: 15,
                background: "linear-gradient(135deg, #10b981, #0d9488)",
                color: "white",
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              G
            </div>
            <span
              style={{
                color: "#8fd6b5",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              PUSAT GEELY · BOGOR
            </span>
          </div>

          {/* Headline artikel + chip */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <span
              style={{
                color: "#fafcfa",
                fontSize: headlineSize,
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: -1,
              }}
            >
              {headline}
            </span>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <div
                style={{
                  display: "flex",
                  padding: "10px 22px",
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #10b981, #0d9488)",
                  color: "white",
                  fontSize: 26,
                  fontWeight: 800,
                }}
              >
                {article.tag.id}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: "2px solid rgba(16,185,129,0.45)",
                  background: "rgba(16,185,129,0.12)",
                  color: "#d1fae5",
                  fontSize: 23,
                  fontWeight: 700,
                }}
              >
                {formatTanggal(article.date)}
              </div>
            </div>
          </div>

          {/* Footer */}
          <span style={{ color: "#8fd6b5", fontSize: 21, fontWeight: 600 }}>
            {SITE_HOSTNAME}/artikel/{article.slug}
          </span>
        </div>

        {/* ── Foto artikel asli (kanan) ── */}
        {photo && (
          <div
            style={{
              width: 560,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Glow latar — lingkaran semi transparan (satori-safe) */}
            <div
              style={{
                position: "absolute",
                width: 440,
                height: 440,
                borderRadius: 999,
                background: "rgba(16,185,129,0.16)",
                top: 95,
              }}
            />
            <img
              src={photo}
              alt={article.title.id}
              width={560}
              height={630}
              style={{
                width: 560,
                height: 630,
                objectFit: "cover",
              }}
            />
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
