import { Search } from "lucide-react"

export default function ExecutiveFilter({ searchTerm, setSearchTerm, filterPosition, positions, setFilterPosition, executives, sortedExecutives, setFilterDepartment }) {
  return (
        <div className="bg-white rounded-lg border border-slate-200 p-4 transition-all duration-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search executives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <select
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Positions</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
           
          </div>
          {(searchTerm || filterPosition ) && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs animate-in fade-in duration-200">
              <span className="text-slate-600">
                Showing {sortedExecutives.length} of {executives.length} executives
              </span>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setFilterPosition("")
                  setFilterDepartment("")
                }}
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
  )
}
