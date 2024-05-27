import { auth } from "@/auth";
import prisma from "@/lib/db";

const getUsers = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      // orderBy: {
      //   createdAt: "desc",
      // },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
