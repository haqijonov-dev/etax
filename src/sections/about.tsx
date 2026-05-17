"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Icon, type IconName } from "@/components/icon";

type Bullet = { icon: IconName; t: string; d: string };

export function About() {
  const t = useTranslations("about");
  const list = t.raw("list") as Bullet[];

  return (
    <section
      id="about"
      className="py-20 sm:py-28 lg:py-36 bg-cream"
    >
      <div className="wrap">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative overflow-hidden bg-navy shadow-[0_30px_80px_-30px_rgba(11,36,64,0.3)] aspect-[4/5] lg:aspect-[4/5]"
          >
            <div
              className="absolute inset-0 flex items-end p-7 text-paper/60 font-mono text-xs tracking-wider"
              style={{
                background:
                  "repeating-linear-gradient(135deg, rgba(245,241,234,0.04) 0 6px, rgba(245,241,234,0.10) 6px 12px), linear-gradient(160deg, #0B2440 0%, #122E50 100%)",
              }}
            >
              {t("placeholder")}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute top-6 right-6 bg-paper px-4 py-3 flex items-center gap-3.5 shadow-card max-w-[80%]"
            >
              <span className="inline-flex w-10 h-10 bg-primary-tint text-primary-deep items-center justify-center font-semibold">
                {t("floatNum")}
              </span>
              <div className="text-xs leading-snug text-ink-2">
                <strong className="block text-lg font-semibold text-navy mb-0.5">
                  {t("floatTitle")}
                </strong>
                {t("floatSub")}
              </div>
            </motion.div>
          </motion.div>

          <div>
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
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
              className="h-1 mt-5 mb-8"
            >
              {t("titleP1")}
              <span className="accent">{t("titleE1")}</span>
              {t("titleP2")}
              <span className="accent">{t("titleE2")}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-ink-2 text-base sm:text-[17px] max-w-[52ch] mb-10 leading-relaxed"
            >
              {t("lead")}
            </motion.p>

            <ul className="border-t border-line">
              {list.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="grid grid-cols-[44px_1fr] gap-5 py-5 border-b border-line items-start"
                >
                  <span className="inline-flex w-10 h-10 bg-primary-tint text-primary-deep items-center justify-center">
                    <Icon name={b.icon} size={20} weight="duotone" />
                  </span>
                  <div>
                    <h4 className="text-[20px] sm:text-[22px] font-semibold tracking-tight mb-1">
                      {b.t}
                    </h4>
                    <p className="text-sm text-ink-2 max-w-[52ch] leading-relaxed">
                      {b.d}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
