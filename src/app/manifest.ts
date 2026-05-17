import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Etax — Moliyaviy konsalting",
    short_name: "Etax",
    description:
      "Etax — Farg'ona va O'zbekiston bo'ylab korxonalar uchun moliyaviy konsalting agentligi. Soliq, IFRS, CFO outsourcing.",
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
