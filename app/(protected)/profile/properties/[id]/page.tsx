import React from "react";
import Image from "next/image";
import getPropertyInfo from "@/lib/actions/properties/getPropertyInfo";

import Opinions from "./components/Opinions";
import AddToFavourite from "./components/AddToFavourite";
import { currentUser } from "@/lib/actualUserInfo";
import ContactHost from "./components/ContactHost";
import Map from "./components/Map";
import ReservationForm from "./components/ReservationForm/ReservationForm";

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

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-[1400px] mx-auto mb-10">
        <div className="w-full py-6 dark:bg-gray-800">
          <div className="container mx-auto flex justify-between px-4 md:px-0">
            <h1 className="mb-4 text-3xl font-bold">{property.name}</h1>
            <div className="flex gap-2">
              {user?.id !== property.ownerId && (
                <ContactHost ownerId={property.ownerId} />
              )}
              <AddToFavourite propertyId={property.id} />
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-950">
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
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                {property.city}, {property.country}
              </p>
              <div className="mb-6">
                <p>{property.description}</p>
                <p className="mt-4">
                  Wake up to the sound of crashing waves and enjoy your morning
                  coffee on the private balcony. Spend your days exploring the
                  nearby beaches, hiking through the rainforest, or simply
                  relaxing by the infinity pool. This is the ultimate Hawaiian
                  getaway.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {property.facility.map((fac, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span>{fac.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-bold">
                  ${property.prices[0]?.dailyRate || "N/A"}/night
                </span>
              </div>
            </div>
          </div>
          <div className="mx-6 mt-4 grid grid-cols-2 gap-4 pb-4 md:grid-cols-4">
            {property.urls.slice(1, 5).map((url, index) => (
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
        <div className="mt-6 flex gap-6 flex-col md:flex-row">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Reservation</h2>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
              <ReservationForm propertyId={id} property={property} />
            </div>
          </div>
          <div className="col-span-2">
            <h2 className="mb-4 text-2xl font-bold">Location</h2>
            <div>
              <Map property={property} />
            </div>
          </div>
        </div>
        <Opinions />
      </div>
    </div>
  );
};

export default Details;
