"use server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
      return false; 
    } else {
      await db.favourite.create({
        data: {
          userId,
          propertyId: propertyId,
        },
      });
      return true; 
    }
  } catch (error) {
    console.error("Error in toggleFavouriteProperty:", error);
    throw error;
  } finally {
    revalidatePath("/profile/favourites");
  }
}

export const isPropertyFavourite = async (propertyId: string) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return null;
    }

    const userId = session.user.id;

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
