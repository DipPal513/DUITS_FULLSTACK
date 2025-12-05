import { Suspense } from "react"
import api from "@/config/index"
import EventsHeader from "@/components/events/EventHeader"
import EventCard from "@/components/events/EventCard"
import EventPagination from "@/components/events/EventPagination"
import { Calendar } from "lucide-react"
import GlobalSkeleton from "@/components/GlobalSkeleton"

// Server-side data fetching function
async function getEvents(page, filter) {
  try {
    // Send filter and page to backend
    const res = await api.get(`/event?page=${page}&limit=10&filter=${filter}`)
    return res.data
  } catch (error) {
    console.error("Error fetching events:", error)
    return { events: [], totalPages: 1, totalCount: 0 }
  }
}

const EmptyState = () => (
  <div className="text-center py-20">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
      <Calendar className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="text-xl font-semibold mb-2">No Events Found</h3>
    <p className="text-muted-foreground">Check back later for upcoming events</p>
  </div>
)

// Async Server Component
export default async function EventsPage({ searchParams }) {
  // In Next.js 15, searchParams is a promise that must be awaited
  const params = await searchParams
  
  // Parse params or set defaults
  const currentPage = Number(params?.page) || 1
  const currentFilter = params?.filter || "all"

  // Fetch data directly
  const { events, totalPages, totalCount } = await getEvents(currentPage, currentFilter)

  return (
    <section id="events" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header: Controls URL params */}
        <EventsHeader
          currentPage={currentPage}
          eventsPerPage={10}
          totalEvents={totalCount}
          activeFilter={currentFilter} 
        />

        <Suspense fallback={<GlobalSkeleton />}>
          {(!events || events.length === 0) ? (
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

              {totalPages > 1 && (
                <EventPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              )}
            </>
          )}
        </Suspense>
      </div>
    </section>
  )
}