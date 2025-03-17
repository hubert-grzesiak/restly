import { db } from "@/lib/db";
import { cache } from "react";

import getCurrentUser from "../getCurrentUser";

const getConversationById = cache(async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        property: {
          include: {
            images: true,
          },
        },
      },
    });

    return conversation;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("SERVER_ERROR:", error.message);
    } else {
      console.error("SERVER_ERROR: An unknown error occurred");
    }
    return null;
  }
});

export default getConversationById;
