"use server";
import { cache } from "react";
import { db } from "@/lib/db";

export const getPricesForPropertyCalendar = cache(
  async (propertyId: string) => {
    try {
      const prices = await db.price.findMany({
        where: {
          propertyId,
        },
        select: {
          from: true,
          to: true,
          price: true,
        },
      });
      return { success: true, prices };
    } catch (error) {
      console.error("Error fetching reservations:", error);
      return { success: false, message: "Failed to fetch reservations." };
    }
  },
);
