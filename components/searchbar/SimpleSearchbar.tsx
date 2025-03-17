"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const SimpleSearchbar = ({
  route,
  className,
}: {
  route: string;
  className?: string;
}) => {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    if (query) {
      searchParams.set("q", query);
    }

    const newUrl = `${route}?${searchParams.toString()}`;
    router.push(newUrl, { scroll: false });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={cn("flex w-full justify-end px-6 pt-6", className)}>
      <div className="relative flex max-w-[400px] items-center justify-center">
        <Input
          type="text"
          className="pr-[52px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
        />

        <div className="absolute right-1 flex items-center justify-center bg-white">
          <button className="px-4" onClick={handleSearch}>
            <div className="rounded-full">
              <MagnifyingGlassIcon className="h-5 w-5 text-black" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleSearchbar;
