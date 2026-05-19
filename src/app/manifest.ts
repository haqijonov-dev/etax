import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "E-tax — Buxgalteriya va soliq xizmatlari",
    short_name: "E-tax",
    description:
      "E-tax — Farg'ona shahridagi buxgalteriya va soliq xizmati. MChJ, YaTT va kichik bizneslar uchun: hisobot, NDS, e-faktura, HR, konsalting, korxona ochish.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#faf8f4",
    theme_color: "#143a6c",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/black-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["business", "finance", "productivity"],
    lang: "uz",
    dir: "ltr",
  };
}
