"use client";
import MainMapSection from "@/components/sections/Main/MainMapSection";
import MainListOfObjectSection from "@/components/sections/Main/MainListOfObjectSection";
import { PropertyCustom } from "@/app/page";
import React from "react";

const MainSection = ({ properties }: PropertyCustom) => {
  const [isMapHidden, setIsMapHidden] = React.useState(false);

  return (
    <section className="customOverflow relative flex w-full pt-[6rem]">
      <MainListOfObjectSection
        properties={properties}
        isMapHidden={isMapHidden}
      />

      <MainMapSection
        isMapHidden={isMapHidden}
        setIsMapHidden={setIsMapHidden}
      />
    </section>
  );
};

export default MainSection;
