import { PropertyInterface } from "@/components/sections/Main/components/MainMap";
import { db } from "@/lib/db";

export interface GetPropertiesParams {
  currentPage?: number;
  searchQuery?: string;
  numberOfGuests?: {
    adults?: number;
    kids?: number;
    animals?: number;
  };
  from?: Date | string;
  to?: Date | string;
}

interface GetAllPropertiesResponse {
  propertiesWithReviews: PropertyInterface[];
  propertiesCount: number;
}
export default async function getAllProperties(
  params: GetPropertiesParams,
): Promise<GetAllPropertiesResponse> {
  const { searchQuery, numberOfGuests, from, to, currentPage } = params;

  const query: Record<string, any> = {};

  if (searchQuery) {
    query.OR = [
      { city: { contains: searchQuery, mode: "insensitive" } },
      { country: { contains: searchQuery, mode: "insensitive" } },
      { description: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  if (numberOfGuests) {
    const totalGuests =
      (numberOfGuests.adults || 0) +
      (numberOfGuests.kids || 0) +
      (numberOfGuests.animals || 0);

    query.maxPeople = {
      gte: totalGuests,
    };
    query.softDeleted = false;

    if (numberOfGuests.kids || numberOfGuests.animals) {
      query.facility = {
        some: {
          OR: [
            numberOfGuests.kids ? { name: "Kids" } : undefined,
            numberOfGuests.animals ? { name: "Animals" } : undefined,
          ].filter(Boolean),
        },
      };
    }
  }

  if (from && to) {
    query.NOT = {
      Reservation: {
        some: {
          OR: [
            {
              dateFrom: { lte: to },
              dateTo: { gte: from },
            },
          ],
        },
      },
    };
  }

  console.log("Constructed query:", JSON.stringify(query, null, 2));
  const ITEMS_PER_PAGE = 24;
  const offset = ((currentPage ?? 1) - 1) * ITEMS_PER_PAGE;

  try {
    const propertiesCount = await db.property.count({
      where: { softDeleted: false },
    });
    const properties = await db.property.findMany({
      where: query,
      take: ITEMS_PER_PAGE,
      skip: offset,
      include: {
        images: true,
        prices: true,
        geometry: true,
        facility: true,
        Reservation: true,
      },
    });

    if (!properties.length) {
      console.log("No properties found in the database.");
      return {
        propertiesWithReviews: [],
        propertiesCount,
      };
    }

    const propertiesWithReviews = await Promise.all(
      properties.map(async (property) => {
        const reviewsSummary = await getReviewsSummaryForProperty(property.id);
        return {
          ...property,
          urls: property.images.map((image) => image.urls).flat(),
          geometry: property.geometry
            ? {
                ...property.geometry,
                coordinates: [
                  property.geometry.coordinates[0] || 0,
                  property.geometry.coordinates[1] || 0,
                ] as [number, number], // Ensuring the coordinates are a tuple
              }
            : null,
          ...reviewsSummary,
        };
      }),
    );

    console.log("propertiesWithReviews", propertiesWithReviews);
    return { propertiesWithReviews, propertiesCount };
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    throw error;
  }
}

const getReviewsSummaryForProperty = async (propertyId: string) => {
  try {
    const reviews = await db.review.findMany({
      where: {
        propertyId: propertyId,
      },
      select: {
        rating: true,
      },
    });

    const numberOfReviews = reviews.length;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating =
      numberOfReviews > 0 ? totalRating / numberOfReviews : 0;

    return { numberOfReviews, averageRating };
  } catch (error) {
    console.error("Failed to fetch reviews summary:", error);
    return { numberOfReviews: 0, averageRating: 0 }; // Return default values in case of an error
  }
};
