// components/home/FocusAreas.jsx — bento layout
import { Code2, BrainCircuit, ShieldCheck, Cpu, Trophy } from "lucide-react"
import ScrollReveal from "@/components/home/ScrollReveal"

const CODE = `const society = {
  learn: "by doing",
  build: ["apps", "tools", "research"],
  share: true,
}`

const Tags = ({ items }) => (
  <div className="mt-6 flex flex-wrap gap-2">
    {items.map((t) => (
      <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-blue-100">{t}</span>
    ))}
  </div>
)

const Icon = ({ as: I }) => (
  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/20">
    <I size={20} />
  </span>
)

const card = "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-blue-400/40 hover:bg-white/[0.05]"

export default function FocusAreas() {
  return (
    <section className="bg-[#050b1f] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <ScrollReveal from="left">
          <div className="mb-14 max-w-xl">
            <p className="mb-3 text-sm font-medium text-blue-400">What we do</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">Five tracks. Pick one, or all of them.</h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          <ScrollReveal from="left" className="md:col-span-2 lg:col-span-4">
            <div className={`${card} grid h-full gap-6 sm:grid-cols-[1fr_auto]`}>
              <div>
                <Icon as={Code2} />
                <h3 className="mt-5 text-xl font-semibold text-white">Web, apps & product design</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">Ship real products together, from campus tools to open-source contributions, with design critique built in.</p>
                <Tags items={["React", "Next.js", "Flutter", "Figma"]} />
              </div>
              <pre className="self-end overflow-x-auto rounded-2xl border border-white/10 bg-[#030818] p-4 font-mono text-xs leading-6 text-blue-200">{CODE}</pre>
            </div>
          </ScrollReveal>

          <ScrollReveal from="right" className="lg:col-span-2">
            <div className={`${card} h-full`}>
              <Icon as={BrainCircuit} />
              <h3 className="mt-5 text-xl font-semibold text-white">AI & machine learning</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">Reading groups, model-building sessions, and projects with real datasets.</p>
              <div className="mt-6 flex h-10 items-end gap-1.5" aria-hidden="true">
                {[35, 60, 45, 80, 55, 95, 70].map((h, i) => (
                  <span key={i} className="w-full rounded-sm bg-gradient-to-t from-blue-600/60 to-cyan-300/80" style={{ height: `${h}%` }} />
                ))}
              </div>
              <Tags items={["Python", "PyTorch"]} />
            </div>
          </ScrollReveal>

          <ScrollReveal from="left" delay={60} className="lg:col-span-2">
            <div className={`${card} h-full`}>
              <Icon as={Trophy} />
              <h3 className="mt-5 text-xl font-semibold text-white">Competitive programming</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">Weekly problem sets and mock contests that feed into ICPC and national rounds.</p>
              <Tags items={["C++", "ICPC"]} />
            </div>
          </ScrollReveal>

          <ScrollReveal from="zoom" delay={120} className="lg:col-span-2">
            <div className={`${card} h-full`}>
              <Icon as={ShieldCheck} />
              <h3 className="mt-5 text-xl font-semibold text-white">Cybersecurity</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">CTF practice, network fundamentals, and a culture of responsible disclosure.</p>
              <Tags items={["CTF", "Networks"]} />
            </div>
          </ScrollReveal>

          <ScrollReveal from="right" delay={180} className="md:col-span-2 lg:col-span-2">
            <div className={`${card} h-full`}>
              <Icon as={Cpu} />
              <h3 className="mt-5 text-xl font-semibold text-white">Robotics & IoT</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">Hardware builds, embedded programming, and hands-on lab sessions.</p>
              <Tags items={["Arduino", "IoT"]} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}