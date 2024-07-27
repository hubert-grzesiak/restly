import { Button } from "@/components/ui/button";

import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

import { ReportReview } from "@/components/facilities/buttons";

type MoveHorizontalIconProps = React.SVGProps<SVGSVGElement>;

const OpinionDropdown = ({ reviewId }: { reviewId: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" size="icon" variant="ghost">
          <MoveHorizontalIcon className="h-5 w-5" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <ReportReview id={reviewId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OpinionDropdown;

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
