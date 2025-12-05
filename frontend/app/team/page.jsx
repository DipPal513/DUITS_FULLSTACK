import { Suspense } from "react"
import Link from "next/link" // <--- 1. Import this
import api from "@/config/index"
import TeamHeader from "@/components/team/TeamHeader"
import TeamCard from "@/components/team/TeamCard"
import { Users } from "lucide-react"

// ... (Keep SkeletonCard and LoadingState same as before) ...

async function getExecutives(year, batch) {
  // ... (Keep fetch logic same as before) ...
    try {
    const params = new URLSearchParams()
    if (year) params.append('year', year)
    if (batch) params.append('batch', batch)
    
    const queryString = params.toString() ? `?${params.toString()}` : ''
    const response = await api.get(`/executive${queryString}`)
    
    return {
      executives: response?.data?.data?.executives || [],
      totalCount: response?.data?.data?.totalCount || 0
    }
  } catch (error) {
    console.error("Error fetching executives:", error)
    return { executives: [], totalCount: 0 }
  }
}

export default async function TeamPage({ searchParams }) {
  const params = await searchParams
  const selectedYear = params?.year || ""
  const selectedBatch = params?.batch || ""

  const { executives, totalCount } = await getExecutives(selectedYear, selectedBatch)
  const hasFilters = selectedYear || selectedBatch

  // Hardcoded for now, or fetch from API
  const availableYears = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018]
  const availableBatches = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

  return (
    <section id="team" className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        <TeamHeader
          totalTeams={totalCount}
          selectedYear={selectedYear}
          selectedBatch={selectedBatch}
          availableYears={availableYears}
          availableBatches={availableBatches}
        />
        
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          {executives.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Users className="w-10 h-10 text-gray-400 dark:text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {hasFilters ? "No Members Found" : "No Executives Available"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                {hasFilters 
                  ? "Try adjusting your filters or clear them to see all members." 
                  : "There are currently no executive members to display."}
              </p>
              
              {/* FIX IS HERE: Use Link instead of Button */}
              {hasFilters && (
                <Link
                  href="/team"
                  className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors inline-block"
                >
                  Clear Filters
                </Link>
              )}

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {executives.map((member, index) => (
                <TeamCard key={member.id || index} member={member} />
              ))}
            </div>
          )}
        </Suspense>
      </div>
    </section>
  )
}