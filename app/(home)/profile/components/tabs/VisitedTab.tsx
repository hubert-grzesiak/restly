import React from "react";
import Image from "next/image";
import ReviewForm from "../ReviewForm";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@/components/icons";
import Link from "next/link";
import getReviewsSummary from "@/lib/actions/properties/getNumberOfReviewsForProperty";
import getUserReview from "@/lib/actions/properties/getUserReview";
import SimpleSearchbar from "@/components/searchbar/SimpleSearchbar";
import Pagination from "@/components/facilities/pagination";

interface VisitedTabProps {
  title?: string;
  userId: string;
  property: Place;
}

export interface Place {
  dateFrom: string;
  dateTo: string;
  rating?: number;
  reviewCount?: number;
  location?: string;
  property: {
    id: string;
    name: string;
    images: {
      urls: string[];
    }[];
    Review: {
      body: string;
      rating: number;
    }[];
  };
}

export default async function VisitedTab({
  title,
  property,
  userId,
}: VisitedTabProps) {
  const imageUrl = property?.property?.images[0]?.urls[0] ?? "";
  const { numberOfReviews, averageRating } = await getReviewsSummary({
    propertyId: property.property.id,
  });

  let userReview = await getUserReview({
    propertyId: property.property.id,
  });

  // ensure userReview is either null or a single object, not an array
  if (Array.isArray(userReview)) {
    userReview = userReview.length > 0 ? userReview[0] : null;
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 md:px-8">
        <h1 className="mb-8 text-3xl font-bold">{title}</h1>
        <div className="grid gap-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Link
              className="relative h-full max-h-[276px] overflow-hidden rounded-lg shadow-lg"
              href={`/properties/${property.property.id}`}
            >
              <Image
                src={imageUrl}
                alt={"property?.imageAlt"}
                width={400}
                height={200}
                className="max-h-[200px] w-full max-w-[452px] object-cover"
              />
              <div className="p-4">
                <p className="font-bold">{property?.property.name}</p>
              </div>
            </Link>
            <div>
              <h2 className="mb-2 text-2xl font-bold">{property?.location}</h2>
              <div className="mb-2 flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-1 h-4 w-4" />
                <div>
                  <span>{property?.dateFrom}</span> to{" "}
                  <span>{property?.dateTo}</span>
                </div>
              </div>
              <div className="mb-4 flex items-center text-sm text-muted-foreground">
                <StarIcon className="mr-1 h-4 w-4 fill-primary" />
                <span>
                  {numberOfReviews === 0 ? (
                    <p>0 (0 reviews)</p>
                  ) : (
                    <p>
                      {averageRating} ({numberOfReviews} review)
                    </p>
                  )}
                </span>
              </div>

              <ReviewForm
                type={userReview ? "Edit" : "Add"}
                property={property.property}
                objectId={property.property.id}
                userId={userId}
                userReview={userReview}
                dateTo={property.dateTo}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
