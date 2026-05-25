"use client";

import { MotionConfig, LazyMotion, domAnimation } from "framer-motion";

export function MotionProviders({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict={false}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
