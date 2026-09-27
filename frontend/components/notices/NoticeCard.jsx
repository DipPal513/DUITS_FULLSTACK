'use client'

import Link from 'next/link'
import { ArrowRight, CalendarDays, FileText } from 'lucide-react'

const formatDeadline = (value) => {
  if (!value) return null
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function NoticeCard({ notice }) {
  const isClosed = notice.deadline && notice.deadline < new Date().toISOString().slice(0, 10)

  return (
    <Link
      href={`/notice/${notice.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors hover:border-blue-300 hover:bg-blue-50/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-slate-950">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-800 dark:text-blue-300">
          <FileText size={15} /> Official notice
        </span>
        {isClosed && <span className="text-xs font-medium text-slate-500">Closed</span>}
      </div>
      {notice.image && (
        <img src={notice.image} alt="" className="h-44 w-full object-cover" loading="lazy" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <h2 className="mb-2 line-clamp-2 text-lg font-semibold leading-snug text-slate-900 group-hover:text-blue-800 dark:text-white dark:group-hover:text-blue-300">
          {notice.title}
        </h2>
        <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {notice.description}
        </p>
        {notice.deadline && (
          <p className="mt-auto flex items-center gap-2 border-t border-slate-200 pt-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
            <CalendarDays size={16} className="text-blue-700 dark:text-blue-300" />
            Deadline: {formatDeadline(notice.deadline)}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-800 dark:text-blue-300">
          Read full notice <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
