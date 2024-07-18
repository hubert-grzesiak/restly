"use client";
import CloseMapButton from "@/components/landing-page/CloseMapButton";
import React from "react";
import { cn } from "@/lib/utils";

const MainMapSection = ({
  isMapHidden,
  setIsMapHidden,
}: {
  isMapHidden: boolean;
  setIsMapHidden: (value: boolean) => void;
}) => {
  return (
    <div className={cn("mainMap", isMapHidden && "!w-[1rem]")}>
      <aside className="relative h-full w-full">
        <div className="absolute left-0 top-0 h-full w-full">Map</div>
      </aside>
      <CloseMapButton
        setIsMapHidden={setIsMapHidden}
        isMapHidden={isMapHidden}
      />
    </div>
  );
};
export default MainMapSection;
