"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr";

type Group = { h: string; items: string[] };

export function Footer() {
  const t = useTranslations("footer");
  const groups = t.raw("groups") as Group[];
  const [contrastMode, setContrastMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () =>
      setContrastMode(root.getAttribute("data-a11y-view") === "contrast");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-a11y-view"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-paper text-navy pt-14 sm:pt-20 lg:pt-32 pb-8 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(20,58,108,0.7) 0 1px, transparent 1px 22px)",
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
                ★ E-TAX · Farg'ona
              </span>
            </div>
            <Image
              src={contrastMode ? "/white-logo.png" : "/black-logo.png"}
              alt="E-tax buxgalteriya va soliq xizmatlari Farg'ona"
              width={800}
              height={240}
              loading="lazy"
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 240px, 180px"
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
                    <span
                      className="group inline-flex items-center gap-3 text-[14px] sm:text-[15px] lg:text-[16px] text-navy py-1"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-block w-0 h-px bg-primary transition-all duration-500 group-hover:w-5"
                      />
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        {it}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-start pt-6 sm:pt-8 border-t border-line">
          <span className="text-[12px] sm:text-[13px] text-muted">{t("copy")}</span>
        </div>
      </div>

      <ScrollToTop />
    </footer>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          title="Yuqoriga qaytish"
          aria-label="Yuqoriga qaytish"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          className="group fixed bottom-20 right-5 sm:bottom-24 sm:right-8 z-50 inline-flex w-12 h-12 sm:w-13 sm:h-13 items-center justify-center rounded-full bg-navy text-paper border border-paper shadow-lg shadow-navy/20 hover:bg-primary hover:border-paper transition-colors duration-300"
        >
          <ArrowUp
            size={18}
            weight="bold"
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
