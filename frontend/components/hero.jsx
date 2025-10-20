"use client"

import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ArrowRight, Code2, Cpu, Sparkles } from "lucide-react"
import { useEffect, useRef } from "react"

import FloatingIcons from "@/components/hero/FloatingIcons"

export default function Hero() {
  const headingRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)
  const statsRef = useRef([])

  useEffect(() => {
    // Hero text animations
    const tl = gsap.timeline()
    
    tl.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5")
    .from(buttonsRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    
    // Stats animation
    statsRef.current.forEach((stat, i) => {
      if (!stat) return
      gsap.from(stat, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        delay: 1 + i * 0.15,
        ease: "back.out(1.7)"
      })
    })
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      {/* Colorful Floating Icons with GSAP */}
      <FloatingIcons />

      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative mb-8 hidden md:block">

            <div className="absolute -top-10 left-1/6 animate-float">
              <div className="tech-card w-14 h-14 flex items-center justify-center backdrop-blur-sm">
                <div className="corner-accent top-left" />
                <div className="corner-accent top-right" />
                <Code2 className="w-7 h-7 text-primary" />
              </div>
            </div>
            <div className="absolute -top-5 right-1/6 animate-float" style={{ animationDelay: "1s" }}>
              <div className="tech-card w-14 h-14 flex items-center justify-center backdrop-blur-sm">
                <div className="corner-accent top-left" />
                <div className="corner-accent bottom-right" />
                <Cpu className="w-7 h-7 text-accent" />
              </div>
            </div>
           
           
          </div>

          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 tech-card backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary uppercase tracking-wider">Welcome to the Future</span>
          </div>

          <h1 ref={headingRef} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance tracking-tight">
            Innovation Through
            <span className="text-transparent block bg-clip-text bg-gradient-to-r from-primary to-accent">
              Technology
            </span>
          </h1>

          <p ref={subtitleRef} className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto text-pretty leading-relaxed px-4">
            Join a community of passionate developers, designers, and tech enthusiasts building the future together
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Button size="lg" className="group relative overflow-hidden w-full sm:w-auto">
              <span className="relative z-10 flex items-center cursor-pointer justify-center">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <Button size="lg" variant="outline" className="tech-card cursor-pointer hover:text-black w-full sm:w-auto">
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-20 max-w-3xl mx-auto px-4">
            <div ref={(el) => (statsRef.current[0] = el)} className="tech-card p-6 text-center backdrop-blur-sm">
              <div className="corner-accent top-left" />
              <div className="corner-accent bottom-right" />
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                500+
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Members</div>
            </div>
            <div ref={(el) => (statsRef.current[1] = el)} className="tech-card p-6 text-center backdrop-blur-sm">
              <div className="corner-accent top-left" />
              <div className="corner-accent bottom-right" />
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                50+
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Projects</div>
            </div>
            <div ref={(el) => (statsRef.current[2] = el)} className="tech-card p-6 text-center backdrop-blur-sm">
              <div className="corner-accent top-left" />
              <div className="corner-accent bottom-right" />
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                100+
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Events</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}