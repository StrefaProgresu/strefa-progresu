export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/8 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="font-display text-base font-semibold tracking-[0.18em] text-ivory">
          STREFA <span className="text-gold">PROGRESU</span>
        </div>
        <nav className="flex gap-7 text-sm text-ash">
          <a href="#produkty" className="transition-colors hover:text-ivory">
            Produkty
          </a>
          <a href="#faq" className="transition-colors hover:text-ivory">
            FAQ
          </a>
          <a
            href="#top"
            className="transition-colors hover:text-ivory"
          >
            Do góry
          </a>
        </nav>
        <p className="text-xs text-ash">
          © {year} STREFA PROGRESU. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}
