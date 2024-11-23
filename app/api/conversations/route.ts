import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { pusherEvents, pusherServer } from "@/lib/pusher";

export async function POST(request: Request) {
  // **Autentykacja użytkownika**
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser?.id || !currentUser?.email) {
    return new NextResponse("Brak autoryzacji", { status: 401 });
  }

  try {
    // **Pobranie danych z żądania**
    const body = await request.json();
    const { userId, propertyId } = body;

    // **Walidacja danych wejściowych**
    if (!userId || !propertyId) {
      return new NextResponse("Brak wymaganych danych", { status: 400 });
    }

    // **Sprawdzenie, czy konwersacja już istnieje**
    const existingConversation = await db.conversation.findFirst({
      where: {
        propertyId,
        userIds: {
          hasEvery: [currentUser.id, userId],
        },
      },
    });

    // **Jeśli konwersacja istnieje, zwróć ją**
    if (existingConversation) {
      return NextResponse.json(existingConversation);
    }

    // **Tworzenie nowej konwersacji**
    const newConversation = await db.conversation.create({
      data: {
        propertyId,
        userIds: [currentUser.id, userId],
        users: {
          connect: [{ id: currentUser.id }, { id: userId }],
        },
      },
      include: {
        users: true,
      },
    });

    // **Powiadamianie użytkowników poprzez Pushera**
    for (const user of newConversation.users) {
      if (user.email) {
        await pusherServer.trigger(
          user.email,
          pusherEvents.NEW_CONVERSATION,
          newConversation,
        );
      }
    }

    // **Zwrócenie nowo utworzonej konwersacji**
    return NextResponse.json(newConversation);
  } catch (error) {
    console.error("Błąd podczas tworzenia konwersacji:", error);
    return new NextResponse("Błąd wewnętrzny serwera", { status: 500 });
  }
}
