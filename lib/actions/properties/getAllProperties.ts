"use server";
import { db } from "@/lib/db";

const getAllProperties = async () => {
  try {
    const properties = await db.object.findMany({
      include: {
        images: true,
        prices: true,
      },
    });

    if (!properties.length) {
      console.log("No properties found in the database.");
      return [];
    }

    const propertiesWithUrls = properties.map(property => ({
      ...property,
      urls: property.images.map(image => image.urls).flat(), // Pobieranie wszystkich URLs
    }));

    return propertiesWithUrls;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return [];
  }
};

export default getAllProperties;
