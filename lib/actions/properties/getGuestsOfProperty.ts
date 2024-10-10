import { cache } from "react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getGuestsOfProperty = cache(
  async ({ propertyId, ownerId }: { propertyId: string; ownerId: string }) => {
    try {
      const session = await auth();

      if (!session?.user?.email || session?.user?.id !== ownerId) {
        console.log("No user session found.");
        return { users: [], usersCount: 0 };
      }

      const usersCount = await db.reservation.count({
        where: { propertyId: propertyId },
      });

      const users = await db.reservation.findMany({
        where: { propertyId: propertyId },
        include: {
          user: true,
        },
      });

      if (!users.length) {
        console.log("No properties found in the database.");
        return { users: [], usersCount };
      }

      return { users, usersCount };
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      return { users: [], usersCount: 0 };
    }
  },
);

export default getGuestsOfProperty;
