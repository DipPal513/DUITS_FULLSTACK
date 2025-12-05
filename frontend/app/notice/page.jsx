import GlobalSkeleton from "@/components/GlobalSkeleton"
import NoticesHeader from "@/components/notices/NoticeHeader"; // Renamed locally for clarity if needed
import NoticeCard from "@/components/notices/NoticeCard"
import NoticePagination from "@/components/notices/NoticePagination"
import TechBackground from "@/components/tech-background"
import api from "@/config/index"
import { Calendar } from "lucide-react"
import { Suspense } from "react"

// 1. Server-side fetcher
async function getNotices(page, filter) {
  try {
    // Pass page and filter to your backend
    const res = await api.get(`/notice?page=${page}&limit=10&filter=${filter}`)
    return res?.data || { notices: [], totalPages: 1, totalCount: 0 }
  } catch (error) {
    console.error("Error fetching notices:", error)
    return { notices: [], totalPages: 1, totalCount: 0 }
  }
}

const EmptyState = () => (
  <div className="text-center py-20">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
      <Calendar className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="text-xl font-semibold mb-2">No Notices Found</h3>
    <p className="text-muted-foreground">Check back later for upcoming notices</p>
  </div>
)

// 2. Async Server Component
export default async function Page({ searchParams }) {
  // Await params (Next.js 15 requirement)
  const params = await searchParams
  
  const currentPage = Number(params?.page) || 1
  const currentFilter = params?.filter || 'all'

  // Fetch data
  const { notices, totalPages, totalCount } = await getNotices(currentPage, currentFilter)

  return (
    <main className="min-h-screen">
      <TechBackground />
      <section className="pt-20">
    <div id="notices" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header: Controls URL params */}
        <NoticesHeader 
          currentPage={currentPage} 
          noticesPerPage={10} 
          totalNotices={totalCount} 
          activeFilter={currentFilter}
        />

        <Suspense fallback={<GlobalSkeleton />}>
          {notices.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {notices.map((notice, index) => (
                  <NoticeCard 
                    key={notice.id || notice._id || `notice-${index}`} 
                    notice={notice} 
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <NoticePagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              )}
            </>
          )}
        </Suspense>
      </div>
    </div></section></main>
  )
}