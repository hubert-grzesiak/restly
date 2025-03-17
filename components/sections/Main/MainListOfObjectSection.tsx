"use client";
import PropertyMainCard from "@/components/PropertyMainCard";
import { cn } from "@/lib/utils";
import { PropertyInterface } from "./components/MainMap";

const MainListOfObjectSection = ({
  properties,
  isMapHidden,
  propertiesCount,
}: {
  properties: PropertyInterface[];
  isMapHidden: boolean;
  propertiesCount: number;
}) => {
  return (
    <div className="customFlex w-1/2 px-[3.5rem]">
      <div className="pt-9">
        <h2 className="text-[22px] font-medium leading-[26px]">
          {propertiesCount} found
        </h2>
      </div>
      <div
        className={cn(
          "listOfItems grid-cols-1 flex-wrap pb-20 pt-[25px] 2xl:grid-cols-2",
          isMapHidden &&
            "grid-cols-1 md:grid-cols-2 min-[1100px]:grid-cols-3 2xl:grid-cols-4",
        )}
      >
        {properties.map((property) => (
          <PropertyMainCard property={property} key={property.id} />
        ))}
      </div>
    </div>
  );
};

export default MainListOfObjectSection;
