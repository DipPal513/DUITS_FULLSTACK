import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight, MapPin } from "lucide-react"

export default function DUITSProfessionalHero() {
  return (
    <section className="relative isolate flex min-h-[min(760px,calc(100svh-4rem))] items-end overflow-hidden bg-slate-950 text-white">
      <Image
        src="/banner.jpg"
        alt="Students taking part in a DUITS computer and technology event"
        fill
        priority
        sizes="100vw"
        className="duits-hero-photo object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/20" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/60 to-transparent" />
      <div className="relative mx-auto w-full max-w-screen-2xl px-5 pb-12 pt-36 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="editorial-enter max-w-3xl">
          <p className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] font-semibold uppercase text-white/85">
            <span className="inline-flex items-center gap-2"><MapPin size={14} aria-hidden="true" /> University of Dhaka · TSC</span>
            <span className="h-px w-8 bg-cyan-300/80" aria-hidden="true" />
            <span>Student society / Est. 2011</span>
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-medium leading-[0.98] sm:text-6xl lg:text-8xl">
            Dhaka University <span className="text-cyan-200">IT Society</span>
          </h1>
          <p className="mt-6 max-w-xl border-l border-cyan-200/80 pl-4 text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            A student community for learning technology, building together, and creating a lasting impact across campus.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/membership" className="inline-flex min-h-12 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-100">
              Join the Society <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/events" className="inline-flex min-h-12 items-center rounded-md border border-white/55 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Explore events
            </Link>
          </div>
        </div>
        <div className="mt-12 flex items-center gap-3 text-[10px] font-semibold uppercase text-white/75 sm:mt-16">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/45"><ArrowDown size={15} aria-hidden="true" /></span>
          <span>Scroll to explore</span>
          <span className="ml-auto hidden font-mono sm:block">DUITS / University of Dhaka</span>
        </div>
      </div>
    </section>
  )
}

