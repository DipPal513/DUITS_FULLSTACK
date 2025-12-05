"use client"
import { Sparkles, Calendar, Clock } from "lucide-react"
import { useState } from "react"

const EventsHeader = ({ currentPage, eventsPerPage, totalEvents, loading, onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All Events', icon: Calendar },
    { id: 'upcoming', label: 'Upcoming', icon: Sparkles },
    { id: 'recent', label: 'Recent', icon: Clock }
  ]

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
    onFilterChange?.(filterId)
  }

  return (
    <div className="max-w-4xl mx-auto mb-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          Events & Programs
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          Discover Our Events
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Join our exciting events, workshops, and programs designed to enhance your skills and expand your network
        </p>
      </div>

      {/* Filter Component */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card border rounded-lg shadow-sm">
        <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
          {filters.map((filter) => {
            const Icon = filter.icon
            return (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${activeFilter === filter.id 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {filter.label}
              </button>
            )
          })}
        </div>

        {/* Events Count */}
        {!loading && totalEvents > 0 && (
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            <span className="font-semibold text-foreground">{(currentPage - 1) * eventsPerPage + 1}</span>
            {" "}-{" "}
            <span className="font-semibold text-foreground">
              {Math.min(currentPage * eventsPerPage, totalEvents)}
            </span>
            {" "}of{" "}
            <span className="font-semibold text-foreground">{totalEvents}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventsHeader