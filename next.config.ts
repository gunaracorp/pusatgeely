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
};

export default nextConfig;
