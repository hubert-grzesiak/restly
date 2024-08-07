"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { toast } from "sonner";

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

      // Sprawdzenie, czy opinia nie została już zgłoszona
      const reportedReview = await db.reportedReview.findFirst({
        where: {
          reviewId: reviewId,
        },
      });

      if (reportedReview) {
        toast.error("Review already reported");
        return { error: "Review already reported" };
      }
      await db.reportedReview.create({
        data: {
          reviewId: reviewId,
          reportedAt: new Date(),
          reportedBy: session.user.email as string,
          status: "Pending",
        },
      });

      await db.user.update({
        where: { id: review.userId },
        data: {
          reputation: { increment: 1 },
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
