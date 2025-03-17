"use server";

import { signOut } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const logout = async () => {
  await signOut();
  revalidatePath("/auth/login");
  redirect("/auth/login");
};
