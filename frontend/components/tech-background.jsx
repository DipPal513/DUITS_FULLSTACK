"use client"


import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { gsap } from "gsap"

export default function TechBackground() {
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const orb3Ref = useRef(null)
  const orb4Ref = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    // GSAP animations for gradient orbs
    if (orb1Ref.current) {
      gsap.to(orb1Ref.current, {
        x: 80,
        y: -60,
        scale: 1.1,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    }

    if (orb2Ref.current) {
      gsap.to(orb2Ref.current, {
        x: -100,
        y: 80,
        scale: 1.2,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    }

    if (orb3Ref.current) {
      gsap.to(orb3Ref.current, {
        x: 60,
        y: 70,
        scale: 1.15,
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      })
    }

    if (orb4Ref.current) {
      gsap.to(orb4Ref.current, {
        x: -70,
        y: -50,
        scale: 1.1,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    }

    return () => {
      gsap.killTweensOf([orb1Ref.current, orb2Ref.current, orb3Ref.current, orb4Ref.current])
    }
  }, [])

  const isDark = theme === "dark"

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: isDark
            ? "linear-gradient(to bottom right, #0a0a0f, #1a1a2e, #16213e)"
            : "linear-gradient(to bottom right, #f8fafc, #e0e7ff, #ddd6fe)",
        }}
      />

      {/* Animated gradient orbs */}
      <div
        ref={orb1Ref}
        className="absolute opacity-30 blur-3xl transition-opacity duration-500"
        style={{
          top: "10%",
          left: "10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 70%)"
            : "radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent 70%)",
        }}
      />

      <div
        ref={orb2Ref}
        className="absolute opacity-30 blur-3xl transition-opacity duration-500"
        style={{
          top: "50%",
          right: "10%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent 70%)"
            : "radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent 70%)",
        }}
      />

      <div
        ref={orb3Ref}
        className="absolute opacity-25 blur-3xl transition-opacity duration-500"
        style={{
          bottom: "15%",
          left: "30%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent 70%)"
            : "radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%)",
        }}
      />

      <div
        ref={orb4Ref}
        className="absolute opacity-20 blur-3xl transition-opacity duration-500"
        style={{
          top: "30%",
          right: "35%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(236, 72, 153, 0.35), transparent 70%)"
            : "radial-gradient(circle, rgba(236, 72, 153, 0.25), transparent 70%)",
        }}
      />

      {/* Subtle overlay for depth */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 50%, transparent 0%, rgba(10, 10, 15, 0.3) 100%)"
            : "radial-gradient(circle at 50% 50%, transparent 0%, rgba(248, 250, 252, 0.5) 100%)",
        }}
      />

      {/* Grid overlay for tech feel */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`
            : `linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
               linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Noise texture for premium feel */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}