import { cache } from "react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getPropertyInfo = async ({ id }: { id: string }) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      console.log("No user session found.");
      return null;
    }

    const property = await db.property.findFirst({
      where: {
        id: id,
      },
      include: {
        images: true,
        facility: true,
        prices: true,
        geometry: true,
      },
    });

    if (!property) {
      console.log("No property found with the given id.");
      return null;
    }

    if (property.geometry === null) {
      return false;
    }

    const coordinates: [number, number] = property.geometry.coordinates.length >= 2
      ? [property.geometry.coordinates[0], property.geometry.coordinates[1]]
      : [0, 0]; // Default values if coordinates are insufficient

    // Wyciąganie URLs z powiązanych obrazów
    const propertyWithUrls = {
      ...property,
      geometry: {
        ...property.geometry,
        coordinates: coordinates, // Ensure correct type
      },
      urls: property.images.map((image) => image.urls).flat(), // Pobieranie wszystkich URLs
    };

    return propertyWithUrls;
  } catch (error) {
    console.error("Failed to fetch property:", error);
    return null;
  }
};

export default cache(getPropertyInfo);
