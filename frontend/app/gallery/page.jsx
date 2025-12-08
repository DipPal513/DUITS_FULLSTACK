import GalleryContent from "@/components/gallery/GalleryContent";
import GlobalSkeleton from "@/components/GlobalSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Event Gallery | Our Community",
  description: "Relive memorable moments from our events.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
    

      <section className="pt-20">
        <div id="gallery" className="py-20 lg:py-32 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50">
          <div className="container mx-auto px-6 lg:px-8">
            
            {/* Header Section - Loads Instantly */}
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent tracking-tight">
                Event Gallery
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Relive the memorable moments from our events, workshops, and community gatherings
              </p>
            </div>

            {/* Content Area - Fetches Independently */}
            <Suspense fallback={<GlobalSkeleton />}>
              <GalleryContent />
            </Suspense>
            
          </div>
        </div>
      </section>
    </main>
  );
}