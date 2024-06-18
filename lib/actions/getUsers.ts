import { auth } from "@/lib/auth";

import { db } from "@/lib/db";
const getUsers = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await db.user.findMany({
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching users:", error.message);
    } else {
      console.error("Unknown error fetching users");
    }
    return [];
  }
};

export default getUsers;
