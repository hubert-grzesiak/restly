"use client";
import MainMapSection from "@/components/sections/Main/MainMapSection";
import MainListOfObjectSection from "@/components/sections/Main/MainListOfObjectSection";
import { PropertyCustom } from "@/app/page";
import { useState } from "react";
import Searchbar from "@/components/searchbar/Searchbar";

const MainSection = ({ properties }: PropertyCustom) => {
  const [isMapHidden, setIsMapHidden] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split("T")[0],
    to: new Date().toISOString().split("T")[0],
  });
  return (
    <>
      <Searchbar route="/" dateRange={dateRange} setDateRange={setDateRange} />

      <section className="customOverflow relative flex w-full pt-[6rem]">
        <MainListOfObjectSection
          properties={properties}
          isMapHidden={isMapHidden}
        />

        <MainMapSection
          isMapHidden={isMapHidden}
          setIsMapHidden={setIsMapHidden}
          properties={properties}
        />
      </section>
    </>
  );
};

export default MainSection;
