"use client"
// components/gallery/GalleryGrid.jsx — masonry grid, category filter, load more, keyboard-friendly lightbox
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { CalendarDays, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"

const STEP = 12
const srcOf = (i) => i.image || i.url || i.imageUrl || ""
const titleOf = (i) => i.title || i.caption || ""
const fmtDate = (d) => {
  if (!d) return ""
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(d) ? `${d}T00:00:00` : d)
  return isNaN(date) ? "" : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export default function GalleryGrid({ initialGallery = [] }) {
  const [cat, setCat] = useState("All")
  const [visible, setVisible] = useState(STEP)
  const [open, setOpen] = useState(null)
  const closeRef = useRef(null)

  const cats = useMemo(() => {
    const m = new Map()
    initialGallery.forEach((i) => i.category && m.set(i.category, (m.get(i.category) || 0) + 1))
    return [...m.entries()]
  }, [initialGallery])

  const filtered = useMemo(
    () => (cat === "All" ? initialGallery : initialGallery.filter((i) => i.category === cat)),
    [cat, initialGallery]
  )
  const shown = filtered.slice(0, visible)
  const current = open !== null ? filtered[open] : null

  const pick = (c) => { setCat(c); setVisible(STEP) }
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + filtered.length) % filtered.length)), [filtered.length])

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, close, step])

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {cats.length > 0 ? (
          <div role="group" aria-label="Filter photos by category" className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {[["All", initialGallery.length], ...cats].map(([name, n]) => {
              const on = cat === name
              return (
                <button key={name} onClick={() => pick(name)} aria-pressed={on} className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${on ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/25 dark:border-blue-500 dark:bg-blue-500" : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"}`}>
                  {name}
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${on ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400"}`}>{n}</span>
                </button>
              )
            })}
          </div>
        ) : <span />}
        <p className="text-sm text-slate-500 dark:text-slate-400">Showing {shown.length} of {filtered.length} photos</p>
      </div>

      {/* Masonry */}
      <div key={cat} className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {shown.map((item, i) => (
          <button
            key={item._id || item.id || i}
            onClick={() => setOpen(i)}
            aria-label={`Open photo${titleOf(item) ? `: ${titleOf(item)}` : ""}`}
            style={{ animationDelay: `${Math.min(i, 11) * 45}ms` }}
            className="gg-in group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-left shadow-sm transition-shadow hover:shadow-xl hover:shadow-blue-900/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/10 dark:bg-white/5 dark:shadow-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={srcOf(item)} alt={titleOf(item) || "DUITS gallery photo"} loading="lazy" className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.05]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
            <span className="absolute right-3 top-3 grid h-9 w-9 translate-y-1 place-content-center rounded-full bg-white/90 text-blue-700 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"><Maximize2 size={15} /></span>
            <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              {item.category && <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-semibold">{item.category}</span>}
              {titleOf(item) && <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug">{titleOf(item)}</p>}
            </div>
          </button>
        ))}
      </div>

      {/* Load more */}
      {visible < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button onClick={() => setVisible((v) => v + STEP)} className="rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 dark:border-white/20 dark:bg-white/5 dark:text-white dark:shadow-none dark:hover:bg-white/10">
            Load more photos
          </button>
        </div>
      )}

      {/* Lightbox */}
      {current && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={close} className="gg-fade fixed inset-0 z-[100] flex flex-col bg-slate-950/95 backdrop-blur-sm">
          <div className="flex items-center justify-between px-5 py-4 text-white" onClick={(e) => e.stopPropagation()}>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">{open + 1} / {filtered.length}</span>
            <button ref={closeRef} onClick={close} aria-label="Close viewer" className="grid h-10 w-10 place-content-center rounded-full bg-white/10 transition-colors hover:bg-white/20"><X size={18} /></button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
            <button onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous photo" className="absolute left-3 z-10 grid h-11 w-11 place-content-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-6"><ChevronLeft size={22} /></button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={srcOf(current)} src={srcOf(current)} alt={titleOf(current) || "DUITS gallery photo"} onClick={(e) => e.stopPropagation()} className="gg-zoom max-h-full max-w-full rounded-xl object-contain shadow-2xl" />
            <button onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next photo" className="absolute right-3 z-10 grid h-11 w-11 place-content-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-6"><ChevronRight size={22} /></button>
          </div>

          <div className="px-5 py-5 text-center text-white" onClick={(e) => e.stopPropagation()}>
            {titleOf(current) && <p className="text-base font-medium">{titleOf(current)}</p>}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
              {current.category && <span className="rounded-full bg-blue-600 px-2.5 py-1 font-semibold text-white">{current.category}</span>}
              {fmtDate(current.date) && <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} />{fmtDate(current.date)}</span>}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gg-in { animation: ggin .5s cubic-bezier(.2,.7,.2,1) both; }
        @keyframes ggin { from { opacity: 0; transform: translateY(16px) scale(.98); } to { opacity: 1; transform: none; } }
        .gg-fade { animation: ggfade .2s ease both; }
        @keyframes ggfade { from { opacity: 0; } to { opacity: 1; } }
        .gg-zoom { animation: ggzoom .3s cubic-bezier(.2,.7,.2,1) both; }
        @keyframes ggzoom { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .gg-in, .gg-fade, .gg-zoom { animation: none; } }
      `}</style>
    </div>
  )
}