
import gsap from "gsap"
import { Atom, Binary, CloudLightning, Laptop, Rocket, Sparkles, Star, Zap } from "lucide-react"
import { useEffect, useRef } from "react"

export default function FloatingIcons() {

  const headingRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)
  const statsRef = useRef([])

  const iconsRef = useRef([])

  useEffect(() => {
    // Initial animation for all icons
    iconsRef.current.forEach((icon, i) => {
      if (!icon) return
      
      // Set initial state
      gsap.set(icon, { 
        opacity: 0, 
        scale: 0,
        rotation: Math.random() * 360 
      })
      
      // Entrance animation
      gsap.to(icon, {
        opacity: 0.7,
        scale: 1,
        duration: 1,
        delay: i * 0.2,
        ease: "elastic.out(1, 0.5)"
      })
      
      // Continuous floating animation
      gsap.to(icon, {
        y: "+=10",
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3
      })
      
      // Continuous rotation
      gsap.to(icon, {
        rotation: "+=360",
        duration: 8 + Math.random() * 4,
        repeat: -1,
        ease: "none",
        delay: i * 0.1
      })
      
      // Random slight movements
      gsap.to(icon, {
        x: "+=20",
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.4
      })
    })
    
    // Mouse move parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      
      iconsRef.current.forEach((icon, i) => {
        if (!icon) return
        
        const speed = (i + 1) * 0.5
        const x = (clientX - centerX) / centerX
        const y = (clientY - centerY) / centerY
        
        gsap.to(icon, {
          x: `+=${x * speed * 20}`,
          y: `+=${y * speed * 20}`,
          duration: 0.5,
          ease: "power2.out"
        })
      })
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      iconsRef.current.forEach(icon => {
        if (icon) gsap.killTweensOf(icon)
      })
    }
  }, [])

  const icons = [
    { Icon: Laptop, color: "text-blue-500", left: "5%", top: "15%" },
    { Icon: Rocket, color: "text-purple-500", left: "90%", top: "20%" },
    { Icon: Zap, color: "text-yellow-400", left: "10%", top: "70%" },
    { Icon: Star, color: "text-pink-500", left: "85%", top: "65%" },
    { Icon: Binary, color: "text-green-500", left: "15%", top: "45%" },
    { Icon: Atom, color: "text-cyan-400", left: "92%", top: "45%" },
    { Icon: CloudLightning, color: "text-orange-500", left: "8%", top: "85%" },
    { Icon: Sparkles, color: "text-rose-500", left: "88%", top: "85%" },
  ]

  return (
    <>
      {icons.map(({ Icon, color, left, top }, i) => (
        <div
          key={i}
          ref={(el) => (iconsRef.current[i] = el)}
          className="absolute hidden md:block pointer-events-none"
          style={{ left, top }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1.3,
              opacity: 1,
              duration: 0.3,
              ease: "back.out(1.7)"
            })
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1,
              opacity: 0.7,
              duration: 0.3,
              ease: "power2.out"
            })
          }}
        >
          <Icon className={`w-8 h-8 ${color} drop-shadow-lg`} />
        </div>
      ))}
    </>
  )
}
