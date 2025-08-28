"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="text-center">
        <h2 className="text-2xl text-gray-800 mb-4">Something went wrong!</h2>
        <button
          className="px-4 py-2 bg-primary text-white text-lg rounded hover:bg-primary-700"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
