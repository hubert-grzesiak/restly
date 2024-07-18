import getAllProperties from "@/lib/actions/properties/getAllProperties";
import CustomSearch from "@/components/CustomSearch";
import CookieComponent from "@/components/CookieComponent";
import { Property } from "@prisma/client";
import MainSection from "@/components/sections/Main/MainSection";

export interface PropertyCustom extends Property {
  urls: string[];
}

export default async function Home() {
  const properties = await getAllProperties();
  return (
    <div className="relative pt-[6rem]">
      <CookieComponent />
      <div className="fixed top-1/2 z-[999] flex items-center justify-center rounded-[32px]">
        <CustomSearch />
      </div>

      <div className="searchBar border border-black">
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
      <MainSection properties={properties} />
    </div>
  );
}
