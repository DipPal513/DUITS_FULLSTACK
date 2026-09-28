import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, CalendarDays, CalendarX, ChevronLeft, ChevronRight, MapPin, Ticket } from "lucide-react"
import ScrollReveal from "@/components/home/ScrollReveal"
import { supabase } from "@/lib/supabase"

const PAGE_SIZE = 9
const FIELDS = "id,title,description,date,image,location,registration_link"
const FILTERS = [
  { key: "all", label: "All events" },
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
]

const today = () => new Date().toISOString().slice(0, 10)
const d = (date) => new Date(`${date}T00:00:00`)
const fmt = (date, opts) => (date ? d(date).toLocaleDateString("en-US", opts) : "")
const href = (filter, page) => {
  const q = new URLSearchParams()
  if (filter !== "all") q.set("filter", filter)
  if (page > 1) q.set("page", String(page))
  const s = q.toString()
  return s ? `/events?${s}` : "/events"
}

function daysAway(date, t) {
  const n = Math.round((d(date) - d(t)) / 86400000)
  if (n === 0) return "Today"
  if (n === 1) return "Tomorrow"
  return `In ${n} days`
}

async function load(page, filter) {
  const t = today()
  const from = (page - 1) * PAGE_SIZE
  let list = supabase.from("events").select(FIELDS, { count: "exact" })
  if (filter === "upcoming") list = list.gte("date", t).order("date", { ascending: true })
  else if (filter === "past") list = list.lt("date", t).order("date", { ascending: false })
  else list = list.order("date", { ascending: false })
  list = list.range(from, from + PAGE_SIZE - 1)

  const wantFeatured = page === 1 && filter !== "past"
  const featuredQ = wantFeatured
    ? supabase.from("events").select(FIELDS).gte("date", t).order("date", { ascending: true }).limit(1)
    : Promise.resolve({ data: [] })

  const [l, f] = await Promise.all([list, featuredQ])
  return { events: l.data || [], count: l.count || 0, featured: f.data?.[0] || null, error: l.error }
}

function Fallback() {
  return (
    <div className="absolute inset-0 grid place-content-center bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40">
      <CalendarDays size={40} strokeWidth={1.4} className="text-blue-500/60 dark:text-blue-300/60" />
    </div>
  )
}

