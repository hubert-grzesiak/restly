"use server";
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

    console.log("Reservations server:", reservations);

    const formattedReservations = reservations
      .map((reservation) => {
        try {
          // Function to convert DD.MM.YYYY to YYYY-MM-DD
          const parseDate = (dateString: any) => {
            const [day, month, year] = dateString.split(".");
            return `${year}-${month}-${day}`;
          };

          const dateFrom = new Date(parseDate(reservation.dateFrom));
          const dateTo = new Date(parseDate(reservation.dateTo));

          return {
            from: dateFrom
              .toISOString()
              .split("T")[0]
              .split("-")
              .reverse()
              .join("."),
            to: dateTo
              .toISOString()
              .split("T")[0]
              .split("-")
              .reverse()
              .join("."),
          };
        } catch (error) {
          console.error("Error parsing reservation dates:", error, reservation);
          return null; // Or handle the error as needed
        }
      })
      .filter(Boolean); // Remove any null entries if date parsing failed

    return { success: true, reservations: formattedReservations };
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return { success: false, message: "Failed to fetch reservations." };
  }
});
