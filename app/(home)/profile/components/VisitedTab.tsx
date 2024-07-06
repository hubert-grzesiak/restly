import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReviewForm from "./ReviewForm";
import { CalendarIcon, StarIcon } from "lucide-react";

interface VisitedTabProps {
  title: string;
  property: Place;
}

interface Place {
  imageSrc: string;
  imageAlt: string;
  location: string;
  dateRange: string;
  rating: number;
  reviewCount: number;
  description: string;
}

export default function VisitedTab({ title, property }: VisitedTabProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-8">
      <h1 className="mb-8 text-3xl font-bold">{title}</h1>
      <div className="grid gap-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <Image
              src={property?.images?.urls[0]}
              alt={property?.imageAlt}
              width={600}
              height={400}
              className="h-64 w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Link
                href="#"
                className="text-lg font-medium text-black"
                prefetch={false}
              >
                View Details
              </Link>
            </div>
          </div>
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
                {property?.rating} ({property?.reviewCount} reviews)
              </span>
            </div>
            <div className="prose text-muted-foreground">
              <p>{property?.property.name}</p>
            </div>
            <ReviewForm reviewDetails={null} />
          </div>
        </div>
      </div>
    </div>
  );
}
