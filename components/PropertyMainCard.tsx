import React from "react";
import Image from "next/image";
import { StarIcon } from "./icons/StarIcon";
import { Button } from "./ui/button";
import Link from "next/link";
import getReviewsSummaryForProperty from "@/lib/actions/properties/getNumberOfReviewsForProperty";
import { PropertyCustom } from "@/app/page";

const PropertyMainCard = async ({ property }: { property: PropertyCustom }) => {
  const { averageRating, numberOfReviews } = await getReviewsSummaryForProperty(
    {
      propertyId: property.id,
    },
  );
  return (
    <div
      key={property.id}
      className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-950"
    >
      <Image
        alt={property.name}
        className="h-[200px] w-full object-cover"
        height={200}
        src={property.urls[0] || "/placeholder.svg"}
        style={{
          aspectRatio: "300/200",
          objectFit: "cover",
        }}
        width={300}
      />
      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold tracking-tight">
          {property.name}
        </h3>
        <div className="flex items-center gap-1 text-sm font-medium">
          <StarIcon className="h-6 w-6 fill-orange-400 text-orange-400" />
          <span className="text-bold text-lg">{averageRating}</span>
          <span>({numberOfReviews})</span>
        </div>
        <p className="mb-4 text-gray-500 dark:text-gray-400">
          {property.city}, {property.country}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">
            ${property.prices[0]?.price || 0}
          </span>
          <Button size="sm" variant="default">
            <Link href={`/properties/${property.id}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyMainCard;
