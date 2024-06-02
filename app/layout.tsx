import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import NormalNavbar from "./components/navbar/normal-navbar";
import FloatingNav from "./components/navbar/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import ActiveStatus from "@/components/ActiveStatus";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Auth | NextJS",
  description: "Authentication using next-auth-v5",
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const navItems = [
    {
      name: "Profile",
      link: "/settings",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Users",
      link: "/users",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          {/* <Navbar /> */}
          <FloatingNav navItems={navItems} />
          <Toaster />
          <ActiveStatus />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
