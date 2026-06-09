"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Ambientowe złote poświaty */}
      <div
        aria-hidden
        className="animate-floatGlow pointer-events-none absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[-10%] h-[420px] w-[420px] rounded-full bg-gold-deep/10 blur-[120px]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.div
          variants={item}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-gold/20 bg-gold/5 px-5 py-2 text-xs uppercase tracking-eyebrow text-gold"
        >
          Mentalność zwycięzcy
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-5xl font-semibold leading-[1.05] text-ivory sm:text-6xl md:text-7xl"
        >
          Małe działania.
          <br />
          <span className="text-gold-shimmer">Wielkie rezultaty.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ash"
        >
          Praktyczne systemy, które pomagają odzyskać kontrolę nad własnym
          życiem.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#produkty"
            className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-9 py-4 text-sm font-semibold"
          >
            Kup teraz <span aria-hidden>→</span>
          </a>
          <a
            href="#produkty"
            className="btn-outline inline-flex items-center justify-center rounded-full px-9 py-4 text-sm font-semibold"
          >
            Poznaj produkty
          </a>
        </motion.div>
      </motion.div>

      {/* Wskaźnik przewijania */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
