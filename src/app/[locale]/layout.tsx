import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { SmoothScroll } from "@/components/smooth-scroll";
import { RevealObserver } from "@/components/reveal-observer";
import { MotionProviders } from "@/components/motion-providers";
import { A11yPanel } from "@/components/a11y-panel";

function isValidLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

const OG_LOCALE: Record<string, string> = {
  uz: "uz_UZ",
  "uz-cyrl": "uz_Cyrl_UZ",
  ru: "ru_RU",
};

const GEO_PLACENAME: Record<string, string> = {
  uz: "Farg'ona",
  "uz-cyrl": "Фарғона",
  ru: "Фергана",
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const t = await getTranslations({ locale, namespace: "meta" });
  const baseUrl = "https://taxservice.uz";
  const pageUrl =
    locale === routing.defaultLocale ? baseUrl : `${baseUrl}/${locale}`;

  const ogLocale = OG_LOCALE[locale] ?? "uz_UZ";
  const alternateLocale = Object.entries(OG_LOCALE)
    .filter(([key]) => key !== locale)
    .map(([, value]) => value);

  return {
    title: { absolute: t("title") },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "E-tax", url: baseUrl }],
    creator: "E-tax",
    publisher: "E-tax",
    applicationName: "E-tax",
    category: "Finance",
    alternates: {
      canonical: pageUrl,
      languages: {
        "uz-Latn": `${baseUrl}/`,
        "uz-Cyrl": `${baseUrl}/uz-cyrl`,
        ru: `${baseUrl}/ru`,
        "x-default": `${baseUrl}/`,
      },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: pageUrl,
      siteName: "E-tax",
      locale: ogLocale,
      alternateLocale,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: t("title"),
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      other: process.env.BING_VERIFICATION
        ? { "msvalidate.01": process.env.BING_VERIFICATION }
        : undefined,
    },
    other: {
      "format-detection": "telephone=no",
      "geo.region": "UZ-FA",
      "geo.placename": GEO_PLACENAME[locale] ?? "Farg'ona",
      "geo.position": "40.3864;71.7864",
      ICBM: "40.3864, 71.7864",
      "revisit-after": "7 days",
      rating: "general",
      distribution: "global",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  const skipLabel: Record<string, string> = {
    uz: "Asosiy mazmunga o'tish",
    "uz-cyrl": "Асосий мазмунга ўтиш",
    ru: "Перейти к основному содержанию",
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MotionProviders>
        <a href="#main" className="skip-link">
          {skipLabel[locale] ?? skipLabel.uz}
        </a>
        <SmoothScroll />
        <RevealObserver />
        {children}
        <A11yPanel />
      </MotionProviders>
    </NextIntlClientProvider>
  );
}
