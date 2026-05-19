import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://taxservice.uz";

const SECTIONS = [
  { id: "services", priority: 0.9 },
  { id: "about", priority: 0.7 },
  { id: "process", priority: 0.7 },
  { id: "testimonials", priority: 0.6 },
  { id: "faq", priority: 0.8 },
  { id: "contact", priority: 0.9 },
] as const;

const SERVICE_IDS = ["01", "02", "03", "04", "05", "06"] as const;

function localePath(locale: string) {
  return locale === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${locale}`;
}

function languagesAlternates() {
  return {
    "uz-Latn": BASE_URL,
    "uz-Cyrl": `${BASE_URL}/uz-cyrl`,
    ru: `${BASE_URL}/ru`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const items: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const root = localePath(locale);

    items.push({
      url: root,
      lastModified: now,
      changeFrequency: "weekly",
      priority: locale === routing.defaultLocale ? 1 : 0.9,
      alternates: { languages: languagesAlternates() },
    });

    for (const section of SECTIONS) {
      items.push({
        url: `${root}#${section.id}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: section.priority,
      });
    }

    for (const serviceId of SERVICE_IDS) {
      items.push({
        url: `${root}#service-${serviceId}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }
  }

  return items;
}
