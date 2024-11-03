import { cache } from "react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getUserReview = cache(
  async ({ reservationId }: { reservationId: string }) => {
    try {
      const session = await auth();

      if (!session?.user?.email) {
        return [];
      }

      const review = await db.review.findFirst({
        where: {
          reservationId: reservationId,
        },
      });

      return review;
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      return [];
    }
  },
);

export default getUserReview;
