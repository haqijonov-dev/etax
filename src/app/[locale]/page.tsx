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

export default async function HomePage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta" });
  const baseUrl = "https://taxservice.uz";

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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": `${baseUrl}#organization`,
            name: "Etax",
            alternateName: "taxservice.uz",
            description: t("description"),
            url: baseUrl,
            logo: `${baseUrl}/black-logo.png`,
            image: `${baseUrl}/og-image.svg`,
            telephone: "+998712001488",
            email: "hello@taxservice.uz",
            priceRange: "$$",
            foundingDate: "2012",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Amir Temur 107A, 4-qavat",
              addressLocality: "Farg'ona",
              addressCountry: "UZ",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 40.3864,
              longitude: 71.7864,
            },
            areaServed: { "@type": "Country", name: "Uzbekistan" },
            serviceType: [
              "Tax optimization",
              "Management reporting",
              "Budgeting",
              "IFRS transition",
              "CFO outsourcing",
              "Due diligence",
            ],
            sameAs: [
              "https://t.me/taxserviceuz",
              "https://www.linkedin.com/company/taxserviceuz",
              "https://www.instagram.com/taxserviceuz",
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${baseUrl}#website`,
            url: baseUrl,
            name: "TaxService",
            description: t("description"),
            inLanguage: locale === "uz" ? "uz-UZ" : "ru-RU",
            publisher: { "@id": `${baseUrl}#organization` },
          }),
        }}
      />
    </>
  );
}
