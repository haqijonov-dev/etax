"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";

type Card = { t: string; d: string };

export function Audit() {
  const t = useTranslations("audit");
  const row1 = t.raw("row1") as Card[];
  const row2 = t.raw("row2") as Card[];

  return (
    <section
      id="audit"
      aria-label="Soliq tekshiruvi yordami"
      className="py-3 sm:py-4 lg:py-5 bg-navy text-paper relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(245,241,234,0.6) 0 1px, transparent 1px 14px)",
        }}
      />

      <div className="relative flex flex-col gap-4 sm:gap-5">
        <CardRow cards={row1} duration={55} />
        <CardRow cards={row2} duration={65} reverse />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-navy to-transparent z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-navy to-transparent z-10"
      />
    </section>
  );
}

function CardRow({
  cards,
  duration,
  reverse = false,
}: {
  cards: Card[];
  duration: number;
  reverse?: boolean;
}) {
  const tripled = [...cards, ...cards, ...cards];

  return (
    <div
      className="card-marquee-paused overflow-hidden"
      style={{ ["--card-marquee-duration" as string]: `${duration}s` }}
    >
      <div
        className={`card-marquee ${reverse ? "card-marquee-reverse" : ""}`}
        aria-hidden={false}
      >
        {tripled.map((c, i) => (
          <Card key={i} card={c} />
        ))}
      </div>
    </div>
  );
}

function Card({ card }: { card: Card }) {
  return (
    <article
      className="group shrink-0 w-[260px] sm:w-[320px] lg:w-[360px] mx-2 sm:mx-2.5 bg-paper p-5 sm:p-6 lg:p-7 border border-line hover:border-primary hover:bg-paper transition-colors duration-500 relative overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <span className="inline-flex w-9 h-9 sm:w-10 sm:h-10 bg-primary-tint text-primary-deep items-center justify-center transition-colors duration-500 group-hover:bg-navy group-hover:text-paper">
          <ShieldCheck size={18} weight="duotone" />
        </span>
        <h3 className="text-[14px] sm:text-[15.5px] lg:text-[17px] font-semibold tracking-tight text-navy leading-snug">
          {card.t}
        </h3>
      </div>
      <p className="text-[12.5px] sm:text-[13.5px] lg:text-[14px] text-ink-2 leading-relaxed">
        {card.d}
      </p>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-full bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
      />
    </article>
  );
}
