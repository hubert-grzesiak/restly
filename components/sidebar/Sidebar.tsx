import { currentUser } from "@/lib/actualUserInfo";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const actualUser = await currentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={actualUser!} />
      <MobileFooter currentUser={actualUser!} />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
