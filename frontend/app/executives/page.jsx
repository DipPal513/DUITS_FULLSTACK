import { Suspense } from "react"
import { Users } from "lucide-react"
import TeamContent from "@/components/team/TeamContent"

export async function generateMetadata({ searchParams }) {
  const params = await searchParams
  const year = params?.year
  const title = year ? `Executive Committee ${year} | DUITS` : "Executive Committee | DUITS"

  return {
    title,
    description:
      "Meet the visionary leaders and executive members of Dhaka University IT Society (DUITS). Explore our current committee and the history of past panels who built this legacy.",
    openGraph: {
      title,
      description:
        "The dedicated team behind DUITS. See the current Executive Committee and past leaders of the University of Dhaka's premier IT organization.",
      url: "https://duitsbd.org/executives",
      siteName: "Dhaka University IT Society",
      images: [{ url: "/icons/duits-512.png", width: 512, height: 512, alt: "Dhaka University IT Society logo" }],
      locale: "en_US",
      type: "website",
    },
  }
}

function ExecutiveSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => <div key={i} className="h-10 w-24 rounded-full bg-slate-200 dark:bg-white/10" />)}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10">
            <div className="aspect-[4/5] bg-slate-200 dark:bg-white/10" />
            <div className="space-y-2 p-5">
              <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-white/10" />
              <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function ExecutivePage({ searchParams }) {
  const params = await searchParams
  const year = params?.year || ""
  const batch = params?.batch || ""

  return (
    <main id="team" className="min-h-screen bg-white text-slate-900 dark:bg-[#050b1f] dark:text-white">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e3edff] via-[#f0f6ff] to-white pb-16 pt-32 dark:from-[#050b1f] dark:via-[#050b1f] dark:to-[#050b1f] sm:pb-20 sm:pt-36">
        <div className="ex-grid" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-blue-400/25 blur-[100px] dark:bg-blue-600/25" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-300/25 blur-[100px] dark:bg-cyan-500/10" aria-hidden="true" />
        <Users aria-hidden="true" strokeWidth={1} className="pointer-events-none absolute -right-10 top-20 hidden h-80 w-80 text-blue-600/[0.07] dark:text-blue-400/[0.08] lg:block" />

        <div className="ex-in relative mx-auto max-w-6xl px-6 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-blue-800 backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-blue-100">
            <Users size={14} /> Executive committee{year ? ` · ${year}` : ""}
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Meet the people behind{" "}
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-300 dark:via-blue-400 dark:to-cyan-300">DUITS.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Students who give their time to run workshops, contests and programs for the whole campus. Explore the current committee and the panels that built this legacy.
          </p>
        </div>

        <style>{`
          .ex-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(37,99,235,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.08) 1px, transparent 1px); background-size: 56px 56px; -webkit-mask-image: radial-gradient(ellipse 70% 80% at 30% 30%, #000 25%, transparent 75%); mask-image: radial-gradient(ellipse 70% 80% at 30% 30%, #000 25%, transparent 75%); }
          .dark .ex-grid { background-image: linear-gradient(rgba(148,163,184,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.08) 1px, transparent 1px); }
          .ex-in { animation: exin .8s cubic-bezier(.2,.7,.2,1) both; }
          @keyframes exin { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
          @media (prefers-reduced-motion: reduce) { .ex-in { animation: none; } }
        `}</style>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Suspense key={`${year}-${batch}`} fallback={<ExecutiveSkeleton />}>
            <TeamContent year={year} batch={batch} />
          </Suspense>
        </div>
      </section>
    </main>
  )
}