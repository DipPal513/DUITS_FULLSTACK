import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import QuickActions from "@/components/quick-actions"
import SocietyIntro from "@/components/society-intro"
import Achievements from "@/components/achievements"
import Footer from "@/components/footer"
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
