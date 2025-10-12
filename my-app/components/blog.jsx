import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, BookOpen, FileText } from "lucide-react"

export default function Blog() {
  const posts = [
    {
      title: "Getting Started with React Hooks",
      excerpt: "Learn how to use React Hooks to manage state and side effects in your functional components",
      author: "Alex Chen",
      date: "March 10, 2024",
      category: "Tutorial",
      image: "/react-code-tutorial.jpg",
      readTime: "5 min read",
    },
    {
      title: "Building Scalable APIs with Node.js",
      excerpt: "Best practices for designing and implementing RESTful APIs that can handle high traffic",
      author: "Sarah Johnson",
      date: "March 8, 2024",
      category: "Guide",
      image: "/nodejs-api-development.png",
      readTime: "8 min read",
    },
    {
      title: "Introduction to Machine Learning",
      excerpt: "Understand the fundamentals of ML and how to get started with your first project",
      author: "Michael Park",
      date: "March 5, 2024",
      category: "Article",
      image: "/machine-learning-ai.png",
      readTime: "10 min read",
    },
  ]

  const resources = [
    {
      title: "Web Development Roadmap",
      description: "Complete guide to becoming a full-stack developer",
      icon: BookOpen,
      type: "Guide",
    },
    {
      title: "Coding Best Practices",
      description: "Essential principles for writing clean, maintainable code",
      icon: FileText,
      type: "Document",
    },
    {
      title: "Interview Preparation",
      description: "Common technical interview questions and solutions",
      icon: BookOpen,
      type: "Resource",
    },
  ]

  return (
    <section id="blog" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Blog & Resources</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Explore our latest articles, tutorials, and learning resources to enhance your tech skills
          </p>
        </div>

        {/* Blog Posts */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Latest Articles</h3>
            <Button variant="outline">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card
                key={index}
                className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">{post.readTime}</span>
                    <Button size="sm" variant="ghost" className="group/btn">
                      Read More
                      <ArrowRight className="ml-2 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-2xl font-bold mb-8">Learning Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <resource.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{resource.title}</h4>
                      <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
