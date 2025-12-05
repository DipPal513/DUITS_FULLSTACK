import { Suspense } from "react";
import api from "@/config"; // Adjust path as needed
import GalleryGrid from "@/components/galleryGrid"; // Adjust path as needed
import GlobalSkeleton from "@/components/GlobalSkeleton"; // Adjust path as needed

// --- Reusable Styled Components ---
const TechBackground = () => (
  <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 transition-colors duration-300">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-slate-400 opacity-20 blur-[100px] dark:bg-indigo-500"></div>
  </div>
);

// --- Data Fetching ---
async function getGalleryImages() {
  try {
    const res = await api.get('/gallery');
    return res?.data?.galleries || [];
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return [];
  }
}

// --- Main Page Component ---
export default async function GalleryPage() {
  // Fetch data on the server
  const gallery = await getGalleryImages();

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Background Effect */}
      <TechBackground />

      <section className="pt-20">
        <div id="gallery" className="py-20 lg:py-32 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50">
          <div className="container mx-auto px-6 lg:px-8">
            
            {/* Header Section */}
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent tracking-tight">
                Event Gallery
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Relive the memorable moments from our events, workshops, and community gatherings
              </p>
            </div>

            {/* Content Area - Client Component */}
            <Suspense fallback={<GlobalSkeleton />}>
              <GalleryGrid initialGallery={gallery} />
            </Suspense>
            
          </div>
        </div>
      </section>
    </main>
  );
}