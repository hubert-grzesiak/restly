"use server";

import { currentRole } from "@/lib/actualUserInfo";
import { UserRole } from "@prisma/client";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" };
};

export const getReportedReviewsAmount = async (): Promise<
  number | { error: string; count: number }
> => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    try {
      const reportedReviews = await db.reportedReview.findMany();
      return reportedReviews.length;
    } catch (error) {
      return { error: "Error fetching all reported reviews", count: 0 };
    }
  }
  return { error: "Forbidden Server Action!", count: 0 };
};

export const deleteReportedReview = async ({
  reportedReviewId,
  reviewId,
}: {
  reportedReviewId: string;
  reviewId: string;
}) => {
  const role = await currentRole();
  if (role === UserRole.ADMIN) {
    try {
      await db.reportedReview.delete({
        where: { id: String(reportedReviewId) },
      });

      // Attempt to delete the review from the review table
      const reviewDeleted = await db.review.delete({
        where: { id: String(reviewId) },
      });

      if (!reviewDeleted) {
        console.error(
          `Review with ID ${reviewId} could not be deleted or was not found.`,
        );
      }

      return { success: "Reported review deleted" };
    } catch (error) {
      console.error("Error deleting reported review or review", error);
      return { error: "Error deleting reported review" };
    } finally {
      revalidatePath("/admin/reported-reviews");
    }
  }
  return { error: "Forbidden Server Action!" };
};

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredReportedReviews(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const reportedReviews = await db.reportedReview.findMany({
      where: {
        OR: [{ status: { contains: query } }],
      },
      include: {
        review: {
          include: {
            user: true,
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });
    return reportedReviews;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch reported reviews.");
  }
}

export async function fetchReportedReviewsPages(query: string) {
  noStore();
  try {
    const count = await db.reportedReview.count({
      where: {
        OR: [{ status: { contains: query } }],
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of reported reviews.");
  }
}

export async function fetchReportedReviewById(id: string) {
  noStore();
  try {
    const reportedReview = await db.reportedReview.findUnique({
      where: { id },
    });

    return reportedReview;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch reported review.");
  }
}

export async function updateStatusOfReview({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const role = await currentRole();

  if (role === UserRole.ADMIN && status === "ok") {
    try {
      await db.reportedReview.delete({
        where: { id },
      });
      revalidatePath("/admin/reported-reviews");
      return { success: "Status of review updated" };
    } catch (error) {
      return { error: "Error updating status of review" };
    }
  }
  return { error: "Forbidden Server Action!" };
}
