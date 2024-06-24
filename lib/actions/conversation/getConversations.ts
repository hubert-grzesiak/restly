import { cache } from 'react';
import { auth } from "@/lib/auth";
import { User, UserRole } from "@prisma/client";
import { db } from "@/lib/db";
import { FullConversationType } from "@/types";

// Define a common type that includes all necessary properties
interface ExtendedUser extends User {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  emailVerified: Date | null;
  password: string | null;
  twoFactorConfirmationId: string | null;
  conversationIds: string[];
  seenMessageIds: string[];
}

const getConversations = cache(async (): Promise<FullConversationType[]> => {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  const currentUser = session.user as ExtendedUser;

  try {
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    // Type assertion to ensure the return type matches FullConversationType[]
    return conversations as FullConversationType[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("SERVER_ERROR:", error.message);
    } else {
      console.error("SERVER_ERROR: An unknown error occurred");
    }
    return [];
  }
});

export default getConversations;
