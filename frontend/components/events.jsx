import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ArrowRight, Clock } from "lucide-react"

export default function Events() {
  const events = [
    {
      title: "Web Development Workshop",
      date: "March 15, 2024",
      location: "Tech Lab, Room 301",
      attendees: 45,
      type: "Workshop",
      description: "Learn modern web development with React and Next.js",
      image: "/web-development-workshop-coding.jpg",
    },
    {
      title: "AI & Machine Learning Hackathon",
      date: "March 22-23, 2024",
      location: "Innovation Center",
      attendees: 120,
      type: "Hackathon",
      description: "Build innovative AI solutions in 24 hours",
      image: "/ai-hackathon-technology.jpg",
    },
    {
      title: "Cybersecurity Seminar",
      date: "March 30, 2024",
      location: "Auditorium A",
      attendees: 80,
      type: "Seminar",
      description: "Understanding modern cybersecurity threats and solutions",
      image: "/cybersecurity-digital-security.jpg",
    },
  ]

  const programs = [
    {
      title: "Mentorship Program",
      description: "Connect with experienced developers and industry professionals",
      duration: "Ongoing",
    },
    {
      title: "Tech Talks Series",
      description: "Weekly sessions featuring guest speakers from leading tech companies",
      duration: "Every Friday",
    },
    {
      title: "Code Review Sessions",
      description: "Collaborative code reviews to improve your programming skills",
      duration: "Bi-weekly",
    },
  ]

  return (
    <section id="events" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight">Events & Programs</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Join our exciting events, workshops, and programs designed to enhance your skills and expand your network
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 uppercase tracking-wide">Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={index} className="tech-card overflow-hidden backdrop-blur-sm group relative">
                <div className="corner-accent top-left" />
                <div className="corner-accent top-right" />
                <div className="corner-accent bottom-left" />
                <div className="corner-accent bottom-right" />
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-bold rounded uppercase tracking-wider backdrop-blur-sm">
                      {event.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-xl mb-3 uppercase tracking-wide">{event.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                  <Button className="w-full group/btn">
                    Register Now
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div>
          <h3 className="text-2xl font-bold mb-8 uppercase tracking-wide">Regular Programs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <div key={index} className="tech-card p-6 backdrop-blur-sm relative">
                <div className="corner-accent top-left" />
                <div className="corner-accent bottom-right" />
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-lg uppercase tracking-wide">{program.title}</h4>
                  <div className="flex items-center gap-1 text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                    <Clock className="w-3 h-3" />
                    {program.duration}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
