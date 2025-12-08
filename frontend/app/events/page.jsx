import { Suspense } from "react"

import EventsContent from "@/components/events/EventContent"
import GlobalSkeleton from "@/components/GlobalSkeleton"

export default async function EventsPage({ searchParams }) {
  // 1. Await params instantly (Next.js 15/16 requirement)
  const params = await searchParams
  
  const page = Number(params?.page) || 1
  const filter = params?.filter || "all"

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
  

      <section className="pt-20">
        <div id="events" className="py-20 lg:py-32 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50">
          <div className="container mx-auto px-6 lg:px-8">
            
            {/* 2. The Suspense Boundary 
                This allows the page to navigate INSTANTLY while the 
                fetch happens inside <EventsContent /> */}
            <Suspense fallback={<GlobalSkeleton />}>
              <EventsContent page={page} filter={filter} />
            </Suspense>

          </div>
        </div>
      </section>
    </main>
  )
}