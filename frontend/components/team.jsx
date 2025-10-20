"use client"
import { Card } from "@/components/ui/card"
import axios from "axios"
import { Github, Linkedin, Mail } from "lucide-react"
import React, { useEffect } from "react"
export default function Team() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  // load executive from api using axios and so proper error validation and store in state
  const [executives, setExecutives] = React.useState([])
  useEffect(() => {
    async function fetchExecutives() {
      try {
        const response = await axios.get(`${baseurl}/executive`)
        console.log(response.data, 'executives data')
        setExecutives(response.data.data)
      } catch (error) {
        console.error("Error fetching executives:", error)
      }
    }
    fetchExecutives()
  }, [])
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
              className="overflow-hidden border-border py-0 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="relative overflow-hidden h-64 bg-muted">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.position}</p>
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
