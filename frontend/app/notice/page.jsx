import { Suspense } from "react"
import NoticesContent from "@/components/notices/NoticesContent"
import GlobalSkeleton from "@/components/GlobalSkeleton"


export const metadata = {
  title: "Notices | Student Portal",
  description: "Updates, events, and workshops.",
}

export default async function NoticesPage({ searchParams }) {
  // 1. Read URL params (Next.js 15+ requires awaiting searchParams)
  const params = await searchParams
  const page = Number(params?.page) || 1
  const filter = params?.filter || 'all'

  return (
    <section 
      id="notices" 
      className="py-20 lg:py-32 relative bg-background text-foreground transition-colors duration-300"
    >
      <div className="container pt-32 mx-auto px-4 lg:px-8">
        
        {/* 2. Suspense Boundary for Instant Loading */}
        <Suspense key={`${page}-${filter}`} fallback={<GlobalSkeleton />}>
          <NoticesContent currentPage={page} filter={filter} />
        </Suspense>

      </div>
    </section>
  )
}