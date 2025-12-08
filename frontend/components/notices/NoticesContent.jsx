import api from "@/config/index"
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
async function getNotices(page) {
  try {
    const limit = 10
    const res = await api.get(`/notice?page=${page}&limit=${limit}`)
    return {
      notices: res?.data?.notices || [],
      totalPages: res?.data?.totalPages || 1,
      totalCount: res?.data?.totalCount || 0
    }
  } catch (error) {
    console.error("Failed to fetch notices:", error)
    return { notices: [], totalPages: 1, totalCount: 0 }
  }
}

export default async function NoticesContent({ currentPage, filter }) {
  // 1. Fetch Data
  const { notices, totalPages, totalCount } = await getNotices(currentPage)

  // 2. Server-Side Filtering 
  // (Ideally your API should handle this via ?filter=upcoming, but logic is kept here to match your original code)
  const filteredNotices = notices.filter(notice => {
    const noticeDate = new Date(notice.date)
    const today = new Date()
    
    if (filter === 'upcoming') return noticeDate >= today
    if (filter === 'recent') return noticeDate < today
    return true // 'all'
  })

  return (
    <>
      {/* Header now controls URL via Link, not state */}
      <NoticesHeader 
        currentPage={currentPage} 
        noticesPerPage={10} 
        totalNotices={totalCount} 
        activeFilter={filter}
      />

      {filteredNotices.length === 0 ? (
        <EmptyNoticeState />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredNotices.map((notice, index) => (
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