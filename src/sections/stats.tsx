"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";

type Stat = { num: string; suffix: string; label: string };

export function Stats() {
  const t = useTranslations();
  const items = t.raw("stats") as Stat[];

  return (
    <section className="bg-cream border-y border-line">
      <div className="wrap py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => {
            const isFirst = i === 0;
            const isLast = i === items.length - 1;
            const align = isFirst
              ? "items-start text-left"
              : isLast
                ? "items-end text-right"
                : "items-center text-center";

            const padX = isFirst
              ? "sm:pl-0 sm:pr-6 lg:pr-10"
              : isLast
                ? "sm:pl-6 sm:pr-0 lg:pl-10"
                : i === 1
                  ? "sm:pl-6 sm:pr-0 lg:px-10"
                  : "sm:pl-0 sm:pr-6 lg:px-10";

            return (
              <div
                key={i}
                className={`relative flex flex-col gap-3 py-8 sm:py-2 lg:py-0 border-line border-b last:border-b-0 sm:border-b-0 sm:[&:nth-child(-n+2)]:border-b sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(-n+2)]:border-b-0 lg:[&:not(:last-child)]:border-r ${align} ${padX}`}
              >
                <CountUp num={s.num} suffix={s.suffix} delay={i * 0.08} />
                <p className="text-sm text-ink-2 max-w-[24ch] leading-relaxed">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CountUp({
  num,
  suffix,
  delay = 0,
}: {
  num: string;
  suffix: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [val, setVal] = useState(0);

  const target = parseFloat(num);
  const isInt = Number.isInteger(target);

  useEffect(() => {
    if (!inView || isNaN(target)) return;

    let raf = 0;
    const dur = 1500;
    const startAt = performance.now() + delay * 1000;

    const tick = (now: number) => {
      const elapsed = Math.max(0, now - startAt);
      const t = Math.min(1, elapsed / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, delay]);

  const display = isNaN(target)
    ? num
    : isInt
      ? Math.round(val).toString()
      : val.toFixed(1);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className="flex items-baseline font-semibold text-navy tracking-tight text-[56px] sm:text-[72px] lg:text-[88px] leading-[0.9]"
    >
      <span>{display}</span>
      <span className="text-[0.5em] ml-1 text-primary-deep">{suffix}</span>
    </motion.span>
  );
}
