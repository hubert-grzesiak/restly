"use server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ReservationSchema } from "@/app/(home)/properties/[id]/components/ReservationForm/ReservationFormSchema";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const MakeReservation = ReservationSchema;

export async function makeReservation(params: {
  guests: number;
  dateTo: string;
  dateFrom: string;
  userId: string;
  objectId: string;
}) {
  const { objectId, userId, guests, dateFrom, dateTo } = params;

  try {
    const session = await auth();
    if (!session?.user?.email) {
      console.log("No user session found.");
      return { success: false, message: "No user session found." };
    }

    const validatedFields = MakeReservation.safeParse({
      objectId,
      userId,
      guests,
      dateRange: { from: dateFrom, to: dateTo },
    });

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Create Reservation.",
      };
    }

    const {
      objectId: validatedObject,
      userId: validatedUser,
      guests: validatedGuests,
      dateRange: { from: validatedDateFrom, to: validatedDateTo },
    } = validatedFields.data;

    // Parse dates from string to Date objects
    new Date(validatedDateFrom.split(".").reverse().join("-"));
    new Date(validatedDateTo.split(".").reverse().join("-"));

    // Check for overlapping reservations
    const overlappingReservation = await db.reservation.findFirst({
      where: {
        propertyId: validatedObject,
        AND: [
          {
            dateFrom: {
              lte: validatedDateTo, // Use validatedDateTo (string)
            },
          },
          {
            dateTo: {
              gte: validatedDateFrom, // Use validatedDateFrom (string)
            },
          },
        ],
      },
    });

    if (overlappingReservation) {
      toast.error("The selected dates are already booked.");
      return {
        success: false,
        message: "The selected dates are already booked.",
      };
    }

    // Create a new reservation if no overlap
    await db.reservation.create({
      data: {
        userId: validatedUser,
        propertyId: validatedObject,
        guests: validatedGuests,
        dateFrom: validatedDateFrom, // Use validatedDateFrom (string)
        dateTo: validatedDateTo, // Use validatedDateTo (string)
      },
    });

    // Revalidate the path to reflect the changes
    revalidatePath(`/properties/${objectId}`);

    // Redirect to the profile page
    redirect(`/properties/${objectId}`);

    return { success: true, message: "Reservation successfully created." };
  } catch (error) {
    console.error("Error in makeReservation:", error);
    return { success: false, message: "Failed to create reservation." };
  }
}
