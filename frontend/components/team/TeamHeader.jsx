import { Users, Calendar, ChevronLeft, ChevronRight, X } from "lucide-react"

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
  const currentYearIndex = availableYears.indexOf(selectedYear);
  
  const handlePrevYear = () => {
    if (currentYearIndex < availableYears.length - 1) {
      onYearChange(availableYears[currentYearIndex + 1]);
    }
  };

  const handleNextYear = () => {
    if (currentYearIndex > 0) {
      onYearChange(availableYears[currentYearIndex - 1]);
    }
  };

  const canGoPrev = selectedYear && currentYearIndex < availableYears.length - 1;
  const canGoNext = selectedYear && currentYearIndex > 0;

  const hasActiveFilters = selectedYear || selectedBatch;

  return (
    <div className="max-w-4xl mx-auto mb-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4 border border-blue-200 dark:border-blue-800">
          <Users className="w-4 h-4" />
          Our Teams
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          Meet Our Team Members
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Explore our talented team members across different years and batches
        </p>
      </div>

      {/* Filter Component */}
      <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        {/* Year Filter */}
        {availableYears.length > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Year:</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevYear}
                  disabled={!canGoPrev}
                  className={`
                    p-1.5 rounded-md transition-all duration-200
                    ${canGoPrev 
                      ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white' 
                      : 'bg-gray-100/50 dark:bg-gray-700/50 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    }
                  `}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className={`px-6 py-2 rounded-md font-bold text-lg shadow-md min-w-[100px] text-center transition-colors ${
                  selectedYear 
                    ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {selectedYear || 'All Years'}
                </div>

                <button
                  onClick={handleNextYear}
                  disabled={!canGoNext}
                  className={`
                    p-1.5 rounded-md transition-all duration-200
                    ${canGoNext 
                      ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white' 
                      : 'bg-gray-100/50 dark:bg-gray-700/50 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    }
                  `}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Teams Count */}
            {!loading && totalTeams > 0 && (
              <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                <span className="font-semibold text-gray-900 dark:text-white">{totalTeams}</span>
                {" "}member{totalTeams !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        )}

        {/* Batch Filter */}
        {availableBatches.length > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white min-w-[60px]">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Batch:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onBatchChange("")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  !selectedBatch
                    ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                All Batches
              </button>
              {availableBatches.map((batch) => (
                <button
                  key={batch}
                  onClick={() => onBatchChange(batch)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    selectedBatch === batch
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {batch}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters & Clear Button */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
            {selectedYear && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                Year: {selectedYear}
                <button 
                  onClick={() => onYearChange("")}
                  className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {selectedBatch && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                Batch: {selectedBatch}
                <button 
                  onClick={() => onBatchChange("")}
                  className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            <button
              onClick={onClearFilters}
              className="ml-auto px-4 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamHeader