import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/Button";
import { StarIcon } from "@/components/icons";
import { Property, Image as PropertyImage, Facility } from "@prisma/client";
import getPropertiesInfo from "@/lib/actions/properties/getPropertiesInfo";
import getReviewsSummary from "@/lib/actions/properties/getNumberOfReviewsForProperty";
import Image from "next/image";

interface PropertyWithUrls extends Property {
  images: PropertyImage[];
  facility: Facility[];
  urls: string[];
}
const YourPropertiesTab = async () => {
  const result: PropertyWithUrls[] = await getPropertiesInfo();
  const { averageRating } = await getReviewsSummary();
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
              <Card key={property.id}>
                <Link
                  href={`/properties/${property.id}`}
                  className="group"
                  prefetch={false}
                >
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={property.urls[0] || "/images/placeholder.svg"}
                      alt="property image"
                    //   width={100}
                      className="h-full w-full object-cover transition-all group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="grid gap-1">
                        <div className="line-clamp-1 font-semibold">
                          {property.name}
                        </div>
                        <div className="line-clamp-1 text-sm text-muted-foreground">
                          {property.city}, {property.country}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <StarIcon className="h-4 w-4 fill-orange-400 text-orange-400" />
                        {averageRating}
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </>
        )}
      </div>
      <Button className="justify-self-start">View all properties</Button>
    </div>
  );
};

export default YourPropertiesTab;
