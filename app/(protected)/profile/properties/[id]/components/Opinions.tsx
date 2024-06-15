import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

export default function Opinions() {
  return (
    <>
      <div className="mx-auto mt-20">
        <h2 className="mb-4 text-2xl font-bold">User Reviews</h2>
        <div className="grid gap-6">
          <div className="relative rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 border">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">John Doe</div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <p className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                  The Oceanfront Retreat in Maui was an absolute dream! The
                  villa was stunning, with breathtaking views of the ocean and
                  lush tropical surroundings. The staff was incredibly attentive
                  and made our stay truly unforgettable. I would highly
                  recommend this property to anyone looking for a luxurious and
                  relaxing Hawaiian getaway.
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
          <div className="relative rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 border">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">Sarah Miller</div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <p className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                  Our stay at the Oceanfront Retreat was nothing short of
                  amazing. The villa was impeccably clean, the amenities were
                  top-notch, and the views were simply breathtaking. The staff
                  went above and beyond to ensure our comfort and satisfaction.
                  I would give this property 6 stars if I could!
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
        </div>
      </div>
    </>
  );
}

function MoveHorizontalIcon(props) {
  return (
    <svg
      {...props}
      width="50px"
      height="50px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      class="bi bi-three-dots-vertical">
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    </svg>
  );
}

function StarIcon(props) {
  return (
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
      strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
