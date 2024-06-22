import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRUD | Facilities",
  description: "A platform for booking and hosting stays around the world.",
  icons: {
    icon: "/icon.png",
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full mx-auto max-w-[1400px] pt-10">{children}</div>;
}
