"use client";

import { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Avatar from "@/components/Avatar";
import useActiveList from "@/hooks/useActiveList";
import Image from "next/image";
import Link from "next/link";
interface HeaderProps {
  conversation: Conversation & {
    users: User[];
    property: {
      id: string;
      name: string;
      city: string;
      images: {
        urls: string[];
      }[];
    };
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  console.log("conversation", conversation);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email || "") !== -1;

  const statusText = useMemo(() => {
    return isActive ? "Active" : "Offline";
  }, [isActive]);

  const property = conversation.property || {};
  const images = property.images || [];
  const imageUrl =
    images.length > 0 ? images[0].urls[0] : "/path/to/default/image.jpg";

  return (
    <div className="dark:bg-dusk dark:border-lightgray flex w-full translate-y-[6px] items-center justify-between rounded-xl border-b-[3px] bg-white px-4 py-3 shadow-2xl sm:px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Link
          href="/conversations"
          className="block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden"
        >
          <HiChevronLeft size={32} />
        </Link>

        <Avatar user={otherUser} />

        <div className="flex flex-col dark:text-gray-200">
          <div>{conversation.name || otherUser?.name || "Unknown User"}</div>
          <div className="text-sm font-light text-neutral-500 dark:text-gray-400">
            {statusText}
          </div>
        </div>
      </div>
      <Link
        href={`/properties/${property.id}`}
        className="flex flex-col-reverse items-center gap-2 justify-self-end border-l px-4 py-2 md:flex-row"
      >
        <div>
          <p className="text-sm md:text-base">{property.name}</p>
          <p className="text-sm md:text-base">{property.city}</p>
        </div>
        <Image
          src={imageUrl}
          alt={property.name || "Property Image"}
          className="h-[40px] w-[80px] rounded-lg object-cover md:h-[80px] md:w-[150px]"
          width={150}
          height={1}
        />
      </Link>
    </div>
  );
};

export default Header;
