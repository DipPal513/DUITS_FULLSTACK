import { Suspense } from "react"
import { CalendarDays, Code2, Mic2, Trophy, Wrench } from "lucide-react"
import EventsContent from "@/components/events/EventContent"
import GlobalSkeleton from "@/components/GlobalSkeleton"

export const metadata = {
  title: "Events & Activities | DUITS",
  description:
    "Explore upcoming seminars, workshops, hackathons, and the National Campus IT Fest organized by Dhaka University IT Society (DUITS). Stay updated with the latest tech events on campus.",
  openGraph: {
    title: "Upcoming Events | Dhaka University IT Society",
    description:
      "Join the biggest tech community at Dhaka University. Check out our latest workshops, bootcamps, and the signature National Campus IT Fest.",
    url: "https://duitsbd.org/events",
    siteName: "Dhaka University IT Society",
    images: [{ url: "/icons/duits-512.png", width: 512, height: 512, alt: "Dhaka University IT Society logo" }],
    locale: "en_US",
    type: "website",
  },
}

const TYPES = [
  { icon: Mic2, label: "Seminars" },
  { icon: Wrench, label: "Workshops" },
  { icon: Code2, label: "Hackathons" },
  { icon: Trophy, label: "National IT Fest" },
]

export default async function EventsPage({ searchParams }) {
  const params = await searchParams
  const page = Math.max(Number(params?.page) || 1, 1)
  const filter = ["all", "upcoming", "past"].includes(params?.filter) ? params.filter : "all"

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-[#050b1f] dark:text-white">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e3edff] via-[#f0f6ff] to-white pb-16 pt-32 dark:from-[#050b1f] dark:via-[#050b1f] dark:to-[#050b1f] sm:pb-20 sm:pt-36">
        <div className="ev-grid" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-blue-400/25 blur-[100px] dark:bg-blue-600/25" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-300/25 blur-[100px] dark:bg-cyan-500/10" aria-hidden="true" />
        <CalendarDays aria-hidden="true" strokeWidth={1} className="pointer-events-none absolute -right-10 top-20 hidden h-80 w-80 text-blue-600/[0.07] dark:text-blue-400/[0.08] lg:block" />

        <div className="ev-in relative mx-auto max-w-6xl px-6 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-blue-800 backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-blue-100">
            <CalendarDays size={14} /> Events & activities
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Where ideas meet{" "}
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-300 dark:via-blue-400 dark:to-cyan-300">the campus.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Seminars, workshops, hackathons and our signature National Campus IT Fest. Find what is coming up, and look back at what we have done.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {TYPES.map(({ icon: I, label }) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:shadow-none">
                <I size={15} className="text-blue-600 dark:text-blue-400" />{label}
              </span>
            ))}
          </div>
        </div>

        <style>{`
          .ev-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(37,99,235,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.08) 1px, transparent 1px); background-size: 56px 56px; -webkit-mask-image: radial-gradient(ellipse 70% 80% at 30% 30%, #000 25%, transparent 75%); mask-image: radial-gradient(ellipse 70% 80% at 30% 30%, #000 25%, transparent 75%); }
          .dark .ev-grid { background-image: linear-gradient(rgba(148,163,184,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.08) 1px, transparent 1px); }
          .ev-in { animation: evin .8s cubic-bezier(.2,.7,.2,1) both; }
          @keyframes evin { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
          @media (prefers-reduced-motion: reduce) { .ev-in { animation: none; } }
        `}</style>
      </section>

      {/* List */}
      <section id="events" className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Suspense key={`${filter}-${page}`} fallback={<GlobalSkeleton />}>
            <EventsContent page={page} filter={filter} />
          </Suspense>
        </div>
      </section>
    </main>
  )
}