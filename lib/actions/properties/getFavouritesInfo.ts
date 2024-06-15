"use server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getFavouritesInfo = async () => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      console.log("No user session found.");
      return [];
    }

    const favorites = await db.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        object: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!favorites.length) {
      console.log("No favorites found in the database.");
      return [];
    }

    // Wyciąganie URLs z powiązanych obrazów
    const propertiesWithUrls = favorites.map(favorite => ({
      ...favorite.object,
      urls: favorite.object.images.map(image => image.urls).flat(), // Pobieranie wszystkich URLs
    }));

    return propertiesWithUrls;
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    return [];
  }
};

export default getFavouritesInfo;
