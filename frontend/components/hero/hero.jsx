"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import Background from "./Background"
import LeftContent from "./LeftContent"
import RightContent from "./RightContent"

export default function DUITSProfessionalHero() {
  const containerRef = useRef(null)
  const leftContentRef = useRef(null)
  const rightVisualRef = useRef(null)

  gsap.registerPlugin(useGSAP)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    // 1. Entrance: Content Stagger
    tl.fromTo(leftContentRef.current.children, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1 }
    )

    // 2. Entrance: Visual Cards (Fan out effect)
    const cards = rightVisualRef.current.querySelectorAll(".tech-card")
    tl.fromTo(cards,
      { y: 40, opacity: 0, rotation: 0 },
      { y: 0, opacity: 1, rotation: (i) => (i - 1) * 6, stagger: 0.15, duration: 1.2, ease: "back.out(1.2)" }, // Mild rotation for style
      "-=0.8"
    )

    // 3. Continuous "Hover" Animation (Smooth, GPU optimized)
    gsap.to(cards, {
      y: -10,
      duration: 4,
      stagger: { each: 0.5, from: "center" },
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

  }, { scope: containerRef })

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[90vh] flex items-center justify-center bg-gray-50 dark:bg-[#09090b] transition-colors duration-300 overflow-hidden"
    >
    <Background />
      <div className="container pt-32 mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* --- LEFT: The Message --- */}
        <LeftContent leftContentRef={leftContentRef} />
        {/* --- RIGHT: The "Tech Stack" Visual --- */}
        
      <RightContent rightVisualRef={rightVisualRef}/>
      </div>
    </section>
  )
}

