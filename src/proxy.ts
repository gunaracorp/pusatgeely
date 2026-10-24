import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy (dulu: middleware) — kanonisasi host untuk Next.js 16.
 *
 * www.pusatgeely.web.id → https://pusatgeely.web.id (308 Permanent Redirect).
 * Alasan: www dan apex sama-sama menjawab 200 di Vercel → risiko duplikasi host
 * di mata mesin pencari. Redirect 308 menumpuk seluruh otoritas halaman pada
 * SATU host kanonis (identik dengan SITE_URL, sitemap, dan canonical).
 *
 * Aman by design:
 * - localhost, 127.0.0.1, *.vercel.app, dan host lain → lewat tanpa disentuh
 *   (deployment preview & workflow GSC multi-property tetap berfungsi).
 * - Protokol dipaksa https pada tujuan (produksi selalu TLS di Vercel).
 */
export default function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host === "www.pusatgeely.web.id") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = "pusatgeely.web.id";
    url.port = ""; // bersihkan port (localhost/preview) → redirect kanonis murni
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Lewati aset statis internal — tidak perlu redirect untuk _next/* & favicon.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
