import Navigation from "@/components/navigation"
import Projects from "@/components/projects"
import Footer from "@/components/footer"
import TechBackground from "@/components/tech-background"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <TechBackground />
      <Navigation />
      <div className="pt-20">
        <Projects />
      </div>
      <Footer />
    </main>
  )
}
