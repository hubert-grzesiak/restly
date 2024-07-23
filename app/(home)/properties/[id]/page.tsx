import React from "react";
import Image from "next/image";
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
      <div className="mx-auto mb-10 w-full max-w-[1400px]">
        <section className="background-gradient rounded-xl shadow-md">
          <div className="w-full px-6 py-6 dark:bg-gray-800">
            <div className="container mx-auto flex justify-between px-4 md:px-0">
              <h1 className="mb-4 text-3xl font-bold">{property.name}</h1>
              <div className="flex gap-2">
                {user?.id !== property.ownerId && (
                  <ContactHost ownerId={property.ownerId} />
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
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    ${property.prices[0]?.price || "N/A"}/night
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {property.facility.map(
                    (facility: { name: string }, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="rounded-lg bg-white/80 px-4 py-2 backdrop-blur-xl">
                          {facility.name}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
            <div className="mx-6 mt-4 grid grid-cols-2 gap-4 pb-4 md:grid-cols-4">
              {property.urls.slice(1, 5).map((url: string, index: number) => (
                <Image
                  key={index}
                  alt={`Property Image ${index + 1}`}
                  className="w-full rounded-lg object-cover"
                  height="150"
                  src={url || "/placeholder.svg"}
                  style={{
                    aspectRatio: "250/150",
                    objectFit: "cover",
                  }}
                  width="250"
                />
              ))}
            </div>
          </div>
        </section>
        <section className="mt-6 flex w-full flex-col items-start justify-between gap-6 md:flex-row">
          <div className="background-gradient flex-1 rounded-lg p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Reservation</h2>
            <div className="rounded-md bg-white p-4">
              <ReservationForm propertyId={property.id} property={property} />
            </div>
          </div>
          <div className="background-gradient w-full max-w-[900px] rounded-lg p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Location</h2>
            <div>{/* <Map property={property} /> */}</div>
          </div>
        </section>
        <Opinions reviews={reviews} name={user?.name} avatarSrc={user?.image} />
      </div>
    </main>
  );
};

export default Details;
