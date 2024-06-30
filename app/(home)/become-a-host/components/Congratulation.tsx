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
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  return (
    <div>
      <Confetti width={width} height={height} recycle={false} />
      <div className="flex h-[80vh] flex-col items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center space-y-4">
            <CircleCheckIcon className="h-12 w-12 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Congratulations!
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400">
              You have successfully become a host.
            </p>
            <Link
              href={"/properties"}
              className="focus:shadow-outline rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 focus:outline-none"
            >
              Go to Your Properties
            </Link>
            <button
              className="cursor-pointer font-bold hover:text-gray-700"
              onClick={() => window.location.reload()}
            >
              Make another property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congratulation;
