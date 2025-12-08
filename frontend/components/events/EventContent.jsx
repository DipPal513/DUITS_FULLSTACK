import api from "@/config/index"
import EventsHeader from "@/components/events/EventHeader"
import EventCard from "@/components/events/EventCard"
import EventPagination from "@/components/events/EventPagination"
import EmptyState from "@/components/events/EmptyState"

// Data Fetching Logic (Moved inside module)
async function getEvents(page, filter) {
  try {
    const res = await api.get(`/event?page=${page}&limit=10&filter=${filter}`)
    return res.data
  } catch (error) {
    console.error("Error fetching events:", error)
    // Return safe default to prevent crash
    return { events: [], totalPages: 1, totalCount: 0 }
  }
}

export default async function EventsContent({ page, filter }) {
  // This await is what usually blocks navigation. 
  // Now it only blocks this specific component.
  const { events, totalPages, totalCount } = await getEvents(page, filter)

  return (
    <>
      {/* Header needs data (totalCount), so it lives here */}
      <EventsHeader
        currentPage={page}
        eventsPerPage={10}
        totalEvents={totalCount}
        activeFilter={filter} 
      />

      {(!events || events.length === 0) ? (
        <EmptyState />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {events.map((event, index) => (
              <EventCard
                key={event.id || event._id || `event-${index}`}
                event={event}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center">
              <EventPagination
                currentPage={page}
                totalPages={totalPages}
              />
            </div>
          )}
        </>
      )}
    </>
  )
}