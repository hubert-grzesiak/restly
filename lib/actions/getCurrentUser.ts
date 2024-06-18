import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getCurrentUser = async () => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching current user:", error.message);
    } else {
      console.error("Unknown error fetching current user");
    }
    return null;
  }
};

export default getCurrentUser;
