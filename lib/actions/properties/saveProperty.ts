"use server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function toggleFavoriteProperty(propertyId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      redirect("/auth/login");
    }
    const userId = session.user.id;

    const favorite = await db.favorite.findFirst({
      where: {
        userId,
        propertyId: propertyId,
      },
    });

    if (favorite) {
      await db.favorite.delete({
        where: {
          id: favorite.id,
        },
      });
      revalidatePath("/profile/favourites");
      return false; // Return false as the item is no longer a favorite
    } else {
      await db.favorite.create({
        data: {
          userId,
          propertyId: propertyId,
        },
      });
      revalidatePath("/profile/favourites");
      return true; // Return true as the item is now a favorite
    }
  } catch (error) {
    console.error("Error in toggleFavoriteProperty:", error);
    throw error; // Consider handling this more gracefully in production
  }
}

export const isPropertyFavorite = async (propertyId: string) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      // If no user is logged in, return null
      return null;
    }

    const userId = session.user.id;

    // Check if the object is already in the user's favorites
    const favorite = await db.favorite.findFirst({
      where: {
        userId,
        propertyId: propertyId,
      },
    });

    return favorite ? true : false;
  } catch (error) {
    console.error("Error in isPropertyFavorite:", error);
    throw error;
  }
};
