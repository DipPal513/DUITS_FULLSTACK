'use client'

import React, { useState } from 'react'
import { Linkedin, Twitter, Mail } from 'lucide-react'

const TeamCard = ({ member, loading = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  // 1. The Loading Skeleton (Matches new shape)
  if (loading) {
    return (
      <div className="relative w-full h-32 rounded-[2rem] p-[2px] bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div className="h-full w-full rounded-[calc(2rem-2px)] bg-white dark:bg-gray-950 p-4 flex items-center gap-5">
           <div className="w-20 h-20 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse shrink-0" />
           <div className="flex-1 space-y-3">
             <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
             <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
           </div>
        </div>
      </div>
    )
  }

  if (!member) return null

  return (
    // Outer container for the "Gradient Border" hack
    <div className="group relative w-full h-32 rounded-[2rem] p-[2px] transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer overflow-hidden">
      
      {/* The colorful background that forms the border and hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-all duration-500 group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500" />

      {/* The main card content container */}
      <div className="relative h-full w-full rounded-[calc(2rem-2px)] bg-white dark:bg-gray-950 p-4 flex items-center gap-5 overflow-hidden">
        
        {/* 2. THE IMAGE (Grayscale to Color Bloom) */}
        <div className="relative shrink-0">
          {/* Decorative Ring */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 blur-md opacity-0 scale-75 transition-all duration-500 group-hover:opacity-40 group-hover:scale-110" />
          
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden z-10 transition-transform duration-500 group-hover:scale-[1.03]">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                // Note the 'grayscale' class that gets removed on hover
                className={`w-full h-full object-cover grayscale group-hover:grayscale-0 ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-all duration-500`}
                onLoad={() => setImageLoaded(true)}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-400 font-bold text-xl">
                {member.name?.[0]}
              </div>
            )}
          </div>
        </div>

        {/* 3. TEXT CONTENT (Slides up on hover) */}
        <div className="flex-1 min-w-0 flex flex-col justify-center z-20 transition-all duration-500 group-hover:-translate-y-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
            {member.name}
          </h3>
          
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate mt-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text transition-all duration-500 group-hover:text-transparent">
            {member.designation || member.position}
          </p>
        </div>

        {/* 4. HIDDEN SOCIAL LAYER (Reveals from bottom) */}
        <div className="absolute bottom-4 left-[6.5rem] right-4 flex items-center gap-3 opacity-0 translate-y-8 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-100 group-hover:translate-y-0 z-10">
           <SocialBtn icon={<Linkedin size={16} />} />
           <SocialBtn icon={<Twitter size={16} />} />
           <SocialBtn icon={<Mail size={16} />} />
        </div>

      </div>
    </div>
  )
}

// Little helper for the social buttons
const SocialBtn = ({ icon }) => (
  <button className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-colors duration-300">
    {icon}
  </button>
)

export default TeamCard