import { Card } from "@/components/ui/card"
import { Users, Lightbulb, Rocket, Award, Code2, BookOpen, Trophy, Zap } from "lucide-react"

export default function SocietyIntro() {
  const highlights = [
    {
      icon: Users,
      title: "500+ Members",
      description: "Active community of tech enthusiasts",
    },
    {
      icon: Lightbulb,
      title: "50+ Workshops",
      description: "Hands-on learning experiences",
    },
    {
      icon: Rocket,
      title: "30+ Projects",
      description: "Real-world applications built",
    },
    {
      icon: Award,
      title: "15+ Awards",
      description: "Recognition for excellence",
    },
  ]

  const features = [
    {
      icon: Code2,
      title: "Coding Bootcamps",
      description:
        "Intensive training programs covering modern web development, mobile apps, and emerging technologies",
    },
    {
      icon: BookOpen,
      title: "Tech Resources",
      description: "Access to premium learning materials, documentation, and industry-standard tools",
    },
    {
      icon: Trophy,
      title: "Competitions",
      description: "Regular hackathons, coding challenges, and tech competitions with exciting prizes",
    },
    {
      icon: Zap,
      title: "Innovation Lab",
      description: "State-of-the-art facilities for prototyping and bringing your ideas to life",
    },
  ]

  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Welcome to IT Club</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            We are a vibrant community of passionate individuals dedicated to fostering innovation, learning, and
            collaboration in the world of technology. Join us to explore cutting-edge technologies, work on exciting
            projects, and connect with like-minded tech enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, index) => (
            <Card key={index} className="tech-card p-6 text-center hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="tech-card p-8 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="tech-card p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">What We Do</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Organize workshops and technical seminars</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Host hackathons and coding competitions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Build innovative projects and applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Connect students with industry professionals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Provide mentorship and career guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Collaborate on open-source contributions</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Why Join Us</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Learn from experienced mentors and peers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Gain practical experience through projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Network with tech industry professionals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Access exclusive resources and opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Build your portfolio with real projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Get certified in latest technologies</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
