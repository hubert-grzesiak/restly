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
                <ContactHost property={property} />
              )}
              <AddToFavourite property={property} />
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
              <ReservationForm propertyId={id} />
            </div>
          </div>
          <div className="col-span-2">
            <h2 className="mb-4 text-2xl font-bold">Location</h2>
            <div>
              <Map
                coordinates={property?.geometry.coordinates}
                property={property}
              />
            </div>
          </div>
        </div>
        <Opinions />
      </div>
    </div>
  );
};

function CalendarDaysIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function ConciergeBellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z" />
      <path d="M20 16a8 8 0 1 0-16 0" />
      <path d="M12 4v4" />
      <path d="M10 4h4" />
    </svg>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function SpadeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 9c-1.5 1.5-3 3.2-3 5.5A5.5 5.5 0 0 0 7.5 20c1.8 0 3-.5 4.5-2 1.5 1.5 2.7 2 4.5 2a5.5 5.5 0 0 0 5.5-5.5c0-2.3-1.5-4-3-5.5l-7-7-7 7Z" />
      <path d="M12 18v4" />
    </svg>
  );
}

function WalletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

function WavesIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  );
}

export default Details;
