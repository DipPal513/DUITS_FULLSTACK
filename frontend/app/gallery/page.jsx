
import GlobalSkeleton from "@/components/GlobalSkeleton";
import GalleryGrid from "@/components/gallery"; // Adjust path as needed
import TechBackground from "@/components/tech-background";
import api from "@/config";
import { Suspense } from "react";


async function getGalleryImages() {
  try {
    const res = await api.get('/gallery')
    return res?.data?.galleries || []
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return []
  }
}
export default async function GalleryPage() {
  // Server-side data fetcher

// Fetch data on the server
  const gallery = await getGalleryImages()

  return (
    <main className="min-h-screen">
      <TechBackground />
     
      <section className="pt-20">
     


  

    <div id="gallery" className="py-20 lg:py-32 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Event Gallery
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Relive the memorable moments from our events, workshops, and community gatherings
          </p>
        </div>

        {/* Load Client Component inside Suspense */}
        <Suspense fallback={<GlobalSkeleton />}>
          <GalleryGrid initialGallery={gallery} />
        </Suspense>
      </div>
    </div>
    </section>
      
    </main>
  )
}
