"use server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function toggleFavouriteProperty(propertyId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      redirect("/auth/login");
    }
    const userId = session.user.id;

    const favourite = await db.favourite.findFirst({
      where: {
        userId,
        propertyId: propertyId,
      },
    });

    if (favourite) {
      await db.favourite.delete({
        where: {
          id: favourite.id,
        },
      });
      return false; // Return false as the item is no longer a favourite
    } else {
      await db.favourite.create({
        data: {
          userId,
          propertyId: propertyId,
        },
      });
      return true; // Return true as the item is now a favourite
    }
  } catch (error) {
    console.error("Error in toggleFavouriteProperty:", error);
    throw error; // Consider handling this more gracefully in production
  }
}

export const isPropertyFavourite = async (propertyId: string) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      // If no user is logged in, return null
      return null;
    }

    const userId = session.user.id;

    // Check if the object is already in the user's favourites
    const favourite = await db.favourite.findFirst({
      where: {
        userId,
        propertyId: propertyId,
      },
    });

    return favourite ? true : false;
  } catch (error) {
    console.error("Error in isPropertyFavourite:", error);
    throw error;
  }
};
