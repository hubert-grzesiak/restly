const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="background-login flex h-full items-center justify-center flex-1">
      {children}
    </div>
  );
};

export default AuthLayout;
