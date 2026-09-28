"use client"
// components/home/TiltStage.jsx — sets --tx/--ty from the pointer so the 3D globe leans toward the cursor
import { useRef } from "react"

export default function TiltStage({ children, className = "" }) {
  const ref = useRef(null)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.setProperty("--tx", `${(-py * 16).toFixed(2)}deg`)
    ref.current.style.setProperty("--ty", `${(px * 24).toFixed(2)}deg`)
  }
  const leave = () => {
    ref.current.style.setProperty("--tx", "0deg")
    ref.current.style.setProperty("--ty", "0deg")
  }
  return <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={className}>{children}</div>
}