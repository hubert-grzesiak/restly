"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
const TabsNav = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
      <Link
        href="/profile"
        className="tab-button"
        data-state={pathname === "/profile" && `active`}
      >
        Your properties
      </Link>
      <Link
        href="/profile/favourites"
        className="tab-button"
        data-state={pathname === "/profile/favourites" && `active`}
      >
        Favourites
      </Link>
      <Link
        href="/profile/visited"
        className="tab-button"
        data-state={pathname === "/profile/visited" && `active`}
      >
        Visited
      </Link>
      <Link
        href="/profile/settings"
        className="tab-button"
        data-state={pathname === "/profile/settings" && `active`}
      >
        Settings
      </Link>
    </div>
  );
};

export default TabsNav;
