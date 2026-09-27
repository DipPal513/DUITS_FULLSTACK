import Link from "next/link"
import { ArrowRight, Code2, Lightbulb, UsersRound, Trophy } from "lucide-react"

const programs = [
  {
    number: "01",
    title: "Learn by doing",
    description:
      "Build practical skills through workshops, guided learning, and peer mentorship across modern technology fields.",
    icon: Code2,
  },
  {
    number: "02",
    title: "Make things together",
    description:
      "Turn ideas into useful projects with teams that share knowledge, work through challenges, and ship real outcomes.",
    icon: UsersRound,
  },
  {
    number: "03",
    title: "Take on a challenge",
    description:
      "Join hackathons, programming contests, and campus events that put your skills to work in a collaborative setting.",
    icon: Trophy,
  },
  {
    number: "04",
    title: "Use technology with purpose",
    description:
      "Explore thoughtful applications of technology and contribute to ideas that can improve the university community.",
    icon: Lightbulb,
  },
]

export default function WhatWeDo() {
  return (
    <section className="border-y border-border bg-secondary/35 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-xs font-semibold uppercase text-primary">About the Society</p>
            <h2 className="max-w-xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              A place to learn, make, and move technology forward.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
              Dhaka University IT Society brings students together to explore technology through practical learning, teamwork, and service to the wider campus community.
            </p>
            <Link
              href="/membership"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Become a member <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {programs.map((program) => {
              const Icon = program.icon
              return (
                <article key={program.number} className="grid gap-4 py-6 sm:grid-cols-[3rem_2rem_1fr] sm:gap-5 sm:py-7">
                  <span className="pt-1 text-xs font-medium tabular-nums text-muted-foreground">{program.number}</span>
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.8} aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{program.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{program.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}