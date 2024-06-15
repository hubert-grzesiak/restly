"use server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getPropertyInfo = async ({ id }) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      console.log("No user session found.");
      return null;
    }

    const property = await db.object.findFirst({
      where: {
        id: id,
      },
      include: {
        images: true,
        facility: true,
        prices: true,
      },
    });

    if (!property) {
      console.log("No property found with the given id.");
      return null;
    }

    // Wyciąganie URLs z powiązanych obrazów
    const propertyWithUrls = {
      ...property,
      urls: property.images.map(image => image.urls).flat(), // Pobieranie wszystkich URLs
    };

    return propertyWithUrls;
  } catch (error) {
    console.error("Failed to fetch property:", error);
    return null;
  }
};

export default getPropertyInfo;
