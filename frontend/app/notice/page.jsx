import Navigation from "@/components/navigation"
import Notices from "@/components/notices"
import Footer from "@/components/footer"
import TechBackground from "@/components/tech-background"

export default function NoticePage() {
  return (
    <main className="min-h-screen">
      <TechBackground />
      <Navigation />
      <div className="pt-20">
        <Notices />
      </div>
      <Footer />
    </main>
  )
}
