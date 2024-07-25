import { cache } from "react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getReviews = cache(async ({ propertyId }: { propertyId: string }) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      console.log("No user session found.");
      return [];
    }

    const reviews = await db.review.findMany({
      where: {
        propertyId: propertyId,
      },
      include: {
        user: true,
      },
    });

    if (!reviews.length) {
      console.log("No facilities found in the database.");
      return [];
    }

    return reviews;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return [];
  }
});

export default getReviews;
