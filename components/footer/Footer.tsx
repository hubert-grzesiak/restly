import { cn } from "@/lib/utils";
import Link from "next/link";

const Footer = ({ className }: { className?: string }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={cn("bg-transparent py-6 dark:bg-gray-950", className)}>
      <div className="mx-auto flex max-w-[1400px] flex-col-reverse px-2 md:flex-row md:items-center md:justify-between md:px-4">
        <p className="mt-2 pt-2 text-sm text-gray-500 dark:text-gray-400 md:pt-0">
          © {currentYear} Restly. All rights reserved.
        </p>
        <nav className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <Link className="text-sm hover:underline" href="/contact">
            Contact
          </Link>
          <Link className="text-sm hover:underline" href="/about-us">
            About Us
          </Link>
          <Link className="text-sm hover:underline" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="text-sm hover:underline" href="/terms-of-service">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
