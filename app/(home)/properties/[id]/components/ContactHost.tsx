"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Button as NextUIButton, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SendIcon } from "@/components/icons";
import { IconMessage } from "@tabler/icons-react";

const ContactHost = ({
  ownerId,
  propertyId,
  variant,
  contactGuest,
}: {
  ownerId: string;
  propertyId: string;
  variant?: "small";
  contactGuest?: boolean;
}) => {
  const router = useRouter();

  const handleClick = useCallback(async () => {
    try {
      const response = await axios.post("/api/conversations", {
        userId: ownerId,
        propertyId,
      });
      console.log("Conversation created:", response.data);
      await router.push(`/conversations/${response.data.id}`);
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  }, [ownerId, propertyId, router]);

  return contactGuest ? (
    <Tooltip content={"Go to chat"} showArrow={true} delay={0}>
      <NextUIButton
        onClick={handleClick}
        isIconOnly
        size="sm"
        variant="flat"
        className="bg-blue-50 text-blue-400"
      >
        <IconMessage />
      </NextUIButton>
    </Tooltip>
  ) : (
    <Button variant={"outline"} onClick={handleClick}>
      <div className="flex items-center justify-center gap-2">
        <SendIcon className="h-4 w-4 md:h-5 md:w-5" />
        {variant != "small" && <span>Contact Host</span>}
      </div>
    </Button>
  );
};

export default ContactHost;
