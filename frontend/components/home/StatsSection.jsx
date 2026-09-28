"use client"
// components/home/StatsSection.jsx — card strip overlapping the hero, count-up on view
import { useEffect, useRef, useState } from "react"
import { Users, Layers, CalendarDays, Trophy } from "lucide-react"
import { STATS } from "@/lib/clubContent"

const ICONS = [Users, Layers, CalendarDays, Trophy]

function useCountUp(target, start) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let frame
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / 1200, 1)
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, target])
  return value
}

function Stat({ stat, Icon, start }) {
  const value = useCountUp(stat.value, start)
  return (
    <div className="group px-6 py-7 transition-colors hover:bg-blue-50/60 dark:hover:bg-white/[0.03] sm:px-8">
      <span className="grid h-9 w-9 place-content-center rounded-xl bg-blue-50 text-blue-600 transition-transform group-hover:-translate-y-0.5 dark:bg-blue-500/10 dark:text-blue-300"><Icon size={18} /></span>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
        {value}<span className="text-blue-600 dark:text-blue-400">{stat.suffix}</span>
      </p>
      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
    </div>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} aria-label="DUITS in numbers" className="relative z-10 -mt-28 px-6 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-2xl shadow-blue-900/10 backdrop-blur-xl dark:divide-white/10 dark:border-white/10 dark:bg-[#0b1636]/85 dark:shadow-blue-950/60 lg:grid-cols-4 lg:divide-x">
        {STATS.map((s, i) => <Stat key={s.label} stat={s} Icon={ICONS[i]} start={inView} />)}
      </div>
    </section>
  )
}