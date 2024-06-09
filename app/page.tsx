import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";
import {
  FilterIcon,
  LocateIcon,
  SearchIcon,
  StarIcon,
} from "./components/icons";
import Link from "next/link";
import placeholderImage from "@/public/images/avatar-placeholder.png";
import FamilyButtonSection from "../components/FamilyButtonSection";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
export default function Home() {
  return (
    <>
      <main className="flex-1">
        <section className="relative m-auto h-screen max-h-[700px] w-full overflow-hidden bg-gray-100 pt-12 dark:bg-gray-800 md:max-h-full md:py-16 lg:py-20">
          <div className="container max-w-[1400px] px-4 md:px-0">
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
                  src={placeholderImage}
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
                href="#">
                <Image
                  alt="Destination"
                  className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={200}
                  src="/images/popular/paris.jpg"
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
                href="#">
                <Image
                  alt="Bali"
                  className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={200}
                  src="/images/popular/bali.jpg"
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
                href="#">
                <Image
                  alt="Tokyo"
                  className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={200}
                  src={placeholderImage}
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
                href="#">
                <Image
                  alt="London"
                  className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={200}
                  src="/images/popular/london.jpg"
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
        <section className="bg-gray-100 py-12 dark:bg-gray-800 md:py-16 lg:py-20">
          <div className="container px-4 md:px-0">
            <h2 className="mb-6 text-2xl font-bold tracking-tight md:mb-8">
              Featured Rentals
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-950">
                <Link className="block" href="#">
                  <Image
                    alt="Woods"
                    className="h-[200px] w-full object-cover"
                    height={200}
                    src="/images/featured/woods.jpg"
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                </Link>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-bold tracking-tight">
                    Cozy Cabin in the Woods
                  </h3>
                  <div className="mb-2 flex items-center gap-2">
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      (45)
                    </span>
                  </div>
                  <p className="mb-4 text-gray-500 dark:text-gray-400">
                    Escape to this cozy cabin nestled in the heart of the woods.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$150</span>
                    <Button size="sm" variant="default">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-950">
                <Link className="block" href="#">
                  <Image
                    alt="Rental"
                    className="h-[200px] w-full object-cover"
                    height={200}
                    src={placeholderImage}
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                </Link>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-bold tracking-tight">
                    Beachfront Villa in Bali
                  </h3>
                  <div className="mb-2 flex items-center gap-2">
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      (78)
                    </span>
                  </div>
                  <p className="mb-4 text-gray-500 dark:text-gray-400">
                    Enjoy the stunning ocean views from this luxurious villa.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$350</span>
                    <Button size="sm" variant="default">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-950">
                <Link className="block" href="#">
                  <Image
                    alt="Rental"
                    className="h-[200px] w-full object-cover"
                    height={200}
                    src={placeholderImage}
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                </Link>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-bold tracking-tight">
                    Treehouse Retreat in the Mountains
                  </h3>
                  <div className="mb-2 flex items-center gap-2">
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      (92)
                    </span>
                  </div>
                  <p className="mb-4 text-gray-500 dark:text-gray-400">
                    Escape to this unique treehouse nestled in the mountains.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$200</span>
                    <Button size="sm" variant="default">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-950">
                <Link className="block" href="#">
                  <Image
                    alt="Rental"
                    className="h-[200px] w-full object-cover"
                    height={200}
                    src="/images/featured/new-york-penthouse.jpg"
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                </Link>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-bold tracking-tight">
                    Luxury Penthouse in New York
                  </h3>
                  <div className="mb-2 flex items-center gap-2">
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      (68)
                    </span>
                  </div>
                  <p className="mb-4 text-gray-500 dark:text-gray-400">
                    Experience the height of luxury in this stunning penthouse.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$500</span>
                    <Button size="sm" variant="default">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
