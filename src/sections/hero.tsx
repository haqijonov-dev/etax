"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function Hero() {
  const t = useTranslations("hero");
  const marquee = t.raw("marquee") as string[];
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col overflow-hidden text-paper pt-20"
      aria-label="Hero"
    >
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-poster.svg"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, rgba(20,58,108,0.55) 0%, rgba(20,58,108,0.85) 60%, rgba(15,40,80,0.97) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,28,50,0.55) 0%, rgba(11,28,50,0.35) 35%, rgba(11,28,50,0.85) 100%)",
        }}
      />
      <div className="absolute inset-0 z-[2] grain pointer-events-none" />

      <div className="wrap relative z-[3] flex-1 flex flex-col items-start justify-center text-left pb-16">
        <motion.h1
          style={{ y: titleY, opacity: titleOpacity }}
          className="heading-display max-w-none sm:max-w-[18ch]"
        >
          <SplitWord delay={0.15}>{t("headlinePre")}</SplitWord>{" "}
          <SplitWord delay={0.35} accent>
            {t("headlineEm")}
          </SplitWord>
          {t("headlinePost") && (
            <>
              {" "}
              <SplitWord delay={0.55}>{t("headlinePost")}</SplitWord>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-7 text-base sm:text-lg text-paper/85 max-w-[58ch] leading-relaxed"
        >
          {t("sub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-7 sm:mt-9 flex flex-col sm:flex-row flex-wrap gap-3 w-full sm:w-auto"
        >
          <a className="btn btn-primary w-full sm:w-auto" href="#contact">
            <span>{t("ctaPrimary")}</span>
            <ArrowRight size={14} weight="bold" />
          </a>
          <a className="btn btn-secondary w-full sm:w-auto" href="#services">
            <span>{t("ctaGhost")}</span>
          </a>
        </motion.div>

      </div>

      <div className="relative z-[3] border-y border-paper/15 bg-navy/55 backdrop-blur-sm overflow-hidden py-3 sm:py-3.5">
        <div className="marquee-track">
          {[...marquee, ...marquee, ...marquee].map((m, i) => (
            <span
              key={i}
              className="text-[15px] sm:text-[18px] lg:text-[22px] font-medium tracking-tight text-paper/65 inline-flex items-center gap-[32px] sm:gap-[48px] lg:gap-[60px] whitespace-nowrap"
            >
              {m}
              <span className="text-primary text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SplitWord({
  children,
  delay = 0,
  accent = false,
}: {
  children: React.ReactNode;
  delay?: number;
  accent?: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={`inline-block ${accent ? "text-primary" : ""}`}
    >
      {children}
    </motion.span>
  );
}
