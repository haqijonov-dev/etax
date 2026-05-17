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
    <section id="contact" className="py-16 sm:py-20 lg:py-24">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative bg-navy text-paper p-10 sm:p-14 lg:p-20 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-end overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="absolute -top-32 -right-32 w-[420px] h-[420px] opacity-40 blur-[2px]"
            style={{
              background:
                "radial-gradient(circle, #03AED2 0%, transparent 70%)",
            }}
          />

          <div className="relative">
            <span className="eyebrow text-paper/70 before:bg-paper/45">
              {t("eyebrow")}
            </span>
            <h2 className="h-1 mt-5 max-w-[18ch] text-paper">
              {t("titlePre")}
              <span className="text-primary">{t("titleEm")}</span>
              {t("titlePost")}
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-primary" href="#">
                <span>{t("ctaPrimary")}</span>
                <ArrowRight size={14} weight="bold" />
              </a>
              <a className="btn btn-secondary" href="#">
                <span>{t("ctaGhost")}</span>
              </a>
            </div>
          </div>

          <div className="relative">
            <p className="text-paper/70 max-w-[36ch] mb-6 leading-relaxed">
              {t("sub")}
            </p>
            <div className="grid">
              {channels.map((c, i) => (
                <a
                  key={i}
                  href="#"
                  className={`flex items-center justify-between py-4 border-t border-paper/15 ${
                    i === channels.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-paper/65">
                    <Icon name={c.icon} size={16} weight="regular" className="text-primary" />
                    {c.label}
                  </span>
                  <strong className="font-medium text-[17px]">{c.val}</strong>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
