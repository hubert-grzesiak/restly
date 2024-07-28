"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

// Funkcja do zgłaszania opinii
export default async function reportReview({ reviewId }: { reviewId: string }) {
  const session = await auth();

  if (session?.user?.email) {
    try {
      const review = await db.review.findUnique({
        where: { id: reviewId },
      });

      if (!review) {
        return { error: "Review not found" };
      }

      await db.reportedReview.create({
        data: {
          reviewId: reviewId,
          reportedAt: new Date(),
          status: "Pending",
        },
      });

      return { success: true };
    } catch (error) {
      console.error("Error reporting the review:", error);
      return { error: "Error reporting the review" };
    }
  } else {
    return { error: "User not authenticated" };
  }
}
