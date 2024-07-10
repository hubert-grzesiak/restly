const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-login flex h-full items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;
