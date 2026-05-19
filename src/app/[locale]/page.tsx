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
            name: "E-TAX",
            alternateName: "taxservice.uz",
            description: t("description"),
            url: baseUrl,
            logo: `${baseUrl}/black-logo.png`,
            image: `${baseUrl}/opengraph-image`,
            telephone: "+998908498989",
            priceRange: "500000 - 7000000 UZS",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Farg'ona",
              addressCountry: "UZ",
            },
            areaServed: { "@type": "Country", name: "Uzbekistan" },
            serviceType: [
              "Accounting services",
              "Tax reporting",
              "VAT reporting",
              "HR documentation",
              "E-invoicing",
              "Bank operations",
              "Financial consulting",
              "Company registration",
            ],
            sameAs: ["https://t.me/omad9999"],
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
            name: "E-TAX",
            description: t("description"),
            inLanguage:
              locale === "ru"
                ? "ru-RU"
                : locale === "uz-cyrl"
                  ? "uz-Cyrl-UZ"
                  : "uz-Latn-UZ",
            publisher: { "@id": `${baseUrl}#organization` },
          }),
        }}
      />
    </>
  );
}
