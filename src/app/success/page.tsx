import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dziękujemy za zakup",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-6">
      <div
        aria-hidden
        className="animate-floatGlow pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]"
      />
      <div className="relative z-10 mx-auto max-w-lg text-center">
        <div className="mx-auto mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-gold/5">
          <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9 text-gold">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="text-xs uppercase tracking-eyebrow text-gold">
          Płatność potwierdzona
        </p>
        <h1 className="mt-5 font-display text-4xl font-semibold text-ivory md:text-5xl">
          Dziękujemy za zakup
        </h1>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-ash">
          Twoje materiały są już w drodze. Sprawdź skrzynkę e-mail — wysłaliśmy
          tam linki do pobrania e-booka oraz checklisty. Jeśli wiadomości nie
          ma, zajrzyj do folderu spam lub oferty.
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="btn-outline inline-flex items-center justify-center rounded-full px-9 py-4 text-sm font-semibold"
          >
            Wróć na stronę główną
          </Link>
        </div>

        <p className="mt-10 font-display text-lg italic text-gold">
          Małe działania. Wielkie rezultaty.
        </p>
      </div>
    </main>
  );
}
