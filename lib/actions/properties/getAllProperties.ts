import { PropertyInterface } from "@/components/sections/Main/components/MainMap";
import { db } from "@/lib/db";
import { parse, isValid, format } from "date-fns";

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

  const query: Record<string, any> = {
    softDeleted: false,
  };

  if (searchQuery) {
    query.OR = [
      { name: { contains: searchQuery, mode: "insensitive" } },
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
    // Parse the dates using `parse` with the "dd.MM.yyyy" format
    let parsedFrom: Date;
    let parsedTo: Date;

    if (typeof from === "string") {
      parsedFrom = parse(from, "dd.MM.yyyy", new Date());
      if (!isValid(parsedFrom)) {
        throw new Error(`Invalid 'from' date format: ${from}`);
      }
    } else {
      parsedFrom = from;
    }

    if (typeof to === "string") {
      parsedTo = parse(to, "dd.MM.yyyy", new Date());
      if (!isValid(parsedTo)) {
        throw new Error(`Invalid 'to' date format: ${to}`);
      }
    } else {
      parsedTo = to;
    }

    // Ensure that 'from' is before 'to'
    if (parsedFrom > parsedTo) {
      throw new Error(
        `'from' date (${parsedFrom}) cannot be after 'to' date (${parsedTo})`,
      );
    }

    // Format the dates as strings matching the expected format in the database
    const fromStr = format(parsedFrom, "yyyy-MM-dd"); // Adjust format as needed
    const toStr = format(parsedTo, "yyyy-MM-dd"); // Adjust format as needed

    query.NOT = {
      Reservation: {
        some: {
          dateFrom: { lte: toStr },
          dateTo: { gte: fromStr },
        },
      },
    };
  }

  console.log("Constructed query:", JSON.stringify(query, null, 2));
  const ITEMS_PER_PAGE = 24;
  const offset = ((currentPage ?? 1) - 1) * ITEMS_PER_PAGE;

  try {
    const propertiesCount = await db.property.count({
      where: query,
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
                ] as [number, number],
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
    return { numberOfReviews: 0, averageRating: 0 };
  }
};
