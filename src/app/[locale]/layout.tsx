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

function isValidLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

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

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "Etax", url: baseUrl }],
    creator: "Etax",
    publisher: "Etax",
    applicationName: "Etax",
    category: "Finance",
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: {
        uz: "/",
        ru: "/ru",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: pageUrl,
      siteName: "Etax",
      locale: locale === "uz" ? "uz_UZ" : "ru_RU",
      alternateLocale: locale === "uz" ? ["ru_RU"] : ["uz_UZ"],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@taxserviceuz",
      site: "@taxserviceuz",
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
      google: "",
      yandex: "",
    },
    other: {
      "format-detection": "telephone=no",
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

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SmoothScroll />
      <RevealObserver />
      {children}
    </NextIntlClientProvider>
  );
}
