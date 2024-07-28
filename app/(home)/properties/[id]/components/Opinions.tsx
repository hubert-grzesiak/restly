import { ReportReview } from "@/components/facilities/buttons";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

type StarIconProps = React.SVGProps<SVGSVGElement>;

type UserReviewProps = {
  name: string;
  rating: number;
  body: string;
  avatarSrc?: string;
  reviewId: string;
};

const UserReview: React.FC<UserReviewProps> = ({
  name,
  rating,
  body,
  avatarSrc,
  reviewId,
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
      <ReportReview reviewId={reviewId} />
    </div>
  </div>
);

export default function Opinions({ reviews }) {
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
              reviewId={review.id}
            />
          );
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
