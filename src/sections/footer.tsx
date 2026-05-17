"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr";

type Group = { h: string; items: string[] };

export function Footer() {
  const t = useTranslations("footer");
  const groups = t.raw("groups") as Group[];
  const legal = t.raw("legal") as string[];

  return (
    <footer className="bg-paper text-navy pt-14 sm:pt-20 lg:pt-32 pb-8 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(11,36,64,0.7) 0 1px, transparent 1px 22px)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full opacity-30 blur-[100px] pointer-events-none bg-primary-tint"
      />

      <div className="wrap relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 sm:gap-12 lg:gap-16 items-start lg:items-end pb-10 sm:pb-14 lg:pb-20 border-b border-line">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative flex flex-col items-center lg:items-start"
          >
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="inline-block w-8 h-px bg-primary" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-primary-deep font-mono">
                ★ Etax · est. 2012
              </span>
            </div>
            <Image
              src="/black-logo.png"
              alt="Etax"
              width={800}
              height={240}
              className="h-14 sm:h-20 lg:h-32 w-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:pb-6"
          >
            <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
              <span className="text-[10px] font-mono text-primary-deep tracking-widest">
                04
              </span>
              <h5 className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted font-semibold">
                — {t("addressHeading")}
              </h5>
            </div>
            <p className="text-[14px] sm:text-[16px] lg:text-[17px] text-ink-2 leading-relaxed max-w-[32ch]">
              {t("address")}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-10 gap-y-10 sm:gap-y-12 lg:gap-x-16 py-10 sm:py-14 lg:py-20">
          {groups.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="flex items-baseline gap-2 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-line">
                <span className="text-[10px] font-mono text-primary-deep tracking-widest">
                  0{i + 1}
                </span>
                <h5 className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted font-semibold">
                  — {g.h}
                </h5>
              </div>
              <ul className="flex flex-col gap-3 sm:gap-3.5">
                {g.items.map((it, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-3 text-[14px] sm:text-[15px] lg:text-[16px] text-navy hover:text-primary-deep transition-colors duration-300 py-1"
                    >
                      <span
                        aria-hidden
                        className="inline-block w-0 h-px bg-primary transition-all duration-500 group-hover:w-5"
                      />
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        {it}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 sm:gap-6 pt-6 sm:pt-8 border-t border-line">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-[12px] sm:text-[13px] text-muted">
            <span>{t("copy")}</span>
            <span className="hidden sm:inline-block w-1 h-1 bg-muted/40 rounded-full" />
            <span className="flex gap-4 sm:gap-5 flex-wrap">
              {legal.map((l, i) => (
                <a
                  key={i}
                  href="#"
                  className="hover:text-primary-deep transition-colors duration-300"
                >
                  {l}
                </a>
              ))}
            </span>
          </div>

          <a
            href="#top"
            className="group flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-mono text-muted hover:text-primary-deep transition-colors duration-300"
          >
            <span>Yuqoriga qaytish</span>
            <span className="inline-flex w-11 h-11 sm:w-10 sm:h-10 border border-line items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
              <ArrowUp
                size={14}
                weight="bold"
                className="text-navy group-hover:text-navy transition-all duration-500 group-hover:-translate-y-0.5"
              />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
