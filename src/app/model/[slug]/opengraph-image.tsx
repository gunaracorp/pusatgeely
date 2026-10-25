import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { MODELS, SITE_URL, formatJuta, POWERTRAIN_LABEL } from "@/lib/site";
import type { Lang } from "@/lib/i18n";

export const alt = "Pusat Geely — Detail Model Geely";
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

/** Dynamic OG image per model — kartu branded + foto unit asli. */
export default async function ModelOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = MODELS.find((m) => m.id === slug) ?? MODELS[0];
  const lang: Lang = "id";
  const photo = await toDataUri(model.image);

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

          {/* Headline model */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span
              style={{
                color: "#fafcfa",
                fontSize: model.name.length > 16 ? 58 : 68,
                fontWeight: 800,
                letterSpacing: -2,
              }}
            >
              {model.name}
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
                Mulai {formatJuta(model.priceFrom)}
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
                {POWERTRAIN_LABEL[model.powertrain][lang]}
              </div>
            </div>
          </div>

          {/* Specs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {model.specs.map((s) => (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#cbd5d1",
                  fontSize: 22,
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "#10b981",
                    marginRight: 14,
                  }}
                />
                {s[lang]}
              </div>
            ))}
          </div>

          {/* Footer */}
          <span style={{ color: "#8fd6b5", fontSize: 21, fontWeight: 600 }}>
            {SITE_HOSTNAME}/model/{model.id} · Test drive fleksibel
          </span>
        </div>

        {/* ── Foto unit asli (kanan) ── */}
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
              alt={model.name}
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
