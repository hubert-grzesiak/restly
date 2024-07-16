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
  const [visible, setVisible] = useState(true);
  const [shrink, setShrink] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < -0.05) {
        setVisible(false);
      } else {
        if (direction < 0 || direction === 1) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
      // Set shrink state based on the scroll position
      if (scrollYProgress.get() > 0.05 && direction !== 1) {
        setShrink(false);
      } else {
        setShrink(false);
      }
    }
  });
  const user = useCurrentUser();
  return (
    <AnimatePresence mode="wait">
      <div className={cn("fixed top-0 z-[999] h-[62px] w-full bg-transparent")}>
        <motion.div
          ref={ref}
          initial={{
            opacity: 1,
            y: 0,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
            paddingLeft: shrink ? "16px" : "0px",
            paddingRight: shrink ? "16px" : "0px",
            transition: { ...bounceTransition },
          }}
          transition={shrink ? { duration: 0.2 } : { ...bounceTransition }}
          className={cn(
            "fixed inset-x-0 z-[10] mx-auto flex border border-transparent bg-transparent py-2 dark:border-white/[0.2] dark:bg-black",
            className,
            shrink
              ? "top-5 max-w-fit items-center justify-center rounded-full bg-[rgba(255,255,255,0.95)] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop:blur-lg"
              : "border-r-none border-l-none w-full max-w-[1400px] justify-between rounded-none",
          )}
        >
          {shrink === false && (
            <Link className="flex items-center gap-2" href="/">
              <MyLogo className="h-10 w-10" />
              <span className="text-lg font-bold">Restly</span>
            </Link>
          )}

          <div className={cn("flex space-x-4")}>
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
              <div className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white">
                {user != null ? (
                  <LogoutButton>Logout</LogoutButton>
                ) : (
                  <LoginButton>Login</LoginButton>
                )}
                <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FloatingNav;
