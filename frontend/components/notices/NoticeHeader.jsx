"use client"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

export default function NoticesHeader({ totalNotices, activeFilter }) {
  const router = useRouter()
  const pathname = usePathname()
  
  // Helper to push new filter to URL
  const handleFilterClick = (filterValue) => {
    const params = new URLSearchParams(window.location.search)
    params.set('filter', filterValue)
    params.set('page', '1') // Reset to page 1 on filter change
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
       <div className="">
         <h1 className="text-3xl font-bold">Notices & Events</h1>
         <p className="text-muted-foreground">Total: {totalNotices}</p>
       </div>

       {/* Filter Buttons */}
       <div className="flex gap-2 bg-muted/50 p-1 rounded-lg">
          {['all', 'upcoming', 'recent'].map((f) => (
            <button
              key={f}
              onClick={() => handleFilterClick(f)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeFilter === f 
                  ? 'bg-white dark:bg-slate-800 shadow-sm text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
       </div>
    </div>
  )
}