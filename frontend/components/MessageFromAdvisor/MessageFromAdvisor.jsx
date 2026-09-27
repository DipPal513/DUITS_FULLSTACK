'use client'

import React from 'react'
import { Quote, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const MessageFromOurAdvisor = () => {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-primary" />
          <h2 className="text-xs font-semibold uppercase text-muted-foreground">
            Leadership Insight
          </h2>
        </div>

        {/* The Grid Layout (Bento Style) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          
          {/* BLOCK 1: THE IMAGE (Occupies 5 columns) */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted lg:col-span-5 lg:aspect-auto">
            <img
              src="/advisor.jpg"
              alt="Advisor"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Dark Mode Gradient Overlay at bottom for name legibility if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 dark:opacity-40 transition-opacity" />
          </div>

          {/* BLOCK 2: THE MESSAGE (Occupies 7 columns) */}
          <div className="flex flex-col justify-between rounded-md border border-border bg-card p-6 sm:p-8 lg:col-span-7 lg:p-10">
            
            {/* Content Top */}
            <div>
              <Quote className="mb-6 h-8 w-8 text-primary" />
              
              <h3 className="mb-5 text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
                "Our mission isn't just to build technology, but to build <span className="text-primary">trust</span>."
              </h3>
              
              <div className="max-w-2xl leading-7 text-muted-foreground">
                <p>
                  In a world obsessed with speed, we choose to prioritize stability and integrity. The decisions we make today are the foundation for the community we are building for tomorrow.
                </p>
              </div>
            </div>

            {/* Content Bottom: Info & Action */}
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
              
              {/* Profile Details */}
              <div>
                <div className="font-semibold text-foreground">
                  	Dr. Kazi Muheymin-Us-Sakib (Professor)
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Chief Advisor
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/about" 
                aria-label="Learn more about DUITS"
                className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default MessageFromOurAdvisor