import { ImageResponse } from "next/og";
import { BUSINESS, MODELS, SITE_URL, formatJuta } from "@/lib/site";

export const alt = "Pusat Geely — Mobil Geely Bogor & Jabodetabek";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SITE_HOSTNAME = new URL(SITE_URL).hostname;

/** Dynamic OG image untuk beranda — brand + lineup + harga. */
export default function OpengraphImage() {
  const lineup = MODELS.map(
    (m) => `${m.name.replace("GEELY ", "")} · ${formatJuta(m.priceFrom)}`
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0c1210 0%, #10181a 55%, #0d1a14 100%)",
          padding: "64px 72px",
          fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #10b981, #0d9488)",
              color: "white",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            G
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{ color: "#fafcfa", fontSize: 40, fontWeight: 800, letterSpacing: -1 }}
            >
              PUSAT GEELY
            </span>
            <span style={{ color: "#6ee7b7", fontSize: 22, fontWeight: 600 }}>
              Bogor &amp; Jabodetabek
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              color: "#fafcfa",
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            Test Drive Fleksibel · Harga Transparan · Simulasi Kredit
          </span>
          <span style={{ color: "#a7f3d0", fontSize: 28, fontWeight: 500 }}>
            Konsultan penjualan independen — didampingi sampai serah terima
          </span>
        </div>

        {/* Lineup chips */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {lineup.map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 28px",
                borderRadius: 999,
                border: "2px solid rgba(16,185,129,0.45)",
                background: "rgba(16,185,129,0.12)",
                color: "#d1fae5",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          <span style={{ color: "#8fd6b5", fontSize: 24, fontWeight: 600 }}>
            {SITE_HOSTNAME}
          </span>
          <span style={{ color: "#8fd6b5", fontSize: 24, fontWeight: 600 }}>
            WA {BUSINESS.waDisplay} · Setiap hari 08.00–20.00
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
