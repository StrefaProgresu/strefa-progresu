import Reveal from "./Reveal";

const testimonials = [
  {
    quote:
      "Pierwszy materiał, po którym faktycznie coś zmieniłem. Konkret zamiast pustych haseł.",
    author: "Michał K.",
    role: "Przedsiębiorca",
  },
  {
    quote:
      "Checklisty są genialne. Mam jasny plan na każdy dzień i w końcu trzymam się postanowień.",
    author: "Anna W.",
    role: "Project Manager",
  },
  {
    quote:
      "Czytałem dziesiątki książek o produktywności. Tu dostałem system, który po prostu wdrożyłem.",
    author: "Paweł R.",
    role: "Programista",
  },
];

export default function Testimonials() {
  return (
    <section id="opinie" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-eyebrow text-gold">Opinie</p>
          <h2 className="mt-5 font-display text-4xl font-semibold text-ivory md:text-5xl">
            Dołączasz do tych, którzy działają
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.1}>
              <figure className="card-premium flex h-full flex-col rounded-2xl p-8">
                <div aria-hidden className="mb-4 text-gold">
                  {"★★★★★"}
                </div>
                <blockquote className="flex-1 font-display text-lg leading-relaxed text-ivory">
                  „{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold text-ivory">{t.author}</span>
                  <span className="text-ash"> · {t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="text-xs text-ash">
            Opinie przykładowe — podmień je na prawdziwe po pierwszych sprzedażach.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
