const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-login flex h-full flex-1 items-center justify-center">
      {children}
    </main>
  );
};

export default ProfileLayout;
