"use client"

import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ArrowRight, Code2, Terminal } from "lucide-react"
import { useEffect, useRef } from "react"
import DarkVeil from "@/components/DarkVeil"

export default function Hero() {
  const headingRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)
  const taglineRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.from(taglineRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power4.out"
    })
    .from(headingRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    }, "-=0.4")
    .from(subtitleRef.current, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    }, "-=0.6")
    .from(buttonsRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power4.out"
    }, "-=0.5")
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Layer 1: DarkVeil Background */}
      <div className="absolute inset-0 z-0">
        <DarkVeil />
      </div>

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 z-5 opacity-[0.02]" 
           style={{
             backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }}
      />

      {/* Layer 3: Hero Content */}
      <div className="relative z-20  pt-10 sm:pt-0 container mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* IT Club Badge */}
          <div ref={taglineRef} className="inline-flex items-center gap-3 mb-10 px-6 py-3 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-gray-300 tracking-wider uppercase">IT Club · Code · Create · Innovate</span>
          </div>

          {/* Heading */}
          <h1 ref={headingRef} className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight leading-[0.9]">
            <span className="block text-white mb-4">Build the</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient bg-[length:200%_auto]">
              Future
            </span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-xl sm:text-2xl md:text-3xl text-gray-400 mb-14 max-w-3xl mx-auto leading-relaxed font-light">
            Where developers, designers, and tech enthusiasts collaborate to build tomorrow's innovations
          </p>

          {/* Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button className="group relative px-10 py-5 text-lg font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Join the Club
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            
            <button className="group relative px-10 py-5 text-lg font-semibold rounded-full border-2 border-gray-700 text-white overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:bg-gray-900/50 w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Terminal className="w-5 h-5" />
                Explore Projects
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}