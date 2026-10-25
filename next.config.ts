import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  async redirects() {
    return [
      // Route lama → URL kata kunci SEO (301 permanen)
      { source: "/harga", destination: "/harga-mobil-geely-bogor", permanent: true },
      { source: "/promo", destination: "/promo-geely-bogor", permanent: true },
    ];
  },
  /**
   * Security & crawler-friendliness headers (semua route).
   * HSTS menandakan HTTPS penuh ke crawler; nosniff & Referrer-Policy
   * mengurangi risiko yang bisa menurunkan trust signal domain.
   */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
        ],
      },
    ];
  },
};

export default nextConfig;
