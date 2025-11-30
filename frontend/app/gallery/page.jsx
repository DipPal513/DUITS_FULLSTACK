import Footer from "@/components/footer"
import PhotoGallery from "@/components/gallery"
import Navigation from "@/components/navigation"
import TechBackground from "@/components/tech-background"

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <TechBackground />
      <Navigation />
      <div className="pt-20">
        <PhotoGallery />
      </div>
      <Footer />
    </main>
  )
}
