import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"

export default function DUITSProfessionalHero() {
  return (
    <section className="relative isolate flex min-h-[min(760px,calc(100svh-4rem))] items-end overflow-hidden bg-slate-950 text-white">
      <Image
        src="/banner.jpg"
        alt="Students taking part in a DUITS computer and technology event"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/20" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/50 to-transparent" />
      <div className="relative mx-auto w-full max-w-screen-2xl px-5 pb-12 pt-36 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-2 text-sm font-semibold text-white/80">
            <MapPin size={16} aria-hidden="true" /> University of Dhaka · TSC
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-7xl">
            Dhaka University <span className="text-cyan-300">IT Society</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
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
      </div>
    </section>
  )
}

