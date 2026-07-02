'use client'

import { useEffect, useState } from 'react'

export default function UnderConstructionModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-6 text-center shadow-2xl dark:bg-slate-900">
        <div className="mb-4 text-4xl">🚧</div>
        <h2 className="mb-2 text-2xl font-semibold text-slate-900 dark:text-white">
          Website Under Construction
        </h2>
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
          We are currently updating this website. Please check back soon.
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
