import { Suspense } from "react"
import api from "@/config/index"
import EventsHeader from "@/components/events/EventHeader"
import EventCard from "@/components/events/EventCard"
import EventPagination from "@/components/events/EventPagination"
import { Calendar } from "lucide-react"
import GlobalSkeleton from "@/components/GlobalSkeleton"

// --- Background Component (Synced with Gallery) ---
const TechBackground = () => (
  <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 transition-colors duration-300">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-slate-400 opacity-20 blur-[100px] dark:bg-indigo-500"></div>
  </div>
)

// --- Styled Empty State (Synced with Gallery) ---
const EmptyState = () => (
  <div className="text-center py-20">
    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
      <Calendar className="w-8 h-8 text-slate-400 dark:text-slate-500" />
    </div>
    <h3 className="text-lg font-medium text-slate-900 dark:text-white">No Events Found</h3>
    <p className="text-slate-500 dark:text-slate-400">Check back later for upcoming events.</p>
  </div>
)

// --- Data Fetching ---
async function getEvents(page, filter) {
  try {
    const res = await api.get(`/event?page=${page}&limit=10&filter=${filter}`)
    return res.data
  } catch (error) {
    console.error("Error fetching events:", error)
    return { events: [], totalPages: 1, totalCount: 0 }
  }
}

// --- Main Page Component ---
export default async function EventsPage({ searchParams }) {
  // In Next.js 15, searchParams is a promise
  const params = await searchParams
  
  const currentPage = Number(params?.page) || 1
  const currentFilter = params?.filter || "all"

  const { events, totalPages, totalCount } = await getEvents(currentPage, currentFilter)

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <TechBackground />

      <section className="pt-20">
        <div id="events" className="py-20 lg:py-32 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50">
          <div className="container mx-auto px-6 lg:px-8">
            
            {/* Header Component 
              Note: Ensure EventsHeader uses text-slate-900/dark:text-white 
              and text-slate-600/dark:text-slate-400 for consistency.
            */}
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
                        currentPage={currentPage}
                        totalPages={totalPages}
                      />
                    </div>
                  )}
                </>
              )}
            </Suspense>
            
          </div>
        </div>
      </section>
    </main>
  )
}