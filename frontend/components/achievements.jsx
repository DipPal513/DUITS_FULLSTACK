// app/components/Achievements.tsx
"use client"

import axios from "axios"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}


// Skeleton Loader
const SkeletonCard = () => (
  <div className="relative overflow-hidden rounded-[2rem] bg-zinc-900 h-[28rem] border border-zinc-800">
    <div className="absolute inset-0">
      <div className="h-full w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse" />
    </div>
  </div>
)

// Achievement Card
const AchievementCard = ({ achievement, index }) => {
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const glowRef = useRef(null)
  const shineRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current
    const content = contentRef.current
    const glow = glowRef.current
    const shine = shineRef.current

    if (!card || !image || !content || !glow || !shine) return

    // Initial animation on scroll
    gsap.fromTo(
      card,
      { y: 100, opacity: 0, rotateX: -15 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Mouse move 3D effect
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      gsap.to(card, {
        rotateX: -rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out"
      })

      gsap.to(glow, {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        opacity: 0.6,
        duration: 0.3
      })
    }

    const handleMouseEnter = () => {
      gsap.to(image, {
        scale: 1.15,
        duration: 0.8,
        ease: "power2.out"
      })

      gsap.to(content, {
        y: -10,
        duration: 0.5,
        ease: "power2.out"
      })

      gsap.to(glow, {
        opacity: 0.6,
        duration: 0.3
      })

      // Shine effect
      gsap.fromTo(
        shine,
        { x: "-100%", opacity: 0 },
        { x: "200%", opacity: 1, duration: 1.2, ease: "power2.inOut" }
      )
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out"
      })

      gsap.to(image, {
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      })

      gsap.to(content, {
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      })

      gsap.to(glow, {
        opacity: 0,
        duration: 0.3
      })
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [index])

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-[2rem] cursor-pointer h-[28rem] group"
      style={{ transformStyle: "preserve-3d" }}
      onClick={() => achievement.link && window.open(achievement.link, '_blank')}
    >
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute w-64 h-64 rounded-full bg-blue-500/30 blur-3xl opacity-0 pointer-events-none z-10"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Shine effect */}
      <div
        ref={shineRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
        }}
      />

      {/* Image container */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={imageRef} className="w-full h-full">
          <img
            src={achievement.image}
            alt={achievement.title}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Border gradient */}
      <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-blue-500/50 transition-colors duration-500" />

      {/* Content */}
      <div ref={contentRef} className="relative h-full flex flex-col justify-end p-8 z-10">
        {/* Year badge with icon */}
        <div className="mb-4 flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
          <span className="text-sm font-mono text-blue-400 tracking-wider font-semibold">
            {achievement.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-3xl font-bold text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
          {achievement.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-base leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-200 transition-colors">
          {achievement.description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-blue-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Discover more</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-blue-500/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}

// Main Component
export default function Achievements() {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const headerRef = useRef(null)

  useEffect(() => {
    // Fetch achievements using modern approach
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/achievement`, {
          withCredentials: true,
        })
        setAchievements(response?.data?.data?.achievements || [])
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching achievements:", error)
        setAchievements([])
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [])

  useEffect(() => {
    if (!headerRef.current) return

    gsap.fromTo(
      headerRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top bottom-=100"
        }
      }
    )
  }, [])

  return (
    <section className="pb-24 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-2xl sm:text-5xl md:text-6xl font-bold mb-6  uppercase">
            Our Achievements
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Celebrating milestones that define our journey and inspire our future
          </p>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {achievements.slice(0, 3).map((achievement, index) => (
              <AchievementCard
                key={achievement.id || index}
                achievement={achievement}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
