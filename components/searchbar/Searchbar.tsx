"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import AutoCompleteInput from "../AutoCompleteInput";
import DataModal from "./DataModal";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import Buttons from "./Buttons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DateRangePicker } from "../ui/date-range-picker";

const Searchbar = ({ route }: { route: string }) => {
  const [numberOfGuests, setNumberOfGuests] = useState({
    adults: 0,
    kids: 0,
    animals: 0,
  });

  console.log(numberOfGuests);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [address, setAddress] = useState({
    streetAndNumber: "",
    place: "",
    region: "",
    postcode: "",
    country: "",
    latitude: 0,
    longitude: 0,
  });

  const handleManualInputChange = (event, stateProperty) => {
    const newAddress = { ...address };
    newAddress[stateProperty] = event.target.value;

    setAddress(newAddress);
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    if (address.streetAndNumber) {
      searchParams.set("q", address.streetAndNumber);
    }

    searchParams.set("numberOfGuests", JSON.stringify(numberOfGuests));

    const newUrl = `${route}?${searchParams.toString()}`;
    router.push(newUrl, { scroll: false });
  };
  const sumOfGuests =
    numberOfGuests.adults + numberOfGuests.kids + numberOfGuests.animals;

  return (
    <div className="searchBar border border-black">
      <div>
        <div className="searchBarInner">
          <div className="flex justify-center">
            <div className="searchBarItem">
              <AutoCompleteInput
                setAddress={setAddress}
                handleManualInputChange={handleManualInputChange}
                streetAndNumber={address.streetAndNumber}
              />
            </div>
            <div className="searchBarItem">
              <DateRangePicker
                buttonStyles="border-none shadow-none outline-none"
                showCompare={false}
              />
            </div>
            <div className="searchBarItem">
              <Popover>
                <PopoverTrigger className="searchBarButton flex flex-col">
                  <span>Who</span>
                  {sumOfGuests > 0 && (
                    <div>
                      <span className="text-xs font-bold text-black">
                        {sumOfGuests}
                      </span>
                      {sumOfGuests > 1 ? (
                        <span className="text-xs"> guests</span>
                      ) : (
                        <span className="text-xs"> guest</span>
                      )}
                    </div>
                  )}
                </PopoverTrigger>
                <PopoverContent className="h-[300px]">
                  <div className="flex h-full gap-6 p-4">
                    <div className="row-span-3 h-full">
                      <div className="relative h-full">
                        <div className="z-10 flex w-full justify-center bg-white/80 text-lg font-medium backdrop-blur-lg">
                          <span className="font-sans text-sm">
                            Select number of guests
                          </span>
                        </div>
                        <div className="relative h-[200px] w-[200px]">
                          <img
                            src="https://res.cloudinary.com/dev6yhoh3/image/upload/v1721644740/restly/states/Guests_nlqfin.png"
                            alt="guests"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full min-w-[250px] flex-col">
                      <div className="border-b-1 py-3">
                        <p className="font-bold">Adults</p>
                        <div className="flex justify-between">
                          <div>From 16 years</div>
                          <Buttons
                            numberOfGuests={numberOfGuests.adults}
                            setNumberOfGuests={setNumberOfGuests}
                            type="adults"
                          />
                        </div>
                      </div>
                      <div className="border-b-1 py-3">
                        <p className="font-bold">Kids</p>
                        <div className="flex justify-between">
                          <div>Under 16 years</div>
                          <Buttons
                            numberOfGuests={numberOfGuests.kids}
                            setNumberOfGuests={setNumberOfGuests}
                            type="kids"
                          />
                        </div>
                      </div>
                      <div className="pt-3">
                        <p className="font-bold">Animals</p>
                        <div className="mt-2 flex justify-between">
                          <Buttons
                            numberOfGuests={numberOfGuests.animals}
                            setNumberOfGuests={setNumberOfGuests}
                            type="animals"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="searchBarItem">
              <button className="searchBarButton" onClick={handleSearch}>
                <div className="rounded-full bg-blue-200 p-4">
                  <MagnifyingGlassIcon className="h-5 w-5 rounded-full bg-blue-200 font-bold text-black" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
