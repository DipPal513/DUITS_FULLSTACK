"use client"
// components/home/WingsExplorer.jsx — tabbed explorer for the society's wings
import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { WINGS } from "@/lib/clubContent"

export default function WingsExplorer() {
  const [i, setI] = useState(0)
  const w = WINGS[i]
  const Icon = w.icon

  const onKey = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); setI((i + 1) % WINGS.length) }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); setI((i - 1 + WINGS.length) % WINGS.length) }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[21rem_1fr]">
      <div role="tablist" aria-label="Society wings" onKeyDown={onKey} className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
        {WINGS.map((x, idx) => {
          const I = x.icon
          const on = idx === i
          return (
            <button
              key={x.id} role="tab" id={`wing-tab-${x.id}`} aria-selected={on} aria-controls="wing-panel" tabIndex={on ? 0 : -1}
              onClick={() => setI(idx)}
              className={`flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 lg:shrink ${
                on
                  ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/25 dark:border-blue-500 dark:bg-blue-500 lg:translate-x-1.5"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:bg-white/[0.06]"
              }`}
            >
              <span className={`grid h-9 w-9 shrink-0 place-content-center rounded-xl ${on ? "bg-white/20" : "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300"}`}><I size={18} /></span>
              <span className="min-w-0">
                <span className="block whitespace-nowrap text-sm font-semibold lg:whitespace-normal">{x.name}</span>
                <span className={`hidden text-xs lg:block ${on ? "text-blue-100" : "text-slate-500 dark:text-slate-400"}`}>{x.tagline}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div key={w.id} id="wing-panel" role="tabpanel" aria-labelledby={`wing-tab-${w.id}`} className="wx-panel relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-blue-900/5 dark:border-white/10 dark:bg-[#0b1636]/60 dark:shadow-none sm:p-10">
        <Icon aria-hidden="true" className="absolute -right-6 -top-6 h-52 w-52 text-blue-600/[0.06] dark:text-blue-400/[0.07]" strokeWidth={1} />
        <div className="relative">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">Wing {i + 1} of {WINGS.length}</span>
          <h3 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{w.name}</h3>
          <p className="mt-3 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">{w.desc}</p>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">What you will do</p>
              <ul className="mt-3 space-y-3">
                {w.does.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-content-center rounded-full bg-blue-600 text-white dark:bg-blue-500"><Check size={12} strokeWidth={3} /></span>{d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">You will pick up</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {w.skills.map((s) => (
                  <span key={s} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-blue-100">{s}</span>
                ))}
              </div>
            </div>
          </div>

          <Link href="/membership" className="mt-9 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
            Join this wing <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .wx-panel { animation: wxin .35s ease both; }
        @keyframes wxin { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .wx-panel { animation: none; } }
      `}</style>
    </div>
  )
}