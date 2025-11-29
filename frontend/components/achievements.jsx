"use client"

import api from "@/config";
import { useEffect, useState } from "react";
import SkeletonLoader  from "./SkeletonLoader";


export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch achievements data from an API or define it statically
    const fetchAchievements = async () => {
      setLoading(true);
      try {
        const data = await api.get('/achievement');
        setAchievements(data.achievements);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching achievements:", error);
          setAchievements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);


  const handleClick = (link) => {
    console.log(`Navigating to: ${link}`)
    // Add your navigation logic here
    // router.push(link) or window.location.href = link
  }

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Achievements</h2>
          <p className="text-lg text-muted-foreground">
            Celebrating our milestones and the incredible accomplishments of our community
          </p>
        </div>

        {loading ? <SkeletonLoader /> :<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          { achievements?.slice(0,3).map((achievement, index) => {
          
            return (
              <div
                key={index}
                onClick={() => handleClick(achievement.link)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Info with blur effect - positioned over bottom half of image */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/60 to-transparent backdrop-blur-sm group-hover:h-3/5 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                    {/* Icon and Year */}
                    <div className="flex items-center justify-between mb-2">
                     
                      <span className="text-xs font-mono text-white/80 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                        {achievement.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/90 leading-relaxed line-clamp-2 group-hover:line-clamp-3">
                      {achievement.description}
                    </p>

                    {/* Hover indicator */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs text-primary font-medium">Learn more</span>
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors duration-300" />
              </div>
            )
          })}
        </div>}
      </div>
    </section>
  )
}