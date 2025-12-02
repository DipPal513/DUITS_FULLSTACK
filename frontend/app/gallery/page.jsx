import PhotoGallery from "@/components/gallery"
import TechBackground from "@/components/tech-background"

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <TechBackground />
     
      <div className="pt-20">
        <PhotoGallery />
      </div>
      
    </main>
  )
}
