import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { MODELS } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ══ ADMIN REVIEWS — moderasi & impor ulasan pelanggan ASLI ══
 *
 * Autentikasi: header `x-admin-key` = env REVIEWS_ADMIN_KEY (min. 8 karakter).
 * Set env di Vercel: Settings → Environment Variables → REVIEWS_ADMIN_KEY.
 * Tanpa env valid → seluruh endpoint admin ditolak (403).
 *
 * Contoh:
 *   curl -H "x-admin-key: $KEY" https://domain/api/reviews/admin
 *   curl -X POST -H "x-admin-key: $KEY" -H "Content-Type: application/json" \
 *     -d '{"action":"add","data":{"modelId":"ex5","name":"Budi","city":"Depok",
 *          "rating":5,"comment":"Proses cepat, dijelaskan detail."}}' \
 *     https://domain/api/reviews/admin
 */

const MODEL_IDS = new Set(MODELS.map((m) => m.id));

function authorized(request: Request): boolean {
  const key = process.env.REVIEWS_ADMIN_KEY ?? "";
  if (key.length < 8) return false;
  return (request.headers.get("x-admin-key") ?? "") === key;
}

function sanitize(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** GET: daftar SEMUA ulasan (termasuk belum terpublikasi) untuk moderasi. */
export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 403 });
  }

  try {
    const reviews = await db.review.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return NextResponse.json({
      ok: true,
      total: reviews.length,
      pending: reviews.filter((r) => !r.published).length,
      reviews,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "database-unavailable" },
      { status: 503 }
    );
  }
}

/** POST: aksi moderasi — publish | unpublish | delete | add. */
export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  if (!body || typeof body.action !== "string") {
    return NextResponse.json({ ok: false, error: "bad-request" }, { status: 400 });
  }

  try {
    switch (body.action) {
      case "publish":
      case "unpublish": {
        const id = sanitize(body.id, 40);
        if (!id) return NextResponse.json({ ok: false, error: "id-required" }, { status: 400 });
        const review = await db.review.update({
          where: { id },
          data: { published: body.action === "publish" },
        });
        return NextResponse.json({ ok: true, review });
      }

      case "delete": {
        const id = sanitize(body.id, 40);
        if (!id) return NextResponse.json({ ok: false, error: "id-required" }, { status: 400 });
        await db.review.delete({ where: { id } });
        return NextResponse.json({ ok: true, deleted: id });
      }

      case "add": {
        // Impor ulasan pelanggan ASLI (mis. dari riwayat WhatsApp / Google Business).
        const data = (body.data ?? {}) as Record<string, unknown>;
        const modelId = sanitize(data.modelId, 30);
        const name = sanitize(data.name, 40);
        const city = sanitize(data.city, 40);
        const comment = sanitize(data.comment, 600);
        const rating = Number(data.rating);
        if (!MODEL_IDS.has(modelId)) {
          return NextResponse.json({ ok: false, error: "model-tidak-dikenal" }, { status: 400 });
        }
        if (name.length < 2 || comment.length < 10) {
          return NextResponse.json({ ok: false, error: "data-kurang" }, { status: 400 });
        }
        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
          return NextResponse.json({ ok: false, error: "rating-harus-1-5" }, { status: 400 });
        }
        const review = await db.review.create({
          data: { modelId, name, city: city || null, rating, comment, published: true },
        });
        return NextResponse.json({ ok: true, review });
      }

      default:
        return NextResponse.json({ ok: false, error: "aksi-tidak-dikenal" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "database-error" }, { status: 500 });
  }
}
