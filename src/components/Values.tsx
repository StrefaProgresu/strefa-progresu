import Reveal from "./Reveal";

const values = [
  {
    title: "Cel",
    text: "Jasny kierunek zamiast chaotycznego działania. Wiesz, dokąd zmierzasz.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Progres",
    text: "Codzienne, drobne kroki, które z czasem składają się na realną zmianę.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M3 17l5-5 4 4 9-9"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 7h5v5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Mentalność",
    text: "Sposób myślenia, który decyduje o tym, czy się poddasz, czy wytrwasz.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M12 3a6 6 0 0 0-6 6c0 2.2 1.2 3.6 2 4.5.6.7.9 1.4.9 2.3V17h6.2v-1.2c0-.9.3-1.6.9-2.3.8-.9 2-2.3 2-4.5a6 6 0 0 0-6-6Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 20h5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Sukces",
    text: "Efekt konsekwencji, a nie przypadku. Przewaga nad przeciętnością.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M8 4h8v3a4 4 0 0 1-8 0V4Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="M16 5h3v1a3 3 0 0 1-3 3M8 5H5v1a3 3 0 0 0 3 3M12 11v4M9 20h6M10 17h4l1 3h-6l1-3Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Values() {
  return (
    <section id="wartosci" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-eyebrow text-gold">
            Filozofia marki
          </p>
          <h2 className="mt-5 font-display text-4xl font-semibold text-ivory md:text-5xl">
            Przewaga buduje się w szczegółach
          </h2>
          <p className="mt-5 text-ash">
            Nie chodzi o zrywy motywacji. Chodzi o systemy, które działają nawet
            wtedy, gdy motywacja Cię opuszcza.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="card-premium h-full rounded-2xl p-8">
                <div className="mb-6 inline-flex rounded-xl border border-gold/20 bg-gold/5 p-3 text-gold">
                  {v.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-ivory">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
