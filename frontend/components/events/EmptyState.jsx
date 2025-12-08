import { Calendar } from "lucide-react"

export default function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <Calendar className="w-8 h-8 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-lg font-medium text-slate-900 dark:text-white">No Events Found</h3>
      <p className="text-slate-500 dark:text-slate-400">Check back later for upcoming events.</p>
    </div>
  )
}