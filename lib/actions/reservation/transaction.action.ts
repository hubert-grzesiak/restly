"use server";
import { db } from "@/lib/db";
// import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { Property } from "@prisma/client";

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
  const stripe = new Stripe(process.env.STRIPE_KEY!);

  // Funkcja do konwersji daty w formacie dd.mm.yyyy na yyyy-mm-dd
  const convertDate = (dateString: string) => {
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  // Przekształcenie dat na obiekty Date
  const fromDate = new Date(convertDate(formValues.dateRange.from));
  const toDate = new Date(convertDate(formValues.dateRange.to));

  console.log("From date:", fromDate);

  let numberOfDays;

  if (fromDate === toDate) {
    numberOfDays = 1;
  } else {
    numberOfDays =
      Math.round(
        (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1;
  }
  const newPrice = price * numberOfDays;

  console.log("Price for all days:", newPrice);
  console.log("Number of days:", numberOfDays);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "pln",
          unit_amount: newPrice * 100,
          product_data: {
            name: property.name, // Nazwa nieruchomości
            description: `
              Reservation for: ${property.name}
              Location: ${property.city}, ${property.country}
              Stay Duration: ${formValues?.dateRange.from} to ${formValues?.dateRange.to} (${numberOfDays} days)
              Total Price: ${(price * numberOfDays).toFixed(2)} PLN
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
      dateFrom: formValues?.dateRange.from,
      dateTo: formValues?.dateRange.to,
      price: newPrice,
    },
    mode: "payment",
    custom_fields: [],
    success_url: `http://localhost:3000/profile`,
    cancel_url: `http://localhost:3000/`,
  });

  redirect(session.url!);
}

interface ReservationResponse {
  stripeId: string;
  price: number;
  buyerId: string;
  propertyId: string;
  createdAt: Date;
  userId: string;
  guests: number;
  dateFrom: string;
  dateTo: string;
}

export async function createReservation(reservation: ReservationResponse) {
  try {
    // const session = await auth();
    // if (!session?.user?.email) {
    //   console.log("No user session found.");
    //   return { success: false, message: "No user session found." };
    // }

    // if (!reservation.userId) {
    //   console.log("No user ID found.");
    //   return { success: false, message: "No user ID found." };
    // }

    const newReservation = await db.reservation.create({
      data: {
        ...reservation,
        userId: reservation.userId,
      },
    });

    return JSON.parse(JSON.stringify(newReservation));
  } catch (error) {
    console.error("Failed to create reservation", error);
    return { success: false, message: "Failed to create reservation." };
  }
}
