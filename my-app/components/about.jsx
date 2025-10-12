import { Card } from "@/components/ui/card"
import { Target, Eye, History } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Us</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            We are a community of passionate individuals dedicated to fostering innovation, learning, and collaboration
            in the world of technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <Card className="p-8 border-border/50 hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To empower students and tech enthusiasts with the skills, knowledge, and opportunities to excel in the
              ever-evolving world of technology through hands-on learning and collaborative projects.
            </p>
          </Card>

          <Card className="p-8 border-border/50 hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become the leading platform for technology education and innovation, creating a vibrant ecosystem where
              ideas transform into impactful solutions that shape the future.
            </p>
          </Card>

          <Card className="p-8 border-border/50 hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <History className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our History</h3>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2020, we've grown from a small group of tech enthusiasts to a thriving community of over 500
              members, hosting numerous events, workshops, and hackathons.
            </p>
          </Card>
        </div>

        {/* Values Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Innovation", description: "Pushing boundaries and exploring new possibilities" },
              { title: "Collaboration", description: "Working together to achieve greater goals" },
              { title: "Learning", description: "Continuous growth and knowledge sharing" },
              { title: "Inclusivity", description: "Welcoming everyone regardless of skill level" },
            ].map((value, index) => (
              <div key={index} className="flex gap-4 p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">{value.title}</h4>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
