import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://taxservice.uz";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: locale === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: {
      languages: {
        "uz-Latn": BASE_URL,
        "uz-Cyrl": `${BASE_URL}/uz-cyrl`,
        ru: `${BASE_URL}/ru`,
      },
    },
  }));
}
