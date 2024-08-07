"use client";
import { Button } from "@/components/ui/button";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
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
import { deleteProperty } from "@/lib/actions/properties/deleteProperty";
import { useRouter } from "next/navigation";
import { restoreProperty } from "@/lib/actions/properties/restoreProperty";
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
      // Możesz dodać tutaj dowolną logikę, np. przekierowanie po pomyślnym usunięciu
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
              <div className="h-4 w-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:md:h-5 [&>svg]:md:w-5">
                <MoveHorizontalIcon />
              </div>
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

export function DeleteProperty({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProperty(id);
      router.push("/profile");
      toast.success("Property deleted successfully");
    } catch (error) {
      console.error("Failed to delete property", error);
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
              Are you absolutely sure you want to delete this property?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete this property.
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
export function RestoreProperty({ id }: { id: string }) {
  const [isRestoring, setIsRestoring] = useState(false);
  const handleRestore = async () => {
    setIsRestoring(true);
    try {
      await restoreProperty(id);
      toast.success("Property restored successfully");
    } catch (error) {
      console.error("Failed to restore property", error);
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"outline"}>Restore</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure you want to restore this property?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Property will be restored and visible to other users.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <button
                onClick={handleRestore}
                disabled={isRestoring}
                className={`rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 ${
                  isRestoring ? "opacity-50" : ""
                }`}
              >
                {isRestoring ? "Restoring..." : "Restore"}
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
