import Achievements from "@/components/achievements"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import Navigation from "@/components/navigation"
import QuickActions from "@/components/quick-actions"
import SocietyIntro from "@/components/society-intro"
import TechBackground from "@/components/tech-background"

export default function Home() {
  return (
    <main className="min-h-screen">
      <TechBackground />
      <Navigation />
      <Hero />
      <QuickActions />
      <SocietyIntro />
      <Achievements />
      <Footer />
    </main>
  )
}
