"use client";

import { UserRole } from "@prisma/client";

import useRoutes from "@/hooks/useRoutes";
import ThemeToggle from "../theme/ThemeToggle";
import DesktopItem from "./DesktopItem";
import ProfileItem from "./ProfileItem";

interface DesktopSidebarProps {
  currentUser: {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  };
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();

  return (
    <>
      <div className="dark:bg-dusk dark:border-lightgray mt-[74px] hidden justify-between lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-20 lg:flex-col lg:overflow-y-auto lg:border-r-[1px] lg:bg-white lg:pb-4 xl:px-6">
        <nav className="flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col items-center justify-between">
          <ThemeToggle />
          <ProfileItem currentUser={currentUser} />
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
