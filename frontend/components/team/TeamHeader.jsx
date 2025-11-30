import { Users, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const TeamHeader = ({ currentPage, teamsPerPage, totalTeams, loading, onYearChange, availableYears = [] }) => {
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)

  // Generate years array if not provided
  const years = availableYears.length > 0 
    ? availableYears 
    : Array.from({ length: 7 }, (_, i) => currentYear - 5 + i).reverse()

  const handleYearChange = (year) => {
    setSelectedYear(year)
    onYearChange?.(year)
  }

  const handlePrevYear = () => {
    const currentIndex = years.indexOf(selectedYear)
    if (currentIndex < years.length - 1) {
      handleYearChange(years[currentIndex + 1])
    }
  }

  const handleNextYear = () => {
    const currentIndex = years.indexOf(selectedYear)
    if (currentIndex > 0) {
      handleYearChange(years[currentIndex - 1])
    }
  }

  const canGoPrev = years.indexOf(selectedYear) < years.length - 1
  const canGoNext = years.indexOf(selectedYear) > 0

  return (
    <div className="max-w-4xl mx-auto mb-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
          <Users className="w-4 h-4" />
          Our Teams
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          Meet Our Team Members
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Explore our talented team members across different years and discover the people who make it all possible
        </p>
      </div>

      {/* Year Filter Component */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card border rounded-lg shadow-sm">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Year:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevYear}
              disabled={!canGoPrev}
              className={`
                p-1.5 rounded-md transition-all duration-200
                ${canGoPrev 
                  ? 'bg-muted hover:bg-muted/80 text-foreground' 
                  : 'bg-muted/50 text-muted-foreground/50 cursor-not-allowed'
                }
              `}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-bold text-lg shadow-md min-w-[100px] text-center">
              {selectedYear}
            </div>

            <button
              onClick={handleNextYear}
              disabled={!canGoNext}
              className={`
                p-1.5 rounded-md transition-all duration-200
                ${canGoNext 
                  ? 'bg-muted hover:bg-muted/80 text-foreground' 
                  : 'bg-muted/50 text-muted-foreground/50 cursor-not-allowed'
                }
              `}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Teams Count */}
        {!loading && totalTeams > 0 && (
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            <span className="font-semibold text-foreground">{(currentPage - 1) * teamsPerPage + 1}</span>
            {" "}-{" "}
            <span className="font-semibold text-foreground">
              {Math.min(currentPage * teamsPerPage, totalTeams)}
            </span>
            {" "}of{" "}
            <span className="font-semibold text-foreground">{totalTeams}</span>
            {" "}members
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamHeader