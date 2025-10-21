import gsap from "gsap"
import { Binary, Code2, Cpu, Database, Github, Server, Terminal, Wifi } from "lucide-react"
import { useEffect, useRef } from "react"

export default function FloatingIcons() {
  const iconsRef = useRef([])

  useEffect(() => {
    // Entrance animation and continuous floating
    iconsRef.current.forEach((icon, i) => {
      if (!icon) return
      
      // Entrance
      gsap.from(icon, {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "back.out(1.5)"
      })
      
      // Continuous random floating - Y axis
      gsap.to(icon, {
        y: `+=${15 + Math.random() * 20}`, // Random 15-35px movement
        duration: 2 + Math.random() * 2, // Random 2-4s duration
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2 // Random start delay
      })
      
      // Continuous random floating - X axis
      gsap.to(icon, {
        x: `+=${10 + Math.random() * 15}`, // Random 10-25px movement
        duration: 2.5 + Math.random() * 2, // Random 2.5-4.5s duration
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2 // Random start delay
      })
      
      // Subtle rotation
      gsap.to(icon, {
        rotation: Math.random() > 0.5 ? 10 : -10,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      })
    })
    
    // Gentle cursor follow - moves slightly toward cursor
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      
      iconsRef.current.forEach((icon, i) => {
        if (!icon) return
        
        // Each icon follows with different speed (3-8px movement)
        const speed = 0.3 + (i * 0.1)
        const x = (clientX - centerX) / centerX
        const y = (clientY - centerY) / centerY
        
        gsap.to(icon, {
          x: `+=${x * speed * 5}`,
          y: `+=${y * speed * 5}`,
          duration: 1,
          ease: "power1.out"
        })
      })
    }
    
    // window.addEventListener("mousemove", handleMouseMove)
    
    // return () => {
    //   window.removeEventListener("mousemove", handleMouseMove)
    //   iconsRef.current.forEach(icon => {
    //     if (icon) gsap.killTweensOf(icon)
    //   })
    // }
  }, [])

  const icons = [
    { Icon: Code2, gradient: "from-blue-400 via-blue-500 to-cyan-500", left: "3%", top: "12%" },
    { Icon: Cpu, gradient: "from-purple-400 via-pink-500 to-red-500", left: "92%", top: "18%" },
    { Icon: Terminal, gradient: "from-yellow-400 via-orange-500 to-red-500", left: "8%", top: "68%" },
    { Icon: Database, gradient: "from-pink-400 via-rose-500 to-purple-500", left: "88%", top: "72%" },
    { Icon: Binary, gradient: "from-green-400 via-emerald-500 to-teal-500", left: "12%", top: "42%" },
    { Icon: Server, gradient: "from-cyan-400 via-blue-500 to-indigo-500", left: "94%", top: "48%" },
    { Icon: Wifi, gradient: "from-orange-400 via-red-500 to-pink-500", left: "5%", top: "88%" },
    { Icon: Github, gradient: "from-rose-400 via-fuchsia-500 to-purple-500", left: "90%", top: "92%" },
  ]

  return (
    <>
      {icons.map(({ Icon, gradient, left, top }, i) => (
        <div
          key={i}
          ref={(el) => (iconsRef.current[i] = el)}
          className="absolute hidden md:block pointer-events-none"
          style={{ left, top }}
        >
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} p-2.5 shadow-2xl`}>
            <Icon className="w-full h-full text-white drop-shadow-md" />
          </div>
        </div>
      ))}
    </>
  )
}