"use server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { Transaction } from "@prisma/client";

export async function checkoutReservation(transaction: Transaction) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const amount = 10 * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "pln",
          unit_amount: amount,
          product_data: {
            name: transaction.buyerId,
            description: transaction.property.name,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
        buyerId: transaction.buyerId,
        property: transaction.property.name,
        city: transaction.property.city,
        country: transaction.property.country,
        // dateFrom: transaction.formValues?.dateRange.from,
        // dateTo: transaction.formValues?.dateRange.to,
        price: amount,
    },
    mode: 'payment',
    success_url: `http://localhost:3000/profile`,
    cancel_url: `http://localhost:3000/`,
  });

  redirect(session.url!)
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