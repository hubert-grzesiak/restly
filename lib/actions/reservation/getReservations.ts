import { cache } from "react";
import { db } from "@/lib/db";

export const getReservations = cache(async (propertyId: string) => {
  try {
    const reservations = await db.reservation.findMany({
      where: {
        propertyId,
      },
      select: {
        dateFrom: true,
        dateTo: true,
      },
    });

    const formattedReservations = reservations.map((reservation) => {
      const dateFrom = new Date(reservation.dateFrom);
      const dateTo = new Date(reservation.dateTo);
      return {
        from: dateFrom
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("."),
        to: dateTo.toISOString().split("T")[0].split("-").reverse().join("."),
      };
    });

    return { success: true, reservations: formattedReservations };
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return { success: false, message: "Failed to fetch reservations." };
  }
});
