"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const restoreProperty = async (id: string, ownerId: string) => {
  const session = await auth();
  if (session?.user?.email) {
    try {
      await db.property.update({
        where: { id: String(id), ownerId },
        data: {
          softDeleted: false,
        },
      });

      revalidatePath(`/properties/${id}`);
      return { success: "Property restored" };
    } catch (error) {
      return { error: "Error restoring property" };
    }
  } else {
    return { error: "Forbidden Server Action!" };
  }
};
