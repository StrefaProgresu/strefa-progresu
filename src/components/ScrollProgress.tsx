"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — cienka złota linia na górze ekranu, która wypełnia się
 * w miarę przewijania. To wizualne ucieleśnienie "progresu" — sygnatura marki.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-gold-deep via-gold-bright to-gold-deep"
      aria-hidden
    />
  );
}
