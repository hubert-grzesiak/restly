"use client";
import { ReportReview } from "@/components/facilities/buttons";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "@prisma/client";

type StarIconProps = React.SVGProps<SVGSVGElement>;

export type UserReviewProps = {
  id: string;
  name?: string;
  rating: number;
  body: string;
  avatarSrc?: string;
  reviewId?: string;
  user: User;
};

const UserReview: React.FC<UserReviewProps> = ({
  user,
  rating,
  body,
  avatarSrc,
  id,
}) => {
  const userFromSession = useCurrentUser();

  const userId = userFromSession?.id;
  return (
    <div className="relative rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
      {user.shadowbanned && (
        <div className="absolute left-0 right-0 top-0 flex h-full w-full items-center justify-center rounded-t-lg bg-white/10 p-2 text-xs font-semibold text-black backdrop-blur-sm">
          Unfortunately your account is banned from adding reviews by the admin
          because it didnt meet the community guidelines. <br />
          Other users wont be able to see your reviews.
        </div>
      )}
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12 border">
          <AvatarImage alt={`@${user.name}`} src={avatarSrc} />
          <AvatarFallback>
            {user.name && user.name.length > 0
              ? user.name.charAt(0).toUpperCase()
              : ""}
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold md:text-base">
              {user.name}
            </div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 md:h-5 md:w-5 ${i < rating ? "fill-orange-400 text-orange-400" : "fill-muted stroke-muted-foreground"}`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs leading-loose text-gray-500 dark:text-gray-400 md:text-sm">
            {body}
          </p>
        </div>
      </div>
      {user.id != userId && (
        <div className="absolute right-4 top-4">
          <ReportReview reviewId={id!} />
        </div>
      )}
    </div>
  );
};

export default function Opinions({ reviews }: { reviews: UserReviewProps[] }) {
  console.log("reviews", reviews);
  return (
    <div className="mx-auto mt-20">
      <h2 className="mb-4 text-lg font-bold md:text-2xl">User Reviews</h2>
      <div className="grid gap-6">
        {reviews.map((review, index) => {
          return <UserReview key={index} {...review} />;
        })}
      </div>
    </div>
  );
}

const StarIcon: React.FC<StarIconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
