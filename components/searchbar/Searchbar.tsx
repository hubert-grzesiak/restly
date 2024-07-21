"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import AutoCompleteInput from "../AutoCompleteInput";
import LocationModal from "./LocationModal";
import DataModal from "./DataModal";
import GuestsModal from "./GuestsModal";

const Searchbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [address, setAddress] = React.useState({
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
              <DataModal />
            </div>

            <div className="searchBarItem">
              <GuestsModal />
            </div>
            <div className="searchBarItem">
              <button className="searchBarButton">
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
