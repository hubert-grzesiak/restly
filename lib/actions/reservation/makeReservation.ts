"use server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ReservationSchema } from "@/app/(protected)/profile/properties/[id]/components/ReservationForm/ReservationFormSchema";

const MakeReservation = ReservationSchema;

export async function makeReservation(params: any) {
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

        // Check for overlapping reservations
        const overlappingReservation = await db.reservation.findFirst({
            where: {
                objectId: validatedObject,
                AND: [
                    {
                        dateFrom: {
                            lte: new Date(validatedDateFrom),
                        },
                    },
                    {
                        dateTo: {
                            gte: new Date(validatedDateTo),
                        },
                    },
                ],
            },
        });

        if (overlappingReservation) {
            console.log("The selected dates are already booked.", overlappingReservation);
            return { success: false, message: "The selected dates are already booked." };
        }

        // Create a new reservation if no overlap
        await db.reservation.create({
            data: {
                userId: validatedUser,
                objectId: validatedObject,
                guests: validatedGuests,
                dateFrom: new Date(validatedDateFrom),
                dateTo: new Date(validatedDateTo),
            },
        });

        // Revalidate the path to reflect the changes
        await revalidatePath("/");

        return { success: true, message: "Reservation successfully created." };
    } catch (error) {
        console.error("Error in makeReservation:", error);
        return { success: false, message: "Failed to create reservation." };
    }
}
