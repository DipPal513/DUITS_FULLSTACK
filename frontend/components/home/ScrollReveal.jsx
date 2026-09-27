"use client"

import { useEffect, useRef, useState } from "react"

export default function ScrollReveal({ children, className = "", from = "up", delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setVisible(true)
      observer.disconnect()
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (from !== "zoom") return
    const element = ref.current
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0

    const updateZoom = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        const midpoint = rect.top + rect.height / 2
        const travel = window.innerHeight / 2 + rect.height / 2
        const distance = Math.min(1, Math.abs(midpoint - window.innerHeight / 2) / travel)
        element.style.setProperty("--scroll-zoom", String(1.045 - distance * 0.085))
        element.style.setProperty("--scroll-focus", String(1 - distance * 0.2))
      })
    }

    updateZoom()
    window.addEventListener("scroll", updateZoom, { passive: true })
    window.addEventListener("resize", updateZoom, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", updateZoom)
      window.removeEventListener("resize", updateZoom)
    }
  }, [from])

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal-${from} ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  )
}
