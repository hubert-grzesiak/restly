"use client";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteFacility } from "@/lib/actions/admin";
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
