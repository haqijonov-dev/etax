import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://etax.uz/sitemap.xml",
    host: "https://etax.uz",
  };
}
