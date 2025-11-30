'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

const defaultMember = {
  id: 'team-123',
  name: 'Sarah Johnson',
  designation: 'Lead Engineer',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
}

const TeamCard = ({ member = defaultMember, loading = false }) => {
  const cardRef = useRef(null)
  const imageContainerRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const glowRef = useRef(null)
  const orbitRef = useRef(null)
  
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    const imageContainer = imageContainerRef.current
    const image = imageRef.current
    const content = contentRef.current
    const glow = glowRef.current
    const orbit = orbitRef.current


    // Mouse move handler for 3D tilt effect
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = ((y - centerY) / centerY) * -8
      const rotateY = ((x - centerX) / centerX) * 8

      // Card tilt
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out'
      })

      // Image container moves more
      gsap.to(imageContainer, {
        x: ((x - centerX) / centerX) * 15,
        y: ((y - centerY) / centerY) * 15,
        rotateZ: ((x - centerX) / centerX) * 5,
        duration: 0.5,
        ease: 'power2.out'
      })

      // Image scales
      gsap.to(image, {
        scale: 1.15,
        duration: 0.5,
        ease: 'power2.out'
      })

      // Content shifts
      gsap.to(content, {
        x: ((x - centerX) / centerX) * 8,
        y: ((y - centerY) / centerY) * 8,
        duration: 0.5,
        ease: 'power2.out'
      })

      // Glow follows cursor
      gsap.to(glow, {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        opacity: 0.5,
        scale: 1.2,
        duration: 0.3,
        ease: 'power2.out'
      })

      // Orbit ring rotates
      if (orbit) {
        gsap.to(orbit, {
          rotation: ((x - centerX) / centerX) * 20,
          duration: 0.4,
          ease: 'power2.out'
        })
      }
    }

    // Mouse enter handler
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.03,
        duration: 0.4,
        ease: 'power2.out'
      })

      gsap.to(glow, {
        opacity: 0.3,
        scale: 1,
        duration: 0.3
      })

      if (orbit) {
        gsap.to(orbit, {
          scale: 1.1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)'
        })
      }
    }

    // Mouse leave handler
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out'
      })

      gsap.to(imageContainer, {
        x: 0,
        y: 0,
        rotateZ: 0,
        duration: 0.6,
        ease: 'power3.out'
      })

      gsap.to(image, {
        scale: 1,
        duration: 0.6,
        ease: 'power3.out'
      })

      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      })

      gsap.to(glow, {
        opacity: 0,
        scale: 0.5,
        duration: 0.4
      })

      if (orbit) {
        gsap.to(orbit, {
          rotation: 0,
          scale: 1,
          opacity: 0.6,
          duration: 0.6,
          ease: 'power3.out'
        })
      }
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [loading, imageLoaded])

  // Loading Skeleton
  if (loading) {
    return (
      <div className="w-full max-w-md">
        <div className="relative h-32 rounded-2xl overflow-hidden bg-card border border-border">
          <div className="flex items-center gap-6 p-6 h-full">
            {/* Image Skeleton */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-muted animate-pulse" />
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-muted-foreground/20 animate-spin-slow" />
            </div>

            {/* Content Skeleton */}
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-muted rounded-lg animate-pulse w-3/4" />
              <div className="h-4 bg-muted rounded-lg animate-pulse w-1/2" />
            </div>
          </div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div 
        ref={cardRef}
        className="relative h-32 cursor-pointer"
        style={{ 
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Main Card Container */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-card border border-border shadow-lg">
          
          {/* Animated Glow Effect */}
          <div 
            ref={glowRef}
            className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-primary/30 rounded-full blur-3xl opacity-0 pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          />

          <div className="flex items-center gap-6 p-6 h-full relative">
            
            {/* Creative Image Section */}
            <div 
              ref={imageContainerRef}
              className="relative flex-shrink-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Orbital Ring */}
              <div 
                ref={orbitRef}
                className="absolute inset-[-12px] rounded-full border-2 border-dashed border-primary/30 opacity-60"
                style={{ transformStyle: 'preserve-3d' }}
              />

              {/* Glow Background */}
              <div className="absolute inset-[-8px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-md" />

              {/* Image Container */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-background shadow-xl">
                <div 
                  ref={imageRef}
                  className="w-full h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoaded(true)}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-muted animate-pulse" />
                  )}
                </div>
              </div>

              {/* Status Indicator */}
              <div 
                className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 ring-2 ring-background shadow-lg"
                style={{ transform: 'translateZ(10px)' }}
              >
                <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
              </div>

              {/* Floating Particles */}
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary/50 animate-pulse" />
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-primary/30 animate-pulse delay-75" />
            </div>

            {/* Content Section */}
            <div 
              ref={contentRef}
              className="flex-1 min-w-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground truncate">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground font-medium truncate">
                  {member.position || member.designation}
                </p>

                {/* Animated Underline */}
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-full transition-all duration-500" />
              </div>
            </div>

            {/* Arrow Indicator */}
            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <svg 
                  className="w-4 h-4 text-primary transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full opacity-50" />
          <div className="absolute bottom-0 left-0 w-12 h-12 bg-primary/5 rounded-tr-full opacity-30" />

          {/* Bottom Gradient Line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>

        {/* 3D Shadow Layer */}
        <div 
          className="absolute inset-0 rounded-2xl bg-primary/5 -z-10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ 
            transform: 'translateZ(-30px)',
            transformStyle: 'preserve-3d'
          }}
        />
      </div>
    </div>
  )
}

export default TeamCard