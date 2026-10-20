import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { INTERESTS, MODELS, waLink } from "@/lib/site";
import { DICT } from "@/lib/i18n";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ----------------------------- rate limiting ----------------------------- */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= RATE_LIMIT_MAX;
}

/* ------------------------------- validation ------------------------------ */
const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .transform((v) => v.replace(/[^0-9+]/g, ""))
    .refine((v) => /^(\+?62|0)8\d{7,12}$/.test(v), { message: "invalid_phone" })
    .transform((v) => {
      const digits = v.replace(/\D/g, "");
      // normalize 0xxxxxxxxx -> 62xxxxxxxxx
      return digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
    }),
  model: z.string().max(40).optional().default(""),
  interest: z.enum(INTERESTS).optional().default("general"),
  area: z.string().max(60).optional().default(""),
  preferredDate: z.string().max(20).optional().default(""),
  message: z.string().max(1000).optional().default(""),
  lang: z.enum(["id", "en"]).optional().default("id"),
  // honeypot must be empty
  website: z.string().max(0).optional().default(""),
});

/* --------------------------------- route --------------------------------- */
export async function POST(request: Request) {
  try {
    // Rate limit by client IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "rate_limited" },
        { status: 429 }
      );
    }

    const json = await request.json().catch(() => null);
    if (!json) {
      return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
    }

    const parsed = leadSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "validation_failed", issues: parsed.error.issues.map((i) => i.path.join(".")) },
        { status: 422 }
      );
    }

    const data = parsed.data;

    // Honeypot filled → silently pretend success (bot trap).
    if (data.website) {
      return NextResponse.json({ ok: true });
    }

    const modelName =
      data.model && data.model !== "any"
        ? MODELS.find((m) => m.id === data.model)?.name ?? data.model
        : null;

    const lead = await db.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        model:
          modelName ??
          (data.model === "any"
            ? data.lang === "en"
              ? "Not sure yet / need advice"
              : "Belum tahu / minta saran"
            : data.model || null),
        interest: data.interest,
        area: data.area || null,
        preferredDate: data.preferredDate || null,
        message: data.message || null,
        lang: data.lang,
        source: "website",
      },
    });

    // Build prefilled WhatsApp message so the consultant gets full context.
    const dict = DICT[data.lang];
    const interestLabel = dict.testDrive.fields.interests[data.interest];
    const lines = [
      data.lang === "en"
        ? `Hello Pusat Geely, I just submitted a request via the website (#${lead.id.slice(-6)}):`
        : `Halo Pusat Geely, saya baru mengirim permintaan lewat website (#${lead.id.slice(-6)}):`,
      `• ${dict.testDrive.fields.name}: ${data.name}`,
      `• ${dict.testDrive.fields.phone}: +${data.phone}`,
      `• ${dict.testDrive.fields.interest}: ${interestLabel}`,
    ];
    if (modelName) lines.push(`• ${dict.testDrive.fields.model}: ${modelName}`);
    if (data.area) lines.push(`• ${dict.testDrive.fields.area}: ${data.area}`);
    if (data.preferredDate) lines.push(`• ${dict.testDrive.fields.date}: ${data.preferredDate}`);
    if (data.message) lines.push(`• ${dict.testDrive.fields.message}: ${data.message}`);
    lines.push(
      "",
      data.lang === "en" ? "Please confirm, thank you!" : "Mohon konfirmasinya, terima kasih!"
    );

    const waUrl = waLink(lines.join("\n"));

    return NextResponse.json({ ok: true, id: lead.id, waUrl }, { status: 201 });
  } catch (error) {
    console.error("[/api/leads] error:", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
