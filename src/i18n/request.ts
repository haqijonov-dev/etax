import { getRequestConfig } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";
import { routing } from "./routing";

const LOADERS = {
  uz: () => import("../../messages/uz.json"),
  "uz-cyrl": () => import("../../messages/uz-cyrl.json"),
  ru: () => import("../../messages/ru.json"),
} as const;

type SupportedLocale = keyof typeof LOADERS;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const isValid =
    typeof requested === "string" &&
    (routing.locales as readonly string[]).includes(requested);
  const locale = (isValid ? requested : routing.defaultLocale) as SupportedLocale;

  const mod = await LOADERS[locale]();

  return {
    locale,
    messages: mod.default as unknown as AbstractIntlMessages,
  };
});
