import supabaseApi from "@/config/supabaseApi"
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

const AVAILABLE_YEARS = [2025, 2026, 2027, 2028]
const AVAILABLE_BATCHES = ["11", "12", "13", "14"]

// --- Helper Functions ---
const cleanStr = (str) => str?.toLowerCase().trim() || ""

async function getExecutives(year, batch) {
  try {
    const response = await supabaseApi.getExecutives(year, batch)
  
    if (response?.executives) {
      return {
        executives: response.executives || [],
        totalCount: response.totalCount || 0
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
  // 1. Fetch all executives for the selected year so we can determine the latest batch dynamically
  const { executives } = await getExecutives(year, "")

  // 2. Determine the latest batch across fetched executives
  const latestBatch = executives.length > 0
    ? Math.max(...executives.map((e) => parseInt(e.duits_batch) || 0))
    : null

  const activeBatch = batch || ""
  const filteredExecutives = activeBatch
    ? executives.filter((exec) => String(exec.duits_batch) === String(activeBatch))
    : executives

  // 3. Sort only the displayed executives
  const sortedExecutives = [...filteredExecutives].sort((a, b) => {
    const batchA = parseInt(a.duits_batch || "0") || 0
    const batchB = parseInt(b.duits_batch || "0") || 0
    if (batchA !== batchB) return batchB - batchA

    const roleA = cleanStr(a.position || a.designation)
    const roleB = cleanStr(b.position || b.designation)
    const indexA = POSITION_ORDER.findIndex(p => cleanStr(p) === roleA)
    const indexB = POSITION_ORDER.findIndex(p => cleanStr(p) === roleB)

    if (indexA === -1 && indexB === -1) return 0
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })

  // 4. Render
  return (
    <>
      <TeamHeader
        totalTeams={filteredExecutives.length}
        selectedYear={year}
        selectedBatch={activeBatch}
        availableYears={AVAILABLE_YEARS}
          availableBatches={AVAILABLE_BATCHES}
      />

      {sortedExecutives.length === 0 ? (
        <EmptyTeamState hasFilters={!!(year || batch)} selectedYear={year} selectedBatch={activeBatch} />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
          {sortedExecutives.map((member, index) => {
             // Handle unique presidents spanning columns
             const isPresident = member.position === "President"
const memberBatch = parseInt(member.duits_batch) || 0
             const isLatest = memberBatch === latestBatch
             
             return (
              <div 
                key={member._id || index} 
                className={ "col-span-1"}
              >
                <TeamCard member={member} isLatest={isLatest} />
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}