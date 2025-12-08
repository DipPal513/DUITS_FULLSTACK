import { Calendar } from "lucide-react"

export default function EmptyNoticeState() {
  return (
    <div className="text-center py-20">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted dark:bg-secondary/50 mb-4 transition-colors">
        <Calendar className="w-8 h-8 text-muted-foreground dark:text-foreground/60" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">No Notices Available</h3>
      <p className="text-muted-foreground">
        There are currently no notices or workshops to display. Please check back later.
      </p>
    </div>
  )
}