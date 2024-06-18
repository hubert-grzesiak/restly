import Pagination from "@/components/facilities/pagination";
import Search from "@/components/ui/search";
import Table from "@/components/facilities/table";
import { FacilitiesTableSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";
import { getFacilitiesAmount } from "@/lib/actions/admin";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Facilities",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPagesResult = await getFacilitiesAmount();

  if (typeof totalPagesResult === "object" && "error" in totalPagesResult) {
    // Handle error case
    console.error(totalPagesResult.error);
    return (
      <div className="w-full">
        <h1 className="text-2xl">Facilities</h1>
        <p>Error loading facilities: {totalPagesResult.error}</p>
      </div>
    );
  }

  const totalPages = Math.ceil(totalPagesResult / 6);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Facilities</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Facilities..." />
        <Link
          href="/dashboard/facilities/create"
          className="bg-green-500 rounded-md px-4 py-2 text-white font-bold">
          Create facility
        </Link>
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<FacilitiesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
