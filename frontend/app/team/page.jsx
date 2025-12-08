import { Suspense } from "react"
import TeamContent from "@/components/team/TeamContent"
import { Users } from "lucide-react"

// A simple Skeleton specific to the Team page
function TeamSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-96 rounded-2xl bg-gray-200 dark:bg-gray-800" />
      ))}
    </div>
  )
}

export default async function TeamPage({ searchParams }) {
  const params = await searchParams
  const year = params?.year || ""
  const batch = params?.batch || ""

  return (
    <section id="team" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 pt-32 lg:px-8 max-w-7xl">
        
        {/* The Suspense Boundary isolates the slow part */}
        <Suspense key={`${year}-${batch}`} fallback={<TeamSkeleton />}>
          <TeamContent year={year} batch={batch} />
        </Suspense>

      </div>
    </section>
  )
}