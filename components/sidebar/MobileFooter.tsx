"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import { UserRole } from "@prisma/client";

import ThemeToggle from "../theme/ThemeToggle";
import MobileItem from "./MobileItem";
import MobileLink from "./MobileLink";
import ProfileItem from "./ProfileItem";

interface MobileFooterProps {
  currentUser: {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  };
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <>
      <div className="dark:bg-dusk dark:border-lightgray fixed bottom-0 z-40 flex w-full items-center justify-between border-t-[1px] bg-white lg:hidden">
        {routes.map((route) => (
          <MobileLink
            key={route.href}
            href={route.href}
            active={route.active}
            icon={route.icon}
            onClick={route.onClick}
          />
        ))}
        <MobileItem>
          <ThemeToggle />
        </MobileItem>
        <MobileItem>
          <ProfileItem currentUser={currentUser} />
        </MobileItem>
      </div>
    </>
  );
};

export default MobileFooter;
