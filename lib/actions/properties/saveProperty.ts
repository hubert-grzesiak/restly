"use server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function toggleFavoriteProperty(propertyId: string) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      console.log("No user session found.");
      return null;
    }

    const userId = session.user.id;

    // Sprawdzenie, czy obiekt jest już w ulubionych użytkownika
    const favorite = await db.favorite.findFirst({
      where: {
        userId,
        objectId: propertyId,
      },
    });

    if (favorite) {
      // Jeśli obiekt jest w ulubionych, usuń go
      await db.favorite.delete({
        where: {
          id: favorite.id,
        },
      });
    } else {
      // Jeśli obiekt nie jest w ulubionych, dodaj go
      await db.favorite.create({
        data: {
          userId,
          objectId: propertyId,
        },
      });
    }
    // revalidatePath(path);
  } catch (error) {
    console.error("Error in toggleFavoriteProperty:", error);
    throw error;
  }
}
