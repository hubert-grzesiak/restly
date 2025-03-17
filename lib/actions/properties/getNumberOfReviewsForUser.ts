import { cache } from "react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getReviewsSummaryForUser = cache(
  async ({ userId }: { userId: string }) => {
    try {
      const session = await auth();

      if (!session?.user?.email) {
        console.log("No user session found.");
        return { numberOfReviews: 0, averageRating: 0 }; 
      }

      const userProperties = await db.property.findMany({
        where: {
          ownerId: userId,
        },
        select: {
          id: true,
        },
      });

      if (userProperties.length === 0) {
        return { numberOfReviews: 0, averageRating: 0 };
      }

      const propertyIds = userProperties.map(property => property.id);
      const reviews = await db.review.findMany({
        where: {
          propertyId: {
            in: propertyIds,
          },
        },
        select: {
          rating: true,
        },
      });

      const numberOfReviews = reviews.length;
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = numberOfReviews > 0 ? totalRating / numberOfReviews : 0;

      console.log("USER HAS PROPERTIES, average rating:", averageRating);
      return { numberOfReviews, averageRating };

    } catch (error) {
      console.error("Failed to fetch reviews summary:", error);
      return { numberOfReviews: 0, averageRating: 0 }; 
    }
  }
);

export default getReviewsSummaryForUser;
