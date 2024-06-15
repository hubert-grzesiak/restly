import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 dark:bg-gray-950">
      <div className="container flex flex-col-reverse items-center px-4 md:flex-row md:justify-between md:px-0">
        <p className="mt-2 px-4 text-sm text-gray-500 dark:text-gray-400">
          © 2024 Restly. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          <Link className="text-sm hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-sm hover:underline" href="#">
            Privacy Policy
          </Link>
          <Link className="text-sm hover:underline" href="#">
            About Us
          </Link>
          <Link className="text-sm hover:underline" href="#">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
