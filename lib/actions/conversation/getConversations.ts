import { auth } from "@/lib/auth";
import { User, UserRole } from "@prisma/client";
import { db } from "@/lib/db";

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

const getConversations = async () => {
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

    return conversations;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
