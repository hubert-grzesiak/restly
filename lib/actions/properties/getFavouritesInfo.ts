import { cache } from "react";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getFavouritesInfo = cache(async () => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      console.log("No user session found.");
      return [];
    }

    const favourites = await db.favourite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        property: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!favourites.length) {
      console.log("No favourites found in the database.");
      return [];
    }

    // Wyciąganie URLs z powiązanych obrazów
    const propertiesWithUrls = favourites.map((favourite) => ({
      ...favourite.property,
      urls: favourite.property.images.map((image) => image.urls).flat(), // Pobieranie wszystkich URLs
    }));

    return propertiesWithUrls;
  } catch (error) {
    console.error("Failed to fetch favourites:", error);
    return [];
  }
});

export default getFavouritesInfo;
