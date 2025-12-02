"use client"

import { useState, useEffect, useRef } from "react"
import { Code2, Users, Rocket, Zap, Github, Linkedin, Mail } from "lucide-react"

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)
  const sectionsRef = useRef([])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-8")
          }
        })
      },
      { threshold: 0.1 }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const stats = [
    { number: "480+", label: "Active Members" },
    { number: "9", label: "Years Strong" },
    { number: "140+", label: "Events Hosted" },
    { number: "60+", label: "Projects Built" },
  ]

  const values = [
    {
      icon: Code2,
      title: "Build to Learn",
      description: "We don't just study technology—we create it. Every project teaches more than any lecture ever could."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Knowledge grows when shared. We mentor, collaborate, and lift each other up."
    },
    {
      icon: Rocket,
      title: "Ship Fast",
      description: "Perfect is the enemy of done. We iterate, deploy, and improve in public."
    },
    {
      icon: Zap,
      title: "Stay Curious",
      description: "Technology evolves daily. We embrace continuous learning and experimentation."
    },
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-sm font-medium text-blue-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Est. 2015 • University of Dhaka
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
              Building the<br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                future of tech
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
              We're not just another tech club. We're a community of builders, learners, and innovators at Dhaka University—creating real solutions and shipping real products.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all hover:scale-105 shadow-lg hover:shadow-xl">
                Join Our Community
              </button>
              <button className="px-8 py-4 bg-white text-slate-900 rounded-lg font-medium border-2 border-slate-200 hover:border-slate-900 transition-all">
                View Projects
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full p-1">
            <div className="w-1.5 h-3 bg-slate-400 rounded-full mx-auto" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-slate-200 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)}
        className="py-32 opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-sm font-semibold text-blue-600 mb-4 tracking-wide uppercase">
              Our Story
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Started by students who wanted to build, not just study
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>
                In 2015, a group of Computer Science students at Dhaka University realized something was missing. Lectures taught theory, but nobody was building anything real. We were learning about algorithms but not shipping products. Studying frameworks but not deploying apps.
              </p>
              <p>
                So we started meeting every Thursday evening. At first, it was just five of us in a classroom, working on whatever interested us. Building web apps, breaking Linux installations, deploying our first servers. Learning by doing, failing fast, and helping each other debug.
              </p>
              <p>
                Nine years later, DUITS has grown into a community of 480+ students. We've hosted hackathons, launched startups, contributed to open source, and helped hundreds of students land their first tech roles. But the mission hasn't changed: <strong>learn by building real things, together</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Break */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop&q=80" 
              alt="Team collaboration"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)}
        className="py-32 bg-slate-50 opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="text-sm font-semibold text-blue-600 mb-4 tracking-wide uppercase">
                Our Values
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                What drives us forward
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                These aren't just words on a wall. They're principles we live by every day.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                    <value.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section 
        ref={(el) => (sectionsRef.current[2] = el)}
        className="py-32 opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="text-sm font-semibold text-blue-600 mb-4 tracking-wide uppercase">
                Activities
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                What we actually do
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  01
                </div>
                <h3 className="text-2xl font-bold">Weekly Sessions</h3>
                <p className="text-slate-600 leading-relaxed">
                  Every Thursday at 6 PM, we gather to learn something new. Someone teaches what they discovered that week—web frameworks, cloud deployment, system design, ML models. All skill levels welcome.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  02
                </div>
                <h3 className="text-2xl font-bold">Build Projects</h3>
                <p className="text-slate-600 leading-relaxed">
                  Teams form around ideas and build for 6-8 weeks. Real products with real users. Some fail, some scale. All teach valuable lessons. Your GitHub becomes your portfolio.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  03
                </div>
                <h3 className="text-2xl font-bold">Host Events</h3>
                <p className="text-slate-600 leading-relaxed">
                  Bi-annual hackathons, tech talks from industry experts, workshops on cutting-edge tech. We bring the tech community together and create opportunities to learn and network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to start building?
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Join 480+ students who are learning, building, and shipping real products. No prerequisites needed—just bring curiosity and a laptop.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-all hover:scale-105 shadow-lg">
                Join DUITS
              </button>
              <button className="px-8 py-4 bg-transparent text-white rounded-lg font-medium border-2 border-white/30 hover:border-white transition-all">
                Contact Us
              </button>
            </div>

            <div className="mt-16 pt-16 border-t border-slate-800">
              <p className="text-slate-400 mb-6">Find us at</p>
              <p className="text-slate-300 text-lg mb-2">1st Floor, TSC, University of Dhaka</p>
              <p className="text-slate-400">Dhaka 1205, Bangladesh</p>
              
              <div className="flex gap-6 justify-center mt-8">
                <a href="mailto:duits.official@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}