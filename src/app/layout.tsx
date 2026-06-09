import type { Metadata } from "next";
import { products } from "@/lib/products";
import "./fonts.css";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://strefa-progresu.vercel.app";
const SITE_NAME = "STREFA PROGRESU";
const SITE_DESC =
  "Praktyczne systemy rozwoju osobistego — e-booki i checklisty, które pomagają odzyskać kontrolę nad własnym życiem. Małe działania. Wielkie rezultaty.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Małe działania. Wielkie rezultaty.`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESC,
  keywords: [
    "rozwój osobisty",
    "dyscyplina",
    "nawyki",
    "produktywność",
    "ebook",
    "checklista",
    "motywacja",
    "STREFA PROGRESU",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Małe działania. Wielkie rezultaty.`,
    description: SITE_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Małe działania. Wielkie rezultaty.`,
    description: SITE_DESC,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema markup (JSON-LD) dla organizacji i produktów.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESC,
      },
      ...products.map((p) => ({
        "@type": "Product",
        name: p.name,
        description: p.shortDescription,
        offers: {
          "@type": "Offer",
          price: (p.priceGrosze / 100).toFixed(2),
          priceCurrency: "PLN",
          availability: "https://schema.org/InStock",
        },
      })),
    ],
  };

  return (
    <html lang="pl">
      <body className="font-sans grain antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
