import { Card } from "@/components/ui/card"
import { Linkedin, Github, Mail } from "lucide-react"

export default function Team() {
  const executives = [
    {
      name: "Alex Chen",
      role: "President",
      image: "/professional-portrait-tech-leader.jpg",
      bio: "Full-stack developer passionate about building scalable applications",
      linkedin: "#",
      github: "#",
      email: "alex@itclub.com",
    },
    {
      name: "Sarah Johnson",
      role: "Vice President",
      image: "/professional-portrait-woman-tech.jpg",
      bio: "AI/ML enthusiast with experience in data science and analytics",
      linkedin: "#",
      github: "#",
      email: "sarah@itclub.com",
    },
    {
      name: "Michael Park",
      role: "Technical Lead",
      image: "/professional-portrait-developer.png",
      bio: "DevOps engineer focused on cloud infrastructure and automation",
      linkedin: "#",
      github: "#",
      email: "michael@itclub.com",
    },
    {
      name: "Emily Rodriguez",
      role: "Events Coordinator",
      image: "/professional-portrait-woman-organizer.jpg",
      bio: "UX designer and event organizer creating memorable experiences",
      linkedin: "#",
      github: "#",
      email: "emily@itclub.com",
    },
    {
      name: "David Kim",
      role: "Marketing Director",
      image: "/professional-portrait-marketing.jpg",
      bio: "Digital marketer with a passion for tech community building",
      linkedin: "#",
      github: "#",
      email: "david@itclub.com",
    },
    {
      name: "Lisa Wang",
      role: "Treasurer",
      image: "/professional-portrait-woman-finance.jpg",
      bio: "Computer science student with strong financial management skills",
      linkedin: "#",
      github: "#",
      email: "lisa@itclub.com",
    },
  ]

  return (
    <section id="team" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Executive Committee</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Meet the dedicated team leading our community and driving innovation forward
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {executives.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="relative h-64 overflow-hidden bg-muted">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>

                <div className="flex gap-3">
                  <a
                    href={member.linkedin}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.github}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
