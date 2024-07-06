"use server";

import { cache } from "react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getVisitedProperties = cache(async ({ userId }: { userId: string }) => {
  try {
    const session = await auth();
    console.log(session?.user?.email);
    if (!session?.user?.email) {
      console.log("No user session found.");
      return [];
    }

    const visitedProperties = await db.reservation.findMany({
      where: {
        userId: userId,
      },
      include: {
        property: {
          include: {
            images: true,
            Review: true,
          },
        },
      },
    });

    if (!visitedProperties.length) {
      console.log("No visited properties found in the database.");
      return [];
    }

    return visitedProperties;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return [];
  }
});

export default getVisitedProperties;
