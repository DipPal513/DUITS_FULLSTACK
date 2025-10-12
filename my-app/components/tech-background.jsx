// "use client"

// import { useEffect, useRef } from "react"
// import { useTheme } from "next-themes"

// export default function TechBackground() {
//   const canvasRef = useRef(null)
//   const { theme } = useTheme()

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     let animationFrameId = null
//     let resizeTimeout = null
//     let particles = []

//     const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
//     if (prefersReducedMotion) {
//       // Don't run heavy animation if user prefers reduced motion
//       ctx.clearRect(0, 0, canvas.width, canvas.height)
//       return
//     }

//     const setCanvasSize = () => {
//       const dpr = Math.max(1, window.devicePixelRatio || 1)
//       const cssWidth = window.innerWidth
//       const cssHeight = window.innerHeight
//       canvas.style.width = cssWidth + "px"
//       canvas.style.height = cssHeight + "px"
//       canvas.width = Math.floor(cssWidth * dpr)
//       canvas.height = Math.floor(cssHeight * dpr)
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0) // scale drawing to device pixels
//       return { cssWidth, cssHeight, dpr }
//     }

//     const { cssWidth, cssHeight } = setCanvasSize()

//     const isDark = theme === "dark"
//     const particleColor = isDark ? "rgba(139, 92, 246, 0.6)" : "rgba(109, 40, 217, 0.4)"
//     const gridColor = isDark ? "rgba(139, 92, 246, 0.05)" : "rgba(109, 40, 217, 0.03)"
//     const connectionColor = isDark ? "rgba(139, 92, 246, 0.12)" : "rgba(109, 40, 217, 0.06)"

//     // Adjust counts & sizes based on viewport to improve mobile performance
//     const computeCounts = (width, height) => {
//       const area = width * height
//       const base = Math.floor(area / 16000) // heuristic
//       const count = Math.max(12, Math.min(80, base))
//       const gridSize = width < 640 ? 80 : 50
//       const maxDistance = width < 640 ? 100 : 150
//       return { count, gridSize, maxDistance }
//     }

//     let { count: particleCount, gridSize, maxDistance } = computeCounts(cssWidth, cssHeight)

//     class Particle {
//       constructor() {
//         this.x = Math.random() * cssWidth
//         this.y = Math.random() * cssHeight
//         this.size = (Math.random() * (cssWidth < 640 ? 1.6 : 2)) + (cssWidth < 640 ? 0.6 : 1)
//         this.speedX = (Math.random() * 0.6 - 0.3) * (cssWidth < 640 ? 0.6 : 1)
//         this.speedY = (Math.random() * 0.6 - 0.3) * (cssWidth < 640 ? 0.6 : 1)
//         this.opacity = Math.random() * 0.5 + 0.2
//       }

//       update(width, height) {
//         this.x += this.speedX
//         this.y += this.speedY

//         if (this.x > width) this.x = 0
//         if (this.x < 0) this.x = width
//         if (this.y > height) this.y = 0
//         if (this.y < 0) this.y = height
//       }

//       draw(ctx) {
//         ctx.fillStyle = particleColor
//         ctx.globalAlpha = this.opacity
//         ctx.beginPath()
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
//         ctx.fill()
//         ctx.globalAlpha = 1
//       }
//     }

//     const initParticles = (n, width, height) => {
//       particles = []
//       for (let i = 0; i < n; i++) {
//         const p = new Particle()
//         // ensure inside bounds after possible resize
//         p.x = Math.random() * width
//         p.y = Math.random() * height
//         particles.push(p)
//       }
//     }

//     initParticles(particleCount, cssWidth, cssHeight)

//     const animate = () => {
//       // clear using css size (ctx already scaled)
//       ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

//       // Draw grid (sparser on small screens)
//       ctx.strokeStyle = gridColor
//       ctx.lineWidth = 1

//       for (let x = 0; x < window.innerWidth; x += gridSize) {
//         ctx.beginPath()
//         ctx.moveTo(x, 0)
//         ctx.lineTo(x, window.innerHeight)
//         ctx.stroke()
//       }
//       for (let y = 0; y < window.innerHeight; y += gridSize) {
//         ctx.beginPath()
//         ctx.moveTo(0, y)
//         ctx.lineTo(window.innerWidth, y)
//         ctx.stroke()
//       }

//       // Update and draw particles
//       particles.forEach((particle) => {
//         particle.update(window.innerWidth, window.innerHeight)
//         particle.draw(ctx)
//       })

//       // Draw connections (limit iterations on mobile)
//       ctx.strokeStyle = connectionColor
//       ctx.lineWidth = 0.5
//       for (let i = 0; i < particles.length; i++) {
//         // on very small screens, skip inner loop for performance
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x
//           const dy = particles[i].y - particles[j].y
//           const distance = Math.sqrt(dx * dx + dy * dy)

//           if (distance < maxDistance) {
//             ctx.beginPath()
//             ctx.moveTo(particles[i].x, particles[i].y)
//             ctx.lineTo(particles[j].x, particles[j].y)
//             ctx.stroke()
//           }
//         }
//       }

//       animationFrameId = requestAnimationFrame(animate)
//     }

//     animate()

//     const handleResize = () => {
//       if (resizeTimeout) clearTimeout(resizeTimeout)
//       resizeTimeout = setTimeout(() => {
//         const { cssWidth: newW, cssHeight: newH } = setCanvasSize()
//         const computed = computeCounts(newW, newH)
//         particleCount = computed.count
//         gridSize = computed.gridSize
//         maxDistance = computed.maxDistance
//         initParticles(particleCount, newW, newH)
//       }, 150) // debounce
//     }

//     window.addEventListener("resize", handleResize)

//     return () => {
//       window.removeEventListener("resize", handleResize)
//       if (resizeTimeout) clearTimeout(resizeTimeout)
//       if (animationFrameId) cancelAnimationFrame(animationFrameId)
//     }
//   }, [theme])

//   return (
//     <>
//       <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />
//       <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-primary/5" />
//       <div className="glare glare-primary fixed top-20 left-10 w-96 h-96 -z-10" />
//       <div
//         className="glare glare-accent fixed bottom-20 right-10 w-[500px] h-[500px] -z-10"
//         style={{ animationDelay: "2s" }}
//       />
//       <div
//         className="glare glare-primary fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] -z-10"
//         style={{ animationDelay: "1s" }}
//       />
//     </>
//   )
// }

const TechBackground = () => null
export default TechBackground;