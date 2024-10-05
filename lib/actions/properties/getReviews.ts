"use server";

import { cache } from "react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getReviews = cache(async ({ propertyId }: { propertyId: string }) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return [];
    }

    const currentUser = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
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
      return [];
    }

    return reviews;
  } catch (error) {
    return [];
  }
});

export default getReviews;
