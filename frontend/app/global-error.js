"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html>
      <body className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
