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
            name: "Etax",
            description: t("description"),
            url: "https://etax.uz",
            telephone: "+998712001488",
            email: "hello@etax.uz",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Amir Temur 107A, 4-qavat",
              addressLocality: "Toshkent",
              addressCountry: "UZ",
            },
            areaServed: "UZ",
            serviceType: [
              "Tax optimization",
              "Management reporting",
              "Budgeting",
              "IFRS transition",
              "CFO outsourcing",
              "Due diligence",
            ],
          }),
        }}
      />
    </>
  );
}
