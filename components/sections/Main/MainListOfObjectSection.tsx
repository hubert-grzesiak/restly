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
    <div className="customFlex w-1/2 px-[3.5rem]">
      <div className="pt-9">
        <h2 className="text-[22px] font-medium leading-[26px]">
          {properties.length} found
        </h2>
      </div>
      <div
        className={cn(
          "listOfItems grid-cols-2 pb-20 pt-[25px]",
          isMapHidden &&
            "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        )}
      >
        {properties.map((property: PropertyCustom) => (
          <PropertyMainCard property={property} key={property.id} />
        ))}
      </div>
    </div>
  );
};

export default MainListOfObjectSection;
