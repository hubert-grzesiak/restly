"use server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ReservationSchema } from "@/app/(protected)/profile/properties/[id]/components/ReservationForm/ReservationFormSchema";
import { toast } from "sonner";

export async function getReservations(objectId: string) {
  try {
    // Fetch all reservations for the given object
    const reservations = await db.reservation.findMany({
      where: {
        objectId,
      },
      select: {
        dateFrom: true,
        dateTo: true,
      },
    });

    // Format the dates to "dd.mm.yyyy"
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
}
