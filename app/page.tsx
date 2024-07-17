import getAllProperties from "@/lib/actions/properties/getAllProperties";
import CustomSearch from "@/components/CustomSearch";
import CookieComponent from "@/components/CookieComponent";
import { Property } from "@prisma/client";
import { cn } from "@/lib/utils";
import PropertyMainCard from "@/components/PropertyMainCard";

export interface PropertyCustom extends Property {
  urls: string[];
}

export default async function Home() {
  const properties = await getAllProperties();

  return (
    <>
      <CookieComponent />
      <div className="flex-1">
        <div className="fixed top-1/2 z-[999] flex items-center justify-center rounded-[32px]">
          <CustomSearch />
        </div>
        <section
          className={cn(
            "relative m-auto h-screen w-full overflow-hidden dark:bg-gray-800 md:max-h-full",
          )}
        >
          <div className="searchBar">
            <div>
              <div className="searchBarInner">
                <div className="flex justify-center">
                  <button className="searchBarFirstButton">Properties</button>
                  <button className="searchBarButton">Properties</button>
                  <button className="searchBarButton">Properties</button>
                </div>
              </div>
            </div>
          </div>
          <section className="customOverflow relative flex w-full pt-[6rem]">
            <div className="customFlex w-1/2 border border-black px-[3.5rem]">
              <div className="pt-9">
                <h2 className="text-[22px] font-medium leading-[26px]">
                  100 pozycji
                </h2>
              </div>
              <div className="listOfItems pt-[25px]">
                {/* {properties.map((property: PropertyCustom) => (
                  <PropertyMainCard property={property} key={property.id} />
                ))} */}
                {Array.from({ length: 100 }, (_, index) => (
                  <div
                    key={index}
                    className="h-[170px] w-[290px] border border-black"
                  >
                    Element {index + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className="mainMap">
              <div className="relative h-full w-full">
                <div className="absolute left-0 top-0 h-full w-full">Map</div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
