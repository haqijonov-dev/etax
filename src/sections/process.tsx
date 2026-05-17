"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

type Step = { n: string; t: string; d: string };

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];

  return (
    <section id="process" className="py-20 sm:py-28 lg:py-36 bg-navy text-paper">
      <div className="wrap">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-y-6 gap-x-16 items-start mb-16 sm:mb-20 lg:mb-24">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow text-paper/70 before:bg-paper/50"
            >
              {t("eyebrow")}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
              className="h-1 mt-5 text-paper"
            >
              {t("titlePre")}
              <span className="text-primary">{t("titleEm")}</span>
              {t("titlePost")}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-paper/70 max-w-[50ch] lg:mt-12"
          >
            {t("lead")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-paper/15">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
              className="relative p-8 sm:p-9 border-b border-paper/15 sm:[&:nth-child(odd)]:border-r sm:nth-[3]:border-r-0 lg:border-r lg:[&:last-child]:border-r-0 border-paper/15 last:border-b-0 lg:[&:nth-child(-n+4)]:border-b-0"
            >
              <div className="text-sm text-primary tracking-wider mb-14">
                — {s.n}
              </div>
              <h4 className="text-[22px] sm:text-[24px] font-semibold tracking-tight mb-3 text-paper">
                {s.t}
              </h4>
              <p className="text-sm text-paper/65 leading-relaxed">{s.d}</p>
              {i < steps.length - 1 && (
                <CaretRight
                  size={14}
                  weight="bold"
                  className="hidden lg:block absolute top-8 right-5 text-primary"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
