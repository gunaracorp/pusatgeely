import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ══ ADMIN LEADS — mini-CRM: lihat & kelola prospek yang masuk ══
 *
 * Autentikasi: header `x-admin-key` = env REVIEWS_ADMIN_KEY (min. 8 karakter)
 * — kunci sama dengan /api/reviews/admin (satu kunci untuk seluruh panel admin).
 * Set env di Vercel: Settings → Environment Variables → REVIEWS_ADMIN_KEY.
 * Tanpa env valid → seluruh endpoint admin ditolak (403).
 *
 * Contoh:
 *   curl -H "x-admin-key: $KEY" https://domain/api/leads/admin
 *   curl -X PATCH -H "x-admin-key: $KEY" -H "Content-Type: application/json" \
 *     -d '{"id":"<id-lead>","status":"contacted"}' https://domain/api/leads/admin
 *   curl -X DELETE -H "x-admin-key: $KEY" -H "Content-Type: application/json" \
 *     -d '{"id":"<id-lead>"}' https://domain/api/leads/admin
 *
 * Alur status lead: new → contacted → qualified → won | lost.
 * Sumber (source): website | quiz | simulator | chat.
 */

function authorized(request: Request): boolean {
  const key = process.env.REVIEWS_ADMIN_KEY ?? "";
  if (key.length < 8) return false;
  return (request.headers.get("x-admin-key") ?? "") === key;
}

/* ----------------------------------- GET ---------------------------------- */
/** GET: statistik ringkas + 100 lead terbaru untuk mini-CRM pemilik. */
export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 403 });
  }

  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [total, last7Days, bySourceRows, byStatusRows, byInterestRows, byModelRows, leads] =
      await Promise.all([
        db.lead.count(),
        db.lead.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
        db.lead.groupBy({ by: ["source"], _count: { _all: true } }),
        db.lead.groupBy({ by: ["status"], _count: { _all: true } }),
        db.lead.groupBy({ by: ["interest"], _count: { _all: true } }),
        db.lead.groupBy({
          by: ["model"],
          _count: { _all: true },
          where: { model: { not: null } },
          orderBy: { _count: { model: "desc" } },
          take: 5,
        }),
        db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
      ]);

    const toRecord = (rows: { [k: string]: unknown; _count: { _all: number } }[]) =>
      Object.fromEntries(
        rows.map((r) => [
          String(r.source ?? r.status ?? r.interest ?? r.model ?? "-"),
          r._count._all,
        ])
      );

    return NextResponse.json({
      ok: true,
      stats: {
        total,
        last7Days,
        bySource: toRecord(bySourceRows),
        byStatus: toRecord(byStatusRows),
        byInterest: toRecord(byInterestRows),
        byModel: toRecord(byModelRows),
      },
      leads,
    });
  } catch (error) {
    console.error("[/api/leads/admin] GET error:", error);
    return NextResponse.json(
      { ok: false, error: "database-unavailable" },
      { status: 500 }
    );
  }
}

/* ---------------------------------- PATCH --------------------------------- */
const patchSchema = z.object({
  id: z.string().trim().min(1).max(40),
  status: z.enum(["new", "contacted", "qualified", "won", "lost"]),
});

/** PATCH: ubah status pipeline lead (new → contacted → qualified → won/lost). */
export async function PATCH(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 403 });
  }

  const json = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", issues: parsed.error.issues.map((i) => i.path.join(".")) },
      { status: 400 }
    );
  }

  try {
    const lead = await db.lead.update({
      where: { id: parsed.data.id },
      data: { status: parsed.data.status },
    });
    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ ok: false, error: "lead-tidak-ditemukan" }, { status: 404 });
    }
    console.error("[/api/leads/admin] PATCH error:", error);
    return NextResponse.json({ ok: false, error: "database-error" }, { status: 500 });
  }
}

/* --------------------------------- DELETE --------------------------------- */
const deleteSchema = z.object({
  id: z.string().trim().min(1).max(40),
});

/** DELETE: hapus satu lead (mis. spam atau data uji). */
export async function DELETE(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 403 });
  }

  const json = await request.json().catch(() => null);
  const parsed = deleteSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", issues: parsed.error.issues.map((i) => i.path.join(".")) },
      { status: 400 }
    );
  }

  try {
    await db.lead.delete({ where: { id: parsed.data.id } });
    return NextResponse.json({ ok: true, deleted: parsed.data.id });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ ok: false, error: "lead-tidak-ditemukan" }, { status: 404 });
    }
    console.error("[/api/leads/admin] DELETE error:", error);
    return NextResponse.json({ ok: false, error: "database-error" }, { status: 500 });
  }
}
