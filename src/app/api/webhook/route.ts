import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getProductById } from "@/lib/products";
import { sendPurchaseEmail } from "@/lib/email";

// Webhook musi otrzymać surowe ciało żądania (raw body), dlatego wyłączamy cache
// i czytamy treść jako tekst.
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Brak podpisu lub STRIPE_WEBHOOK_SECRET." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("[webhook] nieprawidłowy podpis:", err);
    return NextResponse.json({ error: "Nieprawidłowy podpis." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const productId = session.metadata?.productId;
    const email =
      session.customer_details?.email ?? session.customer_email ?? null;

    const product = productId ? getProductById(productId) : undefined;

    if (product && email) {
      try {
        await sendPurchaseEmail({ to: email, product });
        console.log(`[webhook] Wysłano produkt "${product.id}" do ${email}`);
      } catch (err) {
        console.error("[webhook] błąd wysyłki maila:", err);
        // Zwracamy 500, by Stripe ponowił próbę (retry).
        return NextResponse.json(
          { error: "Błąd wysyłki maila." },
          { status: 500 }
        );
      }
    } else {
      console.warn("[webhook] brak produktu lub emaila w sesji:", session.id);
    }
  }

  return NextResponse.json({ received: true });
}
