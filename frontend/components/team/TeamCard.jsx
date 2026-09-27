'use client'

import { Mail } from 'lucide-react'

export default function TeamCard({ member, isLatest = false }) {
  if (!member) return null

  const position = member.position || member.designation || 'Executive member'
  const yearLabel = member.year || member.session

  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800">
      <div className="relative h-72 overflow-hidden bg-slate-100 sm:h-80 dark:bg-slate-800">
        {member.image ? (
          <img src={member.image} alt={member.name} className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl font-semibold text-slate-400">{member.name?.[0]?.toUpperCase() || 'D'}</div>
        )}
        <div className="absolute left-4 top-4 flex gap-2">
          {member.duits_batch && <span className="rounded-sm bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm dark:bg-slate-950 dark:text-white">Batch {member.duits_batch}</span>}
          {isLatest && <span className="rounded-sm bg-blue-800 px-3 py-1.5 text-xs font-semibold text-white">Current panel</span>}
        </div>
      </div>
      <div className="p-6">
        <p className="mb-2 text-sm font-semibold uppercase text-blue-800 dark:text-blue-300">{position}</p>
        <h2 className="text-2xl font-bold leading-tight text-slate-950 dark:text-white">{member.name}</h2>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-200 pt-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
          {member.department && <span>{member.department}</span>}
          {yearLabel && <span>{yearLabel}</span>}
          {member.email && <a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 font-medium text-blue-800 hover:underline dark:text-blue-300"><Mail size={15} />Contact</a>}
        </div>
      </div>
    </article>
  )
}
