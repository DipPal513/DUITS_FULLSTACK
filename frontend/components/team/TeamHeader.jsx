"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Filter, X, ChevronDown } from "lucide-react"

export default function TeamHeader({
  totalTeams = 0,
  selectedYear,
  selectedBatch,
  availableYears,
  availableBatches,
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Function to handle URL updates
  const updateFilter = (key, value) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (!value) {
      current.delete(key)
    } else {
      current.set(key, value)
    }

    const search = current.toString()
    const query = search ? `?${search}` : ""

    router.push(`${pathname}${query}`)
  }

  // Clear all filters
  const clearFilters = () => {
    router.push(pathname)
  }

  const hasActiveFilters = selectedYear || selectedBatch

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100 dark:border-gray-800">
      {/* Left Side: Title and Count */}
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Executive Team
        </h1>
        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-100 dark:border-blue-800">
          {totalTeams}
        </span>
      </div>

      {/* Right Side: Filters */}
      <div className="flex items-center gap-2">
        {/* Filter Icon Label (Mobile hidden) */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 mr-2">
          <Filter className="w-4 h-4" />
          <span>Filters:</span>
        </div>

        {/* Year Select */}
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => updateFilter("year", e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <option value="">All Years</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Batch Select */}
        <div className="relative">
          <select
            value={selectedBatch}
            onChange={(e) => updateFilter("batch", e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <option value="">All Batches</option>
            {availableBatches.map((batch) => (
              <option key={batch} value={batch}>
                Batch {batch}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Clear Button (Only shows if filtered) */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Clear Filters"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}