import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { MODELS } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ------------------------------- rate limit ------------------------------- */
const WINDOW_MS = 10 * 60_000; // 1 ulasan per 10 menit per IP
const rateMap = new Map<string, number>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const last = rateMap.get(ip) ?? 0;
  if (now - last < WINDOW_MS) return true;
  rateMap.set(ip, now);
  if (rateMap.size > 5_000) {
    const cutoff = now - WINDOW_MS;
    for (const [k, v] of rateMap) if (v < cutoff) rateMap.delete(k);
  }
  return false;
}

const MODEL_IDS = new Set(MODELS.map((m) => m.id));

function sanitize(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/* ── GET /api/reviews?model=ex5 ──
 * Ulasan TERPUBLIKASI saja (moderasi pemilik).
 * Degrade gracefully (array kosong) bila database tidak tersedia —
 * halaman model tetap tampil sempurna tanpa data review.
 */
export async function GET(request: Request) {
  const modelId = new URL(request.url).searchParams.get("model") ?? undefined;

  try {
    const reviews = await db.review.findMany({
      where: {
        published: true,
        ...(modelId && MODEL_IDS.has(modelId) ? { modelId } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        modelId: true,
        name: true,
        city: true,
        rating: true,
        comment: true,
        createdAt: true,
      },
    });

    const aggregate = reviews.length
      ? {
          count: reviews.length,
          average:
            Math.round(
              (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10
            ) / 10,
        }
      : null;

    return NextResponse.json({ ok: true, reviews, aggregate });
  } catch {
    return NextResponse.json({ ok: true, reviews: [], aggregate: null });
  }
}

/* ── POST /api/reviews ──
 * Submit ulasan oleh pengunjung. Tersimpan published=false
 * (moderasi dulu oleh pemilik via /api/reviews/admin).
 * Honeypot "website" untuk memfilter bot sederhana.
 */
export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Anda baru saja mengirim ulasan. Mohon tunggu beberapa menit lagi.",
        },
        { status: 429 }
      );
    }

    const body = (await request.json().catch(() => null)) as Record<
      string,
      unknown
    > | null;
    if (!body) {
      return NextResponse.json(
        { ok: false, message: "Data tidak valid." },
        { status: 400 }
      );
    }

    // Honeypot: bot yang mengisi kolom tersembunyi menerima jawaban sukses
    // diam-diam (tidak tersimpan).
    if (sanitize(body.website, 100) !== "") {
      return NextResponse.json({ ok: true, message: "Terima kasih!" });
    }

    const name = sanitize(body.name, 40);
    const city = sanitize(body.city, 40);
    const comment = sanitize(body.comment, 600);
    const modelId = sanitize(body.modelId, 30);
    const rating = Number(body.rating);

    if (name.length < 2) {
      return NextResponse.json(
        { ok: false, message: "Nama minimal 2 karakter." },
        { status: 400 }
      );
    }
    if (comment.length < 10) {
      return NextResponse.json(
        { ok: false, message: "Ulasan minimal 10 karakter." },
        { status: 400 }
      );
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { ok: false, message: "Rating harus 1–5 bintang." },
        { status: 400 }
      );
    }
    if (!MODEL_IDS.has(modelId)) {
      return NextResponse.json(
        { ok: false, message: "Model tidak dikenal." },
        { status: 400 }
      );
    }

    await db.review.create({
      data: {
        modelId,
        name,
        city: city || null,
        rating,
        comment,
        published: false,
      },
    });

    return NextResponse.json({
      ok: true,
      message:
        "Ulasan Anda tersimpan dan akan tampil setelah moderasi singkat. Terima kasih!",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Gagal menyimpan ulasan. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
