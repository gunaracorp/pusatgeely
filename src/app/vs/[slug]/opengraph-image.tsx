import { ImageResponse } from "next/og";
import { COMPARES } from "@/lib/competitors";
import { SITE_URL } from "@/lib/site";

export const alt = "Pusat Geely — Perbandingan Jujur Geely vs Pesaing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SITE_HOSTNAME = new URL(SITE_URL).hostname;

/** Dynamic OG image per halaman /vs — kartu branded dua model (tanpa foto). */
export default async function VsOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = COMPARES.find((c) => c.slug === slug) ?? COMPARES[0];

  const line1 = comparison.geelyName;
  const line2 = `vs ${comparison.rivalName}`;
  // Geser ukuran font berdasarkan baris terpanjang (satori-safe: span terpisah).
  const longest = Math.max(line1.length, line2.length);
  const headlineSize = longest > 24 ? 54 : longest > 18 ? 62 : 70;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(135deg, #0c1210 0%, #10181a 55%, #0d1a14 100%)",
          fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
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

        {/* Headline dua baris: Geely (putih) vs kompetitor (emerald muda) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span
            style={{
              color: "#fafcfa",
              fontSize: headlineSize,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: -2,
            }}
          >
            {line1}
          </span>
          <span
            style={{
              color: "#8fd6b5",
              fontSize: headlineSize,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: -2,
            }}
          >
            {line2}
          </span>
          <div style={{ display: "flex", marginTop: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 26px",
                borderRadius: 999,
                border: "2px solid rgba(16,185,129,0.45)",
                background: "rgba(16,185,129,0.12)",
                color: "#d1fae5",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              Perbandingan jujur, dua arah kelemahan &amp; keunggulan
            </div>
          </div>
        </div>

        {/* Footer */}
        <span style={{ color: "#8fd6b5", fontSize: 21, fontWeight: 600 }}>
          {SITE_HOSTNAME}/vs/{comparison.slug}
        </span>
      </div>
    ),
    { ...size }
  );
}
