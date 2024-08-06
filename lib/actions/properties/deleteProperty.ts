"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteProperty = async (id: string) => {
  const session = await auth();
  if (session?.user?.email) {
    try {
      await db.property.update({
        where: { id: String(id) },
        data: {
          softDeleted: true,
        },
      });

      revalidatePath(`/properties/${id}`);
      return { success: "Property deleted" };
    } catch (error) {
      return { error: "Error deleting property" };
    }
  }
  return { error: "Forbidden Server Action!" };
};
