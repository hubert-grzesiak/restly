import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  FilterIcon,
  LocateIcon,
  SearchIcon,
  StarIcon,
} from "@/components/icons";
import Link from "next/link";
import getAllProperties from "@/lib/actions/properties/getAllProperties";
import CustomSearch from "@/components/CustomSearch";
import CookieComponent from "@/components/CookieComponent";
import { Property } from "@prisma/client";

interface PropertyCustom extends Property {
  urls: string[];
}

export default async function Home() {
  const properties = await getAllProperties();

  return (
    <>
      <CookieComponent />
      <main className="flex-1">
        <div className="fixed top-1/2 z-[999] flex items-center justify-center rounded-[32px]">
          <CustomSearch />
        </div>
        <section className="background-gradient relative m-auto h-screen max-h-[700px] w-full overflow-hidden pt-12 dark:bg-gray-800 md:max-h-full md:py-16 lg:py-20">
          <div className="container z-[20] max-w-[1400px] px-4 md:px-0">
            <div className="grid items-center gap-6 md:grid-cols-2 lg:grid-cols-[1fr_500px]">
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  Discover your next adventure
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 md:text-xl">
                  Browse our curated selection of unique vacation rentals around
                  the world.
                </p>
                <div className="flex gap-4">
                  <Button variant="default">
                    <SearchIcon className="mr-2 h-5 w-5" />
                    Search Rentals
                  </Button>
                  <Button variant="secondary">
                    <FilterIcon className="mr-2 h-5 w-5" />
                    Filters
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
                <Image
                  alt="World Map"
                  className="rounded-xl object-cover"
                  fill
                  src="https://res.cloudinary.com/dev6yhoh3/image/upload/v1718575030/restly/dkmtrnz8biy6m4m88ci6.jpg"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-gray-100/60 to-transparent dark:from-gray-800 dark:to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-md bg-white p-3 shadow-md dark:bg-gray-950">
                  <div className="flex items-center gap-2">
                    <LocateIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm font-medium">New York, USA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <MapComponent /> */}
        </section>

        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-0">
            <h2 className="mb-6 text-2xl font-bold tracking-tight md:mb-8">
              Popular Destinations
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Link
                className="group relative overflow-hidden rounded-xl"
                href="#"
              >
                <Image
                  alt="Destination"
                  className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={200}
                  src="https://res.cloudinary.com/dev6yhoh3/image/upload/v1718575030/restly/dkmtrnz8biy6m4m88ci6.jpg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Paris, France</h3>
                  <p className="text-sm">
                    Discover the City of Light and its timeless charm.
                  </p>
                </div>
              </Link>
              <Link
                className="group relative overflow-hidden rounded-xl"
                href="#"
              >
                <Image
                  alt="Bali"
                  className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={200}
                  src="https://res.cloudinary.com/dev6yhoh3/image/upload/v1718575030/restly/dkmtrnz8biy6m4m88ci6.jpg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Bali, Indonesia</h3>
                  <p className="text-sm">
                    Escape to the tropical paradise of Bali.
                  </p>
                </div>
              </Link>
              <Link
                className="group relative overflow-hidden rounded-xl"
                href="#"
              >
                <Image
                  alt="Tokyo"
                  className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={200}
                  src="https://res.cloudinary.com/dev6yhoh3/image/upload/v1718575030/restly/dkmtrnz8biy6m4m88ci6.jpg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Tokyo, Japan</h3>
                  <p className="text-sm">
                    Explore the vibrant and futuristic city of Tokyo.
                  </p>
                </div>
              </Link>
              <Link
                className="group relative overflow-hidden rounded-xl"
                href="#"
              >
                <Image
                  alt="London"
                  className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={200}
                  src="https://res.cloudinary.com/dev6yhoh3/image/upload/v1718575030/restly/dkmtrnz8biy6m4m88ci6.jpg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">London, UK</h3>
                  <p className="text-sm">
                    Discover the rich history and vibrant culture of London.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
        <section className="background-gradient bg-gray-100 py-12 dark:bg-gray-800 md:py-16 lg:py-20">
          <div className="container px-4 md:px-0">
            <h2 className="mb-6 text-2xl font-bold tracking-tight md:mb-8">
              Featured Rentals
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {properties.map((property: PropertyCustom) => (
                <div
                  key={property.id}
                  className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-950"
                >
                  <Link className="block" href="#">
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
                  </Link>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-bold tracking-tight">
                      {property.name}
                    </h3>
                    <div className="mb-2 flex items-center gap-2">
                      <StarIcon className="h-5 w-5 fill-primary" />
                      <StarIcon className="h-5 w-5 fill-primary" />
                      <StarIcon className="h-5 w-5 fill-primary" />
                      <StarIcon className="h-5 w-5 fill-primary" />
                      <StarIcon className="h-5 w-5 fill-primary" />
                      {/* <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                      <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" /> */}
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        (
                        {
                          // property?.reviewsCount
                          // ||
                          0
                        }
                        )
                      </span>
                    </div>
                    <p className="mb-4 text-gray-500 dark:text-gray-400">
                      {property.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        $
                        {
                          // property.pricePerNight ??
                          0
                        }
                      </span>
                      <Button size="sm" variant="default">
                        <Link href={`/properties/${property.id}`}>
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
