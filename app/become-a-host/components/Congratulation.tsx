"use client";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import "animate.css";
import React from "react";
import Link from "next/link";

const Congratulation = () => {
  const { width, height } = useWindowSize();

  function CircleCheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  return (
    <div>
      <Confetti width={width} height={height} recycle={false} />
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex flex-col items-center justify-center space-y-4">
            <CircleCheckIcon className="text-green-500 w-12 h-12" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Congratulations!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              You have successfully become a host.
            </p>
            <Link
              href={"/profile/properties"}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Go to Your Properties
            </Link>
            <button
              className="font-bold cursor-pointer hover:text-gray-700"
              onClick={() => window.location.reload()}>
              Make another property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congratulation;
