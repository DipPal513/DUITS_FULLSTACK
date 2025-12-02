import Notices from "@/components/notices"
import TechBackground from "@/components/tech-background"

export default function NoticePage() {
  return (
    <main className="min-h-screen">
      <TechBackground />
      <div className="pt-20">
        <Notices />
      </div>
    </main>
  )
}
