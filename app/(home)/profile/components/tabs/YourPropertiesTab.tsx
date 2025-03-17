import { Property, Image as PropertyImage, Facility } from "@prisma/client";
import getPropertiesInfo from "@/lib/actions/properties/getPropertiesInfo";
import PropertyCard from "../PropertyCard";
import Button from "@/components/Button";
import Pagination from "@/components/facilities/pagination";
import SimpleSearchbar from "@/components/searchbar/SimpleSearchbar";
import { SearchParamsProps } from "@/app/page";

export interface PropertyWithUrls extends Property {
  images: PropertyImage[];
  facility?: Facility[];
  urls: string[];
}
async function YourPropertiesTab({ searchParams }: SearchParamsProps) {
  const currentPage = Number(searchParams?.page) || 1;

  const { propertiesWithUrls, propertiesCount } = await getPropertiesInfo({
    softDeleted: false,
    currentPage: currentPage,
    searchQuery: searchParams?.q,
  });
  const totalPages = Math.ceil(propertiesCount / 9);

  return (
    <>
      <SimpleSearchbar route="/profile/favourites" />
      <div className="grid gap-4 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {propertiesWithUrls.length === 0 ? (
            <div className="col-span-3 mx-auto flex flex-col items-center justify-center">
              <h1>No properties yet</h1>
              <Button className="mb-6 mt-2" href="/become-a-host">
                Become a host!
              </Button>
            </div>
          ) : (
            <>
              {propertiesWithUrls?.map((property: PropertyWithUrls) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </>
          )}
        </div>
      </div>
      {propertiesWithUrls.length > 0 && (
        <div className="mt-5 flex w-full justify-center px-6 pb-6">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
}

export default YourPropertiesTab;
