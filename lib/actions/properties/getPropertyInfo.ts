import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { cache } from "react";

type GetPropertyInfoParams = {
  id: string;
  user: User;
};

const getPropertyInfo = async ({ id, user }: GetPropertyInfoParams) => {
  try {
    const accessConditions =
      user?.role === "ADMIN"
        ? { id }
        : {
            id,
            softDeleted: false,
            OR: [
              { ownerId: user?.id },
              {
                Reservation: {
                  some: {
                    userId: user?.id,
                  },
                },
              },
            ],
          };

    console.log("Fetching property with access conditions:", accessConditions);

    const property = await db.property.findFirst({
      where: accessConditions,
      include: {
        images: true,
        facility: true,
        prices: true,
        geometry: true,
        Reservation: true,
      },
    });

    console.log("Fetched Property:", property);

    if (!property) {
      console.log(
        "No property found with the given id or you do not have access.",
      );
      return null;
    }

    if (property.geometry === null) {
      return false;
    }

    const coordinates: [number, number] =
      property.geometry.coordinates.length >= 2
        ? [property.geometry.coordinates[0], property.geometry.coordinates[1]]
        : [0, 0];

    const propertyWithUrls = {
      ...property,
      geometry: {
        ...property.geometry,
        coordinates: coordinates,
      },
      urls: property.images.map((image) => image.urls).flat(),
    };

    return propertyWithUrls;
  } catch (error) {
    console.error("Failed to fetch property:", error);
    return null;
  }
};

export default cache(getPropertyInfo);
