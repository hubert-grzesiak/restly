import getAllProperties from "@/lib/actions/properties/getAllProperties";
import MainSection from "@/components/sections/Main/MainSection";
import { PropertyInterface } from "@/components/sections/Main/components/MainMap";
export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}
export interface PropertyCustom {
  id?: string;
  urls?: string[];
  properties: PropertyInterface[];
  propertiesCount: number;
  numberOfReviews?: number;
  averageRating?: number;
  prices?: { from: string; to: string; price: number }[];
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
