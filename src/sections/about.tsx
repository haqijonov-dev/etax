"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Icon, type IconName } from "@/components/icon";

type Bullet = { icon: IconName; t: string; d: string };
type Stat = { v: string; l: string };

export function About() {
  const t = useTranslations("about");
  const list = t.raw("list") as Bullet[];
  const stats = t.raw("stats") as Stat[];

  const featureSpans = [
    "lg:col-span-5",
    "lg:col-span-7",
    "lg:col-span-7",
    "lg:col-span-5",
  ];

  return (
    <section
      id="about"
      className="py-16 sm:py-24 lg:py-36 bg-cream relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 w-[460px] h-[460px] rounded-full bg-primary-tint blur-3xl opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-32 w-[420px] h-[420px] rounded-full bg-primary-tint blur-3xl opacity-40"
      />

      <div className="wrap relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            className="lg:col-span-7 bg-paper p-6 sm:p-8 lg:p-14 flex flex-col justify-between gap-8 sm:gap-10 min-h-[260px] sm:min-h-[300px] lg:min-h-[360px] relative overflow-hidden"
          >
            <span className="eyebrow">{t("eyebrow")}</span>
            <div>
              <h2 className="heading-1">
                {t("titleP1")}
                <span className="accent">{t("titleE1")}</span>
                {t("titleP2")}
                <span className="accent">{t("titleE2")}</span>
              </h2>
              <div className="flex items-center gap-3 mt-6 sm:mt-8">
                <span className="h-px w-10 sm:w-12 bg-navy" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted font-semibold">
                  Etax · Farg'ona · 2012
                </span>
              </div>
            </div>
            <span
              aria-hidden
              className="absolute top-4 sm:top-6 right-4 sm:right-6 lg:top-8 lg:right-8 text-[80px] sm:text-[120px] lg:text-[200px] font-bold text-navy/4 leading-none select-none"
            >
              ✦
            </span>
          </motion.div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className="bg-paper p-5 sm:p-6 lg:p-7 flex flex-col justify-between gap-4 relative group min-h-[120px] sm:min-h-[150px] lg:min-h-[180px]"
              >
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-muted font-semibold">
                  {s.l}
                </span>
                <div className="flex items-end justify-between gap-2">
                  <span className="text-[32px] sm:text-[42px] lg:text-[58px] font-bold tracking-tight leading-none text-navy">
                    {s.v}
                  </span>
                  <span className="text-[10px] font-mono text-muted/70 tracking-widest shrink-0">
                    0{i + 1}
                  </span>
                </div>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

          {list.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`${featureSpans[i]} bg-paper p-6 sm:p-8 lg:p-12 relative group hover:bg-primary-tint/30 transition-colors duration-500 overflow-hidden`}
            >
              <span
                aria-hidden
                className="absolute -top-2 -right-1 sm:-top-3 sm:-right-2 lg:-top-4 lg:-right-2 text-[72px] sm:text-[96px] lg:text-[160px] font-bold leading-none select-none text-navy/4 group-hover:text-primary/15 transition-colors duration-500"
              >
                0{i + 1}
              </span>

              <div className="relative">
                <span className="inline-flex w-11 h-11 sm:w-12 sm:h-12 bg-primary-tint text-primary-deep items-center justify-center mb-5 sm:mb-6 transition-all duration-500 group-hover:bg-navy group-hover:text-paper">
                  <Icon name={b.icon} size={22} weight="duotone" />
                </span>
                <h4 className="text-[18px] sm:text-[22px] lg:text-[26px] font-semibold tracking-tight mb-3 text-navy">
                  {b.t}
                </h4>
                <p className="text-[14px] sm:text-[15px] text-ink-2 leading-relaxed max-w-[48ch]">
                  {b.d}
                </p>
              </div>

              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[2px] w-full bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
