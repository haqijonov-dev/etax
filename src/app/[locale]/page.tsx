import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/nav";
import { Hero } from "@/sections/hero";
import { Stats } from "@/sections/stats";
import { Services } from "@/sections/services";
import { About } from "@/sections/about";
import { Process } from "@/sections/process";
import { Testimonials } from "@/sections/testimonials";
import { Faq } from "@/sections/faq";
import { Cta } from "@/sections/cta";
import { Footer } from "@/sections/footer";

type Params = Promise<{ locale: string }>;
type FaqItem = { q: string; a: string };
type ServiceItem = { n: string; t: string; d: string };
type ProcessStep = { n: string; t: string; d: string };

export default async function HomePage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta" });
  const tHero = await getTranslations({ locale, namespace: "hero" });
  const tServices = await getTranslations({ locale, namespace: "services" });
  const tProcess = await getTranslations({ locale, namespace: "process" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });

  const baseUrl = "https://taxservice.uz";
  const pageUrl = locale === routing.defaultLocale ? baseUrl : `${baseUrl}/${locale}`;
  const inLanguage = locale === "uz" ? "uz-UZ" : "ru-RU";

  const faqItems = tFaq.raw("items") as FaqItem[];
  const serviceItems = tServices.raw("items") as ServiceItem[];
  const processSteps = tProcess.raw("steps") as ProcessStep[];

  const organization = {
    "@type": "ProfessionalService",
    "@id": `${baseUrl}#organization`,
    name: "Etax",
    alternateName: "taxservice.uz",
    legalName: "Etax LLC",
    description: t("description"),
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/black-logo.png`,
      width: 800,
      height: 240,
    },
    image: `${baseUrl}/opengraph-image`,
    telephone: "+998712001488",
    email: "hello@taxservice.uz",
    priceRange: "$$$",
    foundingDate: "2012",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 24 },
    slogan: tHero("headlinePre") + " " + tHero("headlineEm"),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Amir Temur 107A, 4-qavat",
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
    areaServed: [
      { "@type": "Country", name: "Uzbekistan" },
      { "@type": "AdministrativeArea", name: "Farg'ona" },
      { "@type": "AdministrativeArea", name: "Toshkent" },
      { "@type": "AdministrativeArea", name: "Samarqand" },
    ],
    serviceType: serviceItems.map((s) => s.t),
    knowsAbout: [
      "Tax optimization",
      "IFRS / MSFO transition",
      "Management accounting",
      "Budgeting and forecasting",
      "CFO outsourcing",
      "Due diligence",
      "M&A advisory",
      "Financial strategy",
    ],
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
      ratingCount: "320",
      reviewCount: "120",
    },
    sameAs: [
      "https://t.me/taxserviceuz",
      "https://www.linkedin.com/company/taxserviceuz",
      "https://www.instagram.com/taxserviceuz",
      "https://www.facebook.com/taxserviceuz",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+998712001488",
        contactType: "customer service",
        areaServed: "UZ",
        availableLanguage: ["uz", "ru", "en"],
        contactOption: "TollFree",
      },
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    url: baseUrl,
    name: "Etax",
    description: t("description"),
    inLanguage: ["uz-UZ", "ru-RU"],
    publisher: { "@id": `${baseUrl}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${baseUrl}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumbs`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Etax",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "ru" ? "Главная" : "Bosh sahifa",
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
      item: {
        "@type": "Service",
        "@id": `${baseUrl}#service-${s.n}`,
        name: s.t,
        description: s.d,
        serviceType: s.t,
        provider: { "@id": `${baseUrl}#organization` },
        areaServed: { "@type": "Country", name: "Uzbekistan" },
      },
    })),
  };

  const howToProcess = {
    "@type": "HowTo",
    "@id": `${pageUrl}#process`,
    inLanguage,
    name:
      tProcess("titlePre") + tProcess("titleEm") + tProcess("titlePost"),
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

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      breadcrumbs,
      faqPage,
      services,
      howToProcess,
      videoObject,
    ],
  };

  return (
    <>
      <Nav initialDark />
      <main>
        <Hero />
        <Stats />
        <Services />
        <About />
        <Process />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    </>
  );
}
