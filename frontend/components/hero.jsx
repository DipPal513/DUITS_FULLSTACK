"use client"

import React, { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ArrowRight, Code2, Cpu, Globe, Layers, Zap } from "lucide-react"

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
      {/* --- BACKGROUND: Technical Grid --- */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.5] dark:opacity-[0.1]">
        <div className="absolute inset-0" 
             style={{ 
               backgroundImage: `linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)`, 
               backgroundSize: '50px 50px' 
             }}>
        </div>
        {/* Soft Vignette to focus center */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-gray-50 dark:from-[#09090b] dark:via-transparent dark:to-[#09090b]"></div>
      </div>


      <div className="container pt-32 mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* --- LEFT: The Message --- */}
        <div ref={leftContentRef} className="space-y-8 max-w-2xl">
          
          {/* Top Label */}
          <div className="flex items-center gap-3">
             <div className="h-px w-12 bg-blue-600"></div>
             <span className="text-sm font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">
               University of Dhaka
             </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
            Technology, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-500 dark:to-blue-500">
              Community,
            </span> <br />
            Leadership.
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-gray-200 dark:border-gray-800 pl-6">
            The University's premier platform for digital innovation. We are a multidisciplinary ecosystem connecting <strong className="text-gray-900 dark:text-white">Coders</strong>, <strong className="text-gray-900 dark:text-white">Engineers</strong>, and <strong className="text-gray-900 dark:text-white">Designers</strong> to build the future.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
               <span className="relative z-10 flex items-center gap-2">
                 Join the Society
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </span>
            </button>
            
            <button className="px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white font-semibold rounded-lg hover:border-red-600 hover:text-red-600 dark:hover:border-red-500 dark:hover:text-red-500 transition-colors">
              Explore Departments
            </button>
          </div>

          {/* Trust Bar */}
          <div className="pt-8 flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-500 grayscale opacity-80">
             <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" /> Est. 2011
             </div>
             <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
             <div className="flex items-center gap-2">
                <Users className="w-4 h-4" /> 3,500+ Alumni
             </div>
             <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
             <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" /> 50+ Annual Events
             </div>
          </div>
        </div>

        {/* --- RIGHT: The "Tech Stack" Visual --- */}
        <div ref={rightVisualRef} className="relative h-[600px] w-full hidden lg:flex items-center justify-center perspective-[1500px]">
          
          {/* Card 1: Development (Back) */}
          <div className="tech-card absolute z-10 w-80 h-96 bg-gray-900 dark:bg-[#18181b] rounded-2xl p-6 shadow-2xl border border-gray-700 dark:border-gray-800 flex flex-col justify-between origin-bottom-left">
             <div className="flex justify-between items-center text-gray-500">
                <Code2 className="w-8 h-8 text-blue-500" />
                <span className="text-xs font-mono uppercase">System.dev</span>
             </div>
             <div className="space-y-2">
                <div className="h-2 w-full bg-gray-800 rounded-full"></div>
                <div className="h-2 w-3/4 bg-gray-800 rounded-full"></div>
                <div className="h-2 w-1/2 bg-blue-900/40 rounded-full"></div>
             </div>
             <div>
                <h3 className="text-xl font-bold text-white">Software Wing</h3>
                <p className="text-sm text-gray-400">Full Stack & AI Research</p>
             </div>
          </div>

          {/* Card 2: Robotics (Middle) */}
          <div className="tech-card absolute z-20 w-80 h-96 bg-white dark:bg-[#202025] rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-200 dark:border-gray-700 flex flex-col justify-between origin-bottom-center">
             <div className="flex justify-between items-center text-gray-400">
                <Cpu className="w-8 h-8 text-red-600" />
                <span className="text-xs font-mono uppercase">Hardware.io</span>
             </div>
             {/* Abstract Circuit visual */}
             <div className="relative h-20 w-full border-t border-b border-gray-100 dark:border-gray-800 my-4 flex items-center justify-around">
                <div className="w-8 h-8 border border-red-200 dark:border-red-900/30 rounded-full flex items-center justify-center">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <div className="h-px w-full bg-gray-200 dark:bg-gray-700 absolute"></div>
             </div>
             <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Robotics Wing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">IoT & Automation</p>
             </div>
          </div>

          {/* Card 3: Design/Network (Front) */}
          <div className="tech-card absolute z-30 w-80 h-96 bg-gray-100 dark:bg-black rounded-2xl p-6 shadow-2xl border border-gray-300 dark:border-gray-800 flex flex-col justify-between origin-bottom-right">
             <div className="flex justify-between items-center text-gray-400">
                <Layers className="w-8 h-8 text-purple-600" />
                <span className="text-xs font-mono uppercase">Creative.ui</span>
             </div>
             
             {/* Abstract Design Visual */}
             <div className="grid grid-cols-2 gap-2 my-4">
                <div className="aspect-square rounded-lg bg-purple-100 dark:bg-purple-900/20"></div>
                <div className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-800"></div>
                <div className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-800"></div>
                <div className="aspect-square rounded-lg bg-red-100 dark:bg-red-900/20"></div>
             </div>

             <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Creative & Net</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Design & Infrastructure</p>
             </div>
          </div>

        </div>

      </div>
    </section>
  )
}

function Users(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }