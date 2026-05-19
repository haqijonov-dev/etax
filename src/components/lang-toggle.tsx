"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Variant = "light" | "dark";

export function LangToggle({
  variant = "light",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const change = (next: string) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, {
        locale: next as (typeof routing.locales)[number],
      });
    });
  };

  const isDark = variant === "dark";
  const activeCls = isDark ? "bg-paper text-navy" : "bg-navy text-paper";
  const inactiveCls = isDark
    ? "text-paper/60 hover:text-paper"
    : "text-ink-2 hover:text-ink";

  const LABELS: Record<string, string> = {
    uz: "UZ",
    "uz-cyrl": "УЗ",
    ru: "RU",
  };

  return (
    <div
      role="group"
      aria-label="Language"
      data-busy={isPending}
      className={`btn btn-secondary btn-sm !p-0 !px-1 gap-0 ${className}`}
    >
      {routing.locales.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => change(code)}
            aria-pressed={active}
            className={`inline-flex items-center justify-center h-[30px] min-w-[36px] px-2 text-[12px] font-semibold transition-colors ${
              active ? activeCls : inactiveCls
            }`}
          >
            {LABELS[code] ?? code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
