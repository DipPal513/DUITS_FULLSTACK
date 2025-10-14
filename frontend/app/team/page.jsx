import Navigation from "@/components/navigation"
import Team from "@/components/team"
import Footer from "@/components/footer"
import TechBackground from "@/components/tech-background"

export default function TeamPage() {
  return (
    <main className="min-h-screen">
      <TechBackground />
      <Navigation />
      <div className="pt-20">
        <Team />
      </div>
      <Footer />
    </main>
  )
}
