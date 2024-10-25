"use server";
import { db } from "@/lib/db";
// import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { Property } from "@prisma/client";

import { ReservationSchema } from "@/app/(home)/properties/[id]/components/ReservationForm/ReservationFormSchema";
import * as z from "zod";
import { auth } from "@/lib/auth";
// import { auth } from "@/lib/auth";

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
  const sessionAuth = await auth();

  if (sessionAuth?.user?.email) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    // Funkcja do konwersji daty w formacie dd.mm.yyyy na yyyy-mm-dd
    const convertDate = (dateString: string) => {
      const [day, month, year] = dateString.split(".");
      return `${year}-${month}-${day}`;
    };

    const fromDate = new Date(convertDate(formValues.dateRange.from));
    const toDate = new Date(convertDate(formValues.dateRange.to));

    let numberOfDays;

    if (fromDate === toDate) {
      numberOfDays = 1;
    } else {
      numberOfDays = Math.round(
        (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24),
      );
    }
    const newPrice = price * numberOfDays;

    const totalPrice = newPrice + newPrice * 0.05;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: totalPrice * 100,
            product_data: {
              name: property.name,
              description: `
              Reservation for: ${property.name}
              Location: ${property.city}, ${property.country}
              Stay Duration: ${formValues?.dateRange.from} to ${formValues?.dateRange.to} (${numberOfDays} days)
              Total Price: ${totalPrice} PLN
              For ${formValues?.guests} guests.
            `,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        propertyId: property.id,
        userId: buyerId,
        city: property.city,
        country: property.country,
        dateFrom: formValues?.dateRange.from,
        dateTo: formValues?.dateRange.to,
        price: totalPrice,
      },
      mode: "payment",
      custom_fields: [],
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/visited`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } else {
    redirect("/auth/login");
  }
}

interface ReservationResponse {
  propertyId: string;
  userId: string;
  stripeId: string;
  guests: number;
  dateFrom: string;
  dateTo: string;
  price: number;
}
export async function createReservation(reservation: ReservationResponse) {
  try {
    const isSoftDeleted = await db.property.findUnique({
      where: { id: reservation.propertyId },
      select: {
        softDeleted: true,
      },
    });
    if (isSoftDeleted?.softDeleted) {
      const newReservation = await db.reservation.create({
        data: {
          ...reservation,
        },
      });
      return JSON.parse(JSON.stringify(newReservation));
    } else {
      throw new Error("Property is not available for reservation.");
    }
  } catch (error) {
    console.error("Failed to create reservation:", {
      reservation,
      error: (error as Error).message,
      stack: (error as Error).stack,
    });
    throw new Error("Failed to create reservation.");
  }
}
