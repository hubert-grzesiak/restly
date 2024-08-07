"use server";

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

    const currentUser = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      console.log("User not found.");
      return [];
    }

    let reviews;
    if (currentUser.shadowbanned) {
      reviews = await db.review.findMany({
        where: {
          propertyId: propertyId,
          user: {
            shadowbanned: true,
          },
        },
        include: {
          user: true,
        },
      });
    } else {
      reviews = await db.review.findMany({
        where: {
          propertyId: propertyId,
          user: {
            shadowbanned: false,
          },
        },
        include: {
          user: true,
        },
      });
    }

    if (!reviews.length) {
      console.log("No reviews found in the database.");
      return [];
    }

    return reviews;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return [];
  }
});

export default getReviews;
