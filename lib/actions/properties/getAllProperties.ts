import { cache } from 'react';
import { db } from "@/lib/db";

// Function to get review summary for a property
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
    const totalRating = reviews.reduce(
      (acc, review) => acc + review.rating,
      0,
    );
    const averageRating =
      numberOfReviews > 0 ? totalRating / numberOfReviews : 0;

    return { numberOfReviews, averageRating };
  } catch (error) {
    console.error("Failed to fetch reviews summary:", error);
    return { numberOfReviews: 0, averageRating: 0 }; // Return default values in case of an error
  }
};

const getAllProperties = cache(async () => {
  try {
    const properties = await db.property.findMany({
      include: {
        images: true,
        prices: true,
        geometry: true,
      },
    });

    if (!properties.length) {
      console.log("No properties found in the database.");
      return [];
    }

    // Fetch review summaries for each property and combine with property data
    const propertiesWithReviews = await Promise.all(
      properties.map(async (property) => {
        const reviewsSummary = await getReviewsSummaryForProperty(property.id);
        return {
          ...property,
          urls: property.images.map(image => image.urls).flat(), // Get all URLs
          ...reviewsSummary,
        };
      })
    );

    return propertiesWithReviews;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return [];
  }
});

export default getAllProperties;
