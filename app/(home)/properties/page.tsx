import getPropertiesInfo from "@/lib/actions/properties/getPropertiesInfo";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Property, Image as PropertyImage, Facility } from "@prisma/client";

interface PropertyWithUrls extends Property {
  images: PropertyImage[];
  facility: Facility[];
  urls: string[];
}
const Properties = async () => {
  const result: PropertyWithUrls[] = await getPropertiesInfo({
    softDeleted: false,
  });
  console.log(result);
  return (
    <main className="min-h-screen w-full bg-gray-100 pb-10">
      <div className="flex w-full items-center justify-center px-4 py-5">
        <h1 className="font-inter text-xl font-bold">Properties</h1>
      </div>
      {result.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <h1>No properties yet</h1>
          <Link href="/become-a-host" className="underline">
            Become a host!
          </Link>
        </div>
      ) : (
        <div className="flex w-full flex-col [&>a]:border-collapse [&>a]:border [&>a]:border-black [&>a]:hover:cursor-pointer">
          {result.map((property: PropertyWithUrls) => (
            <Link href={`/properties/${property.id}`} key={property.id}>
              <div className="relative w-full hover:opacity-90">
                <div className="relative h-[200px] w-full">
                  {property.urls && property.urls.length > 0 ? (
                    <Image
                      src={property.urls[0]}
                      fill
                      alt={"property image"}
                      objectFit={"cover"}
                      objectPosition={"end"}
                      className="absolute inset-0 z-0"
                    />
                  ) : (
                    <p className="text-center">No image available</p>
                  )}
                  <div className="absolute inset-0 z-10 flex h-full items-center">
                    <div className="flex h-full min-w-[350px] flex-col items-center justify-center gap-2 bg-black/30 p-4 text-center backdrop-blur-[32px]">
                      <h1 className="text-xl font-bold text-white">
                        {property.name}
                      </h1>
                      <p className="text-white">{property.country}</p>
                      <p className="text-white">{property.city}</p>
                      <span className="text-white">{`${property.street}, ${property.postalCode}`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default Properties;
