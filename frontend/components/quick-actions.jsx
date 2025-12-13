import { Calendar, Users, BookOpen, Trophy } from "lucide-react"
import Link from "next/link"

export default function QuickActions() {
  const actions = [
    {
      icon: Calendar,
      title: "Upcoming Events",
      description: "Check out our latest workshops and hackathons",
      href: "#events",
    },
    {
      icon: Users,
      title: "Join Community",
      description: "Connect with fellow tech enthusiasts",
      href: "#membership",
    },
    {
      icon: BookOpen,
      title: "Resources",
      description: "Access tutorials, guides, and learning materials",
      href: "#blog",
    },
    {
      icon: Trophy,
      title: "Our Projects",
      description: "Explore amazing projects built by our members",
      href: "#projects",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, index) => (
            <Link key={index} href={action.href} className="group">
              <div className="tech-card p-6 h-full backdrop-blur-sm relative">
                <div className="corner-accent top-left" />
                <div className="corner-accent bottom-right" />
                <div className="relative overflow-hidden w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors border border-primary/20">
                  <action.icon className="w-6 h-6 text-primary relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-semibold text-lg mb-2 uppercase tracking-wide">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
