import React from 'react'

export default function Background() {
  return (
     
      <div className="absolute inset-0 pointer-events-none opacity-[0.5] dark:opacity-[0.1]">
        <div className="absolute inset-0" 
             style={{ 
               backgroundImage: `linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)`, 
               backgroundSize: '50px 50px' 
             }}>
        </div>
        {/* Soft Vignette to focus center */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-gray-50 dark:from-[#09090b] dark:via-transparent dark:to-[#09090b]"></div>
      </div>

  )
}
