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
import { Image } from "antd";
import ImagesSection from "./components/ImagesSection";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  DeleteProperty,
  RestoreProperty,
} from "@/components/facilities/buttons";

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
      <div className="mx-auto mb-10 w-full max-w-[1400px] px-2 md:px-4">
        {property.softDeleted && (
          <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-900">
            This property is no longer available
          </div>
        )}
        <section className="rounded-xl bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] shadow-xl">
          <div className="absolute left-0 right-0 top-0 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />
          <Carousel className="md:hidden">
            <CarouselContent>
              {property.urls.map((url) => (
                <CarouselItem key={url}>
                  <Image
                    alt="Property Image"
                    className="object-cover object-center"
                    src={url}
                    height={300}
                    width={"100%"}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="w-full px-6 pb-4 pt-6 dark:bg-gray-800 md:py-6">
            <div className="flex justify-between">
              <h1 className="mb-4 text-xl font-bold md:text-3xl">
                {property.name}
              </h1>
              <div className="flex gap-2">
                {user?.id !== property.ownerId && (
                  <>
                    <div className="md:hidden">
                      <ContactHost
                        ownerId={property.ownerId}
                        propertyId={property.id}
                        variant="small"
                      />
                    </div>
                    <div className="hidden md:block">
                      <ContactHost
                        ownerId={property.ownerId}
                        propertyId={property.id}
                      />
                    </div>
                  </>
                )}
                {user?.id === property.ownerId &&
                  (!property.softDeleted ? (
                    <DeleteProperty id={property.id} />
                  ) : (
                    <RestoreProperty id={property.id} />
                  ))}
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
                <div className="hidden md:block">
                  <AddToFavourite propertyId={property.id} variant="withText" />
                </div>
                <div className="md:hidden">
                  <AddToFavourite
                    propertyId={property.id}
                    variant={"smallScreen"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-b-xl">
            <div className="flex-col items-center md:flex md:flex-row md:px-6">
              <div className="hidden md:block">
                <Image
                  alt="Property Image"
                  className="rounded-lg object-cover"
                  height={300}
                  width={500}
                  src={property.urls[0] || "/placeholder.svg"}
                />
              </div>
              <div className="px-6 pb-6 md:p-6">
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
                <div className="flex gap-2">
                  <span>Number of bedrooms: </span>
                  <span>{property.numberOfBedrooms}</span>
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
            <div className="mx-6 mt-4 hidden grid-cols-2 gap-4 pb-4 md:grid md:grid-cols-4">
              <ImagesSection urls={property.urls} />
            </div>
          </div>
        </section>
        <section className="mt-6 flex w-full flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="relative flex-1 rounded-lg bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold md:text-2xl">Reservation</h2>
            <div className="rounded-md bg-white p-4">
              <ReservationForm propertyId={property.id} property={property} />
            </div>
          </div>
          <div className="relative w-full max-w-[900px] rounded-lg bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] shadow-md md:p-6">
            <div className="absolute left-0 right-0 top-0 m-auto h-[150px] w-[150px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />
            <h2 className="mb-4 text-lg font-bold md:text-2xl">Location</h2>
            <Map property={property} className="h-[300px] md:h-[500px]" />
          </div>
        </section>
        <Opinions reviews={reviews} />
      </div>
    </main>
  );
};

export default Details;
