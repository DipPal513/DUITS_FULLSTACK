"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"
import TeamCard from "./team/TeamCard"
import TeamHeader from "./team/TeamHeader"

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse">
    <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
  </div>
)

export default function Team() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  
  const [executives, setExecutives] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  
  // Hardcoded filter options
  const availableYears = [2024, 2023, 2022, 2021, 2020, 2019, 2018];
  const availableBatches = ["A", "B", "C", "D", "E"];

  useEffect(() => {
    fetchExecutives();
  }, [selectedYear, selectedBatch]);

  const fetchExecutives = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (selectedYear) params.append('year', selectedYear);
      if (selectedBatch) params.append('duits_batch', selectedBatch);
      
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
    }
  };

  const handleYearChange = (year) => {
    setSelectedYear(year === selectedYear ? "" : year);
  };

  const handleBatchChange = (batch) => {
    setSelectedBatch(batch);
  };

  const handleClearFilters = () => {
    setSelectedYear("");
    setSelectedBatch("");
  };

  return (
    <section id="team" className="py-20 lg:py-32 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 lg:px-8">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : executives.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {selectedYear || selectedBatch 
                ? "No executives found matching your filters." 
                : "No executives available."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executives.map((member, index) => (
              <TeamCard key={member.id || index} member={member} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}