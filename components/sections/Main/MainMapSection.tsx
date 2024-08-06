"use client";
import CloseMapButton from "@/components/landing-page/CloseMapButton";
import React from "react";
import { cn } from "@/lib/utils";
import MainMap from "./components/MainMap";
import { Property } from "@prisma/client";

interface PropertyInterface extends Property {
  geometry?: {
    id: string;
    type: string;
    coordinates: [number, number];
  } | null;
}

const MainMapSection = ({
  isMapHidden,
  setIsMapHidden,
  properties,
}: {
  isMapHidden: boolean;
  setIsMapHidden: (value: boolean) => void;
  properties: PropertyInterface;
}) => {
  return (
    <div className={cn("mainMap hidden md:block", isMapHidden && "!w-[30px]")}>
      <aside className="relative h-full w-full">
        <div className="absolute left-0 top-0 h-full w-full">
          <MainMap properties={properties} isMapHidden={isMapHidden} />
        </div>
      </aside>
      <CloseMapButton
        setIsMapHidden={setIsMapHidden}
        isMapHidden={isMapHidden}
      />
    </div>
  );
};
export default MainMapSection;
