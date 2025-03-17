"use client";

import { logout } from "@/lib/actions/auth/logout";
interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = async () => {
    await logout();
  };

  return (
    <span
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center"
    >
      {children}
    </span>
  );
};
