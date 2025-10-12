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
    },
    {
      icon: Award,
      title: "50+ Hackathon Wins",
      description: "Our members have won over 50 hackathons across national and international competitions",
      year: "2020-2024",
    },
    {
      icon: Users,
      title: "500+ Active Members",
      description: "Growing community of passionate developers, designers, and tech enthusiasts",
      year: "2024",
    },
    {
      icon: Target,
      title: "100+ Projects Completed",
      description: "Successfully delivered innovative solutions for real-world problems",
      year: "2020-2024",
    },
    {
      icon: Zap,
      title: "Industry Partnerships",
      description: "Collaborations with leading tech companies including Google, Microsoft, and Amazon",
      year: "2023-2024",
    },
    {
      icon: Star,
      title: "Excellence in Innovation",
      description: "Recognized for pioneering AI and machine learning projects in education",
      year: "2023",
    },
  ]

  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Achievements</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Celebrating our milestones and the incredible accomplishments of our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <Card
                key={index}
                className="tech-card p-6 hover:scale-105 transition-all duration-300 group cursor-pointer"
              >
                <div className="corner-accent top-left" />
                <div className="corner-accent bottom-right" />

                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow leading-relaxed">
                    {achievement.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-primary font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    {achievement.year}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
