import { cache } from "react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getPropertiesInfo = cache(
  async ({ softDeleted = false }: { softDeleted?: boolean }) => {
    try {
      const session = await auth();

      if (!session?.user?.email) {
        console.log("No user session found.");
        return [];
      }

      const properties = await db.property.findMany({
        where: {
          ownerId: session?.user?.id,
          softDeleted: softDeleted,
        },
        include: {
          images: true,
          facility: true,
          geometry: true,
        },
      });

      if (!properties.length) {
        console.log("No facilities found in the database.");
        return [];
      }

      // Extracting URLs from related images
      const propertiesWithUrls = properties.map((property) => ({
        ...property,
        urls: property.images.map((image) => image.urls).flat(), // Getting all URLs
      }));

      return propertiesWithUrls;
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      return [];
    }
  },
);

export default getPropertiesInfo;
