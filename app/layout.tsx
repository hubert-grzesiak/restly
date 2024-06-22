import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import FloatingNav from "@/components/navbar/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import ActiveStatus from "@/components/ActiveStatus";
import { NextUIProvider } from "@nextui-org/react";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restly",
  description: "A platform for booking and hosting stays around the world.",
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
      link: "/profile",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Conversations",
      link: "/conversations",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Become a host",
      link: "/become-a-host",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Favourites",
      link: "/profile/favourites",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${inter.className} min-h-screen`}>
          {/* <Navbar /> */}
          <NextUIProvider>
            <FloatingNav navItems={navItems} />
            <Toaster />
            <ActiveStatus />
            {children}

            <Footer />
          </NextUIProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
