"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IconSearch } from "@tabler/icons-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const CustomSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isExpanded) {
      console.log("Submit search");
    } else {
      setIsExpanded(true);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div
      ref={containerRef}
      className="bg-black rounded-[32px] overflow-hidden h-[36px] items-center justify-center flex">
      <motion.div
        className={cn(
          "flex items-center justify-between  rounded-full ml-0",
          isExpanded ? "pr-3" : "p-2"
        )}
        onClick={() => setIsExpanded(true)}
        animate={{ width: isExpanded ? 300 : 36, height: 36 }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 23,
        }}>
        {isExpanded && (
          <Input
            className="bg-white flex-grow text-black outline-none"
            autoFocus
            placeholder="Search..."
          />
        )}
        <IconSearch
          onClick={handleSearchClick}
          className={cn(
            isExpanded ? "ml-2" : "ml-0",
            "hover:cursor-pointer text-white"
          )}
        />
      </motion.div>
    </div>
  );
};

export default CustomSearch;
