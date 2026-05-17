"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

type Step = { n: string; t: string; d: string };

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="py-16 sm:py-24 lg:py-36 bg-navy text-paper relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(245,241,234,0.6) 0 1px, transparent 1px 14px)",
        }}
      />

      <div className="wrap relative">
        <div className="mb-10 sm:mb-16 lg:mb-24 max-w-3xl">
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
            id="process-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="heading-1 mt-5 text-paper"
          >
            {t("titlePre")}
            <span className="text-primary">{t("titleEm")}</span>
            {t("titlePost")}
          </motion.h2>
        </div>

        <ol className="relative border-t border-paper/15">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.2, 0.7, 0.2, 1],
              }}
              className="group relative grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-y-3 sm:gap-y-4 gap-x-10 xl:gap-x-20 py-8 sm:py-12 lg:py-14 border-b border-paper/15 transition-colors duration-500 hover:bg-paper/2.5"
            >
              <div className="relative">
                <span
                  aria-hidden
                  className="block text-[64px] sm:text-[96px] lg:text-[160px] font-bold text-primary/15 group-hover:text-primary/30 leading-[0.82] tracking-tight transition-colors duration-500 select-none"
                >
                  {s.n}
                </span>
              </div>

              <div className="lg:pt-5 max-w-[58ch]">
                <h4 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold tracking-tight mb-3 text-paper">
                  {s.t}
                </h4>
                <p className="text-paper/65 leading-relaxed text-[14px] sm:text-base">
                  {s.d}
                </p>
                <span
                  aria-hidden
                  className="mt-5 sm:mt-6 block h-px w-10 sm:w-12 bg-primary/60 origin-left transition-transform duration-500 group-hover:scale-x-[3.5]"
                />
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
