"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MyLogo } from "../icons";
import { LogoutButton } from "@/components/auth/logout-button";
import LoginButton from "@/components/auth/login-button";

import { useCurrentUser } from "@/hooks/use-current-user";
import { IconExclamationMark, IconPlus } from "@tabler/icons-react";

const bounceTransition = {
  type: "spring",
  stiffness: 500,
  damping: 20,
};
interface NavItem {
  name: string;
  link: string;
  icon?: JSX.Element;
}
const FloatingNav = ({
  navItems,
  ref,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [shrink, setShrink] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() > 0.05 && direction !== 1) {
        setShrink(false);
      } else {
        setShrink(false);
      }
    }
  });
  const user = useCurrentUser();
  console.log("user role", user?.role);
  return (
    <AnimatePresence mode="wait">
      <nav className={cn("fixed top-0 z-[999] h-[84.8px] w-full bg-white")}>
        <motion.div
          ref={ref}
          initial={{
            opacity: 1,
            y: 0,
          }}
          transition={shrink ? { duration: 0.2 } : { ...bounceTransition }}
          className={cn(
            "fixed inset-x-0 z-[10] mx-auto flex border border-transparent bg-transparent px-2 py-2 dark:border-white/[0.2] dark:bg-black md:px-4",
            className,
            shrink
              ? "top-5 max-w-fit items-center justify-center rounded-full bg-[rgba(255,255,255,0.95)] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop:blur-lg"
              : "border-r-none border-l-none w-full max-w-[1400px] justify-between rounded-none",
          )}
        >
          {shrink === false && (
            <Link className="flex items-center gap-2" href="/">
              <MyLogo className="h-10 w-10" />
              <span className="hidden text-lg font-bold md:block">Restly</span>
            </Link>
          )}

          <div className={cn("flex items-center space-x-4")}>
            {user?.role === "ADMIN" && (
              <>
                <Link
                  key={`link=admin`}
                  href={"/admin/reported-reviews"}
                  className={cn(
                    "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
                  )}
                >
                  <span className="block sm:hidden">
                    <IconExclamationMark />
                  </span>
                  <span className="hidden text-sm sm:block">
                    Reported reviews
                  </span>
                </Link>
                <Link
                  key={`link=facilities`}
                  href={"/admin/facilities"}
                  className={cn(
                    "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
                  )}
                >
                  <span className="block sm:hidden">
                    <IconPlus />
                  </span>
                  <span className="hidden text-sm sm:block">Facilities</span>
                </Link>
              </>
            )}
            {navItems.map((navItem: NavItem, idx: number) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                  "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden text-sm sm:block">{navItem.name}</span>
              </Link>
            ))}
            {shrink === false && (
              <>
                <div className="text-sm md:hidden">
                  {user != null ? (
                    <LogoutButton>Logout</LogoutButton>
                  ) : (
                    <LoginButton>Login</LoginButton>
                  )}
                </div>
                <div className="relative hidden rounded-full border border-neutral-200 px-2 py-1 text-xs font-medium text-black dark:border-white/[0.2] dark:text-white md:block md:px-4 md:py-2 md:text-sm">
                  {user != null ? (
                    <LogoutButton>Logout</LogoutButton>
                  ) : (
                    <LoginButton>Login</LoginButton>
                  )}
                  <span className="absolute inset-x-0 -bottom-px mx-auto hidden h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent md:block" />
                </div>
              </>
            )}
          </div>
        </motion.div>
      </nav>
    </AnimatePresence>
  );
};

export default FloatingNav;
