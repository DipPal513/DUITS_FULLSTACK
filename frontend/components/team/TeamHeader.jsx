import { X } from "lucide-react"

const TeamHeader = ({ 
  totalTeams, 
  loading, 
  onYearChange, 
  onBatchChange,
  onClearFilters,
  selectedYear = "",
  selectedBatch = "",
  availableYears = [],
  availableBatches = []
}) => {
  const hasActiveFilters = selectedYear || selectedBatch;

  return (
    <div className="mb-12">
      <div className="mb-8 mt-20">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
          Executive Panel
        </h2>
        {!loading && totalTeams > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {totalTeams} member{totalTeams !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {/* Year Filter */}
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 block">
            Year
          </label>
          <div className="flex flex-wrap gap-2">
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => onYearChange(year)}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  selectedYear === year
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Batch Filter */}
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 block">
            Batch
          </label>
          <div className="flex flex-wrap gap-2">
            {availableBatches.map((batch) => (
              <button
                key={batch}
                onClick={() => onBatchChange(batch)}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  selectedBatch === batch
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {batch}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 pt-2">
            {selectedYear && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs">
                {selectedYear}
                <button onClick={() => onYearChange(selectedYear)} className="hover:text-gray-900 dark:hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedBatch && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs">
                Batch {selectedBatch}
                <button onClick={() => onBatchChange(selectedBatch)} className="hover:text-gray-900 dark:hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={onClearFilters}
              className="ml-auto text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamHeader