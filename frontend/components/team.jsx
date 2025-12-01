"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"
import TeamCard from "./team/TeamCard"
import TeamHeader from "./team/TeamHeader"
import { Users } from "lucide-react"

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
    <div className="h-72 bg-gray-200 dark:bg-gray-700"></div>
    <div className="p-6 space-y-3">
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="space-y-2 pt-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  </div>
)

export default function Team() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  
  const [executives, setExecutives] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Filter states
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  
  // Hardcoded filter options
  const availableYears = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];
  const availableBatches = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  useEffect(() => {
    fetchExecutives();
  }, [selectedYear, selectedBatch]);

  const fetchExecutives = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (selectedYear) params.append('year', selectedYear);
      if (selectedBatch) params.append('batch', selectedBatch);
      
      const url = `${baseurl}/executive${params.toString() ? `?${params.toString()}` : ''}`;

      const response = await axios.get(url, { withCredentials: true });
      
      setExecutives(response.data.data?.executives || []);
      setTotalCount(response.data.data?.totalCount || 0);
    } catch (error) {
      console.error("Error fetching executives:", error);
      setExecutives([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  const handleYearChange = (year) => {
    setSelectedYear(year === selectedYear ? "" : year);
  };

  const handleBatchChange = (batch) => {
    setSelectedBatch(batch === selectedBatch ? "" : batch);
  };

  const handleClearFilters = () => {
    setSelectedYear("");
    setSelectedBatch("");
  };

  const hasFilters = selectedYear || selectedBatch;

  return (
    <section id="team" className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <TeamHeader
          totalTeams={totalCount}
          loading={loading}
          onYearChange={handleYearChange}
          onBatchChange={handleBatchChange}
          onClearFilters={handleClearFilters}
          selectedYear={selectedYear}
          selectedBatch={selectedBatch}
          availableYears={availableYears}
          availableBatches={availableBatches}
        />
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : executives.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Users className="w-10 h-10 text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {hasFilters ? "No Members Found" : "No Executives Available"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              {hasFilters 
                ? "Try adjusting your filters or clear them to see all members." 
                : "There are currently no executive members to display."}
            </p>
            {hasFilters && (
              <button
                onClick={handleClearFilters}
                className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {executives.map((member, index) => (
                <TeamCard key={member.id || index} member={member} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}