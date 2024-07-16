import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { StarIcon } from "@/components/icons";
import getReviewsSummaryForProperty from "@/lib/actions/properties/getNumberOfReviewsForProperty";
import { PropertyWithUrls } from "./tabs/YourPropertiesTab";
import Image from "next/image";

const PropertyCard = async ({ property }: { property: PropertyWithUrls }) => {
  const { averageRating } = await getReviewsSummaryForProperty({
    propertyId: property.id,
  });

  return (
    <Card key={property.id}>
      <Link
        href={`/properties/${property.id}`}
        className="group"
        prefetch={false}
      >
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={property.urls[0] || "/images/placeholder.svg"}
            alt={property.name}
            width={312}
            height={175}
            className="h-full w-full object-cover transition-all group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="grid gap-1">
              <div className="line-clamp-1 font-semibold">{property.name}</div>
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
  );
};

export default PropertyCard;
