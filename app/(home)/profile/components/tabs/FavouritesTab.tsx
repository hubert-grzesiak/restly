import getFavouritesInfo from "@/lib/actions/properties/getFavouritesInfo";
import PropertyCard from "../PropertyCard";
import Image from "next/image";
import Button from "@/components/Button";
import { SearchParamsProps } from "@/app/page";
import { Property, Image as PropertyImage, Facility } from "@prisma/client";
import getPropertiesInfo from "@/lib/actions/properties/getPropertiesInfo";

import Pagination from "@/components/facilities/pagination";
import SimpleSearchbar from "@/components/searchbar/SimpleSearchbar";

export interface PropertyWithUrls extends Property {
  images: PropertyImage[];
  facility?: Facility[];
  urls: string[];
}
async function FavouritesTab({ searchParams }: SearchParamsProps) {
  console.log("searchParams", searchParams);
  const currentPage = Number(searchParams?.page) || 1;

  const { propertiesWithUrls, favouritesCount } = await getFavouritesInfo({
    currentPage: currentPage,
    searchQuery: searchParams?.q,
  });
  const totalPages = Math.ceil(favouritesCount / 9);

  return (
    <>
      <SimpleSearchbar route="/profile/favourites" />
      <div className="grid gap-4 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {propertiesWithUrls.length === 0 ? (
            <div className="col-span-3 mx-auto flex flex-col items-center justify-center">
              <Image
                src="https://res.cloudinary.com/dev6yhoh3/image/upload/v1721147685/restly/states/no_fav_yet-removebg-preview_1_f6axwa.png"
                alt="No visited properties"
                height={280}
                width={280}
              />
              <Button className="mt-2" href="/">
                Go, add some properties!
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

export default FavouritesTab;
