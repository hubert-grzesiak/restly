import ProfileCard from "./components/ProfileCard";
import TabsNav from "./components/tabs/TabsNav";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-login flex h-full flex-1 items-center justify-center">
      <div className="mx-2 w-full max-w-5xl rounded-xl bg-white/80 backdrop-blur-[15px] sm:mx-3 md:mx-4">
        <ProfileCard />
        <TabsNav />
        {children}
      </div>
    </main>
  );
};

export default ProfileLayout;
