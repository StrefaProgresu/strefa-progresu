import Reveal from "./Reveal";

export default function FinalCTA() {
  return (
    <section className="relative px-6 py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[150px]"
      />
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl font-semibold leading-tight text-ivory md:text-6xl">
          Przeciętność jest <span className="text-gold-shimmer">wyborem</span>.
          <br />
          Tak samo jak progres.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-ash">
          Zacznij od jednego małego działania. Reszta jest kwestią systemu.
        </p>
        <div className="mt-10">
          <a
            href="#produkty"
            className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 text-sm font-semibold"
          >
            Wybierz swój produkt <span aria-hidden>→</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
