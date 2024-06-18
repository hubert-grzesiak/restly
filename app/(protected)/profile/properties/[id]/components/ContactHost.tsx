"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React from "react";
import { SendIcon } from "@/components/icons";

const ContactHost = ({ ownerId }: {ownerId: string}) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    axios
      .post("/api/conversations", { userId: ownerId })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      });
  }, [ownerId, router]);
  return (
    <Button variant={"outline"} onClick={handleClick}>
      <Link
        className="flex gap-2 items-center justify-center"
        href={`/conversations/${ownerId}`}>
        <SendIcon />
        <span>Contact Host</span>
      </Link>
    </Button>
  );
};

export default ContactHost;
