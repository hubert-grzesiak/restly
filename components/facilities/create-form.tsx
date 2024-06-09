"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { createFacility } from "@/actions/admin";
import { useFormState } from "react-dom";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createFacility, initialState);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch();
      }}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Facility Name */}
        <div className="mb-4">
          <label
            htmlFor="facility-name"
            className="mb-2 block text-sm font-medium">
            Facility Name
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="facility-name"
              name="name"
              type="text"
              placeholder="Enter facility name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="facility-name-error"
              required
            />
          </div>

          <div id="facility-name-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.name &&
              state.errors?.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {state?.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/facilities"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button type="submit">Create Facility</Button>
      </div>
    </form>
  );
}
