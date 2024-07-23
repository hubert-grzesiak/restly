import getAllProperties from "@/lib/actions/properties/getAllProperties";
import { Property } from "@prisma/client";
import MainSection from "@/components/sections/Main/MainSection";
import Searchbar from "@/components/searchbar/Searchbar";

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}
export interface PropertyCustom extends Property {
  urls: string[];
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const parsedNumberOfGuests = searchParams.numberOfGuests
    ? JSON.parse(searchParams.numberOfGuests)
    : {};
  console.log("parsedNumberOfGuests", parsedNumberOfGuests);

  const properties = await getAllProperties({
    searchQuery: searchParams.q,
    numberOfGuests: parsedNumberOfGuests,
    from: searchParams.from,
    to: searchParams.to,
  });
  return (
    <div className="relative pt-[6rem]">
      <MainSection properties={properties} />
    </div>
  );
}
