import ProfileCard from "./components/ProfileCard";
import TabsNav from "./components/tabs/TabsNav";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-login flex h-full flex-1 items-center justify-center">
      <div className="mx-auto w-full max-w-5xl rounded-xl bg-white/80 backdrop-blur-[15px]">
        <ProfileCard />
        <TabsNav />
        {children}
      </div>
    </main>
  );
};

export default ProfileLayout;
