"use client"

import { Card } from "@/components/ui/card"
import { Trophy, Award, Users, Target, Zap, Star } from "lucide-react"

export default function Achievements() {
  const achievements = [
    {
      icon: Trophy,
      title: "Best Tech Club 2024",
      description: "Awarded by the National Student Association for outstanding contributions to tech education",
      year: "2024",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      link: "/achievement/best-tech-club",
    },
    {
      icon: Award,
      title: "50+ Hackathon Wins",
      description: "Our members have won over 50 hackathons across national and international competitions",
      year: "2020-2024",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      link: "/achievement/hackathon-wins",
    },
    {
      icon: Users,
      title: "500+ Active Members",
      description: "Growing community of passionate developers, designers, and tech enthusiasts",
      year: "2024",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      link: "/achievement/active-members",
    },
    {
      icon: Target,
      title: "100+ Projects Completed",
      description: "Successfully delivered innovative solutions for real-world problems",
      year: "2020-2024",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      link: "/achievement/projects",
    },
    {
      icon: Zap,
      title: "Industry Partnerships",
      description: "Collaborations with leading tech companies including Google, Microsoft, and Amazon",
      year: "2023-2024",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
      link: "/achievement/partnerships",
    },
    {
      icon: Star,
      title: "Excellence in Innovation",
      description: "Recognized for pioneering AI and machine learning projects in education",
      year: "2023",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      link: "/achievement/innovation",
    },
  ]

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
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
                      <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
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
        </div>
      </div>
    </section>
  )
}