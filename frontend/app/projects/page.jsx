import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import Projects from "@/components/projects"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <Projects />
      </div>
      <Footer />
    </main>
  )
}
