import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarDays, MapPin } from "lucide-react"
import AchievementsGrid from "@/components/achievement/achievementGrid"
import EventCard from "@/components/events/EventCard"
import Hero from "@/components/hero/hero"
import PhotoRail from "@/components/home/PhotoRail"
import ScrollReveal from "@/components/home/ScrollReveal"
import OrbitGlobe from "@/components/home/OrbitGlobe"
import StatsSection from "@/components/home/StatsSection"
import FocusAreas from "@/components/home/FocusAreas"
import { supabase } from "@/lib/supabase"

export const revalidate = 900

async function getHomepageContent() {
  const today = new Date().toISOString().slice(0, 10)
  const empty = { events: [], photos: [], achievements: [], executive: null }
  try {
    const queries = Promise.all([
      supabase.from("events").select("id,title,description,date,image,location,registration_link").gte("date", today).order("date", { ascending: true }).limit(4),
      supabase.from("gallery").select("id,title,image,category,date").order("date", { ascending: false }).limit(8),
      supabase.from("achievements").select("id,title,description,date,image").order("date", { ascending: false }).limit(3),
      supabase.from("executives").select("id,name,position,year,duits_batch,image").order("created_at", { ascending: false }).limit(1),
    ])
    const timeout = new Promise((resolve) => setTimeout(() => resolve(null), 3000))
    const results = await Promise.race([queries, timeout])
    if (!results) return empty
    const [events, photos, achievements, executives] = results
    return {
      events: events.data || [],
      photos: photos.data || [],
      achievements: achievements.data || [],
      executive: executives.data?.[0] || null,
    }
  } catch (error) {
    console.error("Homepage content could not be loaded:", error)
    return empty
  }
}

function SectionHeader({ eyebrow, title, description, href, action }) {
  return (
    <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-lg">
        {eyebrow && <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">{eyebrow}</p>}
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">{description}</p>}
      </div>
      {href && (
        <Link href={href} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          {action}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  )
}

export default async function Home() {
  const { events, photos, achievements } = await getHomepageContent()
  const featuredEvent = events[0]
  const secondaryEvents = events.slice(1)

  return (
    <main className="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <Hero />

      {/* Stats — credibility, immediately after the hero */}
      <StatsSection />

      {/* Focus areas */}
      <FocusAreas />

      {/* Events */}
      <section className="bg-white py-20 dark:bg-slate-950 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeader
            eyebrow="Upcoming"
            title="On the calendar"
            description="Talks, workshops, and contests happening on campus."
            href="/events"
            action="View all events"
          />

          {featuredEvent ? (
            <ScrollReveal from="zoom">
              <article className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[1.1fr_0.9fr]">
                <Link href={`/events/${featuredEvent.id}`} className="group relative block min-h-72 overflow-hidden bg-slate-100 dark:bg-slate-800 sm:min-h-[26rem]">
                  {featuredEvent.image ? (
                    <Image src={featuredEvent.image} alt={featuredEvent.title} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  ) : (
                    <div className="absolute inset-0 grid place-content-center text-lg font-medium text-slate-400">DUITS Event</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-blue-950/10 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-slate-900">
                    {featuredEvent.date ? new Date(`${featuredEvent.date}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Date announced soon"}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <span className="text-xs font-medium text-blue-200">Next up</span>
                    <span className="mt-1 block max-w-md text-2xl font-semibold leading-tight sm:text-3xl">{featuredEvent.title}</span>
                  </span>
                </Link>
                <div className="flex flex-col justify-between p-8 sm:p-10">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">The next idea can start with showing up.</h3>
                    {featuredEvent.description && <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{featuredEvent.description}</p>}
                    <div className="mt-6 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                      {featuredEvent.date && (
                        <p className="flex items-center gap-2">
                          <CalendarDays size={16} className="text-blue-600 dark:text-blue-400" />
                          {new Date(`${featuredEvent.date}T00:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                        </p>
                      )}
                      {featuredEvent.location && (
                        <p className="flex items-center gap-2">
                          <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
                          {featuredEvent.location}
                        </p>
                      )}
                    </div>
                  </div>
                  <Link href={`/events/${featuredEvent.id}`} className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                    Event details <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              No upcoming events have been announced. Check back soon.
            </div>
          )}

          {secondaryEvents.length > 0 && (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {secondaryEvents.map((event, index) => (
                <ScrollReveal key={event.id} from={index % 2 ? "right" : "left"} delay={index * 55}>
                  <EventCard event={event} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Community: gallery + achievements */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900/40 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeader eyebrow="Community" title="Life in the society" href="/gallery" action="Open the photo archive" />
          <ScrollReveal from="right">
            <PhotoRail photos={photos} />
          </ScrollReveal>
        </div>
        {achievements.length > 0 && (
          <div className="mt-16">
            <ScrollReveal from="zoom">
              <AchievementsGrid achievements={achievements} />
            </ScrollReveal>
          </div>
        )}
      </section>

      {/* Join CTA — the one bold moment on the page */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 py-24 text-white sm:py-32">
        <OrbitGlobe />
        <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-8">
          <ScrollReveal from="zoom">
            <p className="text-sm font-medium text-blue-200">Come make a contribution</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">A place for your unfinished ideas, too.</h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-blue-100">
              Join the society to meet collaborators, take part in programs, and build practical experience on campus.
            </p>
            <Link
              href="/membership"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-50"
            >
              Explore membership <ArrowRight size={17} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}