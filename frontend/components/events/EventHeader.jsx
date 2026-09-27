"use client"

import { useRouter, useSearchParams } from "next/navigation"

const filters = [
  { id: "all", label: "All events" },
  { id: "upcoming", label: "Upcoming" },
  { id: "recent", label: "Past" },
]

export default function EventsHeader({ currentPage, eventsPerPage, totalEvents, activeFilter = "all" }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const start = totalEvents ? (currentPage - 1) * eventsPerPage + 1 : 0
  const end = Math.min(currentPage * eventsPerPage, totalEvents)

  const setFilter = (filter) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("filter", filter)
    params.set("page", "1")
    router.push(`/events?${params.toString()}`)
  }

  return (
    <header className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
      <p className="mb-2 text-xs font-semibold uppercase text-blue-800 dark:text-blue-300">DUITS calendar</p>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl dark:text-white">Events & programs</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Workshops, competitions, talks, and activities organized by the society.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div role="group" aria-label="Filter events" className="inline-flex rounded-md border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
            {filters.map(({ id, label }) => <button key={id} type="button" aria-pressed={activeFilter === id} onClick={() => setFilter(id)} className={`rounded px-3 py-2 text-sm font-medium transition-colors ${activeFilter === id ? "bg-blue-800 text-white" : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"}`}>{label}</button>)}
          </div>
          <span className="text-xs tabular-nums text-slate-500">{start}-{end} of {totalEvents}</span>
        </div>
      </div>
    </header>
  )
}
