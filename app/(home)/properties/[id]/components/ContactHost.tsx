"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SendIcon } from "@/components/icons";

const ContactHost = ({
  ownerId,
  propertyId,
  variant,
}: {
  ownerId: string;
  propertyId: string;
  variant?: "small";
}) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    axios
      .post("/api/conversations", { userId: ownerId, propertyId })
      .then((response) => {
        console.log("Conversation created:", response.data);
        router.push(`/conversations/${response.data.id}`);
      })
      .catch((error) => {
        console.error("Failed to create conversation:", error);
        // Consider showing a user-friendly message or handling the error in the UI
      });
  }, [ownerId, propertyId, router]);

  return (
    <Button variant={"outline"} onClick={handleClick}>
      <div className="flex items-center justify-center gap-2">
        <SendIcon className="h-4 w-4 md:h-5 md:w-5" />
        {variant != "small" && <span>Contact Host</span>}
      </div>
    </Button>
  );
};

export default ContactHost;
