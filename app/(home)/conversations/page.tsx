"use client";

import clsx from "clsx";

import EmptyState from "@/components/EmptyState";
import useConversation from "@/hooks/useConversation";

const Home = () => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx(
        "custom-height h-full w-full flex-1 lg:block",
        isOpen ? "block" : "hidden",
      )}
    >
      <EmptyState />
    </div>
  );
};

export default Home;
