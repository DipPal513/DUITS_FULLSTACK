import Achievements from "@/components/achievement/Achievement"
import Hero from "@/components/hero"
import PresidentMessage from "@/components/presidentMessage/PresidentMessage"
import ScrollText from "@/components/scrollText/ScrollText"
import Stat from "@/components/stat/Stat"
import WhatWeDo from "@/components/whatWeDo/WhatWeDo"
import MessageFromOurAdvisor from "@/components/MessageFromAdvisor/MessageFromAdvisor";
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <TechBackground /> */}
    
      <Hero />
      <Stat />
      <ScrollText />
      <MessageFromOurAdvisor />
      <PresidentMessage />
      <WhatWeDo />
     
      <Achievements />
     
    </main>
  )
}
