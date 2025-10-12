import Navigation from "@/components/navigation"
import Blog from "@/components/blog"
import Footer from "@/components/footer"
import TechBackground from "@/components/tech-background"

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <TechBackground />
      <Navigation />
      <div className="pt-20">
        <Blog />
      </div>
      <Footer />
    </main>
  )
}
