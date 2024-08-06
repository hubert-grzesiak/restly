import getAllProperties from "@/lib/actions/properties/getAllProperties";
import { Property } from "@prisma/client";
import MainSection from "@/components/sections/Main/MainSection";
export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}
export interface PropertyCustom extends Property {
  urls: string[];
  properties: Property;
  propertiesCount: number;
  numberOfReviews?: number;
  averageRating?: number;
  prices?: number;
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const parsedNumberOfGuests = searchParams.numberOfGuests
    ? JSON.parse(searchParams.numberOfGuests)
    : {};
  console.log("parsedNumberOfGuests", parsedNumberOfGuests);
  const currentPage = Number(searchParams?.page) || 1;
  const { propertiesWithReviews, propertiesCount } = await getAllProperties({
    searchQuery: searchParams.q,
    numberOfGuests: parsedNumberOfGuests,
    from: searchParams.from,
    to: searchParams.to,
    currentPage: currentPage,
  });

  return (
    <div className="relative pt-[6rem]">
      <MainSection
        properties={propertiesWithReviews}
        propertiesCount={propertiesCount}
      />
    </div>
  );
}
