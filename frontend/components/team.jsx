import { Suspense } from "react"
import Link from "next/link" // <--- 1. Import this
import api from "@/config/index"
import TeamHeader from "@/components/team/TeamHeader"
import TeamCard from "@/components/team/TeamCard"
import { Users } from "lucide-react"

// ... (Keep SkeletonCard and LoadingState same as before) ...

async function getExecutives(year, batch) {
  try {
    const params = new URLSearchParams()
    if (year) params.append('year', year)
    if (batch) params.append('batch', batch)
    
    const queryString = params.toString() ? `?${params.toString()}` : ''
    
    const response = await api.get(`/executive${queryString}`)
    console.log("fetch update here : ",response);
    if (response?.data?.success) {
         return {
            executives: response.data.executives || [],
            totalCount: response.data.totalCount || 0
         }
    }
    
    return {
      executives: response?.data?.executives || [],
      totalCount: response?.data?.totalCount || 0
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

  // 1. Fetch Data
  const { executives, totalCount } = await getExecutives(selectedYear, selectedBatch)
  const hasFilters = selectedYear || selectedBatch
// ... inside TeamPage component ...

  
  // 1. The Order List (Keep this clean)
  const positionOrder = [
    "President", 
    "Vice President", 
    "General Secretary", 
    "Joint General Secretary", 
    "Treasurer",
    "Office Secretary", 
    "Publicity and Publication Secretary",
    "External Communication Secretary",
    "Skill Development Secretary",
    "Information and Research Secretary",
    "Event Secretary", 
    "Organizing Secretary", 
    "Design Lead",
    "Junior Executive",
    "General Member"
  ]

  // 2. Helper to clean strings for comparison
  const cleanStr = (str) => str?.toLowerCase().trim() || ""

  // 3. Robust Sorting Logic
  const sortedExecutives = [...executives].sort((a, b) => {
    // Check both 'position' and 'designation' keys just in case
    const roleA = cleanStr(a.position || a.designation)
    const roleB = cleanStr(b.position || b.designation)

    // Find the index by comparing cleaned strings
    const indexA = positionOrder.findIndex(p => cleanStr(p) === roleA)
    const indexB = positionOrder.findIndex(p => cleanStr(p) === roleB)

    // DEBUG: Uncomment this if it still fails to see exactly what is being compared
    // console.log(`Comparing: "${roleA}" (${indexA}) vs "${roleB}" (${indexB})`)

    // Logic: Put unknown roles at the bottom
    if (indexA === -1 && indexB === -1) return 0
    if (indexA === -1) return 1  // A is unknown, push it down
    if (indexB === -1) return -1 // B is unknown, push it down (so A comes up)

    // Ascending sort (0 comes first)
    return indexA - indexB
  })

// ... rest of your return statement mapping over sortedExecutives ...

  // Hardcoded filters
  const availableYears = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018]
  const availableBatches = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

  return (
    <section id="team" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 pt-32 lg:px-8 max-w-7xl">
        
        <TeamHeader
          totalTeams={totalCount}
          selectedYear={selectedYear}
          selectedBatch={selectedBatch}
          availableYears={availableYears}
          availableBatches={availableBatches}
        />
        
        <Suspense fallback={<div className="text-center py-20">Loading team data...</div>}>
          {sortedExecutives.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-white/50 dark:bg-gray-900/50">
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {hasFilters ? "No members found" : "Team list is empty"}
              </h3>
              <p className="text-gray-500 text-center max-w-sm mt-1 mb-6">
                {hasFilters 
                  ? `We couldn't find any executives for Year ${selectedYear} / Batch ${selectedBatch}.`
                  : "Check back later for updates."}
              </p>
              
              {hasFilters && (
                <Link
                  href="/team"
                  className="px-5 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-colors text-sm"
                >
                  Clear all filters
                </Link>
              )}
            </div>
          ) : (
            // 4. Grid Layout (Using sortedExecutives)
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedExecutives.map((member, index) => {
                // Optional: Check if President to span 2 columns
                const isPresident = member.position === "President";
                
                return (
                  <div 
                    key={member._id || index} 
                    className={isPresident ? "md:col-span-2 lg:col-span-2" : "col-span-1"}
                  >
                    <TeamCard member={member} />
                  </div>
                )
              })}
            </div>
          )}
        </Suspense>
      </div>
    </section>
  )
}