import { auth } from "@/lib/auth";
import getVisitedProperties from "@/lib/actions/getVisitedProperties";
import VisitedTab from "../components/tabs/VisitedTab";
import Image from "next/image";
import Button from "@/components/Button";
import { SearchParamsProps } from "@/app/page";
import SimpleSearchbar from "@/components/searchbar/SimpleSearchbar";
import Pagination from "@/components/facilities/pagination";

export default async function page({ searchParams }: SearchParamsProps) {
  const session = await auth();
  const userId = session?.user.id ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const { visitedProperties, totalCount } = await getVisitedProperties({
    userId: session?.user.id ?? "",
    currentPage: currentPage,
    searchQuery: searchParams.q,
  });
  const totalPages = Math.ceil(totalCount / 2);

  return (
    <div className="mx-auto w-full max-w-5xl rounded-xl bg-white/80 backdrop-blur-[15px]">
      {visitedProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <Image
            src="https://res.cloudinary.com/dev6yhoh3/image/upload/v1721144595/restly/states/no-visited-state_ufbavt.png"
            alt="No visited properties"
            height={300}
            width={300}
          />
          <Button className="mb-6 mt-2" href="/">
            Book first property!
          </Button>
        </div>
      ) : (
        <div className="px-4 pb-6">
          <SimpleSearchbar route="/profile/visited" className="px-2" />

          {visitedProperties?.map((property) => (
            <VisitedTab key={property.id} property={property} userId={userId} />
          ))}
          {visitedProperties.length > 0 && (
            <div className="mt-5 flex w-full justify-center px-6 pb-6">
              <Pagination totalPages={totalPages} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
