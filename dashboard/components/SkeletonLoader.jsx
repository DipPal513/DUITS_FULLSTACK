import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mx-auto p-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm p-4 animate-pulse"
        >
          {/* Image Placeholder */}
          <div className="h-40 w-full rounded-xl bg-gray-300 mb-4"></div>

          {/* Title Placeholder */}
          <div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>

          {/* Subtitle Placeholder */}
          <div className="h-4 w-1/2 bg-gray-300 rounded mb-4"></div>

          {/* Button Placeholder */}
          <div className="mt-auto h-10 w-full bg-gray-300 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
