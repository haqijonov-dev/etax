"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "@phosphor-icons/react/dist/ssr";

type Item = { q: string; a: string };

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Item[];
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-16 sm:py-24 lg:py-36">
      <div className="wrap">
        <div className="mb-10 sm:mb-14 lg:mb-16">
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

        <div className="border-t border-line">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="border-b border-line"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full grid grid-cols-[1fr_auto] sm:grid-cols-[64px_1fr_48px] items-center gap-4 sm:gap-6 py-5 sm:py-7 text-left"
                >
                  <span className="hidden sm:inline text-primary-deep text-base tracking-wide">
                    — 0{i + 1}
                  </span>
                  <span className="text-[17px] sm:text-[24px] lg:text-[28px] font-semibold tracking-tight leading-snug pr-2">
                    {it.q}
                  </span>
                  <span
                    className={`inline-flex w-11 h-11 sm:w-12 sm:h-12 shrink-0 items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "bg-navy border-navy text-paper rotate-45"
                        : "border-line text-ink hover:border-primary hover:text-primary-deep"
                    }`}
                  >
                    <Plus size={18} weight="bold" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-[64px_1fr] gap-4 sm:gap-6 pb-6 sm:pb-8">
                        <span className="hidden sm:block" />
                        <p className="text-[14.5px] sm:text-[15.5px] text-ink-2 max-w-[64ch] leading-relaxed">
                          {it.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
