"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "W jakim formacie otrzymam materiały?",
    a: "Wszystkie materiały to pliki PDF — e-book oraz checklista. Otwierają się na telefonie, tablecie i komputerze, bez żadnej dodatkowej aplikacji.",
  },
  {
    q: "Kiedy dostanę dostęp po zakupie?",
    a: "Natychmiast. Zaraz po opłaceniu zamówienia otrzymasz e-maila z linkami do pobrania. Zwykle trwa to kilka sekund.",
  },
  {
    q: "Jakie są metody płatności?",
    a: "Płatność obsługuje Stripe — karta, BLIK oraz Przelewy24. Transakcja jest w pełni szyfrowana i bezpieczna.",
  },
  {
    q: "Czy to jednorazowa opłata?",
    a: "Tak. Płacisz raz i materiały są Twoje na zawsze. Żadnych subskrypcji ani ukrytych kosztów.",
  },
  {
    q: "Nie dostałem maila — co robić?",
    a: "Sprawdź folder spam/oferty. Jeśli maila nadal nie ma, odpisz na adres kontaktowy — wyślemy linki ponownie.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg text-ivory">{q}</span>
        <span
          aria-hidden
          className={`shrink-0 text-2xl font-light text-gold transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-400 ease-out ${
          open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-ash">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-eyebrow text-gold">FAQ</p>
          <h2 className="mt-5 font-display text-4xl font-semibold text-ivory md:text-5xl">
            Najczęstsze pytania
          </h2>
        </Reveal>

        <Reveal className="mt-14">
          <div>
            {faqs.map((f) => (
              <Item key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
