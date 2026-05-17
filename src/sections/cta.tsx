"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Icon, type IconName } from "@/components/icon";

type Channel = { label: string; val: string; icon: IconName };

export function Cta() {
  const t = useTranslations("cta");
  const channels = t.raw("channels") as Channel[];

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 lg:py-36 bg-navy text-paper relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(245,241,234,0.7) 0 1px, transparent 1px 18px)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-25 blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #03AED2 0%, transparent 65%)",
        }}
      />

      <div className="wrap relative">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 sm:gap-12 lg:gap-16 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="inline-block w-8 h-px bg-primary" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-primary font-mono">
                {t("eyebrow")}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.2, 0.7, 0.2, 1],
              }}
              className="heading-1 text-paper max-w-[22ch]"
            >
              {t("titlePre")}
              <span className="text-primary">{t("titleEm")}</span>
              {t("titlePost")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-paper/70 max-w-[48ch] mt-6 sm:mt-8 leading-relaxed text-[14.5px] sm:text-base"
            >
              {t("sub")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 w-full sm:w-auto"
            >
              <a className="btn btn-primary group w-full sm:w-auto" href="#">
                <span>{t("ctaPrimary")}</span>
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a className="btn btn-secondary w-full sm:w-auto" href="#">
                <span>{t("ctaGhost")}</span>
              </a>
            </motion.div>

            <div className="mt-10 sm:mt-12 pt-5 sm:pt-6 border-t border-paper/15 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-mono text-paper/55">
              <span>60 min</span>
              <span className="w-1 h-1 bg-paper/30 rounded-full" />
              <span>Bepul</span>
              <span className="w-1 h-1 bg-paper/30 rounded-full" />
              <span>Online / Office</span>
            </div>
          </div>

          <div className="lg:pl-8 lg:border-l lg:border-paper/15">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="block text-[11px] uppercase tracking-[0.22em] font-mono text-paper/55 mb-8"
            >
              Bog'lanish kanallari
            </motion.span>

            <ul className="flex flex-col">
              {channels.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.1,
                    ease: [0.2, 0.7, 0.2, 1],
                  }}
                >
                  <a
                    href="#"
                    className="group flex items-center gap-4 sm:gap-5 py-4 sm:py-5 lg:py-6 border-b border-paper/15 first:border-t first:border-paper/15 transition-all duration-500 hover:pl-3"
                  >
                    <span className="inline-flex w-11 h-11 sm:w-12 sm:h-12 shrink-0 border border-paper/20 items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                      <Icon
                        name={c.icon}
                        size={20}
                        weight="duotone"
                        className="text-primary group-hover:text-navy transition-colors duration-500"
                      />
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-mono text-paper/55 mb-1">
                        {c.label}
                      </span>
                      <strong className="block font-semibold text-[14.5px] sm:text-[16px] lg:text-[18px] text-paper group-hover:text-primary transition-colors duration-500 truncate">
                        {c.val}
                      </strong>
                    </div>
                    <ArrowRight
                      size={16}
                      weight="bold"
                      className="text-paper/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-500 shrink-0"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
