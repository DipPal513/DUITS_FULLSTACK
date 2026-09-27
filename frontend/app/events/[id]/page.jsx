import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, ExternalLink, MapPin } from "lucide-react"
import supabaseApi from "@/config/supabaseApi"

export default async function EventDetailsPage({ params }) {
  const { id } = await params
  const event = await supabaseApi.getEventById(id)
  if (!event) notFound()

  const eventDate = event.date
    ? new Date(`${event.date}T00:00:00`).toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : "Date to be announced"
  const registrationLink = event.registration_link || event.registrationLink

  return (
    <main className="min-h-screen bg-slate-50 px-5 pb-16 pt-24 dark:bg-slate-950 sm:px-8">
      <article className="mx-auto max-w-5xl">
        <Link href="/events" className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-blue-800 hover:underline dark:text-blue-300"><ArrowLeft size={16} />All events</Link>
        <p className="mb-2 text-xs font-semibold uppercase text-blue-800 dark:text-blue-300">DUITS event</p>
        <h1 className="max-w-4xl text-3xl font-bold leading-tight text-slate-950 sm:text-5xl dark:text-white">{event.title}</h1>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center gap-2"><CalendarDays size={16} className="text-blue-800 dark:text-blue-300" />{eventDate}</span>
          {event.location && <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-blue-800 dark:text-blue-300" />{event.location}</span>}
        </div>
        {event.image && <img src={event.image} alt={event.title} className="mt-8 max-h-[34rem] w-full rounded-lg border border-slate-200 object-cover dark:border-slate-800" />}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="border-t border-slate-200 pt-6 dark:border-slate-800"><h2 className="mb-3 text-lg font-semibold text-slate-950 dark:text-white">About this event</h2><p className="whitespace-pre-line text-base leading-7 text-slate-700 dark:text-slate-300">{event.description || "More information will be announced soon."}</p></div>
          <aside className="h-fit border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase text-slate-500">Event information</p>
            <p className="mt-3 font-medium text-slate-950 dark:text-white">{eventDate}</p>
            {event.location && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{event.location}</p>}
            {registrationLink && <a href={registrationLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-blue-800 px-4 text-sm font-semibold text-white hover:bg-blue-900">Register <ExternalLink size={15} /></a>}
          </aside>
        </div>
      </article>
    </main>
  )
}