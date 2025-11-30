// create a global skeleton for loading cards, 3 cards in a row, responsive darkmode and lightmode support
import React from 'react';

const GlobalSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-white dark:bg-slate-800 rounded-lg shadow-md p-4"
        >
          <div className="h-40 bg-gray-300 dark:bg-slate-700 rounded mb-4"></div>
          <div className="h-6 bg-gray-300 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
};

export default GlobalSkeleton;