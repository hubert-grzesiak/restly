import { db } from "@/lib/db";
import { cache } from "react";
import getCurrentUser from "../getCurrentUser";

const getMessages = cache(async (conversationId: string) => {
  const currentUser = await getCurrentUser();

  try {
    const messages = await db.message.findMany({
      where: {
        conversationId: conversationId,
        senderId: {
          contains: currentUser?.id,
        },
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching messages:", error.message);
    } else {
      console.error("Unknown error fetching messages");
    }
    return [];
  }
});

export default getMessages;
