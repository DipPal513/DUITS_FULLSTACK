"use client"
import axios from "axios"
import React, { useEffect } from "react"
import TeamCard from "./team/TeamCard"
import TeamHeader from "./team/TeamHeader"
export default function Team() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  // load executive from api using axios and so proper error validation and store in state
  const [executives, setExecutives] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  useEffect(() => {
    async function fetchExecutives() {
      setLoading(true)
      try {
        const response = await axios.get(`${baseurl}/executive`,{withCredentials:true})
        
        setExecutives(response.data.data?.executives || []);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching executives:", error)
        setLoading(false);
      }
    }
    fetchExecutives()
  }, [])
  return (
    <section id="team" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
       <TeamHeader
  currentPage={1}
  teamsPerPage={12}
  totalTeams={48}
  loading={loading}
  onYearChange={(year) => console.log('Selected year:', year)}
  availableYears={[2024, 2023, 2022, 2021, 2020]} // Optional
/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {executives.map((member, index) => (
           <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
