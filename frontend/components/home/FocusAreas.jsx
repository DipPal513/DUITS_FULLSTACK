// components/home/FocusAreas.jsx
import { Code2, BrainCircuit, ShieldCheck, PenTool, Cpu, Trophy } from "lucide-react"
import ScrollReveal from "@/components/home/ScrollReveal"

const FOCUS_AREAS = [
  {
    icon: Code2,
    title: "Web & app development",
    blurb: "Ship real products together, from campus tools to open-source contributions.",
  },
  {
    icon: BrainCircuit,
    title: "AI & machine learning",
    blurb: "Reading groups, model-building sessions, and projects with real datasets.",
  },
  {
    icon: Trophy,
    title: "Competitive programming",
    blurb: "Weekly problem sets and mock contests that feed into ICPC and national rounds.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    blurb: "CTF practice, network fundamentals, and a culture of responsible disclosure.",
  },
  {
    icon: Cpu,
    title: "Robotics & IoT",
    blurb: "Hardware builds, embedded programming, and hands-on lab sessions.",
  },
  {
    icon: PenTool,
    title: "Product & UI/UX",
    blurb: "Design critique, prototyping, and research for the tools members build.",
  },
]

export default function FocusAreas() {
  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900/40 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-14 max-w-lg">
          <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">Focus areas</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">What you can work on</h2>
          <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">Pick a track, or move between them. Most members end up in more than one.</p>
        </div>

        <ScrollReveal from="zoom">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FOCUS_AREAS.map(({ icon: Icon, title, blurb }) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition-shadow hover:shadow-lg hover:shadow-blue-900/5 dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{blurb}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}