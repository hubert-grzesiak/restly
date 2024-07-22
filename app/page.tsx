import getAllProperties from "@/lib/actions/properties/getAllProperties";
import { Property } from "@prisma/client";
import MainSection from "@/components/sections/Main/MainSection";
import Searchbar from "@/components/searchbar/Searchbar";
import LocalSearchbar from "@/components/searchbar/LocalSearchbar";
export interface PropertyCustom extends Property {
  urls: string[];
}

export default async function Home() {
  const properties = await getAllProperties();
  return (
    <div className="relative pt-[6rem]">
      <Searchbar route="/" />
      {/* <LocalSearchbar /> */}
      <MainSection properties={properties} />
    </div>
  );
}
