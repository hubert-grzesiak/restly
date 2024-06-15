import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
      <h2>Quick Links</h2>

      <div className="bg-gray-100 rounded-xl p-4">
        <ul className="text-blue-500">
          <li>
            <Link className="hover:underline" href="/dashboard/facilities">
              Facilities
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/users">
              Users
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/profile/settings">
              Settings
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/profile/properties">
              Your properties
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
