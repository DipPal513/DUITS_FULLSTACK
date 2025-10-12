import Navigation from "@/components/navigation"
import Gallery from "@/components/gallery"
import Footer from "@/components/footer"
import TechBackground from "@/components/tech-background"

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <TechBackground />
      <Navigation />
      <div className="pt-20">
        <Gallery />
      </div>
      <Footer />
    </main>
  )
}
