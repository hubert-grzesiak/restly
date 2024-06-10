interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div
      className="
        h-full w-full flex flex-col gap-y-10 items-center justify-center 
        bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] max-w-[1000px] mx-auto mt-10 px-4
    ">
      {children}
    </div>
  );
};

export default ProtectedLayout;
