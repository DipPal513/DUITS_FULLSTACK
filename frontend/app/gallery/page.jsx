import { Suspense } from "react"
import { Camera } from "lucide-react"
import GalleryContent from "@/components/gallery/GalleryContent"
import GlobalSkeleton from "@/components/GlobalSkeleton"

export const metadata = {
  title: "Event Gallery | DUITS",
  description:
    "Browse the visual archive of Dhaka University IT Society. Relive moments from the National Campus IT Fest (NCIF), workshops, seminars, and daily life at TSC.",
  openGraph: {
    title: "Photo Gallery | Dhaka University IT Society",
    description:
      "See the highlights of our journey. Photos from our biggest events, executive committee activities, and community gatherings.",
    url: "https://duitsbd.org/gallery",
    siteName: "Dhaka University IT Society",
    images: [{ url: "/icons/duits-512.png", width: 512, height: 512, alt: "Dhaka University IT Society logo" }],
    locale: "en_US",
    type: "website",
  },
}

const TOPICS = ["National IT Fest", "Workshops", "Seminars", "Life at TSC"]

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-[#050b1f] dark:text-white">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e3edff] via-[#f0f6ff] to-white pb-16 pt-32 dark:from-[#050b1f] dark:via-[#050b1f] dark:to-[#050b1f] sm:pb-20 sm:pt-36">
        <div className="gl-grid" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-blue-400/25 blur-[100px] dark:bg-blue-600/25" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-300/25 blur-[100px] dark:bg-cyan-500/10" aria-hidden="true" />
        <Camera aria-hidden="true" strokeWidth={1} className="pointer-events-none absolute -right-10 top-20 hidden h-80 w-80 text-blue-600/[0.07] dark:text-blue-400/[0.08] lg:block" />

        <div className="gl-in relative mx-auto max-w-6xl px-6 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-blue-800 backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-blue-100">
            <Camera size={14} /> Visual archive
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Moments worth{" "}
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-300 dark:via-blue-400 dark:to-cyan-300">keeping.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            A visual record of society events, workshops, and campus life. Browse by category and open any photo to see it full size.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {TOPICS.map((t) => (
              <span key={t} className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:shadow-none">{t}</span>
            ))}
          </div>
        </div>

        <style>{`
          .gl-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(37,99,235,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.08) 1px, transparent 1px); background-size: 56px 56px; -webkit-mask-image: radial-gradient(ellipse 70% 80% at 30% 30%, #000 25%, transparent 75%); mask-image: radial-gradient(ellipse 70% 80% at 30% 30%, #000 25%, transparent 75%); }
          .dark .gl-grid { background-image: linear-gradient(rgba(148,163,184,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.08) 1px, transparent 1px); }
          .gl-in { animation: glin .8s cubic-bezier(.2,.7,.2,1) both; }
          @keyframes glin { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
          @media (prefers-reduced-motion: reduce) { .gl-in { animation: none; } }
        `}</style>
      </section>

      <section id="gallery" className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          {/* Content area fetches independently */}
          <Suspense fallback={<GlobalSkeleton />}>
            <GalleryContent />
          </Suspense>
        </div>
      </section>
    </main>
  )
}