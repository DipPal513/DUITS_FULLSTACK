"use client"
// components/home/StatsSection.jsx
import { useEffect, useRef, useState } from "react"

const STATS = [
  { value: 450, suffix: "+", label: "Active members" },
  { value: 60, suffix: "+", label: "Workshops run each year" },
  { value: 30, suffix: "+", label: "Competitions represented" },
  { value: 12, suffix: "", label: "Active project teams" },
]

function useCountUp(target, start) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let frame
    const duration = 1100
    const t0 = performance.now()
    function tick(now) {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, target])
  return value
}

function StatItem({ stat, start }) {
  const value = useCountUp(stat.value, start)
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-4xl font-semibold tracking-tight text-blue-600 dark:text-blue-400 sm:text-5xl">
        {value}
        {stat.suffix}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
    </div>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-white py-16 dark:bg-slate-950 sm:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 divide-slate-200 px-6 dark:divide-slate-800 sm:px-8 lg:grid-cols-4 lg:divide-x">
        {STATS.map((stat, i) => (
          <div key={stat.label} className={i > 0 ? "lg:pl-8" : ""}>
            <StatItem stat={stat} start={inView} />
          </div>
        ))}
      </div>
    </section>
  )
}