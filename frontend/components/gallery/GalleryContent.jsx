import api from "@/config"; 
import GalleryGrid from "@/components/galleryGrid";
import { ImageIcon } from "lucide-react";

// Data Fetching Logic moved here
async function getGalleryImages() {
  try {
    const res = await api.get('/gallery');
    return res?.data?.galleries || [];
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return [];
  }
}

export default async function GalleryContent() {
  // The slow await happens here, safely inside Suspense
  const gallery = await getGalleryImages();

  if (!gallery || gallery.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
          <ImageIcon className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">No Images Found</h3>
        <p className="text-slate-500 dark:text-slate-400">The gallery is currently empty.</p>
      </div>
    );
  }

  // Pass data to the Client Component
  return <GalleryGrid initialGallery={gallery} />;
}