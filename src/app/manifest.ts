import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pusat Geely — Mobil Geely Bogor & Jabodetabek",
    short_name: "Pusat Geely",
    description:
      "Konsultan penjualan Geely untuk Bogor & Jabodetabek: test drive, harga, simulasi kredit, dan trade-in.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c1210",
    theme_color: "#0c1210",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
