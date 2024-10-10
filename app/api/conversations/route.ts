import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { pusherEvents, pusherServer } from "@/lib/pusher";
import { User } from "@prisma/client";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const currentUser = session?.user;
    const body = await request.json();
    const { userId, isGroup, members, name, propertyId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await db.conversation.create({
        data: {
          name,
          propertyId,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      // Notify users about the new conversation
      newConversation.users.forEach((user: User) => {
        if (user.email) {
          pusherServer.trigger(
            user.email,
            pusherEvents.NEW_CONVERSATION,
            newConversation,
          );
        }
      });

      return NextResponse.json(newConversation);
    }

    // Check for existing conversation between the current user and the other user
    const existingConversations = await db.conversation.findMany({
      where: {
        propertyId: propertyId,
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    if (existingConversations.length > 0) {
      return NextResponse.json(existingConversations[0]);
    }

    const newConversation = await db.conversation.create({
      data: {
        propertyId, // Ensure propertyId is included
        users: {
          connect: [{ id: currentUser.id }, { id: userId }],
        },
      },
      include: {
        users: true,
      },
    });

    // Notify users about the new conversation
    newConversation.users.forEach((user: User) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          pusherEvents.NEW_CONVERSATION,
          newConversation,
        );
      }
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    console.error("Error creating conversation:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
