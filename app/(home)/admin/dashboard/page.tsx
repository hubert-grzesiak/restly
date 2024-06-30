import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <main className="background-gradient w-full pt-100">
      <div className="mx-auto flex max-w-[200px] flex-col items-center justify-center rounded-xl bg-gray-100 p-4">
        <h1 className="text-lg font-bold">Dashboard</h1>

        <ul className="text-blue-500">
          <li>
            <Link className="hover:underline" href="/dashboard/facilities">
              Facilities
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/conversations">
              Conversations
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/properties">
              Your properties
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Page;
