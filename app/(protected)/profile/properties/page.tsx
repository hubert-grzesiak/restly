import getPropertiesInfo from "@/lib/actions/properties/getPropertiesInfo";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Properties = async () => {
  const result = await getPropertiesInfo();
  console.log(result);
  return (
    <main className="w-full bg-gray-100 min-h-screen pb-10">
      <div className="w-full flex items-center justify-center py-5 px-4">
        <h1 className="font-inter font-bold text-xl">Properties</h1>
      </div>
      {result.length === 0 ? (
        <div className="flex items-center justify-center flex-col">
          <h1>No properties yet</h1>
          <Link href="/become-a-host" className="underline">
            Become a host!
          </Link>
        </div>
      ) : (
        <div
          className="w-full flex flex-col [&>a]:border [&>a]:border-collapse [&>a]:border-black [&>a]:hover:cursor-pointer
      ">
          {result.map((property) => (
            <Link href={`/profile/properties/${property.id}`} key={property.id}>
              <div className="w-full hover:opacity-90 relative">
                <div className="relative w-full h-[200px]">
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
                  <div className="absolute h-full inset-0 flex items-center z-10">
                    <div className="text-center bg-black/30 backdrop-blur-[32px] h-full p-4 min-w-[350px] flex items-center justify-center flex-col gap-2">
                      <h1 className="text-white text-xl font-bold">
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
