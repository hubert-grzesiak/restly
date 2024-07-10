import { cache } from "react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getReviewsSummaryForUser = cache(async () => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      console.log("No user session found.");
      return { numberOfReviews: 0, averageRating: 0 }; // Return default values if no user session is found
    }

    const reviews = await db.review.findMany({
      where: {
        userId: session?.user?.id,
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
});

export default getReviewsSummaryForUser;
