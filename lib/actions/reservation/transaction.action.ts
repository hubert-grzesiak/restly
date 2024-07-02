"use server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { Property, Transaction } from "@prisma/client";

import { ReservationSchema } from "@/app/(home)/properties/[id]/components/ReservationForm/ReservationFormSchema";
import * as z from "zod";

/**
 * Tworzy sesję Stripe dla rezerwacji nieruchomości.
 * @param price Cena rezerwacji w PLN.
 * @param buyerId Identyfikator kupującego.
 * @param property Obiekt typu Property zawierający dane nieruchomości.
 * @param formValues Wartości formularza zgodne ze schematem ReservationSchema.
 * @returns Status płatności sesji.
 */

export async function checkoutReservation(
  price: number,
  buyerId: string,
  property: Property,
  formValues: z.infer<typeof ReservationSchema>,
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "pln",
          unit_amount: price * 100,
          product_data: {
            name: property.name, // Nazwa nieruchomości
            description: `
              Reservation for: ${property.name}
              Location: ${property.city}, ${property.country}
              Stay Duration: ${formValues?.dateFrom} to ${formValues?.dateTo}
              Total Price: ${price} PLN
              For ${formValues?.guests} guests.
            `, // Szczegółowy opis rezerwacji
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      buyerId: buyerId,
      property: property.name,
      city: property.city,
      country: property.country,
      dateFrom: formValues?.dateFrom,
      dateTo: formValues?.dateTo,
      price: price,
    },
    mode: "payment",
    custom_fields: [],
    success_url: `http://localhost:3000/profile`,
    cancel_url: `http://localhost:3000/`,
  });

  redirect(session.url!);
  return session.payment_status;
}

export async function createTransaction(transaction: Transaction) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      console.log("No user session found.");
      return { success: false, message: "No user session found." };
    }

    const newTransaction = await db.transaction.create({
      data: {
        ...transaction,
        buyerId: transaction.buyerId,
      },
    });

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    console.error("Failed to create transaction", error);
    return { success: false, message: "Failed to create transaction." };
  }
}
