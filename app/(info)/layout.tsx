const InfoLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="mb-10 mt-[100px]">
      <div className="mx-auto max-w-[1400px] px-4 md:px-2">{children}</div>
    </article>
  );
};

export default InfoLayout;
