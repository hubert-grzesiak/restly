import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { StarIcon } from "@/components/icons";
const ProfileCard = () => {
  return (
    <header className="flex justify-between rounded-t-lg bg-muted px-4 py-8 sm:px-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-background">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <div className="text-xl font-semibold">John Doe</div>
          <div className="text-sm text-muted-foreground">
            Superhost · Joined in 2015
          </div>
          <div className="text-sm text-muted-foreground">
            I love hosting and meeting new people from around the world!
          </div>
        </div>
      </div>

      <div className="flex items-center gap-0.5 self-start">
        <StarIcon className="h-5 w-5 fill-orange-300" />
        4.9 (123 ratings)
      </div>
    </header>
  );
};

export default ProfileCard;
