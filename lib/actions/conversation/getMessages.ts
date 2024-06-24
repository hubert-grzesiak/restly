import { db } from "@/lib/db";
import {cache} from 'react';

const getMessages = cache(async (conversationId: string) => {
  try {
    const messages = await db.message.findMany({
      where: {
        conversationId: conversationId,
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
