import supabaseApi from "@/config/supabaseApi"
import NoticesHeader from "@/components/notices/NoticeHeader" // Renamed for clarity
import NoticeCard from "@/components/notices/NoticeCard"
import NoticePagination from "@/components/notices/NoticePagination"
import EmptyNoticeState from "@/components/notices/EmptyNoticesState"




export const convertDateToReadableFormat = (dateString) => {
  if (!dateString) return ""
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', options)
}
// Data Fetching Logic
async function getNotices(page, filter) {
  try {
    const notices = await supabaseApi.getNotices()
    const limit = 10
    const today = new Date().toISOString().slice(0, 10)
    const filteredNotices = notices.filter((notice) => {
      if (!notice.deadline) return filter === 'all'
      if (filter === 'upcoming') return notice.deadline >= today
      if (filter === 'recent') return notice.deadline < today
      return true
    })
    const totalCount = filteredNotices.length
    const totalPages = Math.ceil(totalCount / limit)
    
    // Simple pagination on client side
    const startIndex = (page - 1) * limit
    const paginatedNotices = filteredNotices.slice(startIndex, startIndex + limit)
    
    return {
      notices: paginatedNotices,
      totalPages: totalPages || 1,
      totalCount: totalCount || 0
    }
  } catch (error) {
    console.error("Failed to fetch notices:", error)
    return { notices: [], totalPages: 1, totalCount: 0 }
  }
}

export default async function NoticesContent({ currentPage, filter }) {
  // 1. Fetch Data
  const { notices, totalPages, totalCount } = await getNotices(currentPage, filter)

  return (
    <>
      {/* Header now controls URL via Link, not state */}
      <NoticesHeader 
        currentPage={currentPage} 
        noticesPerPage={10} 
        totalNotices={totalCount} 
        activeFilter={filter}
      />

      {notices.length === 0 ? (
        <EmptyNoticeState />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {notices.map((notice, index) => (
              <NoticeCard 
                key={notice.id || notice._id || `notice-${index}`} 
                notice={notice} 
                formattedDate={convertDateToReadableFormat(notice.date)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <NoticePagination 
              currentPage={currentPage}
              totalPages={totalPages}
              // Pagination now needs to handle URL updates (passed as props or handled internally)
              basePath="/notices"
              currentFilter={filter}
            />
          )}
        </>
      )}
    </>
  )
}