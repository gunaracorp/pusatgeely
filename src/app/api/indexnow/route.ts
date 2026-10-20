import { NextResponse } from "next/server";

/**
 * INDEXNOW API — notifikasi indeks instan ke Bing, Yandex, Seznam, Naver.
 * Docs: https://www.indexnow.org/documentation
 *
 * POST /api/indexnow
 *   body: { "urls": ["https://pusatgeely.web.id/...", ...] }  (max 10.000/hari)
 *
 * Dipakai setelah deploy konten baru / perubahan harga agar mesin pencari
 * langsung tahu (tidak menunggu crawl berkala). Key file disimpan di
 * /public/{key}.txt sesuai spesifikasi IndexNow.
 */

const INDEXNOW_KEY = "bc336b4b6001017bc99244eba80d0206";
const ALLOWED_HOST = "pusatgeely.web.id";
const ENDPOINT = "https://api.indexnow.org/indexnow";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { urls?: unknown };
    const urls = Array.isArray(body.urls)
      ? body.urls.filter(
          (u): u is string =>
            typeof u === "string" &&
            u.startsWith(`https://${ALLOWED_HOST}`),
        )
      : [];

    if (urls.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Tidak ada URL valid (harus domain pusatgeely.web.id)" },
        { status: 400 },
      );
    }
    if (urls.length > 10_000) {
      return NextResponse.json(
        { ok: false, error: "Maksimal 10.000 URL per permintaan (kuota IndexNow/hari)" },
        { status: 413 },
      );
    }

    const payload = {
      host: ALLOWED_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${ALLOWED_HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    };

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    // 200/202 = diterima; 400 key salah; 403 key gagal validasi; 422 URL bukan milik host
    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      submitted: urls.length,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Body JSON tidak valid" },
      { status: 400 },
    );
  }
}

export function GET() {
  return NextResponse.json({
    service: "IndexNow bridge",
    host: ALLOWED_HOST,
    usage: 'POST { "urls": ["https://pusatgeely.web.id/..."] }',
    note: "Kirim setiap kali konten berubah — indeks Bing/Yandex instan",
  });
}
