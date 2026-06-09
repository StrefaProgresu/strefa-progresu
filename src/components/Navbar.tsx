"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-obsidian/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-[0.18em] text-ivory"
        >
          STREFA <span className="text-gold">PROGRESU</span>
        </a>
        <div className="hidden items-center gap-9 text-sm text-ash md:flex">
          <a href="#produkty" className="transition-colors hover:text-ivory">
            Produkty
          </a>
          <a href="#wartosci" className="transition-colors hover:text-ivory">
            Filozofia
          </a>
          <a href="#opinie" className="transition-colors hover:text-ivory">
            Opinie
          </a>
          <a href="#faq" className="transition-colors hover:text-ivory">
            FAQ
          </a>
        </div>
        <a
          href="#produkty"
          className="btn-gold rounded-full px-5 py-2.5 text-sm font-semibold"
        >
          Kup teraz
        </a>
      </nav>
    </header>
  );
}
