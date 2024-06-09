import Link from "next/link";
import React from "react";
import { MyLogo } from "../icons";

const NormalNavbar = ({ id }: { id: string }) => {
  return (
    <header
      className="z-999 m-auto flex w-full max-w-[1400px] items-center justify-between border-b bg-white px-4 py-3  dark:border-gray-800 dark:bg-gray-950 md:px-0"
      id={id}>
      <Link className="flex items-center gap-2" href="/">
        <MyLogo className="h-10 w-10" />
        <span className="text-lg font-bold">Restly</span>
      </Link>
      <nav className="flex items-center gap-4">
        <Link className="text-sm font-medium hover:underline" href="/settings">
          Profile
        </Link>
        <Link className="text-sm font-medium hover:underline" href="/users">
          Chat
        </Link>
        <Link
          className="text-sm font-medium hover:underline"
          href="/auth/login">
          Log in
        </Link>
      </nav>
    </header>
  );
};

export default NormalNavbar;