function EventCard({ event, upcoming }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-blue-400/40">
      <Link href={`/events/${event.id}`} className="relative block aspect-[16/10] overflow-hidden">
        {event.image ? (
          <Image src={event.image} alt={event.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
        ) : <Fallback />}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
        {event.date && (
          <div className="absolute left-4 top-4 rounded-2xl bg-white px-3 py-2 text-center shadow-lg dark:bg-[#0b1636]/95">
            <p className="text-xl font-semibold leading-none text-slate-900 dark:text-white">{fmt(event.date, { day: "numeric" })}</p>
            <p className="mt-1 text-[11px] font-medium text-blue-600 dark:text-blue-300">{fmt(event.date, { month: "short" })}</p>
          </div>
        )}
        <span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${upcoming ? "bg-blue-600 text-white" : "bg-white/90 text-slate-700 dark:bg-white/15 dark:text-white"}`}>
          {upcoming ? "Upcoming" : "Past"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-slate-900 dark:text-white">
          <Link href={`/events/${event.id}`} className="transition-colors hover:text-blue-700 dark:hover:text-blue-300">{event.title}</Link>
        </h3>
        {event.location && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400"><MapPin size={14} className="shrink-0 text-blue-600 dark:text-blue-400" /><span className="truncate">{event.location}</span></p>
        )}
        {event.description && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{event.description}</p>}

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <Link href={`/events/${event.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900 dark:text-blue-300 dark:hover:text-white">
            View details <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          {upcoming && event.registration_link && (
            <a href={event.registration_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
              <Ticket size={14} /> Register
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Featured({ event, t }) {
  return (
    <ScrollReveal from="zoom">
      <article className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-blue-900/10 dark:border-white/10 dark:bg-[#0b1636]/60 dark:shadow-none lg:grid-cols-[1.1fr_0.9fr]">
        <Link href={`/events/${event.id}`} className="group relative block min-h-72 overflow-hidden sm:min-h-[24rem]">
          {event.image ? (
            <Image src={event.image} alt={event.title} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
          ) : <Fallback />}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-blue-900/30">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Next event
          </span>
        </Link>
        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
          {event.date && (
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">{daysAway(event.date, t)}</span>
          )}
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl">{event.title}</h2>
          {event.description && <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{event.description}</p>}
          <div className="mt-6 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
            {event.date && <p className="flex items-center gap-2.5"><CalendarDays size={16} className="text-blue-600 dark:text-blue-400" />{fmt(event.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>}
            {event.location && <p className="flex items-center gap-2.5"><MapPin size={16} className="text-blue-600 dark:text-blue-400" />{event.location}</p>}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {event.registration_link && (
              <a href={event.registration_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
                <Ticket size={16} /> Register now
              </a>
            )}
            <Link href={`/events/${event.id}`} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-white/20 dark:text-white dark:hover:bg-white/10">
              Event details <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </article>
    </ScrollReveal>
  )
}

function Pagination({ filter, page, totalPages }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
  const base = "grid h-10 min-w-10 place-content-center rounded-full px-3 text-sm font-medium transition-colors"
  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={href(filter, page - 1)} aria-label="Previous page" className={`${base} border border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/10`}><ChevronLeft size={16} /></Link>
      ) : <span className={`${base} border border-slate-100 text-slate-300 dark:border-white/5 dark:text-slate-600`}><ChevronLeft size={16} /></span>}
      {pages.map((n, i) => (
        <span key={n} className="flex items-center gap-2">
          {i > 0 && n - pages[i - 1] > 1 && <span className="text-slate-400">…</span>}
          <Link href={href(filter, n)} aria-current={n === page ? "page" : undefined} className={`${base} ${n === page ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 dark:bg-blue-500" : "text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-white/10"}`}>{n}</Link>
        </span>
      ))}
      {page < totalPages ? (
        <Link href={href(filter, page + 1)} aria-label="Next page" className={`${base} border border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/10`}><ChevronRight size={16} /></Link>
      ) : <span className={`${base} border border-slate-100 text-slate-300 dark:border-white/5 dark:text-slate-600`}><ChevronRight size={16} /></span>}
    </nav>
  )
}

export default async function EventsContent({ page = 1, filter = "all" }) {
  const t = today()
  const { events, count, featured, error } = await load(page, filter)
  const showFeatured = page === 1 && filter !== "past" && featured
  const items = showFeatured ? events.filter((e) => e.id !== featured.id) : events
  const totalPages = Math.max(Math.ceil(count / PAGE_SIZE), 1)

  // group by month
  const groups = []
  items.forEach((e) => {
    const key = e.date ? fmt(e.date, { month: "long", year: "numeric" }) : "Date to be announced"
    const g = groups.find((x) => x.key === key)
    g ? g.items.push(e) : groups.push({ key, items: [e] })
  })

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Filter events" className="inline-flex w-fit rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          {FILTERS.map((f) => {
            const on = f.key === filter
            return (
              <Link key={f.key} href={href(f.key, 1)} aria-current={on ? "page" : undefined} className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${on ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 dark:bg-blue-500" : "text-slate-600 hover:text-blue-700 dark:text-slate-300 dark:hover:text-white"}`}>
                {f.label}
              </Link>
            )
          })}
        </nav>
        <p className="text-sm text-slate-500 dark:text-slate-400">{count} {count === 1 ? "event" : "events"}</p>
      </div>

      <div className="mt-10 space-y-14">
        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            Events could not be loaded right now. Please try again in a moment.
          </div>
        )}

        {showFeatured && <Featured event={featured} t={t} />}

        {groups.map((g) => (
          <div key={g.key}>
            <ScrollReveal from="left">
              <div className="mb-6 flex items-center gap-4">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">{g.key}</h2>
                <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{g.items.length} {g.items.length === 1 ? "event" : "events"}</span>
              </div>
            </ScrollReveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {g.items.map((e, i) => (
                <ScrollReveal key={e.id} from={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "zoom"} delay={(i % 3) * 60}>
                  <EventCard event={e} upcoming={!!e.date && e.date >= t} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}

        {!error && !showFeatured && groups.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-20 text-center dark:border-white/15 dark:bg-white/[0.03]">
            <span className="mx-auto grid h-14 w-14 place-content-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300"><CalendarX size={26} /></span>
            <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">Nothing here yet</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
              {filter === "upcoming" ? "No upcoming events are announced right now. Check back soon, or browse what we have done before." : "No events match this view."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {filter !== "all" && <Link href="/events" className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">View all events</Link>}
              {filter === "upcoming" && <Link href="/events?filter=past" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-white dark:border-white/20 dark:text-white dark:hover:bg-white/10">See past events</Link>}
            </div>
          </div>
        )}
      </div>

      <Pagination filter={filter} page={page} totalPages={totalPages} />

      {/* Closing CTA */}
      <ScrollReveal from="zoom">
        <div className="relative mt-24 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-8 text-white shadow-2xl shadow-blue-900/25 sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-300/25 blur-[80px]" aria-hidden="true" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Never miss an event.</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-blue-100">Become a member to get first access to workshops, contests and the National Campus IT Fest.</p>
            </div>
            <Link href="/membership" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-900 transition-all hover:-translate-y-0.5 hover:bg-blue-50">
              Join DUITS <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}