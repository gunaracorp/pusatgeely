import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

/**
 * INDEXNOW API — notifikasi indeks instan ke Bing, Yandex, Seznam, Naver.
 * Docs: https://www.indexnow.org/documentation
 *
 * POST /api/indexnow
 *   body: { "urls": ["https://<domain-situs>/...", ...] }  (max 10.000/hari)
 *
 * Dipakai setelah deploy konten baru / perubahan harga agar mesin pencari
 * langsung tahu (tidak menunggu crawl berkala). Key file disimpan di
 * /public/{key}.txt sesuai spesifikasi IndexNow.
 */

const INDEXNOW_KEY = "bc336b4b6001017bc99244eba80d0206";
const ENDPOINT = "https://api.indexnow.org/indexnow";

/** Host produksi resmi + host deployment aktif (mengikuti SITE_URL). */
const PRIMARY_HOST = "pusatgeely.web.id";
const ACTIVE_HOST = new URL(SITE_URL).hostname;
const ALLOWED_HOSTS = new Set<string>(
  [PRIMARY_HOST, ACTIVE_HOST, `www.${PRIMARY_HOST}`].filter(Boolean),
);

function extractHost(url: string): string | null {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { urls?: unknown };
    const urls = Array.isArray(body.urls)
      ? body.urls.filter(
          (u): u is string =>
            typeof u === "string" &&
            u.startsWith("http") &&
            ALLOWED_HOSTS.has(extractHost(u) ?? ""),
        )
      : [];

    if (urls.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: `Tidak ada URL valid (harus domain: ${[...ALLOWED_HOSTS].join(" atau ")})`,
        },
        { status: 400 },
      );
    }
    if (urls.length > 10_000) {
      return NextResponse.json(
        { ok: false, error: "Maksimal 10.000 URL per permintaan (kuota IndexNow/hari)" },
        { status: 413 },
      );
    }

    // IndexNow mensyaratkan host + keyLocation milik host yang sama dengan URL.
    // Gunakan host dari URL pertama yang dikirim agar selalu konsisten.
    const host = extractHost(urls[0]) ?? ACTIVE_HOST;

    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
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
    host: ACTIVE_HOST,
    allowedHosts: [...ALLOWED_HOSTS],
    usage: 'POST { "urls": ["https://<domain-situs>/..."] }',
    note: "Kirim setiap kali konten berubah — indeks Bing/Yandex instan",
  });
}
