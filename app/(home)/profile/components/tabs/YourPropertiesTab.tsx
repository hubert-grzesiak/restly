import { Property, Image as PropertyImage, Facility } from "@prisma/client";
import getPropertiesInfo from "@/lib/actions/properties/getPropertiesInfo";
import PropertyCard from "../PropertyCard";
import Button from "@/components/Button";
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
          <div className="col-span-3 mx-auto flex flex-col items-center justify-center">
            <h1>No properties yet</h1>
            <Button className="mb-6 mt-2" href="/become-a-host">
              Become a host!
            </Button>
          </div>
        ) : (
          <>
            {result.map((property: PropertyWithUrls) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default YourPropertiesTab;
