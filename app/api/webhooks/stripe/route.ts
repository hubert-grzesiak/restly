import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { createReservation } from "@/lib/actions/reservation/transaction.action";

export async function POST(request: Request) {
  const body = await request.text();

  const signature = headers().get("Stripe-Signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    console.log("Webhook event constructed successfully:", event);
  } catch (err) {
    return NextResponse.json(
      { message: "Webhook error", error: err },
      { status: 400 },
    );
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { id, amount_total, metadata } = session;

    console.log("Processing checkout.session.completed for session:", session);

    const reservation = {
      stripeId: id,
      price: amount_total ? amount_total / 100 : 0,
      buyerId: metadata?.buyerId || "",
      propertyId: metadata?.propertyId || "",
      userId: metadata?.userId || "",
      guests: parseInt(metadata?.guests || "1"),
      dateFrom: metadata?.dateFrom || "",
      dateTo: metadata?.dateTo || "",
      createdAt: new Date(),
    };

    const newReservation = await createReservation(reservation);

    console.log("Reservation created successfully:", newReservation);

    return NextResponse.json({ message: "OK", reservation: newReservation });
  }

  return new Response("", { status: 200 });
}
