"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Cpu, Terminal, Sparkles, Layers } from "lucide-react"
import useFetch from "@/hooks/useFetch"
export default function Hero() {
  const { data, loading, error } = useFetch("/api");
  console.log(data, loading, error);
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 b);py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative mb-8 hidden md:block">

            <div className="absolute -top-10 left-1/6 animate-float">
              <div className="tech-card w-14 h-14 flex items-center justify-center backdrop-blur-sm">
                <div className="corner-accent top-left" />
                <div className="corner-accent top-right" />
                <Code2 className="w-7 h-7 text-primary" />
              </div>
            </div>
            <div className="absolute -top-5 right-1/6 animate-float" style={{ animationDelay: "1s" }}>
              <div className="tech-card w-14 h-14 flex items-center justify-center backdrop-blur-sm">
                <div className="corner-accent top-left" />
                <div className="corner-accent bottom-right" />
                <Cpu className="w-7 h-7 text-accent" />
              </div>
            </div>
            <div className="absolute top-5 left-2/8 animate-float" style={{ animationDelay: "2s" }}>
              <div className="tech-card w-14 h-14 flex items-center justify-center backdrop-blur-sm">
                <div className="corner-accent bottom-left" />
                <div className="corner-accent top-right" />
                <Terminal className="w-7 h-7 text-primary" />
              </div>
            </div>
            <div className="absolute top-0 right-2/8 animate-float" style={{ animationDelay: "1.5s" }}>
              <div className="tech-card w-14 h-14 flex items-center justify-center backdrop-blur-sm">
                <div className="corner-accent top-left" />
                <div className="corner-accent bottom-right" />
                <Layers className="w-7 h-7 text-accent" />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 tech-card backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary uppercase tracking-wider">Welcome to the Future</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance tracking-tight">
            Innovation Through
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mt-2">
              Technology
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto text-pretty leading-relaxed px-4">
            Join a community of passionate developers, designers, and tech enthusiasts building the future together
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Button size="lg" className="group relative overflow-hidden w-full sm:w-auto">
              <span className="relative z-10 flex items-center cursor-pointer justify-center">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <Button size="lg" variant="outline" className="tech-card cursor-pointer hover:text-black w-full sm:w-auto">
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-20 max-w-3xl mx-auto px-4">
            <div className="tech-card p-6 text-center backdrop-blur-sm">
              <div className="corner-accent top-left" />
              <div className="corner-accent bottom-right" />
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                500+
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Members</div>
            </div>
            <div className="tech-card p-6 text-center backdrop-blur-sm">
              <div className="corner-accent top-left" />
              <div className="corner-accent bottom-right" />
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                50+
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Projects</div>
            </div>
            <div className="tech-card p-6 text-center backdrop-blur-sm">
              <div className="corner-accent top-left" />
              <div className="corner-accent bottom-right" />
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                100+
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Events</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
