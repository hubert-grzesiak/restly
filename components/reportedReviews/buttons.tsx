"use client";
import { Button } from "@/components/ui/button";

import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteFacility } from "@/lib/actions/admin/facilities";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import reportOpinion from "@/lib/actions/properties/reportOpinion";
import {
  banUser,
  deleteReportedReview,
} from "@/lib/actions/admin/reportedReviews";
export function CreateFacility() {
  return (
    <Link
      href="/admin/facilities/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Facility</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateFacility({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/facilities/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteFacility({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFacility(id);
      toast.success("Facility deleted successfully");
    } catch (error) {
      console.error("Failed to delete facility", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="rounded-md border bg-red-500 p-2 hover:bg-red-600">
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5 text-white" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure you want to delete this facility?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              facility.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 ${
                  isDeleting ? "opacity-50" : ""
                }`}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function ReportReview({ reviewId }: { reviewId: string }) {
  const [isReporting, setIsReporting] = useState(false);

  const handleReport = async () => {
    setIsReporting(true);
    try {
      await reportOpinion({ reviewId });
      toast.success("Review reported successfully");
    } catch (error) {
      console.error("Failed to report review", error);
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full" size="icon" variant="ghost">
              <MoveHorizontalIcon className="h-5 w-5" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure you want to report this opinion?
            </AlertDialogTitle>
            <AlertDialogDescription>
              If you are absolutely sure that this opinion may be harmful, you
              can click a red button to report it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <button
                onClick={handleReport}
                disabled={isReporting}
                className={`rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 ${
                  isReporting ? "opacity-50" : ""
                }`}
              >
                {isReporting ? "Reporting..." : "Report"}
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
type MoveHorizontalIconProps = React.SVGProps<SVGSVGElement>;

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

export function UpdateReviewStatus({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  return (
    <Link
      href={`/admin/reported-reviews/${id}/edit?userId=${userId}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteReview({
  reportedReviewId,
  reviewId,
}: {
  reportedReviewId: string;
  reviewId: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteReportedReview({ reportedReviewId, reviewId });
      toast.success("Review deleted successfully");
    } catch (error) {
      console.error("Failed to delete review", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="rounded-md border bg-red-500 p-2 hover:bg-red-600">
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5 text-white" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure you want to delete this review?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              review.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 ${
                  isDeleting ? "opacity-50" : ""
                }`}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function BanUser({
  userId,
  reviewId,
}: {
  userId: string;
  reviewId: string;
}) {
  const [isBanning, setIsBanning] = useState(false);

  const handleBan = async () => {
    setIsBanning(true);
    try {
      await banUser({ userId, reviewId: reviewId });
      toast.success("User banned successfully");
    } catch (error) {
      console.error("Failed to ban the user", error);
    } finally {
      setIsBanning(false);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="rounded-md border bg-red-900 p-2 hover:bg-red-800">
            <span className="sr-only">Ban</span>
            <NoSymbolIcon className="w-5 text-white" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure you want to ban this user?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently ban this user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <button
                onClick={handleBan}
                disabled={isBanning}
                className={`rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 ${
                  isBanning ? "opacity-50" : ""
                }`}
              >
                {isBanning ? "Banning..." : "Ban"}
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
