// components/home/HomeHero.jsx
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Globe3D from "./Globe3d"
import TiltStage from "@/components/home/TiltStage"

const TERMINAL = [
  { text: "$ duits join --campus", n: 21, d: 0.8, cls: "text-white" },
  { text: "→ members ........ 450+", n: 23, d: 1.9, cls: "text-blue-200" },
  { text: "→ wings .............. 6", n: 23, d: 3.0, cls: "text-blue-200" },
  { text: "✓ ready to build", n: 16, d: 4.1, cls: "text-cyan-300" },
]

const chip = "hh-float absolute hidden items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-lg shadow-blue-900/10 backdrop-blur dark:border-white/15 dark:bg-[#0b1636]/80 dark:text-blue-100 dark:shadow-none sm:flex"

export default function HomeHero() {
  return (
    <section id="top" className="hh relative overflow-hidden bg-gradient-to-b from-[#e3edff] via-[#f0f6ff] to-white pb-44 pt-28 text-slate-900 dark:from-[#050b1f] dark:via-[#050b1f] dark:to-[#050b1f] dark:text-white sm:pt-32 lg:pb-48">
      <div className="hh-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-400/25 blur-[110px] dark:bg-blue-600/25" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cyan-300/25 blur-[110px] dark:bg-cyan-500/10" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="hh-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-blue-800 backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-70 dark:bg-cyan-300" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600 dark:bg-cyan-300" />
            </span>
            Dhaka University IT Society
          </span>

          <h1 className="mt-7 text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl xl:text-7xl">
            Where DU students{" "}
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-300 dark:via-blue-400 dark:to-cyan-300">learn, build</span>{" "}
            and belong.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            DUITS is a student-run technology society with six specialised wings, hundreds of members, and one goal: turning curiosity into skills you can show.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/membership" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
              Join DUITS <ArrowRight size={16} />
            </Link>
            <a href="#wings" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/60 px-6 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur transition-colors hover:bg-white dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/10">
              Explore our wings
            </a>
          </div>
          <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">Students from every department are welcome. No experience needed.</p>
        </div>

        <TiltStage className="hh-in relative flex min-h-[26rem] flex-col items-center justify-center lg:min-h-[32rem]">
          <Globe3D />

          <span className={`${chip} left-2 top-10`}><span className="h-1.5 w-1.5 rounded-full bg-blue-500" />AI & Data</span>
          <span className={`${chip} right-0 top-1/3`} style={{ animationDelay: "-2s" }}><span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />Web & Apps</span>
          <span className={`${chip} bottom-28 right-6`} style={{ animationDelay: "-4s" }}><span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />Cybersecurity</span>

          <span className="absolute right-0 top-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 font-mono text-[11px] text-slate-600 backdrop-blur dark:border-white/15 dark:bg-[#0b1636]/80 dark:text-blue-200">
            23.73°N · 90.39°E
          </span>

          <div className="mt-8 w-full max-w-xs rounded-2xl border border-slate-800/10 bg-[#0b1636] p-4 font-mono text-xs shadow-2xl shadow-blue-900/30 dark:border-white/10 lg:absolute lg:-left-4 lg:bottom-2 lg:mt-0">
            <div className="mb-3 flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="space-y-1.5">
              {TERMINAL.map((l) => (
                <p key={l.text} className={`hh-type ${l.cls}`} style={{ "--n": l.n, animationDelay: `${l.d}s` }}>{l.text}</p>
              ))}
            </div>
          </div>
        </TiltStage>
      </div>

      <style>{`
        .hh-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(37,99,235,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.08) 1px, transparent 1px); background-size: 56px 56px; -webkit-mask-image: radial-gradient(ellipse 75% 65% at 60% 40%, #000 30%, transparent 75%); mask-image: radial-gradient(ellipse 75% 65% at 60% 40%, #000 30%, transparent 75%); }
        .dark .hh-grid { background-image: linear-gradient(rgba(148,163,184,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.08) 1px, transparent 1px); }
        .hh-in { animation: hhin .9s cubic-bezier(.2,.7,.2,1) both; }
        @keyframes hhin { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        .hh-type { overflow: hidden; white-space: nowrap; width: 0; animation: hhtype .9s steps(var(--n)) forwards; }
        @keyframes hhtype { to { width: calc(var(--n) * 1ch); } }
        .hh-float { animation: hhfloat 6s ease-in-out infinite; }
        @keyframes hhfloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @media (prefers-reduced-motion: reduce) { .hh-in, .hh-float { animation: none; } .hh-type { animation: none; width: auto; } }
      `}</style>
    </section>
  )
}