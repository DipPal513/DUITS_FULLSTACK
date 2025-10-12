import Navigation from "@/components/navigation"
import Events from "@/components/events"
import Footer from "@/components/footer"
import TechBackground from "@/components/tech-background"

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <TechBackground />
      <Navigation />
      <div className="pt-20">
        <Events />
      </div>
      <Footer />
    </main>
  )
}
