'use client'

import React from 'react'
import { Quote, ArrowRight } from 'lucide-react'

const MessageFromOurAdvisor = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="mb-10 flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500 animate-pulse" />
          <h2 className="text-sm font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
            Leadership Insight
          </h2>
        </div>

        {/* The Grid Layout (Bento Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* BLOCK 1: THE IMAGE (Occupies 5 columns) */}
          <div className="lg:col-span-5 h-[400px] lg:h-auto relative group overflow-hidden rounded-3xl">
            <img
              src="/advisor.jpg"
              alt="Advisor"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark Mode Gradient Overlay at bottom for name legibility if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 dark:opacity-40 transition-opacity" />
          </div>

          {/* BLOCK 2: THE MESSAGE (Occupies 7 columns) */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800 flex flex-col justify-between shadow-sm dark:shadow-none">
            
            {/* Content Top */}
            <div>
              <Quote className="text-blue-600 dark:text-blue-500 mb-6 w-10 h-10" />
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-snug mb-6">
                "Our mission isn't just to build technology, but to build <span className="text-blue-600 dark:text-blue-400">trust</span>."
              </h3>
              
              <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  In a world obsessed with speed, we choose to prioritize stability and integrity. The decisions we make today are the foundation for the community we are building for tomorrow.
                </p>
              </div>
            </div>

            {/* Content Bottom: Info & Action */}
            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              
              {/* Profile Details */}
              <div>
                <div className="font-bold text-lg text-gray-900 dark:text-white">
                  	Dr. Kazi Muheymin-Us-Sakib (Professor)
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Chief Advisor
                </div>
              </div>

              {/* Action Button */}
              <a 
                href="/about" 
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600"
              >
                <ArrowRight size={20} className="transition-transform duration-300 group-hover:-rotate-45" />
              </a>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default MessageFromOurAdvisor