"use client";
import { PropertyCustom } from "@/app/page";
import PropertyMainCard from "@/components/PropertyMainCard";
import { cn } from "@/lib/utils";

const MainListOfObjectSection = ({
  properties,
  isMapHidden,
}: {
  properties: PropertyCustom[];
  isMapHidden: boolean;
  setIsMapHidden: (value: boolean) => void;
}) => {
  return (
    <div className="customFlex w-1/2 border border-black px-[3.5rem]">
      <div className="pt-9">
        <h2 className="text-[22px] font-medium leading-[26px]">100 pozycji</h2>
      </div>
      <div
        className={cn(
          "listOfItems grid-cols-2 pb-20 pt-[25px]",
          isMapHidden &&
            "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        )}
      >
        {Array.from({ length: 10 }, (_, index) =>
          properties.map((property: PropertyCustom) => (
            <PropertyMainCard property={property} key={property.id} />
          )),
        )}

        {/* {Array.from({ length: 100 }, (_, index) => (
          <div key={index} className="h-[170px] w-[290px] border border-black">
            Element {index + 1}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default MainListOfObjectSection;
