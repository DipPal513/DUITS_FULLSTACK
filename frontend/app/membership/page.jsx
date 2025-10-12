import Navigation from "@/components/navigation"
import Membership from "@/components/membership"
import Footer from "@/components/footer"
import TechBackground from "@/components/tech-background"

export default function MembershipPage() {
  return (
    <main className="min-h-screen">
      <TechBackground />
      <Navigation />
      <div className="pt-20">
        <Membership />
      </div>
      <Footer />
    </main>
  )
}
