import { NextRequest, NextResponse } from "next/server";
import { stripe, getBaseUrl } from "@/lib/stripe";
import { getProductById } from "@/lib/products";

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();
    const product = getProductById(productId);

    if (!product) {
      return NextResponse.json(
        { error: "Nie znaleziono produktu." },
        { status: 404 }
      );
    }

    const baseUrl = getBaseUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "blik", "p24"],
      line_items: [
        {
          price_data: {
            currency: "pln",
            unit_amount: product.priceGrosze,
            product_data: {
              name: product.name,
              description: product.shortDescription,
            },
          },
          quantity: 1,
        },
      ],
      // Zbieramy email, by wysłać produkt cyfrowy.
      customer_creation: "always",
      // metadata pozwala webhookowi rozpoznać kupiony produkt.
      metadata: { productId: product.id },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?canceled=1`,
      locale: "pl",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] błąd:", err);
    return NextResponse.json(
      { error: "Nie udało się rozpocząć płatności." },
      { status: 500 }
    );
  }
}
