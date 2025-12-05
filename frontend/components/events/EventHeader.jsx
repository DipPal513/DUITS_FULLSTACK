"use client"
import { Sparkles, Calendar, Clock, Filter } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const EventsHeader = ({ currentPage, eventsPerPage, totalEvents, activeFilter = 'all' }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const filters = [
    { id: 'all', label: 'All Events', icon: Calendar },
    { id: 'upcoming', label: 'Upcoming', icon: Sparkles },
    { id: 'recent', label: 'Recent', icon: Clock }
  ]

  const handleFilterChange = (filterId) => {
    // Create a new URLSearchParams object to avoid mutating the current state
    const params = new URLSearchParams(searchParams.toString())
    
    // Update the filter
    params.set('filter', filterId)
    
    // Reset page to 1 when filter changes
    params.set('page', '1')
    
    // Push the new URL
    router.push(`?${params.toString()}`)
  }

  // Calculate range for display
  const start = (currentPage - 1) * eventsPerPage + 1
  const end = Math.min(currentPage * eventsPerPage, totalEvents)

  return (
    <div className="max-w-4xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold mb-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Events & Programs
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">
          Discover Our Events
        </h2>
        
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Join our exciting events, workshops, and programs designed to enhance your skills and expand your network.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-white dark:bg-slate-900/60 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 w-full sm:w-auto p-1">
          {filters.map((filter) => {
            const Icon = filter.icon
            const isActive = activeFilter === filter.id
            
            return (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`
                  relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900 ring-1 ring-black/5 dark:ring-white/20' 
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                {filter.label}
              </button>
            )
          })}
        </div>

        {/* Events Count & Meta */}
        {totalEvents > 0 && (
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 border-l border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-end">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Showing
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                {start}-{end} of {totalEvents}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Filter className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventsHeader