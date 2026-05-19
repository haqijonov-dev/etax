import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
  preload: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#143A6C",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://taxservice.uz"),
  title: { default: "E-tax", template: "%s · E-tax" },
  description:
    "E-tax — Farg'ona shahridagi buxgalteriya va soliq xizmatlari. MChJ, YaTT va kichik bizneslar uchun: hisobot, NDS, e-faktura, HR, konsalting.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  formatDetection: { telephone: false, email: false, address: false },
};

const LANG_TAG: Record<string, string> = {
  uz: "uz-Latn-UZ",
  "uz-cyrl": "uz-Cyrl-UZ",
  ru: "ru-RU",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const htmlLang = LANG_TAG[locale] ?? "uz-Latn-UZ";

  return (
    <html lang={htmlLang} className={poppins.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
