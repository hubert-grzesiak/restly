import { cache } from "react";
import { db } from "@/lib/db";

const getReviewsSummaryForProperty = cache(
  async ({ propertyId }: { propertyId: string }) => {
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
      return { numberOfReviews: 0, averageRating: 0 }; 
    }
  },
);

export default getReviewsSummaryForProperty;
