"use client"

import { Skeleton } from "@/components/ui/skeleton"
import api from "@/config/index"
import { Calendar } from "lucide-react"
import { useEffect, useState } from "react"
import EventsHeader from "@/components/events/EventHeader"
import EventCard from "@/components/events/EventCard"
import GlobalSkeleton from "@/components/GlobalSkeleton"
import EventPagination from "@/components/events/EventPagination"


const EmptyState = () => (
  <div className="text-center py-20">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
      <Calendar className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="text-xl font-semibold mb-2">No Events Found</h3>
    <p className="text-muted-foreground">Check back later for upcoming events and workshops</p>
  </div>
)


export default function Events() {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalEvents, setTotalEvents] = useState(0)
  const eventsPerPage = 10
  const [eventFilter, setEventFilter] = useState('all')

  useEffect(() => {
    fetchEvents(currentPage)
  }, [currentPage])

  const fetchEvents = async (page) => {
    setLoading(true)
    try {
      const res = await api.get(`/event?page=${page}&limit=${eventsPerPage}`)
      const data = res?.data
      setEvents(data?.events || [])
      setTotalPages(data?.totalPages)
      setTotalEvents(data?.totalCount || 0)
    } catch (error) {
      console.error("Error fetching events:", error)
      setEvents([])
      setTotalPages(1)
      setTotalEvents(0)
    } finally {
      setLoading(false)
    }
  }

const handleFilterChange = (filterId) => {
  setEventFilter(filterId)
  // Add your filtering logic here
  // filterId can be: 'all', 'upcoming', 'recent'
}

// Filter logic example:
const filteredEvents = events.filter(event => {
  const eventDate = new Date(event.date)
  const today = new Date()
  
  if (eventFilter === 'upcoming') {
    return eventDate >= today
  } else if (eventFilter === 'recent') {
    return eventDate < today
  }
  return true // 'all'
})
  const handlePageChange = (page) => {
    setCurrentPage(page)
    const eventsSection = document.getElementById('events')
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="events" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <EventsHeader 
         currentPage={currentPage} eventsPerPage={eventsPerPage} totalEvents={totalEvents} loading={loading} onFilterChange={handleFilterChange}
        />

        {/* Events Grid */}
        {loading ? (
          <GlobalSkeleton />
        ) : events.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {events.map((event, index) => (
                <EventCard 
                  key={event.id || event._id || `event-${index}`} 
                  event={event} 
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <EventPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </section>
  )
}