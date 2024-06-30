"use client";

import { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi";
import Link from "next/link";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Avatar from "@/components/Avatar";
import AvatarGroup from "@/components/AvatarGroup";
import useActiveList from "@/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email || "") !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation.isGroup, conversation.users.length, isActive]);

  return (
    <div className="dark:bg-dusk dark:border-lightgray flex w-full translate-y-[6px] items-center justify-between border-b-[1px] bg-white px-4 py-3 shadow-sm sm:px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Link
          href="/conversations"
          className="block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden"
        >
          <HiChevronLeft size={32} />
        </Link>
        {conversation.isGroup ? (
          <AvatarGroup users={conversation.users} />
        ) : (
          <Avatar user={otherUser} />
        )}

        <div className="flex flex-col dark:text-gray-200">
          <div>{conversation.name || otherUser?.name || "Unknown User"}</div>
          <div className="text-sm font-light text-neutral-500 dark:text-gray-400">
            {statusText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
