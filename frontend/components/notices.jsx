"use client"

import { Skeleton } from "@/components/ui/skeleton"
import api from "@/config/index"
import { Calendar } from "lucide-react"
import { useEffect, useState } from "react"
import NoticesHeader from "@/components/notices/EventHeader"
import NoticeCard from "@/components/notices/NoticeCard"
import GlobalSkeleton from "@/components/GlobalSkeleton"
import NoticePagination from "@/components/notices/NoticePagination"

// UPDATE: Added 'en-US' to ensure the date is always in English (e.g., "December 10, 2025")
const convertDateToReadableFormat = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', options)
}

const EmptyState = () => (
  <div className="text-center py-20">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted dark:bg-secondary/50 mb-4 transition-colors">
      <Calendar className="w-8 h-8 text-muted-foreground dark:text-foreground/60" />
    </div>
    {/* UPDATE: More professional phrasing */}
    <h3 className="text-xl font-semibold mb-2 text-foreground">No Notices Available</h3>
    <p className="text-muted-foreground">
      There are currently no notices or workshops to display. Please check back later.
    </p>
  </div>
)

export default function Notices() {
  const [loading, setLoading] = useState(true)
  const [notices, setNotices] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalNotices, setTotalNotices] = useState(0)
  const noticesPerPage = 10
  const [noticeFilter, setNoticeFilter] = useState('all')

  useEffect(() => {
    fetchNotices(currentPage)
  }, [currentPage])

  const fetchNotices = async (page) => {
    setLoading(true)
    try {
      const res = await api.get(`/notice?page=${page}&limit=${noticesPerPage}`)
      const data = res?.data
      setNotices(data?.notices || [])
      setTotalPages(data?.totalPages)
      setTotalNotices(data?.totalCount || 0)
    } catch (error) {
      console.error("Failed to fetch notices:", error)
      setNotices([])
      setTotalPages(1)
      setTotalNotices(0)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filterId) => {
    setNoticeFilter(filterId)
  }

  // Filtering logic
  const filteredNotices = notices.filter(notice => {
    const noticeDate = new Date(notice.date)
    const today = new Date()
    
    if (noticeFilter === 'upcoming') {
      return noticeDate >= today
    } else if (noticeFilter === 'recent') {
      return noticeDate < today
    }
    return true // 'all'
  })

  const handlePageChange = (page) => {
    setCurrentPage(page)
    const noticesSection = document.getElementById('notices')
    if (noticesSection) {
      noticesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="notices" 
      className="py-20 lg:py-32 relative bg-background text-foreground transition-colors duration-300"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <NoticesHeader 
         currentPage={currentPage} 
         noticesPerPage={noticesPerPage} 
         totalNotices={totalNotices} 
         loading={loading} 
         onFilterChange={handleFilterChange}
        />

        {/* Notices Grid */}
        {loading ? (
          <GlobalSkeleton />
        ) : filteredNotices.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredNotices.map((notice, index) => (
                <NoticeCard 
                  key={notice.id || notice._id || `notice-${index}`} 
                  notice={notice} 
                  // If you use the date formatter in the card, pass it down or import it there
                  formattedDate={convertDateToReadableFormat(notice.date)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <NoticePagination 
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