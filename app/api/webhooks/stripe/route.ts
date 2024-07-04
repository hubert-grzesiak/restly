import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { createReservation as createReservationInDb } from "@/lib/actions/reservation/transaction.action";

interface Reservation {
  stripeId: string;
  price: number;
  buyerId: string;
  propertyId: string;
  userId: string;
  guests: number;
  dateFrom: string;
  dateTo: string;
  createdAt: Date;
}

interface ErrorResponse {
  message: string;
  error: string;
}

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
    if (err instanceof Stripe.errors.StripeSignatureVerificationError) {
      console.error("Webhook error:", err);
      return NextResponse.json<ErrorResponse>(
        { message: "Webhook error", error: err.message },
        { status: 400 },
      );
    }
    console.error("Unknown webhook error:", err);
    return NextResponse.json<ErrorResponse>(
      { message: "Unknown webhook error", error: "An unknown error occurred" },
      { status: 400 },
    );
  }

  // Get the ID and type
  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { id, amount_total, metadata } = session;

    console.log("Processing checkout.session.completed for session:", session);

    const reservation: Reservation = {
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

    try {
      const newReservation = await createReservationInDb(reservation);
      console.log("Reservation created successfully:", newReservation);
      return NextResponse.json({ message: "OK", reservation: newReservation });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to create reservation:", error);
        return NextResponse.json<ErrorResponse>(
          { message: "Failed to create reservation.", error: error.message },
          { status: 500 },
        );
      } else {
        console.error("Unknown error:", error);
        return NextResponse.json<ErrorResponse>(
          {
            message: "Failed to create reservation.",
            error: "An unknown error occurred",
          },
          { status: 500 },
        );
      }
    }
  }

  return new Response("", { status: 200 });
}
