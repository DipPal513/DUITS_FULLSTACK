"use client"

import React, { useState } from "react"
import { Image as ImageIcon, X, ZoomIn } from "lucide-react"

// --- MASONRY SHIM ---
// This simulates masonry. In production, you might want 'react-masonry-css'
const Masonry = ({ breakpointCols, className, columnClassName, children }) => {
  return (
    <div className={`flex ${className}`}>
      {Array.from({ length: breakpointCols.default }).map((_, colIndex) => (
        <div key={colIndex} className={columnClassName}>
          {React.Children.toArray(children).filter((_, i) => i % breakpointCols.default === colIndex)}
        </div>
      ))}
    </div>
  )
}

// Better Masonry Shim for CSS Columns (matches your snippet logic)
const MasonryLayout = ({ children, className, columnClassName }) => {
    return (
      <div className="w-full columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {React.Children.map(children, child => (
          <div className="break-inside-avoid mb-6">
            {child}
          </div>
        ))}
      </div>
    )
  }

const GalleryGrid = ({ initialGallery = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  
  const isMasonry = initialGallery.length >= 2

  // Single Item Component
  const GalleryItem = ({ item }) => (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm ${isMasonry ? '' : 'h-full'}`}
      onClick={() => setSelectedImage(item)}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image} 
          alt={item.title} 
          className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="flex justify-end">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <ZoomIn className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="space-y-3 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
              <span className="inline-block px-4 py-1.5 bg-slate-900/90 dark:bg-white/90 backdrop-blur-sm text-white dark:text-slate-900 text-xs font-semibold rounded-full border border-white/10">
                {item.category || 'Event'}
              </span>
              <h3 className="text-white text-xl font-bold leading-tight drop-shadow-lg">
                {item.title}
              </h3>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/5 dark:ring-white/10 rounded-2xl pointer-events-none"></div>
      </div>
    </div>
  )

  if (initialGallery.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-8 h-8 text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">No images found</h3>
        <p className="text-slate-500 dark:text-slate-400">Check back later for event updates.</p>
      </div>
    )
  }

  return (
    <>
      {/* Grid Layout */}
      {isMasonry ? (
        <MasonryLayout>
          {initialGallery.map((item) => <GalleryItem key={item.id || item._id} item={item} />)}
        </MasonryLayout>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialGallery.map((item) => <GalleryItem key={item.id || item._id} item={item} />)}
        </div>
      )}

      {/* Lightbox / Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="max-w-6xl w-full animate-in zoom-in-95 duration-500" onClick={(e) => e.stopPropagation()}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[85vh] object-contain bg-slate-950"
              />
            </div>
            
            <div className="mt-6 text-center space-y-3 animate-in slide-in-from-bottom-4 duration-500 delay-150">
              <span className="inline-block px-4 py-2 bg-slate-900/90 dark:bg-white/90 backdrop-blur-sm text-white dark:text-slate-900 text-sm font-semibold rounded-full">
                {selectedImage.category || 'Details'}
              </span>
              <h3 className="text-white text-2xl font-bold">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GalleryGrid;