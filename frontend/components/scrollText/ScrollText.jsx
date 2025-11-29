"use client"
import ScrollVelocity from "@/components/ScrollVelocity"

export default function ScrollText() {
  return (
   <section className="pb-12">


    <ScrollVelocity
      texts={[
          'DUITS • Innovation & Technology Code • Create • Collaborate Build The Future Together Join Our Tech Community Workshops • Hackathons • Projects',
          'Learn • Share • Grow 7000+ Members Strong Empowering Student Developers Where Ideas Meet Code Tech Excellence Since 2015'
        ]} 
        velocity={100} 
        className="custom-scroll-text"
        />
        </section>
  )
}