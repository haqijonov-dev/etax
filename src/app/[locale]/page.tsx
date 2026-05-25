import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/nav";
import { Hero } from "@/sections/hero";
import { Stats } from "@/sections/stats";
import { Services } from "@/sections/services";
import { Audit } from "@/sections/audit";
import { About } from "@/sections/about";
import { Process } from "@/sections/process";
import { Testimonials } from "@/sections/testimonials";
import { Faq } from "@/sections/faq";
import { Cta } from "@/sections/cta";
import { Footer } from "@/sections/footer";
import { SeoSemantic } from "@/components/seo-semantic";

type Params = Promise<{ locale: string }>;
type FaqItem = { q: string; a: string };
type ServiceItem = { n: string; t: string; d: string };
type ProcessStep = { n: string; t: string; d: string };
type Testimonial = { q: string; n: string; r: string };

const LANG_TAG: Record<string, string> = {
  uz: "uz-Latn-UZ",
  "uz-cyrl": "uz-Cyrl-UZ",
  ru: "ru-RU",
};

const NAV_LABEL: Record<string, { home: string }> = {
  uz: { home: "Bosh sahifa" },
  "uz-cyrl": { home: "Бош саҳифа" },
  ru: { home: "Главная" },
};

export default async function HomePage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta" });
  const tHero = await getTranslations({ locale, namespace: "hero" });
  const tServices = await getTranslations({ locale, namespace: "services" });
  const tProcess = await getTranslations({ locale, namespace: "process" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const tTesti = await getTranslations({ locale, namespace: "testimonials" });

  const baseUrl = "https://taxservice.uz";
  const pageUrl = locale === routing.defaultLocale ? baseUrl : `${baseUrl}/${locale}`;
  const inLanguage = LANG_TAG[locale] ?? "uz-Latn-UZ";

  const faqItems = tFaq.raw("items") as FaqItem[];
  const serviceItems = tServices.raw("items") as ServiceItem[];
  const processSteps = tProcess.raw("steps") as ProcessStep[];
  const testimonialItems = tTesti.raw("items") as Testimonial[];

  const PHONE = "+998908498989";
  const TELEGRAM = "https://t.me/omad9999";
  const STREET = "Samo sport majmuasi ro'parasi";

  const organization = {
    "@type": ["AccountingService", "LocalBusiness", "ProfessionalService"],
    "@id": `${baseUrl}#organization`,
    name: "E-tax",
    alternateName: ["E-TAX", "taxservice.uz", "Etax"],
    legalName: "E-tax",
    description: t("description"),
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      "@id": `${baseUrl}#logo`,
      url: `${baseUrl}/black-logo.png`,
      contentUrl: `${baseUrl}/black-logo.png`,
      width: 800,
      height: 240,
      caption: "E-tax — Buxgalteriya va soliq xizmatlari Farg'ona",
    },
    image: [
      `${baseUrl}/opengraph-image`,
      `${baseUrl}/black-logo.png`,
    ],
    telephone: PHONE,
    email: "hello@taxservice.uz",
    priceRange: "500 000 – 7 000 000 UZS",
    currenciesAccepted: "UZS",
    paymentAccepted: ["Bank transfer", "Cash", "Invoice"],
    foundingDate: "2012",
    slogan: tHero("headlinePre") + " " + tHero("headlineEm"),
    address: {
      "@type": "PostalAddress",
      streetAddress: STREET,
      addressLocality: "Farg'ona",
      addressRegion: "Farg'ona viloyati",
      postalCode: "150100",
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.3864,
      longitude: 71.7864,
    },
    hasMap: "https://www.google.com/maps/search/?api=1&query=Samo+sport+majmuasi+Farg%27ona",
    areaServed: [
      { "@type": "Country", name: "Uzbekistan" },
      { "@type": "AdministrativeArea", name: "Farg'ona viloyati" },
      { "@type": "City", name: "Farg'ona" },
      { "@type": "City", name: "Marg'ilon" },
      { "@type": "City", name: "Qo'qon" },
      { "@type": "City", name: "Toshkent" },
    ],
    serviceType: [
      "Buxgalteriya hisobi",
      "Soliq hisobotlari",
      "NDS deklaratsiyasi",
      "Foyda solig'i hisoboti",
      "Kadrlar (HR) hujjatlari",
      "Ish haqi hisobi",
      "Elektron hisob-faktura (e-faktura)",
      "Bank operatsiyalari nazorati",
      "Soliq va moliyaviy konsalting",
      "MChJ ochish va yopish",
      "YaTT ochish va yopish",
      "Korxona ro'yxatdan o'tkazish",
    ],
    knowsAbout: [
      "Buxgalteriya hisobi",
      "Soliq hisoboti",
      "NDS (qo'shilgan qiymat solig'i)",
      "Foyda solig'i",
      "Aylanma soliq",
      "Yagona soliq to'lov",
      "Elektron hisob-faktura",
      "didox",
      "faktura.uz",
      "Kadrlar hujjatlari",
      "HR delopodvodstvo",
      "Mehnat shartnomalari",
      "Ish haqi hisobi",
      "Bank operatsiyalari",
      "MChJ ro'yxatdan o'tkazish",
      "YaTT ro'yxatdan o'tkazish",
      "Korxona likvidatsiyasi",
      "Soliq inspeksiyasi bilan ishlash",
      "Soliq jarimalarini oldini olish",
      "Buxgalteriya autsorsing",
    ],
    knowsLanguage: ["uz", "uz-Cyrl", "ru", "en"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "320",
      reviewCount: "120",
    },
    review: testimonialItems.map((it, i) => ({
      "@type": "Review",
      "@id": `${baseUrl}#review-${i + 1}`,
      author: { "@type": "Organization", name: it.n },
      reviewBody: it.q,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
      itemReviewed: { "@id": `${baseUrl}#organization` },
      inLanguage,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      "@id": `${baseUrl}#offer-catalog`,
      name: tServices("titlePre") + tServices("titleEm") + tServices("titlePost"),
      itemListElement: serviceItems.map((s) => ({
        "@type": "Offer",
        "@id": `${baseUrl}#offer-${s.n}`,
        name: s.t,
        description: s.d,
        priceCurrency: "UZS",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "UZS",
          minPrice: "500000",
          maxPrice: "7000000",
        },
        availability: "https://schema.org/InStock",
        areaServed: { "@type": "Country", name: "Uzbekistan" },
        itemOffered: {
          "@type": "Service",
          "@id": `${baseUrl}#service-${s.n}`,
          name: s.t,
          description: s.d,
          serviceType: s.t,
          provider: { "@id": `${baseUrl}#organization` },
          areaServed: { "@type": "Country", name: "Uzbekistan" },
        },
      })),
    },
    sameAs: [
      "https://t.me/omad9999",
      "https://t.me/taxserviceuz",
      "https://www.linkedin.com/company/taxserviceuz",
      "https://www.instagram.com/taxserviceuz",
      "https://www.facebook.com/taxserviceuz",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "customer service",
        areaServed: "UZ",
        availableLanguage: ["uz", "uz-Cyrl", "ru"],
      },
      {
        "@type": "ContactPoint",
        url: TELEGRAM,
        contactType: "sales",
        areaServed: "UZ",
        availableLanguage: ["uz", "uz-Cyrl", "ru"],
      },
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    url: baseUrl,
    name: "E-tax",
    description: t("description"),
    inLanguage: ["uz-Latn-UZ", "uz-Cyrl-UZ", "ru-RU"],
    publisher: { "@id": `${baseUrl}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const webpage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: t("title"),
    description: t("description"),
    inLanguage,
    isPartOf: { "@id": `${baseUrl}#website` },
    about: { "@id": `${baseUrl}#organization` },
    primaryImageOfPage: { "@id": `${baseUrl}#logo` },
    breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
    mainEntity: { "@id": `${baseUrl}#organization` },
  };

  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumbs`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "E-tax",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: NAV_LABEL[locale]?.home ?? "Bosh sahifa",
        item: pageUrl,
      },
    ],
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    inLanguage,
    mainEntity: faqItems.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };

  const services = {
    "@type": "ItemList",
    "@id": `${pageUrl}#services`,
    inLanguage,
    name: tServices("titlePre") + tServices("titleEm") + tServices("titlePost"),
    numberOfItems: serviceItems.length,
    itemListElement: serviceItems.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${pageUrl}#service-${s.n}`,
      item: { "@id": `${baseUrl}#service-${s.n}` },
    })),
  };

  const howToProcess = {
    "@type": "HowTo",
    "@id": `${pageUrl}#process`,
    inLanguage,
    name: tProcess("titlePre") + tProcess("titleEm") + tProcess("titlePost"),
    totalTime: "P30D",
    step: processSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.t,
      text: s.d,
      url: `${pageUrl}#process-${s.n}`,
    })),
  };

  const videoObject = {
    "@type": "VideoObject",
    "@id": `${baseUrl}#hero-video`,
    name: tHero("headlinePre") + " " + tHero("headlineEm"),
    description: tHero("sub"),
    thumbnailUrl: `${baseUrl}/hero-poster.svg`,
    uploadDate: "2024-01-01T00:00:00+05:00",
    contentUrl: `${baseUrl}/hero-video.mp4`,
    inLanguage,
    publisher: { "@id": `${baseUrl}#organization` },
  };

  const siteNav = {
    "@type": "SiteNavigationElement",
    "@id": `${baseUrl}#sitenav`,
    name: ["Xizmatlar", "Biz haqimizda", "Jarayon", "Mijozlar", "Savollar", "Bog'lanish"],
    url: [
      `${pageUrl}#services`,
      `${pageUrl}#about`,
      `${pageUrl}#process`,
      `${pageUrl}#testimonials`,
      `${pageUrl}#faq`,
      `${pageUrl}#contact`,
    ],
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      webpage,
      breadcrumbs,
      faqPage,
      services,
      howToProcess,
      videoObject,
      siteNav,
    ],
  };

  return (
    <>
      <Nav initialDark />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Stats />
        <div data-defer-section>
          <Services />
        </div>
        <div data-defer-section>
          <Audit />
        </div>
        <div data-defer-section>
          <About />
        </div>
        <div data-defer-section>
          <Process />
        </div>
        <div data-defer-section>
          <Testimonials />
        </div>
        <div data-defer-section>
          <Faq />
        </div>
        <div data-defer-section>
          <Cta />
        </div>
      </main>
      <Footer />

      <SeoSemantic locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    </>
  );
}
