import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  // Ostrzeżenie w logach — bez klucza checkout nie zadziała.
  console.warn(
    "[Stripe] Brak STRIPE_SECRET_KEY. Uzupełnij plik .env.local (patrz .env.example)."
  );
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  typescript: true,
});

/**
 * Zwraca bazowy adres aplikacji.
 * Na Vercel używa NEXT_PUBLIC_BASE_URL, a w razie braku — automatycznego URL Vercela.
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
