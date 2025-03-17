import Pagination from "@/components/facilities/pagination";
import Search from "@/components/ui/search";
import { FacilitiesTableSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import Table from "@/components/bannedUsers/table";
import { getBannedUsersAmount } from "@/lib/actions/admin/bannedUsers";

export const metadata: Metadata = {
  title: "Banned users",
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

  const totalPagesResult = await getBannedUsersAmount();

  if (typeof totalPagesResult === "object" && "error" in totalPagesResult) {
    console.error(totalPagesResult.error);
    return (
      <div className="mx-auto w-full max-w-[1000px]">
        <h1 className="text-2xl">Banned users</h1>
        <p>Error loading users: {totalPagesResult.error}</p>
      </div>
    );
  }

  const totalPages = Math.ceil(totalPagesResult / 6);

  return (
    <div className="mx-auto mt-4 w-full max-w-[1400px]">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Banned users</h1>
      </div>
      {}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Banned Users..." />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<FacilitiesTableSkeleton />}
      >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
