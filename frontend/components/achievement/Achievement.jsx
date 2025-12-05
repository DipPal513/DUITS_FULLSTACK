import { Suspense } from "react"
import api from "@/config/index" // Your existing Axios config or use fetch
import AchievementsGrid from "@/components/achievement/achievementGrid"
// 1. Define Skeleton for Loading State
const AchievementsSkeleton = () => (
  <section className="py-24 dark:bg-black bg-gray-200">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-20 animate-pulse">
        <div className="h-12 bg-gray-300 dark:bg-zinc-800 rounded w-1/2 mx-auto mb-6"></div>
        <div className="h-4 bg-gray-300 dark:bg-zinc-800 rounded w-1/3 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative overflow-hidden rounded-[2rem] bg-zinc-900 h-[28rem] border border-zinc-800">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  </section>
)

// 2. Data Fetching Function
async function getAchievements() {
  try {
    // Next.js extends fetch to allow caching configuration
    // revalidate: 3600 = cache for 1 hour
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/achievement`, {
      next: { revalidate: 3600 } 
    })
    
    if (!res.ok) throw new Error("Failed to fetch")
    
    const data = await res.json()
    return data?.data?.achievements || []
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return []
  }
}

// 3. Server Component
export default async function Achievements() {
  const achievements = await getAchievements()

  return (
    <Suspense fallback={<AchievementsSkeleton />}>
      <AchievementsGrid achievements={achievements} />
    </Suspense>
  )
}