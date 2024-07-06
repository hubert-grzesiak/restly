import { cache } from "react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getUserReview = cache(async ({ propertyId }: {propertyId: string}) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      console.log("No user session found.");
      return [];
    }

    const review = await db.review.findFirst({
      where: {
        propertyId: propertyId,
        userId: session?.user?.id,
      },
    });

    return review;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return [];
  }
});

export default getUserReview;
