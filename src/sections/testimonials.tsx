"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Quotes } from "@phosphor-icons/react/dist/ssr";

type Item = { q: string; a: string; n: string; r: string };

export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Item[];
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 lg:py-36 bg-cream relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-32 w-[440px] h-[440px] rounded-full bg-primary-tint blur-3xl opacity-40"
      />

      <div className="wrap relative">
        <div className="mb-12 sm:mb-16 lg:mb-20 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            {t("eyebrow")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="heading-1 mt-5"
          >
            {t("titlePre")}
            <span className="accent">{t("titleEm")}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-3 sm:gap-5 lg:gap-6 items-stretch">
          <div className="flex flex-col h-full order-2 lg:order-1">
            <ul className="flex flex-col gap-2.5 sm:gap-3 lg:gap-4 flex-1">
              {items.map((it, i) => {
                const isActive = active === i;
                return (
                  <li key={i} className="flex-1 min-h-[88px] sm:min-h-[100px] lg:min-h-[120px]">
                    <button
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      className={`group relative w-full h-full flex items-center gap-3.5 sm:gap-4 lg:gap-5 p-4 sm:p-5 lg:p-7 text-left overflow-hidden transition-colors duration-500 ${
                        isActive
                          ? "bg-navy text-paper"
                          : "bg-paper text-navy hover:bg-primary-tint/60"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute left-0 top-0 bottom-0 w-[3px] bg-primary origin-top transition-transform duration-500 ${
                          isActive ? "scale-y-100" : "scale-y-0"
                        }`}
                      />

                      {!isActive && (
                        <span
                          aria-hidden
                          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-2 h-2 bg-primary rounded-full pulse-dot"
                        />
                      )}

                      <span
                        className={`hidden sm:block text-[11px] lg:text-[12px] uppercase tracking-[0.22em] font-mono w-7 lg:w-8 transition-colors duration-500 ${
                          isActive ? "text-primary" : "text-muted"
                        }`}
                      >
                        0{i + 1}
                      </span>

                      <span
                        className={`inline-flex w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 shrink-0 items-center justify-center text-base sm:text-lg font-bold transition-all duration-500 ${
                          isActive
                            ? "bg-primary text-navy"
                            : "bg-navy text-paper group-hover:bg-primary group-hover:text-navy"
                        }`}
                      >
                        {it.a}
                      </span>

                      <div className="flex-1 min-w-0">
                        <strong
                          className={`block font-semibold text-[15px] sm:text-[16px] lg:text-[18px] truncate transition-colors duration-500 ${
                            isActive ? "text-paper" : "text-navy"
                          }`}
                        >
                          {it.n}
                        </strong>
                        <span
                          className={`block text-[12px] sm:text-[13px] lg:text-[14px] truncate transition-colors duration-500 ${
                            isActive ? "text-paper/65" : "text-muted"
                          }`}
                        >
                          {it.r}
                        </span>
                      </div>

                      <span
                        aria-hidden
                        className={`text-lg sm:text-xl transition-all duration-500 ${
                          isActive
                            ? "text-primary opacity-100 translate-x-0"
                            : "text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:animate-[bounceX_1.2s_ease-in-out_infinite]"
                        }`}
                      >
                        →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative bg-paper p-7 sm:p-10 lg:p-16 min-h-[360px] sm:min-h-[440px] lg:min-h-[540px] overflow-hidden h-full order-1 lg:order-2">
            <span
              aria-hidden
              className="absolute -top-8 sm:-top-12 lg:-top-16 -right-4 sm:-right-6 lg:-right-8 text-[180px] sm:text-[260px] lg:text-[440px] font-bold text-primary/5 leading-[0.85] select-none"
            >
              &ldquo;
            </span>
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(12,42,77,0.7) 0 1px, transparent 1px 18px)",
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                className="relative h-full flex flex-col justify-between gap-6 sm:gap-8 lg:gap-10"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5 sm:mb-7 lg:mb-8">
                    <Quotes
                      size={24}
                      weight="fill"
                      className="text-primary sm:hidden"
                    />
                    <Quotes
                      size={28}
                      weight="fill"
                      className="text-primary hidden sm:block"
                    />
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted font-mono">
                      0{active + 1} / 0{items.length}
                    </span>
                    <span className="flex-1 h-px bg-line ml-2" />
                  </div>
                  <blockquote className="text-[18px] sm:text-[24px] lg:text-[32px] leading-tight tracking-tight font-medium text-navy max-w-[28ch]">
                    {current.q}
                  </blockquote>
                </div>

                <div className="flex items-center gap-4 sm:gap-5 pt-5 sm:pt-7 lg:pt-8 border-t border-line">
                  <span className="inline-flex w-12 h-12 sm:w-14 sm:h-14 bg-navy text-paper items-center justify-center text-lg sm:text-xl font-bold shrink-0">
                    {current.a}
                  </span>
                  <div className="min-w-0">
                    <strong className="block font-semibold text-[14px] sm:text-[16px] text-navy truncate">
                      {current.n}
                    </strong>
                    <span className="block text-[12px] sm:text-[13px] text-muted truncate">{current.r}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
