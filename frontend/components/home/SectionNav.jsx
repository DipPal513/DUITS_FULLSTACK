"use client"
// components/home/SectionNav.jsx — floating scroll-spy dots (desktop only)
import { useEffect, useState } from "react"

const SECTIONS = [
  { id: "top", label: "Intro" },
  { id: "about", label: "About" },
  { id: "wings", label: "Wings" },
  { id: "why", label: "Why join" },
  { id: "president", label: "President" },
  { id: "faq", label: "FAQ" },
]

export default function SectionNav() {
  const [active, setActive] = useState("top")

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <nav aria-label="Page sections" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ul className="flex flex-col items-end gap-3.5">
        {SECTIONS.map((s) => {
          const on = active === s.id
          return (
            <li key={s.id}>
              <button onClick={() => go(s.id)} aria-label={s.label} aria-current={on ? "true" : undefined} className="group flex items-center gap-3">
                <span className={`rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-white transition-all dark:bg-white dark:text-slate-900 ${on ? "translate-x-0 opacity-100" : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}>{s.label}</span>
                <span className={`block rounded-full transition-all ${on ? "h-6 w-2 bg-blue-600 dark:bg-blue-400" : "h-2 w-2 bg-slate-300 group-hover:bg-blue-400 dark:bg-slate-600"}`} />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}