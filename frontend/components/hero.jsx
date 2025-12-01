"use client"

import gsap from "gsap"
import { ArrowRight, Code, Palette, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Custom Hook for Theme Detection
function useTheme() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkTheme()
    
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })

    return () => observer.disconnect()
  }, [])

  return isDark
}

// 3D Perspective Grid
function PerspectiveGrid() {
  const canvasRef = useRef(null)
  const isDark = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const draw = () => {
      ctx.fillStyle = isDark ? '#000000' : '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.005

      const centerX = canvas.width / 2
      const centerY = canvas.height * 0.7
      const gridSize = 40
      const perspective = 300

      // Draw perspective grid
      for (let z = 0; z < 20; z++) {
        for (let x = -15; x <= 15; x++) {
          const zPos = z * 2 - time * 2
          const adjustedZ = (zPos % 40)
          
          if (adjustedZ > 0 && adjustedZ < 20) {
            const scale = perspective / (perspective + adjustedZ * 30)
            
            const x1 = centerX + x * gridSize * scale
            const y1 = centerY + adjustedZ * gridSize * scale
            const x2 = centerX + (x + 1) * gridSize * scale
            const y2 = y1

            const opacity = Math.max(0, Math.min(1, 1 - adjustedZ / 20)) * 0.4

            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.strokeStyle = isDark 
              ? `rgba(6, 182, 212, ${opacity})` 
              : `rgba(6, 182, 212, ${opacity * 0.7})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        // Vertical lines
        for (let x = -15; x <= 15; x++) {
          const z1Pos = z * 2 - time * 2
          const z2Pos = (z + 1) * 2 - time * 2
          
          const adjustedZ1 = (z1Pos % 40)
          const adjustedZ2 = (z2Pos % 40)
          
          if (adjustedZ1 > 0 && adjustedZ1 < 20 && adjustedZ2 > 0 && adjustedZ2 < 20) {
            const scale1 = perspective / (perspective + adjustedZ1 * 30)
            const scale2 = perspective / (perspective + adjustedZ2 * 30)
            
            const x1 = centerX + x * gridSize * scale1
            const y1 = centerY + adjustedZ1 * gridSize * scale1
            const x2 = centerX + x * gridSize * scale2
            const y2 = centerY + adjustedZ2 * gridSize * scale2

            const opacity = Math.max(0, Math.min(1, 1 - adjustedZ1 / 20)) * 0.3

            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.strokeStyle = isDark 
              ? `rgba(6, 182, 212, ${opacity})` 
              : `rgba(6, 182, 212, ${opacity * 0.7})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDark])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

// Floating Data Visualization
function DataVisualization() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const bars = svgRef.current.querySelectorAll('.data-bar')
    
    bars.forEach((bar, i) => {
      gsap.to(bar, {
        attr: { height: () => Math.random() * 80 + 40 },
        duration: 2 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2
      })
    })
  }, [])

  return (
    <svg ref={svgRef} className="absolute top-20 left-20 opacity-20 dark:opacity-30 pointer-events-none" width="200" height="150" viewBox="0 0 200 150">
      <rect className="data-bar" x="20" y="70" width="25" height="80" fill="url(#barGrad1)" rx="3" />
      <rect className="data-bar" x="60" y="50" width="25" height="100" fill="url(#barGrad2)" rx="3" />
      <rect className="data-bar" x="100" y="60" width="25" height="90" fill="url(#barGrad3)" rx="3" />
      <rect className="data-bar" x="140" y="40" width="25" height="110" fill="url(#barGrad1)" rx="3" />
      
      <defs>
        <linearGradient id="barGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="barGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="barGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Code Window Mockup
function CodeWindow() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.to(containerRef.current, {
      y: 20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }, [])

  return (
    <div ref={containerRef} className="absolute bottom-20 right-20 opacity-20 dark:opacity-30 pointer-events-none">
      <div className="w-64 h-40 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 rounded-lg shadow-2xl p-3">
        <div className="flex gap-1.5 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <div className="space-y-2 font-mono text-xs">
          <div className="flex gap-2">
            <span className="text-purple-400 dark:text-purple-600">const</span>
            <span className="text-blue-400 dark:text-blue-600">future</span>
            <span className="text-gray-400 dark:text-gray-600">=</span>
          </div>
          <div className="pl-4 text-cyan-400 dark:text-cyan-600">"innovation"</div>
        </div>
      </div>
    </div>
  )
}

// Wireframe Browser
function WireframeBrowser() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.to(containerRef.current, {
      y: -20,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }, [])

  return (
    <div ref={containerRef} className="absolute top-32 right-32 opacity-15 dark:opacity-25 pointer-events-none">
      <svg width="200" height="150" viewBox="0 0 200 150">
        <rect x="10" y="10" width="180" height="130" rx="5" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500" />
        <line x1="10" y1="30" x2="190" y2="30" stroke="currentColor" strokeWidth="2" className="text-blue-500" />
        <circle cx="25" cy="20" r="3" fill="currentColor" className="text-blue-500" />
        <circle cx="35" cy="20" r="3" fill="currentColor" className="text-blue-500" />
        <circle cx="45" cy="20" r="3" fill="currentColor" className="text-blue-500" />
        
        <rect x="30" y="50" width="140" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-500" />
        <rect x="30" y="75" width="80" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-500" />
        <rect x="30" y="95" width="100" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-500" />
      </svg>
    </div>
  )
}

// Gradient Orbs
function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute top-1/4 -left-48 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 dark:opacity-10 animate-pulse"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 dark:opacity-10 animate-pulse"
        style={{ 
          background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
          animationDelay: '1.5s'
        }}
      />
    </div>
  )
}

// Background Container
function BackgroundEffects() {
  return (
    <>
      <PerspectiveGrid />
      <GradientOrbs />
      <DataVisualization />
      <CodeWindow />
      <WireframeBrowser />
    </>
  )
}

// Hero Content
function HeroContent() {
  const buttonsRef = useRef(null)
  const cardsRef = useRef(null)



  return (
    <div className="relative z-20 container mx-auto px-6 lg:px-8 mt-24 py-20">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1.1]">
          <span className="block text-gray-900 dark:text-white mb-2">
            Shape Tomorrow's
          </span>
          <span className="block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400">
              Technology & Design
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Where innovation meets creativity. Join a community of builders, designers, and dreamers creating the future of tech.
        </p>

        {/* Buttons */}
        <div  className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <button className="group relative px-10 py-4 text-base font-semibold rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-gray-900/30 dark:hover:shadow-white/30 w-full sm:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
          
          <button className="group relative px-10 py-4 text-base font-semibold rounded-full border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:border-gray-900 dark:hover:border-white transition-all duration-300 w-full sm:w-auto">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Learn More
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 group-hover:scale-150 transition-transform duration-300" />
            </span>
          </button>
        </div>

        {/* Feature Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="group p-8 rounded-2xl bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Development</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Build cutting-edge applications with modern frameworks and tools</p>
          </div>

          <div className="group p-8 rounded-2xl bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Design</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Create beautiful experiences with UI/UX and visual design</p>
          </div>

          <div className="group p-8 rounded-2xl bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 hover:border-yellow-500 dark:hover:border-yellow-400 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Innovation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Explore emerging technologies and innovative solutions</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Hero Component
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black">
      <BackgroundEffects />
      <HeroContent />
    </section>
  )
}