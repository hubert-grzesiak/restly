import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

type StarIconProps = React.SVGProps<SVGSVGElement>;

type MoveHorizontalIconProps = React.SVGProps<SVGSVGElement>;

type UserReviewProps = {
  name: string;
  rating: number;
  body: string;
  avatarSrc?: string;
};

const UserReview: React.FC<UserReviewProps> = ({
  name,
  rating,
  body,
  avatarSrc,
}) => (
  <div className="relative rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
    <div className="flex items-start gap-4">
      <Avatar className="h-12 w-12 border">
        <AvatarImage
          alt={`@${name}`}
          src={avatarSrc || "/placeholder-user.jpg"}
        />
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <div className="font-semibold">{name}</div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${i < rating ? "fill-orange-400 text-orange-400" : "fill-muted stroke-muted-foreground"}`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm leading-loose text-gray-500 dark:text-gray-400">
          {body}
        </p>
      </div>
    </div>
    <div className="absolute right-4 top-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full" size="icon" variant="ghost">
            <MoveHorizontalIcon className="h-5 w-5" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);

export default function Opinions({ reviews, name, avatarSrc }) {
  return (
    <div className="mx-auto mt-20">
      <h2 className="mb-4 text-2xl font-bold">User Reviews</h2>
      <div className="grid gap-6">
        {reviews.map((review, index) => {
          console.log("review: ", review);
          return (
            <UserReview
              key={index}
              name={review.user.name}
              rating={review.rating}
              body={review.body}
              avatarSrc={review.user.image}
            />
          );
        })}
      </div>
    </div>
  );
}

const MoveHorizontalIcon: React.FC<MoveHorizontalIconProps> = (props) => (
  <svg
    {...props}
    width="25px"
    height="25px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
    className="bi bi-three-dots-vertical"
  >
    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
  </svg>
);

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
