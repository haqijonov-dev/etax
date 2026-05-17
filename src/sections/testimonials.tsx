"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Quotes } from "@phosphor-icons/react/dist/ssr";

type Item = { q: string; a: string; n: string; r: string };

export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Item[];

  return (
    <section id="testimonials" className="py-20 sm:py-28 lg:py-36">
      <div className="wrap">
        <div className="mb-12 sm:mb-16">
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
            className="h-1 mt-5"
          >
            {t("titlePre")}
            <span className="accent">{t("titleEm")}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-line">
          {items.map((it, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.08 }}
              className="p-10 sm:p-12 lg:p-14 flex flex-col justify-between gap-10 min-h-[360px] border-b border-line md:[&:nth-child(odd)]:border-r md:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <div>
                <Quotes
                  size={44}
                  weight="fill"
                  className="text-primary mb-5"
                />
                <blockquote className="text-[20px] sm:text-[22px] lg:text-[24px] leading-snug tracking-tight font-medium max-w-[40ch]">
                  {it.q}
                </blockquote>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className="inline-flex w-14 h-14 border border-line items-center justify-center text-navy text-xl font-semibold"
                  style={{
                    background:
                      "repeating-linear-gradient(135deg, rgba(11,36,64,0.06) 0 3px, rgba(11,36,64,0.14) 3px 6px), #F5F1EA",
                  }}
                >
                  {it.a}
                </span>
                <div>
                  <strong className="block font-semibold text-[15px]">
                    {it.n}
                  </strong>
                  <span className="text-[13px] text-muted">{it.r}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
