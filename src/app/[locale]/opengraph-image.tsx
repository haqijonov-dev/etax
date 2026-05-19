import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type Params = { params: Promise<{ locale: string }> };

export default async function OgImage({ params }: Params) {
  const { locale } = await params;
  if (locale === "ru") return renderOgImage("ru");
  if (locale === "uz-cyrl") return renderOgImage("uz-cyrl");
  return renderOgImage("uz");
}
