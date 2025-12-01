import Navigation from "@/components/navigation"
import About from "@/components/about"
import Footer from "@/components/footer"
import TechBackground from "@/components/tech-background"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <TechBackground />
      <Navigation />
      <div>
        <About />
      </div>
      <Footer />
    </main>
  )
}
