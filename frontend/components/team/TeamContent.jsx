import api from "@/config/index"
import TeamHeader from "@/components/team/TeamHeader"
import TeamCard from "@/components/team/TeamCard"
import EmptyTeamState from "@/components/team/EmptyState"

// --- Constants ---
const POSITION_ORDER = [
  "President", "Vice President", "General Secretary", "Joint General Secretary", 
  "Treasurer", "Office Secretary", "Publicity and Publication Secretary",
  "External Communication Secretary", "Skill Development Secretary",
  "Information and Research Secretary", "Event Secretary", 
  "Organizing Secretary", "Design Lead", "Junior Executive", "General Member"
]

const AVAILABLE_YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018]
const AVAILABLE_BATCHES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

// --- Helper Functions ---
const cleanStr = (str) => str?.toLowerCase().trim() || ""

async function getExecutives(year, batch) {
  try {
    const params = new URLSearchParams()
    if (year) params.append('year', year)
    if (batch) params.append('batch', batch)
    
    const queryString = params.toString() ? `?${params.toString()}` : ''
    const response = await api.get(`/executive${queryString}`)
  
    if (response?.data?.executives) {
      return {
        executives: response.data.executives || [],
        totalCount: response.data.totalCount || 0
      }
    }
    return { executives: [], totalCount: 0 }
  } catch (error) {
    console.error("Error fetching executives:", error)
    return { executives: [], totalCount: 0 }
  }
}

// --- Main Component ---
export default async function TeamContent({ year, batch }) {
  // 1. Fetch
  const { executives, totalCount } = await getExecutives(year, batch)

  // 2. Sort
  const sortedExecutives = [...executives].sort((a, b) => {
    const roleA = cleanStr(a.position || a.designation)
    const roleB = cleanStr(b.position || b.designation)
    const indexA = POSITION_ORDER.findIndex(p => cleanStr(p) === roleA)
    const indexB = POSITION_ORDER.findIndex(p => cleanStr(p) === roleB)

    if (indexA === -1 && indexB === -1) return 0
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })

  // 3. Render
  return (
    <>
      <TeamHeader
        totalTeams={totalCount}
        selectedYear={year}
        selectedBatch={batch}
        availableYears={AVAILABLE_YEARS}
        availableBatches={AVAILABLE_BATCHES}
      />

      {sortedExecutives.length === 0 ? (
        <EmptyTeamState hasFilters={!!(year || batch)} selectedYear={year} selectedBatch={batch} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedExecutives.map((member, index) => {
             // Handle unique presidents spanning columns
             const isPresident = member.position === "President"
             
             return (
              <div 
                key={member._id || index} 
                className={ "col-span-1"}
              >
                <TeamCard member={member} />
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}