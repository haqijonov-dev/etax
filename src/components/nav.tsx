"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { LangToggle } from "./lang-toggle";

const LINK_KEYS = ["services", "about", "process", "testimonials", "faq"] as const;
const MOBILE_MENU_ID = "primary-mobile-menu";

export function Nav({ initialDark = true }: { initialDark?: boolean }) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [contrastMode, setContrastMode] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onDark = initialDark && !scrolled;
  // In contrast mode the page background is forced black, so the logo must
  // always be the white asset regardless of scroll position.
  const logoIsWhite = contrastMode || onDark;

  const headerCls = onDark
    ? "bg-navy/30 backdrop-blur-2xl backdrop-saturate-150 border-b border-paper/15 text-paper shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]"
    : "bg-paper/75 backdrop-blur-2xl backdrop-saturate-150 border-b border-line text-ink shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset]";

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${headerCls}`}
        role="banner"
      >
        <div className="wrap flex items-center justify-between gap-4 sm:gap-8 py-3 sm:py-3.5">
          <a
            href="#top"
            className="inline-flex items-center shrink-0"
            aria-label="E-tax — Buxgalteriya va soliq xizmatlari Farg'ona"
          >
            <Image
              src={logoIsWhite ? "/white-logo.png" : "/black-logo.png"}
              alt=""
              width={400}
              height={120}
              priority
              fetchPriority="high"
              sizes="(min-width: 640px) 180px, 140px"
              className="h-11 sm:h-14 w-auto transition-opacity duration-300"
            />
          </a>

          <nav
            className="hidden lg:flex gap-8 text-[15px] font-medium"
            aria-label={t("cta")}
          >
            {LINK_KEYS.map((key) => (
              <a key={key} href={`#${key}`} className="relative py-1.5 group">
                {t(`links.${key}`)}
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-full bottom-0 h-px bg-current transition-[right] duration-300 group-hover:right-0"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <LangToggle variant={onDark ? "dark" : "light"} />
            <a
              href="#contact"
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              <span>{t("cta")}</span>
              <ArrowRight size={13} weight="bold" aria-hidden="true" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
              aria-expanded={open}
              aria-controls={MOBILE_MENU_ID}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 border border-current/55"
            >
              {open ? (
                <X size={18} weight="bold" aria-hidden="true" />
              ) : (
                <List size={18} weight="bold" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <MobileMenu
            id={MOBILE_MENU_ID}
            onClose={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ id, onClose }: { id: string; onClose: () => void }) {
  const t = useTranslations("nav");

  return (
    <motion.div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label={t("cta")}
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
      className="fixed inset-0 z-40 bg-navy text-paper flex flex-col px-5 sm:px-6 py-6 pt-20 sm:pt-24 overflow-y-auto"
    >
      <nav className="flex flex-col">
        {LINK_KEYS.map((key, i) => (
          <motion.a
            key={key}
            href={`#${key}`}
            onClick={onClose}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
            className="flex items-center justify-between py-4 sm:py-5 border-b border-paper/10 text-[28px] sm:text-4xl font-semibold tracking-tight active:text-primary transition-colors"
          >
            <span>{t(`links.${key}`)}</span>
            <span className="text-xs opacity-50 font-normal font-mono">0{i + 1}</span>
          </motion.a>
        ))}
      </nav>

      <motion.a
        href="#contact"
        onClick={onClose}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="btn btn-primary mt-8 sm:mt-10 w-full justify-center"
      >
        <span>{t("cta")}</span>
        <ArrowRight size={14} weight="bold" />
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-auto pt-10"
      >
        <p className="text-xs sm:text-sm text-paper/60 mb-1 uppercase tracking-[0.18em] font-mono">
          Farg'ona shahri · +998 90 849 8989
        </p>
        <strong className="text-base sm:text-lg font-medium">Telegram: @omad9999</strong>
      </motion.div>
    </motion.div>
  );
}
