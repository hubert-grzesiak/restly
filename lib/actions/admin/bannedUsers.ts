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

export const getBannedUsersAmount = async (): Promise<
  number | { error: string; count: number }
> => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    try {
      const bannedUsers = await db.user.findMany({
        where: { shadowbanned: true },
      });
      return bannedUsers.length;
    } catch (error) {
      return { error: "Error fetching all banned users", count: 0 };
    }
  }
  return { error: "Forbidden Server Action!", count: 0 };
};

export const deleteBannedUser = async ({
  bannedUserId,
  reviewId,
}: {
  bannedUserId: string;
  reviewId: string;
}) => {
  const role = await currentRole();
  if (role === UserRole.ADMIN) {
    try {
      const userOfReview = await db.review.findUnique({
        where: { id: String(reviewId) },
        select: { userId: true },
      });

      if (!userOfReview) {
        return { error: "User of the review not found" };
      }

      const userId = userOfReview.userId;

      await db.user.update({
        where: { id: String(bannedUserId), shadowbanned: true },
        data: { shadowbanned: false },
      });

      // Attempt to delete the review from the review table
      const reviewDeleted = await db.review.delete({
        where: { id: String(reviewId) },
      });

      if (reviewDeleted) {
        // Increase user's reputation by 1
        await db.user.update({
          where: { id: userId },
          data: { reputation: { increment: 1 } },
        });
      } else {
        console.error(
          `Review with ID ${reviewId} could not be deleted or was not found.`,
        );
      }

      return { success: "Reported review deleted and user reputation updated" };
    } catch (error) {
      console.error("Error deleting banned user or review", error);
      return { error: "Error deleting banned user" };
    } finally {
      revalidatePath("/admin/banned-users");
    }
  }
  return { error: "Forbidden Server Action!" };
};

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredBannedUsers(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const bannedUsers = await db.user.findMany({
      where: {
        shadowbanned: true,
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });
    return bannedUsers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch banned users.");
  }
}

export async function fetchBannedUsersPages(query: string) {
  noStore();
  try {
    const count = await db.user.count({
      where: {
        shadowbanned: true,
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of banned users.");
  }
}

export async function fetchBannedUserById(id: string) {
  noStore();
  try {
    const bannedUser = await db.user.findUnique({
      where: { id: id, shadowbanned: true },
    });

    return bannedUser;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch banned user.");
  }
}

export async function updateStatusOfReview({
  id,
  status,
  userId,
}: {
  id: string;
  status: string;
  userId: string;
}) {
  const role = await currentRole();

  if (role === UserRole.ADMIN && status === "ok") {
    try {
      await db.user.update({
        where: { id: userId },
        data: { reputation: { decrement: 1 } },
      });
      revalidatePath("/admin/banned-users");
      return { success: "Status of user updated" };
    } catch (error) {
      return { error: "Error updating status of user" };
    }
  }
  return { error: "Forbidden Server Action!" };
}

export async function unbanUser({ userId }: { userId: string }) {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    try {
      await db.user.update({
        where: { id: userId },
        data: { shadowbanned: false },
      });
      revalidatePath("/admin/banned-users");
      return { success: "User banned" };
    } catch (error) {
      return { error: "Error banning user" };
    }
  }
  return { error: "Forbidden Server Action!" };
}
