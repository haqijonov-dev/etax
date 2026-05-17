"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

type Group = { h: string; items: string[] };

export function Footer() {
  const t = useTranslations("footer");
  const groups = t.raw("groups") as Group[];
  const legal = t.raw("legal") as string[];

  return (
    <footer className="bg-paper border-t border-line pt-16 sm:pt-20 pb-8">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          className="text-navy font-semibold leading-[0.9] tracking-[-0.03em] text-[clamp(56px,12vw,160px)]"
        >
          Etax
          <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 bg-primary ml-1 -translate-y-3 sm:-translate-y-5" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mt-12 pb-14">
          <div>
            <h5 className="text-[11px] uppercase tracking-[0.18em] text-muted font-semibold mb-4">
              {t("addressHeading")}
            </h5>
            <p className="text-[15px] text-ink-2 max-w-[30ch] leading-relaxed">
              {t("address")}
            </p>
          </div>
          {groups.map((g, i) => (
            <div key={i}>
              <h5 className="text-[11px] uppercase tracking-[0.18em] text-muted font-semibold mb-4">
                {g.h}
              </h5>
              <ul className="grid gap-2.5">
                {g.items.map((it, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-[14.5px] hover:text-primary-deep transition-colors"
                    >
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-7 border-t border-line text-[13px] text-muted">
          <span>{t("copy")}</span>
          <span className="flex gap-6">
            {legal.map((l, i) => (
              <a key={i} href="#" className="hover:text-ink transition-colors">
                {l}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
