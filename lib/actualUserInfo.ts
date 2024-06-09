import { auth } from "@/lib/auth";


import { PrismaClient, User as PrismaUser } from "@prisma/client";

const prisma = new PrismaClient();

export type User = PrismaUser & {
  emailVerified: Date | null;
  password: string | null;
  twoFactorConfirmationId: string | null;
  conversationIds: string[];
  seenMessageIds: string[];
};

export const currentUser = async (): Promise<User | null> => {
  const session = await auth();

  if (session?.user) {
    const { id } = session.user;
    const user = await prisma.user.findUnique({ where: { id } });

    if (user) {
      return {
        ...user,
        emailVerified: user.emailVerified,
        password: user.password,
        twoFactorConfirmationId: user.twoFactorConfirmationId,
        conversationIds: user.conversationIds || [],
        seenMessageIds: user.seenMessageIds || [],
      };
    }
  }

  return null;
};

export const currentRole = async (): Promise<string | undefined> => {
  const session = await auth();
  return session?.user?.role;
};
