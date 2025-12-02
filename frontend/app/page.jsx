import Achievements from "@/components/achievements"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import Navigation from "@/components/navigation"
import PresidentMessage from "@/components/presidentMessage/PresidentMessage"
import ScrollText from "@/components/scrollText/ScrollText"
import Stat from "@/components/stat/Stat"
import WhatWeDo from "@/components/whatWeDo/WhatWeDo"
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <TechBackground /> */}
    
      <Hero />
      <Stat />
      <ScrollText />
      <PresidentMessage />
      <WhatWeDo />
     
      <Achievements />
     
    </main>
  )
}
