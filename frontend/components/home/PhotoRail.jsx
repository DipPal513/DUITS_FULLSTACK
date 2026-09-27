"use client"

import { useRef, useState } from "react"
import { ArrowLeft, ArrowRight, X } from "lucide-react"

export default function PhotoRail({ photos = [] }) {
  const railRef = useRef(null)
  const [selected, setSelected] = useState(null)

  const moveRail = (direction) => {
    railRef.current?.scrollBy({ left: direction * Math.min(520, railRef.current.clientWidth * 0.78), behavior: "smooth" })
  }

  if (!photos.length) return null

  return (
    <>
      <div className="relative">
        <div ref={railRef} className="photo-rail flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5" aria-label="DUITS event photographs">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setSelected(photo)}
              className={`photo-rail-item group relative shrink-0 snap-start overflow-hidden rounded-md bg-slate-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${index === 0 ? "w-[82vw] sm:w-[62vw] lg:w-[46vw]" : "w-[70vw] sm:w-[42vw] lg:w-[30vw]"}`}
            >
              <img src={photo.image} alt={photo.title || "DUITS community"} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent px-5 pb-5 pt-16 text-left">
                <span className="block text-[11px] font-semibold uppercase text-cyan-200">{photo.category || "DUITS / Field notes"}</span>
                <span className="mt-1 block max-w-md text-lg font-semibold text-white sm:text-xl">{photo.title}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="absolute -top-16 right-0 hidden gap-2 sm:flex">
          <button type="button" aria-label="Scroll photos left" onClick={() => moveRail(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 transition-colors hover:border-blue-800 hover:bg-blue-800 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-white"><ArrowLeft size={17} /></button>
          <button type="button" aria-label="Scroll photos right" onClick={() => moveRail(1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 transition-colors hover:border-blue-800 hover:bg-blue-800 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-white"><ArrowRight size={17} /></button>
        </div>
      </div>
      {selected && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/95 p-4" onClick={() => setSelected(null)} role="presentation">
          <button type="button" aria-label="Close photograph" onClick={() => setSelected(null)} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white"><X size={20} /></button>
          <figure className="max-h-[90vh] max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <img src={selected.image} alt={selected.title || "DUITS community"} className="max-h-[78vh] max-w-full object-contain" />
            <figcaption className="mt-4 text-center text-sm text-white">{selected.title}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
