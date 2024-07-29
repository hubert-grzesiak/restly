import React from "react";
import getPropertyInfo from "@/lib/actions/properties/getPropertyInfo";

import Opinions from "./components/Opinions";
import AddToFavourite from "./components/AddToFavourite";
import { currentUser } from "@/lib/actualUserInfo";
import ContactHost from "./components/ContactHost";
import Map from "./components/Map";
import ReservationForm from "./components/ReservationForm/ReservationForm";
import getReviews from "@/lib/actions/properties/getReviews";
import { StarIcon } from "@/components/icons";
import getReviewsSummaryForProperty from "@/lib/actions/properties/getNumberOfReviewsForProperty";
import Image from "next/image";
import ImagesSection from "./components/ImagesSection";
import { Button } from "@/components/ui/button";
interface PageProps {
  params: { id?: string };
}

const Details: React.FC<PageProps> = async ({ params }) => {
  const user = await currentUser();
  const id = params.id;
  if (!id) {
    return <div>No property ID provided</div>;
  }

  const property = await getPropertyInfo({ id });
  const reviews = await getReviews({ propertyId: id });
  const { averageRating, numberOfReviews } = await getReviewsSummaryForProperty(
    {
      propertyId: id,
    },
  );
  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <main className="w-full pt-100">
      <div className="mx-auto mb-10 w-full max-w-[1400px] px-4">
        <section className="rounded-xl bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] shadow-xl">
          <div className="absolute left-0 right-0 top-0 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />
          <div className="w-full px-6 py-6 dark:bg-gray-800">
            <div className="flex justify-between px-4 md:px-0">
              <h1 className="mb-4 text-3xl font-bold">{property.name}</h1>
              <div className="flex gap-2">
                {user?.id !== property.ownerId && (
                  <ContactHost
                    ownerId={property.ownerId}
                    propertyId={property.id}
                  />
                )}
                {user?.id === property.ownerId && (
                  <Button
                    variant={"outline"}
                    href={`
                  /properties/${property.id}/edit
                `}
                  >
                    Edit
                  </Button>
                )}
                <AddToFavourite propertyId={property.id} variant="withText" />
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-b-xl">
            <div className="flex flex-row items-center px-6">
              <Image
                alt="Property Image"
                className="h-[300px] w-[500px] rounded-lg object-contain"
                height="300"
                src={property.urls[0] || "/placeholder.svg"}
                style={{
                  aspectRatio: "500/300",
                  objectFit: "cover",
                }}
                width="500"
              />
              <div className="p-6">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <StarIcon className="h-6 w-6 fill-orange-400 text-orange-400" />
                  <span className="text-bold text-lg">{averageRating}</span>
                  <span>({numberOfReviews})</span>
                </div>
                <p className="mb-4 text-gray-500 dark:text-gray-400">
                  {property.city}, {property.country}
                </p>
                <div className="mb-6">
                  <p>{property.description}</p>
                </div>
                <div className="mb-6">
                  from{" "}
                  <span className="text-2xl font-bold">
                    ${property.prices[0]?.price || "N/A"}/night
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {property.facility.map(
                    (facility: { name: string }, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="rounded-lg bg-white/80 px-4 py-2 shadow-md backdrop-blur-xl">
                          {facility.name}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
            <div className="mx-6 mt-4 grid grid-cols-2 gap-4 pb-4 md:grid-cols-4">
              <ImagesSection property={property} />
            </div>
          </div>
        </section>
        <section className="mt-6 flex w-full flex-col items-start justify-between gap-6 md:flex-row">
          <div className="relative flex-1 rounded-lg bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Reservation</h2>
            <div className="rounded-md bg-white p-4">
              <ReservationForm propertyId={property.id} property={property} />
            </div>
          </div>
          <div className="relative w-full max-w-[900px] rounded-lg bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] p-6 shadow-md">
            <div className="absolute left-0 right-0 top-0 m-auto h-[150px] w-[150px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />
            <h2 className="mb-4 text-2xl font-bold">Location</h2>
            <Map property={property} className="h-[500px]" />
          </div>
        </section>
        <Opinions reviews={reviews} />
      </div>
    </main>
  );
};

export default Details;
