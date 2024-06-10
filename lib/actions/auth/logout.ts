"use server";

import { signOut } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const logout = async () => {
  await signOut();
  revalidatePath("/auth/login");
};
