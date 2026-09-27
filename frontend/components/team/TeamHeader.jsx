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
    <header className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
      <p className="mb-2 text-xs font-semibold uppercase text-blue-800 dark:text-blue-300">People behind the work</p>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-3xl font-medium leading-tight text-slate-950 sm:text-4xl dark:text-white">Executive committee</h1>
            <span className="border border-slate-300 px-2 py-1 font-mono text-xs tabular-nums text-slate-600 dark:border-slate-700 dark:text-slate-300">{totalTeams} profiles</span>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Meet the students who organize DUITS programs and help move the society forward.</p>
        </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="hidden items-center gap-2 pr-2 text-xs font-semibold uppercase text-slate-500 sm:flex"><Filter className="h-4 w-4" /><span>Filter panel</span></div>

        {/* Year Select */}
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => updateFilter("year", e.target.value)}
            className="h-11 appearance-none border border-slate-300 bg-white pl-3 pr-8 text-sm font-medium text-slate-800 focus:border-blue-800 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
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
            className="h-11 appearance-none border border-slate-300 bg-white pl-3 pr-8 text-sm font-medium text-slate-800 focus:border-blue-800 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
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
            className="inline-flex h-11 w-11 items-center justify-center border border-slate-300 text-slate-600 hover:border-red-400 hover:text-red-700 dark:border-slate-700 dark:text-slate-300"
            title="Clear Filters"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      </div>
    </header>
  )
}