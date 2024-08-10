"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import { AutoCompleteInputProps, Suggestion, Address } from "@/types";
import { Tooltip } from "antd";
import { Input } from "./ui/input";

function AutoCompleteInput({
  handleManualInputChange,
  setAddress,
  streetAndNumber,
}: AutoCompleteInputProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

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
    const response = await fetch(`/api/mapbox/route?query=${query}`);
    const places = await response.json();

    setSuggestions(places);
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
      const key = element.id.split(".")[0] as keyof Address;

      if (key in address) {
        // Cast the property as a string to ensure TypeScript accepts it
        (address[key] as string) = element.text;
      }
    });

    setAddress(address);
    setSuggestions([]);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.relatedTarget as Node)
    ) {
      setSuggestions([]);
    }
  };

  return (
    <div onBlur={handleBlur}>
      <div className="autoCompleteInputContainer">
        <Tooltip title={streetAndNumber}>
          <Input
            id="address"
            type="text"
            placeholder="Address"
            value={streetAndNumber}
            onChange={handleChange}
            autoComplete="off"
            className="!focus-visible:ring-none border-none pl-7 shadow-none focus-visible:ring-0"
          />
        </Tooltip>
        <ul className="addressSuggestions shadow-md" ref={suggestionsRef}>
          {suggestions?.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={() => handleSuggestionClick(suggestion)}
            >
              {suggestion?.place_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AutoCompleteInput;
