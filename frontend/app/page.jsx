import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown, Quote } from "lucide-react"
import HomeHero from "@/components/home/HomeHero"
import StatsSection from "@/components/home/StatsSection"
import WingsExplorer from "@/components/home/WingsExplorer"
import SpotlightCard from "@/components/home/SpotlightCard"
import SectionNav from "@/components/home/SectionNav"
import ScrollReveal from "@/components/home/ScrollReveal"
import { supabase } from "@/lib/supabase"
import {
  ABOUT_BADGES, FAQ, POSITION, PRESIDENT_FALLBACK, PRESIDENT_MESSAGE, REASONS, TIMELINE,
} from "@/lib/clubContent"

export const revalidate = 900

async function getPresident() {
  try {
    const timeout = new Promise((resolve) => setTimeout(() => resolve(null), 3000))
    const res = await Promise.race([
      supabase.from("executives").select("id,name,position,year,duits_batch,image").ilike("position", "%president%").order("created_at", { ascending: false }).limit(8),
      timeout,
    ])
    const list = res?.data || []
    return list.find((e) => !/vice|joint|assistant|general/i.test(e.position || "")) || list[0] || null
  } catch (error) {
    console.error("President could not be loaded:", error)
    return null
  }
}

function Heading({ eyebrow, title, description, center = false }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">{eyebrow}</span>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">{description}</p>}
    </div>
  )
}

const initials = (name = "") => name.split(" ").filter(Boolean).slice(0, 2).map((s) => s[0]).join("").toUpperCase() || "DU"

