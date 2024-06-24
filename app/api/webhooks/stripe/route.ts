import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createTransaction } from "@/lib/actions/reservation/transaction.action";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { id, amount_total, metadata } = session;

    const transaction = {
      id: "", // This should be generated by the database
      stripeId: id,
      price: amount_total ? amount_total / 100 : 0,
      buyerId: metadata?.buyerId || "",
      propertyId: metadata?.propertyId || "",
      createdAt: new Date(),
    };

    const newTransaction = await createTransaction(transaction);

    return NextResponse.json({ message: "OK", transaction: newTransaction });
  }

  return new Response("", { status: 200 });
}
