"use client"

import Link from "next/link"
import { ArrowUpRight, Award, CalendarDays } from "lucide-react"

export default function AchievementsGrid({ achievements = [] }) {
  return (
    <section id="achievements" className="bg-slate-50 py-16 sm:py-20 dark:bg-slate-950">
      <div className="container mx-auto px-4 lg:px-8">
        <header className="mb-10 flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase text-blue-800 dark:text-blue-300">Recognition</p>
            <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl dark:text-white">Our achievements</h2>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">Milestones and recognition earned by the DUITS community.</p>
          </div>
          <span className="text-sm text-slate-500">{achievements.length} records</span>
        </header>

        {achievements.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">Achievement records will appear here.</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {achievements.map((achievement) => (
              <Link key={achievement.id} href={`/achievements/${achievement.id}`} className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800">
                {achievement.image ? <img src={achievement.image} alt="" className="h-48 w-full object-cover" loading="lazy" /> : <div className="flex h-48 items-center justify-center bg-slate-100 text-blue-800 dark:bg-slate-800 dark:text-blue-300"><Award size={38} strokeWidth={1.5} /></div>}
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-blue-800 dark:text-blue-300"><Award size={15} /> Achievement</span>
                    {achievement.date && <span className="inline-flex items-center gap-1 text-xs text-slate-500"><CalendarDays size={14} />{new Date(`${achievement.date}T00:00:00`).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</span>}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold leading-snug text-slate-900 group-hover:text-blue-800 dark:text-white dark:group-hover:text-blue-300">{achievement.title}</h3>
                  <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{achievement.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-800 dark:text-blue-300">Read story <ArrowUpRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
