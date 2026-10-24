import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import {
  BUSINESS,
  MODELS,
  SITE_URL,
  formatIDR,
  waLink,
} from "@/lib/site";

export const runtime = "nodejs";

/* ------------------------------- rate limit ------------------------------- */
const RATE_LIMIT_MS = 4_000;
const rateMap = new Map<string, number>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const last = rateMap.get(ip) ?? 0;
  if (now - last < RATE_LIMIT_MS) return true;
  rateMap.set(ip, now);
  // Light cleanup to avoid unbounded growth
  if (rateMap.size > 5_000) {
    const cutoff = now - 60_000;
    for (const [k, v] of rateMap) if (v < cutoff) rateMap.delete(k);
  }
  return false;
}

/* ----------------------------- system prompt ------------------------------ */
function buildSystemPrompt(lang: "id" | "en"): string {
  const powertrainLabel = (p: "ev" | "phev" | "ice") =>
    p === "ev"
      ? lang === "id"
        ? "Listrik"
        : "Electric"
      : p === "phev"
        ? "Super Hybrid PHEV"
        : lang === "id"
          ? "Bensin Turbo"
          : "Petrol Turbo";

  const modelLines = MODELS.map((m) => {
    const variants = m.variants
      .map((v) => `${v.label}: ${formatIDR(v.price)}`)
      .join(", ");
    const specs = m.specs.map((s) => (lang === "id" ? s.id : s.en)).join(" · ");
    const colors = m.colors
      ?.map((c) => (lang === "id" ? c.label.id : c.label.en))
      .join(", ");
    return [
      `- ${m.name} (${powertrainLabel(m.powertrain)})`,
      `  ${lang === "id" ? "Varian & harga indikatif OTR" : "Variants & indicative OTR prices"}: ${variants}`,
      `  ${lang === "id" ? "Spesifikasi kunci" : "Key specs"}: ${specs}`,
      colors ? `  ${lang === "id" ? "Warna unit" : "Unit colors"}: ${colors}` : "",
      `  ${lang === "id" ? "Halaman detail" : "Detail page"}: ${SITE_URL}/model/${m.id}`,
    ]
      .filter(Boolean)
      .join("\n");
  }).join("\n");

  if (lang === "id") {
    return `Kamu adalah "Geely Bot" — asisten AI resmi website Pusat Geely (pusatgeely.web.id), layanan konsultan penjualan independen kendaraan Geely untuk Bogor & Jabodetabek yang didampingi konsultan Sena Sulaeman.

## DATA PRODUK (indikatif OTR, riset publik per September 2026)
${modelLines}

## DATA BISNIS
- Nama: Pusat Geely — konsultan penjualan Geely independen (BUKAN dealer resmi).
- Konsultan: ${BUSINESS.pic} (${BUSINESS.role.id}).
- WhatsApp: ${BUSINESS.waDisplay} — link chat: https://wa.me/${BUSINESS.waNumber}
- Jam layanan: ${BUSINESS.hours.id}
- Area layanan: Bogor Kota, Kabupaten Bogor, Depok, Jakarta, Tangerang, Bekasi, Sentul, Cibinong, Cibubur, BSD.
- Layanan: konsultasi pemilihan unit, penawaran harga, test drive fleksibel (bisa ke lokasi), simulasi kredit (DP mulai ±20%, tenor hingga 6 tahun), trade-in, pendampingan sampai serah terima.
- Halaman penting: /harga-mobil-geely-bogor (tabel harga), /kredit-cicilan-geely-bogor (simulasi kredit), /test-drive-geely-bogor (booking test drive), /promo-geely-bogor (promo leasing), /mobil-listrik-geely-bogor (EV).

## ATURAN WAJIB (honesty-first)
1. Hanya jawab berdasarkan data di atas. Jika ditanya hal di luar data (spesifikasi detail, stok, diskon spesifik), katakan jujur belum punya datanya dan arahkan ke WhatsApp.
2. Harga SELALU disebut "indikatif" dan bisa berubah. Jangan pernah mengarang harga baru.
3. JANGAN mengklaim sebagai dealer resmi. Pusat Geely adalah konsultan penjualan independen; pembelian & garansi tetap lewat jaringan dealer resmi Geely Indonesia.
4. Jawaban singkat, hangat, dan membantu — maksimal ±120 kata. Gunakan bullet bila membandingkan.
5. Selalu tutup dengan ajakan konkret: booking test drive / cek penawaran via WhatsApp ${BUSINESS.waDisplay}.
6. Balas dalam Bahasa Indonesia yang natural (kecuali user bertanya dalam bahasa lain).`;
  }

  return `You are "Geely Bot" — the official AI assistant of Pusat Geely (pusatgeely.web.id), an independent Geely sales-consulting service for Bogor & Jabodetabek, assisted by consultant Sena Sulaeman.

## PRODUCT DATA (indicative OTR, public research as of September 2026)
${modelLines}

## BUSINESS DATA
- Name: Pusat Geely — independent Geely sales consultant (NOT an official dealer).
- Consultant: ${BUSINESS.pic} (${BUSINESS.role.en}).
- WhatsApp: ${BUSINESS.waDisplay} — chat link: https://wa.me/${BUSINESS.waNumber}
- Hours: ${BUSINESS.hours.en}
- Service areas: Bogor, Depok, Jakarta, Tangerang, Bekasi, Sentul, Cibinong, Cibubur, BSD.
- Services: unit selection consult, price offers, flexible test drives (at your location), financing simulation (DP from ±20%, tenor up to 6 years), trade-in, assistance until handover.
- Key pages: /harga-mobil-geely-bogor, /kredit-cicilan-geely-bogor, /test-drive-geely-bogor, /promo-geely-bogor, /mobil-listrik-geely-bogor.

## MANDATORY RULES (honesty-first)
1. Answer only from the data above. If asked beyond it, say you don't have that data yet and point to WhatsApp.
2. Prices are ALWAYS "indicative" and may change. Never invent new prices.
3. NEVER claim to be an official dealer. Purchases & warranties go through Geely Indonesia's official dealer network.
4. Short, warm, helpful answers — max ±120 words. Use bullets when comparing.
5. Always end with a concrete next step: book a test drive / get an offer via WhatsApp ${BUSINESS.waDisplay}.
6. Reply in English unless the user writes in Indonesian.`;
}

