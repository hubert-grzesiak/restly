"use client";

import { logout } from "@/lib/actions/auth/logout";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();

  const onClick = async () => {
    await logout();
    // router.push("/auth/login");
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
