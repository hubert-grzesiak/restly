import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-2">
      <Link href="/profile/properties">Properties</Link>
      <Link href="/profile/settings">Settings</Link>
    </div>
  );
};

export default page;
