"use client"
import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

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



/*
    TechBackground
    - Lightweight, responsive canvas background that draws:
        1) a soft animated "globe" (radial gradient) near center
        2) drifting small particles (like glare / motes)
        3) a few larger "obstacles" that slowly move and cast soft shapes
    - Respects prefers-reduced-motion and reduces detail on small screens.
    - Cleans up RAF and events.
*/

export default function TechBackground() {
    const canvasRef = useRef(null)
    const { theme } = useTheme()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const prefersReducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReducedMotion) {
            // keep canvas blank for reduced motion users
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            return
        }

        let rafId = 0
        let resizeTimer = 0

        const setSize = () => {
            const dpr = Math.max(1, window.devicePixelRatio || 1)
            const w = Math.max(300, window.innerWidth)
            const h = Math.max(300, window.innerHeight)
            canvas.style.width = w + "px"
            canvas.style.height = h + "px"
            canvas.width = Math.floor(w * dpr)
            canvas.height = Math.floor(h * dpr)
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            return { w, h, dpr }
        }

        let { w: width, h: height } = setSize()

        // theme-dependent tints
        const isDark = theme === "dark"
        const globeBase = isDark ? "18,12,64" : "95,46,234"
        const particleColor = isDark ? "rgba(139,92,246,0.7)" : "rgba(109,40,217,0.55)"
        const obstacleColor = isDark ? "rgba(70,55,120,0.12)" : "rgba(109,40,217,0.06)"

        // responsiveness heuristics
        const small = width < 640
        const particleCount = small ? 22 : Math.min(120, Math.floor((width * height) / 90000))
        const obstacleCount = small ? 2 : 4

        // particles (glare motes)
        const particles = []
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * (small ? 1.6 : 3) + (small ? 0.6 : 0.8),
                vx: (Math.random() - 0.5) * (small ? 0.15 : 0.6),
                vy: (Math.random() - 0.5) * (small ? 0.15 : 0.6),
                a: Math.random() * 0.7 + 0.3,
                tw: Math.random() * 4000 + 3000, // twinkle period
                t0: Math.random() * 6000,
            })
        }

        // obstacles (larger soft shapes)
        const obstacles = []
        for (let i = 0; i < obstacleCount; i++) {
            const size = (Math.random() * (small ? 180 : 420)) + (small ? 100 : 200)
            obstacles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                w: size,
                h: size * (0.6 + Math.random() * 0.8),
                vx: (Math.random() - 0.5) * (small ? 0.02 : 0.12),
                vy: (Math.random() - 0.5) * (small ? 0.02 : 0.12),
                rot: Math.random() * Math.PI * 2,
                rotV: (Math.random() - 0.5) * 0.0008 * (small ? 1 : 3),
                alpha: 0.06 + Math.random() * 0.09,
            })
        }

        // globe params (soft centered orb)
        const globe = {
            x: width * (0.48 + (Math.random() - 0.5) * 0.08),
            y: height * (0.48 + (Math.random() - 0.5) * 0.08),
            radius: Math.min(width, height) * (small ? 0.18 : 0.28),
            driftX: (Math.random() - 0.5) * (small ? 0.05 : 0.2),
            driftY: (Math.random() - 0.5) * (small ? 0.05 : 0.2),
        }

        let last = performance.now()

        const draw = (now) => {
            const dt = Math.min(40, now - last)
            last = now

            width = canvas.clientWidth
            height = canvas.clientHeight

            ctx.clearRect(0, 0, width, height)

            // subtle vignette/background tint
            const gradBg = ctx.createLinearGradient(0, 0, width, height)
            gradBg.addColorStop(
                0,
                `rgba(${globeBase},${isDark ? 0.02 : 0.03})`
            )
            gradBg.addColorStop(
                1,
                `rgba(${globeBase},${isDark ? 0.01 : 0.02})`
            )
            ctx.fillStyle = gradBg
            ctx.fillRect(0, 0, width, height)

            // moving globe (soft radial gradient)
            globe.x += globe.driftX * (dt * 0.02)
            globe.y += globe.driftY * (dt * 0.02)
            globe.radius = Math.min(width, height) * (small ? 0.16 : 0.28)

            const g = ctx.createRadialGradient(
                globe.x,
                globe.y,
                0,
                globe.x,
                globe.y,
                globe.radius
            )
            g.addColorStop(0, `rgba(${globeBase},0.22)`)
            g.addColorStop(0.45, `rgba(${globeBase},0.14)`)
            g.addColorStop(1, `rgba(${globeBase},0.00)`)
            ctx.globalCompositeOperation = "lighter"
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(globe.x, globe.y, globe.radius, 0, Math.PI * 2)
            ctx.fill()
            ctx.globalCompositeOperation = "source-over"

            // obstacles: soft blurred rounded rectangles
            obstacles.forEach((o) => {
                o.x += o.vx * dt
                o.y += o.vy * dt
                o.rot += o.rotV * dt

                // wrap-around
                if (o.x < -o.w) o.x = width + o.w
                if (o.x > width + o.w) o.x = -o.w
                if (o.y < -o.h) o.y = height + o.h
                if (o.y > height + o.h) o.y = -o.h

                ctx.save()
                ctx.translate(o.x, o.y)
                ctx.rotate(o.rot)
                ctx.globalAlpha = o.alpha
                ctx.fillStyle = obstacleColor
                // soft shadow using multiple fills for inexpensive blur
                for (let k = 0; k < 6; k++) {
                    ctx.globalAlpha = o.alpha * (0.12 / (k + 1))
                    const shrink = 1 - k * 0.06
                    roundRect(
                        ctx,
                        -o.w * 0.5 * shrink,
                        -o.h * 0.5 * shrink,
                        o.w * shrink,
                        o.h * shrink,
                        Math.min(80, o.w * 0.2)
                    )
                    ctx.fill()
                }
                ctx.restore()
                ctx.globalAlpha = 1
            })

            // particles (small glare motes)
            particles.forEach((p) => {
                p.x += p.vx * dt
                p.y += p.vy * dt
                // wrap
                if (p.x < -10) p.x = width + 10
                if (p.x > width + 10) p.x = -10
                if (p.y < -10) p.y = height + 10
                if (p.y > height + 10) p.y = -10

                // twinkle
                const t = (now + p.t0) % p.tw
                const pulse = 0.4 + 0.6 * Math.abs(Math.sin((t / p.tw) * Math.PI * 2))

                ctx.beginPath()
                ctx.fillStyle = particleColor
                ctx.globalAlpha = p.a * pulse
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fill()
                ctx.globalAlpha = 1
            })

            // subtle connections near globe (only on larger screens)
            if (!small) {
                ctx.strokeStyle = `rgba(${globeBase},0.035)`
                ctx.lineWidth = 0.4
                for (let i = 0; i < particles.length; i++) {
                    const pi = particles[i]
                    const dx = pi.x - globe.x
                    const dy = pi.y - globe.y
                    const d = Math.sqrt(dx * dx + dy * dy)
                    if (d < globe.radius * 1.6) {
                        for (let j = i + 1; j < i + 6 && j < particles.length; j++) {
                            const pj = particles[j]
                            const dx2 = pi.x - pj.x
                            const dy2 = pi.y - pj.y
                            const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
                            if (d2 < 120) {
                                ctx.globalAlpha = 0.08 * (1 - d2 / 120)
                                ctx.beginPath()
                                ctx.moveTo(pi.x, pi.y)
                                ctx.lineTo(pj.x, pj.y)
                                ctx.stroke()
                                ctx.globalAlpha = 1
                            }
                        }
                    }
                }
            }

            rafId = requestAnimationFrame(draw)
        }

        // helper to draw rounded rect path
        function roundRect(ctx, x, y, w, h, r) {
            const radius = Math.min(Math.abs(r), Math.abs(w) / 2, Math.abs(h) / 2)
            ctx.beginPath()
            ctx.moveTo(x + radius, y)
            ctx.arcTo(x + w, y, x + w, y + h, radius)
            ctx.arcTo(x + w, y + h, x, y + h, radius)
            ctx.arcTo(x, y + h, x, y, radius)
            ctx.arcTo(x, y, x + w, y, radius)
            ctx.closePath()
        }

        // initial draw and loop
        rafId = requestAnimationFrame(draw)

        const handleResize = () => {
            if (resizeTimer) clearTimeout(resizeTimer)
            resizeTimer = window.setTimeout(() => {
                const newSize = setSize()
                width = newSize.w
                height = newSize.h
                // on resize we don't re-create arrays to keep things stable, but clamp positions
                particles.forEach((p) => {
                    p.x = Math.min(p.x, width)
                    p.y = Math.min(p.y, height)
                })
                obstacles.forEach((o) => {
                    o.x = Math.min(o.x, width)
                    o.y = Math.min(o.y, height)
                })
            }, 120)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener("resize", handleResize)
            if (resizeTimer) clearTimeout(resizeTimer)
        }
    }, [theme])

    // canvas covers viewport but pointer-events-none so it won't intercept clicks
    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 -z-10 pointer-events-none"
                aria-hidden
            />
            {/* subtle layered glows for extra depth (pure CSS, responsive) */}
            <div
                aria-hidden
                className="fixed -z-10 pointer-events-none"
                style={{
                    left: "6%",
                    top: "8%",
                    width: "28vw",
                    height: "28vw",
                    maxWidth: "420px",
                    maxHeight: "420px",
                    borderRadius: "50%",
                    filter: "blur(60px)",
                    background:
                        theme === "dark"
                            ? "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.08), transparent 30%)"
                            : "radial-gradient(circle at 30% 30%, rgba(109,40,217,0.06), transparent 30%)",
                    transform: "translateZ(0)",
                }}
            />
            <div
                aria-hidden
                className="fixed -z-10 pointer-events-none"
                style={{
                    right: "4%",
                    bottom: "6%",
                    width: "36vw",
                    height: "36vw",
                    maxWidth: "560px",
                    maxHeight: "560px",
                    borderRadius: "50%",
                    filter: "blur(80px)",
                    background:
                        theme === "dark"
                            ? "radial-gradient(circle at 70% 70%, rgba(139,92,246,0.06), transparent 30%)"
                            : "radial-gradient(circle at 70% 70%, rgba(109,40,217,0.04), transparent 30%)",
                    transform: "translateZ(0)",
                    opacity: 0.95,
                }}
            />
        </>
    )
}