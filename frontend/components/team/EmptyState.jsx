import Link from "next/link"
import { Users } from "lucide-react"

export default function EmptyTeamState({ hasFilters, selectedYear, selectedBatch }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-white/50 dark:bg-gray-900/50">
      <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <Users className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {hasFilters ? "No members found" : "Team list is empty"}
      </h3>
      <p className="text-gray-500 text-center max-w-sm mt-1 mb-6">
        {hasFilters 
          ? `We couldn't find any executives for Year ${selectedYear} / Batch ${selectedBatch}.`
          : "Check back later for updates."}
      </p>
      
      {hasFilters && (
        <Link
          href="/team"
          className="px-5 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-colors text-sm"
        >
          Clear all filters
        </Link>
      )}
    </div>
  )
}