export default async function Home() {
  const found = await getPresident()
  const president = found || PRESIDENT_FALLBACK

  return (
    <main className="bg-white text-slate-900 dark:bg-[#050b1f] dark:text-white">
      <SectionNav />

      {/* 1 · Hero + stats */}
      <HomeHero />
      <StatsSection />

      {/* 2 · About + standing */}
      <section id="about" className="bg-white py-24 dark:bg-[#050b1f] sm:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal from="left">
            <Heading eyebrow="About DUITS" title="A student-run society built around curiosity." />
            <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-400">
              Dhaka University IT Society brings students together around technology, design and problem-solving. We run workshops, projects and contests, and we make sure nobody has to learn alone.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
              Whether you are writing your first line of code or preparing for a national contest, there is a place for you here, and people ready to help.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {ABOUT_BADGES.map(({ icon: I, label }) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                  <I size={16} className="text-blue-600 dark:text-blue-400" />{label}
                </span>
              ))}
            </div>
            <Link href="/executives" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900 dark:text-blue-300 dark:hover:text-white">
              Meet the team <ArrowRight size={16} />
            </Link>
          </ScrollReveal>

          <ScrollReveal from="right" delay={80}>
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 p-7 text-white shadow-xl shadow-blue-900/20">
              <p className="text-xs font-semibold text-blue-200">Where we stand</p>
              <p className="mt-2 text-xl font-semibold leading-snug sm:text-2xl">{POSITION}</p>
            </div>
            <ol className="relative mt-8 space-y-7 border-l border-slate-200 pl-8 dark:border-white/10">
              {TIMELINE.map((t, i) => (
                <li key={t.label} className="relative">
                  <span className={`absolute -left-[2.6rem] top-1 grid h-5 w-5 place-content-center rounded-full ring-4 ring-white dark:ring-[#050b1f] ${i === TIMELINE.length - 1 ? "bg-blue-600 dark:bg-blue-400" : "bg-blue-200 dark:bg-blue-500/40"}`} />
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-300">{t.label}</p>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">{t.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{t.body}</p>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </section>

      {/* 3 · Wings */}
      <section id="wings" className="bg-[#eef4ff] py-24 dark:bg-[#071028] sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <ScrollReveal from="left">
            <Heading eyebrow="Our wings" title="Six wings. One for every kind of curious." description="Choose a wing to see what its members do, and what you will walk away with." />
          </ScrollReveal>
          <ScrollReveal from="zoom" delay={60} className="mt-12 block">
            <WingsExplorer />
          </ScrollReveal>
        </div>
      </section>

      {/* 4 · Why join */}
      <section id="why" className="bg-white py-24 dark:bg-[#050b1f] sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <ScrollReveal from="zoom">
            <Heading center eyebrow="Why join" title="Six reasons students stay." description="People come for a workshop and stay for the community. Here is what they tell us." />
          </ScrollReveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REASONS.map(({ icon: I, title, body }, i) => (
              <ScrollReveal key={title} from={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "zoom"} delay={(i % 3) * 70} className={i === 0 ? "lg:col-span-2" : ""}>
                {i === 0 ? (
                  <SpotlightCard className="h-full rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 p-8 text-white shadow-xl shadow-blue-900/20 sm:p-10">
                    <span className="grid h-12 w-12 place-content-center rounded-2xl bg-white/15"><I size={22} /></span>
                    <h3 className="mt-6 text-2xl font-semibold sm:text-3xl">{title}</h3>
                    <p className="mt-3 max-w-lg text-base leading-7 text-blue-100">{body}</p>
                  </SpotlightCard>
                ) : (
                  <SpotlightCard className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
                    <span className="grid h-11 w-11 place-content-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300"><I size={20} /></span>
                    <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{body}</p>
                  </SpotlightCard>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · President's message */}
      <section id="president" className="bg-[#eef4ff] py-24 dark:bg-[#071028] sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-blue-900/5 dark:border-white/10 dark:bg-[#0b1636]/60 dark:shadow-none sm:p-12 lg:p-16">
            <Quote aria-hidden="true" className="absolute right-8 top-8 h-28 w-28 text-blue-600/[0.07] dark:text-blue-400/[0.09]" strokeWidth={1.2} />
            <div className="relative grid gap-10 lg:grid-cols-[17rem_1fr] lg:gap-16">
              <ScrollReveal from="left">
                <div className="flex flex-col items-start gap-5">
                  <div className="relative h-52 w-44 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-700 shadow-lg shadow-blue-900/20 sm:h-64 sm:w-52">
                    {found?.image ? (
                      <Image src={found.image} alt={president.name} fill sizes="208px" className="object-cover" />
                    ) : (
                      <span className="absolute inset-0 grid place-content-center text-5xl font-semibold text-white/90">{initials(president.name)}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{president.name}</p>
                    <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">{president.position}</p>
                    {(president.year || president.duits_batch) && (
                      <p className="mt-0.5 text-sm text-blue-600 dark:text-blue-300">{[president.year, president.duits_batch && `Batch ${president.duits_batch}`].filter(Boolean).join(" · ")}</p>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal from="right" delay={80}>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">A message from the president</span>
                <p className="mt-6 text-2xl font-semibold leading-snug tracking-tight text-slate-900 dark:text-white sm:text-3xl">&ldquo;{PRESIDENT_MESSAGE.lead}&rdquo;</p>
                <div className="mt-6 space-y-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                  {PRESIDENT_MESSAGE.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
                </div>
                <p className="mt-8 border-t border-slate-200 pt-5 text-sm font-medium text-slate-900 dark:border-white/10 dark:text-white">{president.name}, {president.position}</p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 6 · FAQ */}
      <section id="faq" className="bg-white py-24 dark:bg-[#050b1f] sm:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-8 lg:grid-cols-[20rem_1fr] lg:gap-20">
          <ScrollReveal from="left">
            <div className="lg:sticky lg:top-28">
              <Heading eyebrow="FAQ" title="Before you join" description="Short answers to the questions we hear most." />
            </div>
          </ScrollReveal>
          <ScrollReveal from="right" delay={60}>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white px-6 py-5 transition-colors open:border-blue-300 open:bg-blue-50/50 dark:border-white/10 dark:bg-white/[0.03] dark:open:border-blue-400/40 dark:open:bg-blue-500/[0.06] [&[open]>summary_svg]:rotate-180">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900 dark:text-white [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown size={18} className="shrink-0 text-blue-600 transition-transform duration-300 dark:text-blue-300" />
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{f.a}</p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7 · Join banner */}
      <section className="bg-[#eef4ff] px-6 py-24 dark:bg-[#071028] sm:px-8 sm:py-32">
        <ScrollReveal from="zoom">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-10 text-center text-white shadow-2xl shadow-blue-900/30 sm:p-16">
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-cyan-300/25 blur-[80px]" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-indigo-400/30 blur-[90px]" aria-hidden="true" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Your next skill starts with one form.</h2>
              <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-blue-100">Join DUITS, pick a wing, and start building with people who want you to grow.</p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Link href="/membership" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-blue-900 transition-all hover:-translate-y-0.5 hover:bg-blue-50">
                  Become a member <ArrowRight size={16} />
                </Link>
                <Link href="/executives" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-white/10">
                  Meet the team
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}