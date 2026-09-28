import Link from "next/link"
import { ArrowRight, ImageIcon } from "lucide-react"
import supabaseApi from "@/config/supabaseApi"
import GalleryGrid from "@/components/gallery/GalleryGrid"
import ScrollReveal from "@/components/home/ScrollReveal"

// Data fetching logic
async function getGalleryImages() {
  try {
    const res = await supabaseApi.getGallery()
    return res || []
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return []
  }
}

export default async function GalleryContent() {
  // The slow await happens here, safely inside Suspense
  const gallery = await getGalleryImages()

  if (!gallery || gallery.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-20 text-center dark:border-white/15 dark:bg-white/[0.03]">
        <span className="mx-auto grid h-14 w-14 place-content-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
          <ImageIcon size={26} />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">No photos yet</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">The gallery is currently empty. New photos appear here after every event.</p>
        <Link href="/events" className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
          See events <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <>
      <GalleryGrid initialGallery={gallery} />

      <ScrollReveal from="zoom">
        <div className="relative mt-24 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-8 text-white shadow-2xl shadow-blue-900/25 sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-300/25 blur-[80px]" aria-hidden="true" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Be in the next photo.</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-blue-100">Join DUITS and be part of the workshops, contests and events we capture.</p>
            </div>
            <Link href="/membership" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-900 transition-all hover:-translate-y-0.5 hover:bg-blue-50">
              Join DUITS <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </>
  )
}