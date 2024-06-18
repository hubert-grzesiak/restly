"use client";

import { logout } from "@/lib/actions/auth/logout";
interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {

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
