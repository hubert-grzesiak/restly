import { db } from "@/lib/db";

import { NextResponse } from "next/server";
import { auth } from "@/auth";

import { pusherEvents, pusherServer } from "@/lib/pusher";

interface IParams {
  conversationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const session = await auth();

  try {
    const { conversationId } = params;
    const currentUser = session?.user;

    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    const existingConversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deletedConversation = await db.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, pusherEvents.DELETE_CONVERSATION, existingConversation);
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    return NextResponse.json(null);
  }
}
