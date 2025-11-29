import Achievements from "@/components/achievements"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import Navigation from "@/components/navigation"
import QuickActions from "@/components/quick-actions"
import SocietyIntro from "@/components/society-intro"
import Stat from "@/components/stat/Stat"
import ScrollText from "@/components/scrollText/ScrollText"
import PresidentMessage from "@/components/presidentMessage/PresidentMessage"
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <TechBackground /> */}
      <Navigation />
      <Hero />
      <Stat />
      <ScrollText />
      <PresidentMessage />
      
     
      <Achievements />
      <Footer />
    </main>
  )
}