/* --------------------------------- types ---------------------------------- */
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const MAX_TURNS = 12; // keep context manageable

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "rate_limited" },
        { status: 429 }
      );
    }

    const body = (await request.json()) as {
      messages?: ChatMessage[];
      lang?: "id" | "en";
    };

    const incoming = Array.isArray(body.messages) ? body.messages : [];
    const last = incoming[incoming.length - 1];
    if (
      !last ||
      last.role !== "user" ||
      typeof last.content !== "string" ||
      !last.content.trim()
    ) {
      return NextResponse.json(
        { ok: false, error: "invalid_messages" },
        { status: 400 }
      );
    }

    const lang: "id" | "en" = body.lang === "en" ? "en" : "id";

    // Trim history to the last MAX_TURNS messages (always ends with the new user message)
    const history: ChatMessage[] = incoming
      .filter(
        (m): m is ChatMessage =>
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0
      )
      .slice(-MAX_TURNS)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2_000) }));

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: buildSystemPrompt(lang) },
        ...history,
      ],
      thinking: { type: "disabled" },
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json(
        { ok: false, error: "empty_response" },
        { status: 502 }
      );
    }

    const waUrl = waLink(
      lang === "id"
        ? "Halo Pusat Geely, saya baru diskusi dengan Geely Bot dan ingin info lebih lanjut."
        : "Hello Pusat Geely, I just chatted with Geely Bot and would like more info."
    );

    return NextResponse.json({ ok: true, reply, waUrl });
  } catch (error) {
    console.error("[/api/chat] error:", error);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
