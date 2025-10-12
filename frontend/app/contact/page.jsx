import Navigation from "@/components/navigation"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import TechBackground from "@/components/tech-background"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <TechBackground />
      <Navigation />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
