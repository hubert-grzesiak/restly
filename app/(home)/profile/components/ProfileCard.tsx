import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { StarIcon } from "@/components/icons";
import getReviewsSummaryForUser from "@/lib/actions/properties/getNumberOfReviewsForProperty";
import { auth } from "@/lib/auth";

const ProfileCard = async () => {
  const session = await auth();
  const fallbackName = session?.user?.name ?? "";
  const initials = fallbackName
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("");
  const { numberOfReviews, averageRating } = await getReviewsSummaryForUser();
  return (
    <header className="flex justify-between rounded-t-lg bg-muted px-4 py-8 sm:px-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-background">
          <AvatarImage src={session?.user?.image ?? ""} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <div className="text-xl font-semibold">
            {session?.user?.name || ""}
          </div>
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
        {averageRating} ({numberOfReviews})
      </div>
    </header>
  );
};

export default ProfileCard;
