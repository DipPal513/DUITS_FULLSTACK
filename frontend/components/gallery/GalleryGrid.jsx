"use client"

import { useState } from "react"
import { Image as ImageIcon, X } from "lucide-react"

export default function GalleryGrid({ initialGallery = [] }) {
  const [selectedImage, setSelectedImage] = useState(null)

  if (!initialGallery.length) {
    return <div className="border border-dashed border-slate-300 p-12 text-center text-slate-600 dark:border-slate-700 dark:text-slate-300"><ImageIcon className="mx-auto mb-3" /><p>No gallery images are available yet.</p></div>
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {initialGallery.map((item) => (
          <button key={item.id} type="button" onClick={() => setSelectedImage(item)} className="group overflow-hidden rounded-lg border border-slate-200 bg-white text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 dark:border-slate-800 dark:bg-slate-900">
            <img src={item.image} alt={item.title || "DUITS event"} className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" loading="lazy" />
            <span className="block border-t border-slate-200 px-4 py-3 dark:border-slate-800">
              <span className="block truncate font-semibold text-slate-900 dark:text-white">{item.title}</span>
              {item.category && <span className="mt-1 block text-xs text-slate-500">{item.category}</span>}
            </span>
          </button>
        ))}
      </div>
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4" onClick={() => setSelectedImage(null)} role="presentation">
          <button type="button" aria-label="Close image" onClick={() => setSelectedImage(null)} className="absolute right-5 top-5 rounded-md bg-white p-3 text-slate-900"><X size={20} /></button>
          <figure className="max-h-[90vh] max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <img src={selectedImage.image} alt={selectedImage.title || "DUITS event"} className="max-h-[78vh] w-auto max-w-full object-contain" />
            <figcaption className="mt-3 text-center text-white">{selectedImage.title}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}