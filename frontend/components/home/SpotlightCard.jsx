"use client"
// components/home/SpotlightCard.jsx — soft light that follows the cursor across the card
import { useRef } from "react"

export default function SpotlightCard({ className = "", children }) {
  const ref = useRef(null)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`)
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`)
  }
  return (
    <div ref={ref} onMouseMove={move} className={`group relative overflow-hidden ${className}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:hidden" style={{ background: "radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgba(37,99,235,.12), transparent 45%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:block" style={{ background: "radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgba(96,165,250,.16), transparent 45%)" }} />
      <div className="relative h-full">{children}</div>
    </div>
  )
}