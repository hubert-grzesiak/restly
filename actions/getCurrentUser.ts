
import { db } from "@/lib/db";
import { auth } from "@/auth";

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
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;