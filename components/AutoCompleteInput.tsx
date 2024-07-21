"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import { AutoCompleteInputProps, Suggestion, Address } from "@/types";
import getPlaces from "../app/api/mapbox/route";
import { Tooltip } from "antd";
import { Input } from "./ui/input";

function AutoCompleteInput({
  handleManualInputChange,
  setAddress,
  streetAndNumber,
}: AutoCompleteInputProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleManualInputChange(event, "streetAndNumber");
    debounceHandleInputChange(event.target.value);
  };

  const debounceHandleInputChange = (query: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      handleInputChange(query);
    }, 300); // Adjust the debounce delay as needed
  };

  const handleInputChange = async (query: string) => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    const suggestions = await getPlaces(query);
    setSuggestions(suggestions);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    const latitude = suggestion.center[1];
    const longitude = suggestion.center[0];

    const address: Address = {
      streetAndNumber: suggestion.place_name,
      place: "",
      region: "",
      postcode: "",
      country: "",
      latitude,
      longitude,
    };

    suggestion.context.forEach((element) => {
      const identifier = element.id.split(".")[0] as keyof Address;
      address[identifier] = element.text;
    });

    console.log(address.longitude, address.latitude);

    setAddress(address);
    setSuggestions([]);
  };

  return (
    <div>
      <div className="autoCompleteInputContainer">
        <Tooltip title={streetAndNumber}>
          <Input
            id="address"
            type="text"
            placeholder="Address"
            value={streetAndNumber}
            onChange={handleChange}
            className="truncate rounded-xl border-none shadow-none hover:shadow-sm"
          />
        </Tooltip>
        <ul className="addressSuggestions">
          {suggestions?.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion?.place_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AutoCompleteInput;
