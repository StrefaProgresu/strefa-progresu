import { products, formatPrice } from "@/lib/products";
import BuyButton from "./BuyButton";
import Reveal from "./Reveal";

export default function Products() {
  return (
    <section id="produkty" className="relative px-6 py-28 md:py-36">
      {/* delikatna poświata tła */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gold/5 blur-[160px]"
      />
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-eyebrow text-gold">
            Produkty
          </p>
          <h2 className="mt-5 font-display text-4xl font-semibold text-ivory md:text-5xl">
            Systemy, które po prostu działają
          </h2>
          <p className="mt-5 text-ash">
            Natychmiastowy dostęp po zakupie. Materiały trafiają na Twojego
            maila w kilka sekund.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-7 lg:grid-cols-2">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.1}>
              <article className="card-premium flex h-full flex-col rounded-3xl p-8 md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-ivory md:text-3xl">
                    {product.name}
                  </h3>
                  <span className="shrink-0 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-sm font-semibold text-gold">
                    {formatPrice(product.priceGrosze)}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gold/90">
                  {product.shortDescription}
                </p>

                <div className="my-7 hairline-gold" />

                <p className="font-display text-lg italic text-ivory">
                  {product.lead}
                </p>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-ash">
                  {product.description.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="mt-7">
                  <p className="text-xs uppercase tracking-eyebrow text-ash">
                    Dowiesz się
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {product.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-sm text-ivory/90"
                      >
                        <span
                          aria-hidden
                          className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gold/40 text-[10px] text-gold"
                        >
                          ✓
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-9 pt-2">
                  <BuyButton productId={product.id} className="w-full sm:w-auto" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
