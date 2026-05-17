"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Icon, type IconName } from "@/components/icon";

type Item = { n: string; t: string; d: string; icon: IconName };

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as Item[];

  return (
    <section id="services" className="py-20 sm:py-28 lg:py-36">
      <div className="wrap">
        <div className="mb-20 sm:mb-28 lg:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            {t("eyebrow")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="h-1 mt-5 pb-2"
          >
            {t("titlePre")}
            <span className="accent">{t("titleEm")}</span>
            <br />
            {t("titlePost").trimStart()}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-line">
          {items.map((it, i) => (
            <ServiceCard
              key={it.n}
              item={it}
              more={t("more")}
              index={i}
              total={items.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  item,
  more,
  index,
  total,
}: {
  item: Item;
  more: string;
  index: number;
  total: number;
}) {
  const colsLg = 3;
  const colsSm = 2;

  const lgIsLastCol = (index + 1) % colsLg === 0;
  const lgIsLastRow =
    Math.floor(index / colsLg) === Math.floor((total - 1) / colsLg);
  const smIsLastCol = (index + 1) % colsSm === 0;
  const smIsLastRow =
    Math.floor(index / colsSm) === Math.floor((total - 1) / colsSm);
  const isLastOverall = index === total - 1;

  // Additive border rules — never apply conflicting border-X and border-X-0
  // at the same breakpoint to avoid Tailwind ordering surprises.
  const cls: string[] = ["border-line"];

  // Mobile baseline: every card except the very last has a bottom border.
  if (!isLastOverall) cls.push("border-b");

  // Sm: drop the bottom border for the last row.
  if (smIsLastRow && !isLastOverall) cls.push("sm:border-b-0");
  // Sm: add right border to all non-last-column cards.
  if (!smIsLastCol) cls.push("sm:border-r");

  // Lg: drop the bottom border for the last row,
  // but only if it survived the sm rules.
  if (lgIsLastRow && !isLastOverall && !smIsLastRow)
    cls.push("lg:border-b-0");

  // Lg right-border reconciliation against sm:
  if (!smIsLastCol && lgIsLastCol) cls.push("lg:border-r-0");
  if (smIsLastCol && !lgIsLastCol) cls.push("lg:border-r");

  const borderCls = cls.join(" ");

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.08,
        ease: [0.2, 0.7, 0.2, 1],
      }}
      className={`group relative bg-paper p-8 sm:p-9 min-h-[330px] flex flex-col overflow-hidden transition-colors duration-500 hover:bg-navy hover:text-paper ${borderCls}`}
    >
      <div className="flex items-start justify-between mb-6">
        <span className="text-2xl font-semibold text-primary-deep tracking-tight group-hover:text-primary transition-colors">
          — {item.n}
        </span>
        <span className="opacity-60 group-hover:opacity-100 transition">
          <Icon name={item.icon} size={28} weight="duotone" className="text-primary-deep group-hover:text-primary" />
        </span>
      </div>
      <h3 className="text-2xl sm:text-[26px] font-semibold tracking-tight leading-tight mb-3">
        {item.t}
      </h3>
      <p className="text-sm text-ink-2 group-hover:text-paper/70 transition-colors leading-relaxed flex-1">
        {item.d}
      </p>
      <a
        href="#contact"
        className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold group/link"
      >
        <span>{more}</span>
        <ArrowUpRight
          size={14}
          weight="bold"
          className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        />
      </a>
    </motion.article>
  );
}
