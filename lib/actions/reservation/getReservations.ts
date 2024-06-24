import {cache} from 'react';
import { db } from "@/lib/db";

export const getReservations = cache(async (objectId: string) =>{
  try {
    const reservations = await db.reservation.findMany({
      where: {
        objectId,
      },
      select: {
        dateFrom: true,
        dateTo: true,
      },
    });

    const formattedReservations = reservations.map((reservation) => ({
      from: reservation.dateFrom
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("."),
      to: reservation.dateTo
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("."),
    }));

    return { success: true, reservations: formattedReservations };
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return { success: false, message: "Failed to fetch reservations." };
  }
});
