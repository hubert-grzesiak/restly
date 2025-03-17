import React from "react";

const EmptyState = () => {
  return (
    <div className="dark:bg-dusk mr-4 flex h-full w-full max-w-[1300px] flex-1 items-center justify-center rounded-xl bg-gray-100 px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
      <div className="flex w-full flex-col items-center text-center">
        <h3 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-200">
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
