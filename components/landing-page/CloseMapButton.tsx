"use client";

import { cn } from "@/lib/utils";

const CloseMapButton = ({
  setIsMapHidden,
  isMapHidden,
}: {
  setIsMapHidden: (value: boolean) => void;
  isMapHidden: boolean;
}) => {
  return (
    <div className="mainMapButton" onClick={() => setIsMapHidden(!isMapHidden)}>
      <button className="mainMapButtonInner">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={cn("mapSvg", isMapHidden && "rotate-[180deg]")}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.00147 21L7 19.9984L14.9971 12L7 4.00164L8.00147 3L17 12L8.00147 21Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default CloseMapButton;
