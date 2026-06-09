"use client";

import { useState } from "react";

type Props = {
  productId: string;
  label?: string;
  variant?: "gold" | "outline";
  className?: string;
};

/**
 * BuyButton — wywołuje /api/checkout i przekierowuje do Stripe Checkout.
 */
export default function BuyButton({
  productId,
  label = "Kup teraz",
  variant = "gold",
  className = "",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Nie udało się rozpocząć płatności. Spróbuj ponownie.");
        setLoading(false);
      }
    } catch {
      setError("Brak połączenia. Spróbuj ponownie.");
      setLoading(false);
    }
  }

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wide disabled:opacity-60 disabled:cursor-not-allowed";
  const style = variant === "gold" ? "btn-gold" : "btn-outline";

  return (
    <div className={className}>
      <button
        onClick={handleBuy}
        disabled={loading}
        className={`${base} ${style}`}
      >
        {loading ? "Przekierowanie…" : label}
        {!loading && variant === "gold" && (
          <span aria-hidden className="text-lg leading-none">
            →
          </span>
        )}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
