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
        setShrink(true);
      } else {
        setShrink(false);
      }
    }
  });
  const user = useCurrentUser();
  return (
    <AnimatePresence mode="wait">
      <div className={cn("w-full bg-transparent h-[62px] z-[999] fixed top-0")}>
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
            "flex fixed inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] dark:bg-black bg-transparent z-[10] py-2",
            className,
            shrink
              ? "max-w-fit rounded-full top-5 bg-[rgba(255,255,255,0.95)] backdrop:blur-lg items-center justify-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
              : "w-full max-w-[1400px] rounded-none border-r-none border-l-none justify-between"
          )}>
          {shrink === false && (
            <Link className="flex items-center gap-2" href="/">
              <MyLogo className="h-10 w-10" />
              <span className="text-lg font-bold">Restly</span>
            </Link>
          )}

          <div className={cn("flex space-x-4 ")}>
            {navItems.map((navItem: NavItem, idx: number) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                  "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                )}>
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block text-sm">{navItem.name}</span>
              </Link>
            ))}
            {shrink === false && (
              <div className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
                {user != null ? (
                  <LogoutButton>Logout</LogoutButton>
                ) : (
                  <LoginButton>Login</LoginButton>
                )}
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FloatingNav;
