"use server";

import { signOut } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { Router } from "next/router";

export const logout = async () => {
 

  // some server stuff
  await signOut();
  revalidatePath("/auth/login");
};
