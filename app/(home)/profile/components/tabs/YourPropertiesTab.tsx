import Link from "next/link";
import Button from "@/components/Button";
import { Property, Image as PropertyImage, Facility } from "@prisma/client";
import getPropertiesInfo from "@/lib/actions/properties/getPropertiesInfo";
import PropertyCard from "../PropertyCard";

export interface PropertyWithUrls extends Property {
  images: PropertyImage[];
  facility?: Facility[];
  urls: string[];
}
const YourPropertiesTab = async () => {
  const result: PropertyWithUrls[] = await getPropertiesInfo();
  return (
    <div className="grid gap-4 p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {result.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h1>No properties yet</h1>
            <Link href="/become-a-host" className="underline">
              Become a host!
            </Link>
          </div>
        ) : (
          <>
            {result.map((property: PropertyWithUrls) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </>
        )}
      </div>
      <Button className="justify-self-start">View all properties</Button>
    </div>
  );
};

export default YourPropertiesTab;
