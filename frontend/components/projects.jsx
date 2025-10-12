import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Award, Code2 } from "lucide-react"

export default function Projects() {
  const projects = [
    {
      title: "Smart Campus App",
      description: "A comprehensive mobile application for campus navigation, event management, and student services",
      image: "/mobile-app-interface-campus.jpg",
      tags: ["React Native", "Node.js", "MongoDB"],
      achievement: "Winner - National Hackathon 2023",
      github: "#",
      demo: "#",
    },
    {
      title: "AI Study Assistant",
      description:
        "An intelligent chatbot that helps students with homework, provides explanations, and generates practice questions",
      image: "/ai-chatbot-interface.png",
      tags: ["Python", "TensorFlow", "React"],
      achievement: "Featured in Tech Magazine",
      github: "#",
      demo: "#",
    },
    {
      title: "Code Collaboration Platform",
      description: "Real-time collaborative coding environment with video chat and code review features",
      image: "/code-editor-collaboration.jpg",
      tags: ["Next.js", "WebRTC", "Socket.io"],
      achievement: "Best Project Award 2023",
      github: "#",
      demo: "#",
    },
    {
      title: "Eco Tracker",
      description: "Track and reduce your carbon footprint with personalized recommendations and community challenges",
      image: "/environmental-tracking-app.png",
      tags: ["Vue.js", "Firebase", "Chart.js"],
      achievement: "Social Impact Award",
      github: "#",
      demo: "#",
    },
    {
      title: "Virtual Lab Simulator",
      description: "Interactive 3D simulations for physics and chemistry experiments",
      image: "/3d-science-lab-simulation.jpg",
      tags: ["Three.js", "WebGL", "React"],
      achievement: "Innovation Prize 2023",
      github: "#",
      demo: "#",
    },
    {
      title: "Job Board Platform",
      description: "Connect students with internship and job opportunities tailored to their skills",
      image: "/job-board-platform-interface.jpg",
      tags: ["Django", "PostgreSQL", "React"],
      achievement: "Most Useful Project",
      github: "#",
      demo: "#",
    },
  ]

  return (
    <section id="projects" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight">Projects & Achievements</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Explore the innovative projects built by our talented members and their remarkable achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="tech-card overflow-hidden backdrop-blur-sm group relative">
              <div className="corner-accent top-left" />
              <div className="corner-accent top-right" />
              <div className="corner-accent bottom-left" />
              <div className="corner-accent bottom-right" />
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-primary/30">
                    <Code2 className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 uppercase tracking-wide">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs font-mono bg-muted px-2 py-1 rounded border border-border uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-4 p-3 bg-accent/10 rounded border border-accent/20">
                  <Award className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-xs text-accent font-medium uppercase tracking-wide">{project.achievement}</span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 tech-card bg-transparent" asChild>
                    <a href={project.github}>
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" className="flex-1" asChild>
                    <a href={project.demo}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
