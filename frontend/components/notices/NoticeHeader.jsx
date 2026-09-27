"use client"

import { usePathname, useRouter } from "next/navigation"

const filters = ["all", "upcoming", "recent"]

export default function NoticesHeader({ totalNotices, activeFilter = "all" }) {
  const router = useRouter()
  const pathname = usePathname()

  const setFilter = (filter) => {
    const params = new URLSearchParams(window.location.search)
    params.set("filter", filter)
    params.set("page", "1")
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <header className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
      <p className="mb-2 text-xs font-semibold uppercase text-blue-800 dark:text-blue-300">Society updates</p>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl dark:text-white">Official notices</h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Announcements, deadlines, and updates from the DUITS committee. <span className="tabular-nums">{totalNotices} total</span></p>
        </div>
        <div role="group" aria-label="Filter notices" className="inline-flex self-start rounded-md border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900 sm:self-auto">
          {filters.map((filter) => <button key={filter} type="button" aria-pressed={activeFilter === filter} onClick={() => setFilter(filter)} className={`rounded px-3 py-2 text-sm font-medium capitalize transition-colors ${activeFilter === filter ? "bg-blue-800 text-white" : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"}`}>{filter === "recent" ? "Past deadline" : filter}</button>)}
        </div>
      </div>
    </header>
  )
}
