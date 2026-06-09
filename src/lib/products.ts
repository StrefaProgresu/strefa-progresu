// ============================================================================
//  KONFIGURACJA PRODUKTÓW — STREFA PROGRESU
// ============================================================================
//
//  Aby DODAĆ NOWY PRODUKT:
//    1. Dodaj nowy obiekt do tablicy `products` poniżej.
//    2. Wgraj pliki PDF (ebook + checklista) do katalogu /content.
//    3. W polu `files` podaj nazwy tych plików (dokładnie jak na dysku).
//    4. Gotowe — przycisk "Kup teraz", płatność i wysyłka maila działają same.
//
//  Cena jest podana w GROSZACH (Stripe wymaga liczby całkowitej).
//    49 PLN  ->  4900
//    99 PLN  ->  9900
// ============================================================================

export type ProductFile = {
  /** Etykieta widoczna w mailu, np. "E-book PDF" */
  label: string;
  /** Nazwa pliku w katalogu /content, np. "potega-nawykow.pdf" */
  filename: string;
};

export type Product = {
  id: string;
  name: string;
  /** Krótki opis na karcie produktu */
  shortDescription: string;
  /** Zajawka / lead w opisie rozszerzonym */
  lead: string;
  /** Pełny opis (akapity) */
  description: string[];
  /** Lista "Dowiesz się:" */
  bullets: string[];
  /** Cena w GROSZACH */
  priceGrosze: number;
  /** Pliki do pobrania po zakupie */
  files: ProductFile[];
};

export const products: Product[] = [
  {
    id: "potega-nawykow",
    name: "Potęga Nawyków + Checklista",
    shortDescription: "Zmień nawyki i stań się najlepszą wersją siebie.",
    lead: "Wiesz, co powinieneś robić. Po prostu tego nie robisz.",
    description: [
      "Jeśli to zdanie brzmi znajomo, ta książka jest dla Ciebie.",
      "Potęga Nawyków to praktyczny system zmiany oparty na tym, jak naprawdę działa ludzki mózg.",
    ],
    bullets: [
      "dlaczego motywacja zawodzi",
      "jak budować dobre nawyki",
      "jak eliminować złe nawyki",
      "jak budować właściwą tożsamość",
      "jak stworzyć skuteczny system działania",
    ],
    priceGrosze: 4900,
    files: [
      { label: "E-book PDF", filename: "potega-nawykow.pdf" },
      { label: "Checklista PDF", filename: "potega-nawykow-checklista.pdf" },
    ],
  },
  {
    id: "przestan-byc-zmeczony",
    name: "Przestań Być Zmęczony + Checklista",
    shortDescription: "Odzyskaj energię, skupienie i motywację.",
    lead: "Praktyczny przewodnik dla tych, którzy mają dość ciągłego zmęczenia.",
    description: [
      "Praktyczny przewodnik pokazujący, jak odzyskać energię, poprawić sen, zwiększyć produktywność i odzyskać kontrolę nad własnym życiem.",
    ],
    bullets: [
      "jak poprawić jakość snu",
      "jak odzyskać energię",
      "jak ograniczyć przebodźcowanie",
      "jak zwiększyć poziom skupienia",
      "jak zbudować trwałą dyscyplinę",
    ],
    priceGrosze: 4900,
    files: [
      { label: "E-book PDF", filename: "przestan-byc-zmeczony.pdf" },
      { label: "Checklista PDF", filename: "przestan-byc-zmeczony-checklista.pdf" },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Formatuje grosze na czytelną cenę, np. 4900 -> "49 PLN" */
export function formatPrice(grosze: number): string {
  const zl = grosze / 100;
  return Number.isInteger(zl) ? `${zl} PLN` : `${zl.toFixed(2)} PLN`;
}
