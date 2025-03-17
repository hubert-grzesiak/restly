import { auth } from "@/lib/auth";
import { User, UserRole } from "@prisma/client";

import { db } from "@/lib/db";


export interface ExtendedUser extends User {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth?: boolean;
  emailVerified: Date | null;
  password: string | null;
  twoFactorConfirmationId: string | null;
  conversationIds: string[];
  seenMessageIds: string[];
}

const getUsers = async (): Promise<ExtendedUser[]> => {
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
