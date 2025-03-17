"use server";
import { cache } from "react";
import { db } from "@/lib/db";
import getCurrentUser from "../getCurrentUser";
import { currentUser } from "@/lib/actualUserInfo";

export const getReservations = cache(async (propertyId: string) => {
  const currentUser = await getCurrentUser();
  try {
    const reservations = await db.reservation.findMany({
      where: {
        propertyId,
        userId: currentUser?.id,
      },
      select: {
        dateFrom: true,
        dateTo: true,
      },
    });

    const formattedReservations = reservations
      .map((reservation) => {
        try {
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
          return null;
        }
      })
      .filter(Boolean);

    return { success: true, reservations: formattedReservations };
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return { success: false, message: "Failed to fetch reservations." };
  }
});
