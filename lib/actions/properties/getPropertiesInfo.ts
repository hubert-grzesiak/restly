"use server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getPropertiesInfo = async () => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      console.log("No user session found.");
      return [];
    }

    const properties = await db.object.findMany({
        where: {
            ownerId: session?.user?.id
        },
        include: {
            images:true,
        }
    });

    if (!properties.length) {
      console.log("No facilities found in the database.");
      return [];
    }

 // Wyciąganie URLs z powiązanych obrazów
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

export default getPropertiesInfo;
