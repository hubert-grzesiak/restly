import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRUD | Banned users",
  description: "A platform for booking and hosting stays around the world.",
  icons: {
    icon: "/public/favicon-32x32.png",
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto w-full max-w-[1400px] pt-10">{children}</div>;
}
