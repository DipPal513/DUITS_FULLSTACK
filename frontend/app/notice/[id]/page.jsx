import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, ExternalLink, FileText } from "lucide-react"
import supabaseApi from "@/config/supabaseApi"

export default async function NoticeDetailsPage({ params }) {
  const { id } = await params
  const notice = await supabaseApi.getNoticeById(id)
  if (!notice) notFound()

  const deadline = notice.deadline
    ? new Date(`${notice.deadline}T00:00:00`).toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : null
  const isClosed = notice.deadline && notice.deadline < new Date().toISOString().slice(0, 10)
  const registrationLink = notice.registration_link || notice.registrationLink

  return (
    <main className="min-h-screen bg-slate-50 px-5 pb-16 pt-24 dark:bg-slate-950 sm:px-8">
      <article className="mx-auto max-w-5xl">
        <Link href="/notice" className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-blue-800 hover:underline dark:text-blue-300"><ArrowLeft size={16} />All notices</Link>
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-blue-800 dark:text-blue-300"><FileText size={15} />Official notice</span>
          {isClosed && <span className="border border-slate-300 px-2 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">Deadline passed</span>}
        </div>
        <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight text-slate-950 sm:text-5xl dark:text-white">{notice.title}</h1>
        {deadline && <p className="mt-5 inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><CalendarDays size={16} className="text-blue-800 dark:text-blue-300" />Deadline: {deadline}</p>}
        {notice.image && <img src={notice.image} alt={notice.title} className="mt-8 max-h-[34rem] w-full rounded-lg border border-slate-200 object-cover dark:border-slate-800" />}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="border-t border-slate-200 pt-6 dark:border-slate-800"><h2 className="mb-3 text-lg font-semibold text-slate-950 dark:text-white">Notice details</h2><p className="whitespace-pre-line text-base leading-7 text-slate-700 dark:text-slate-300">{notice.description || "No additional details were provided."}</p></div>
          <aside className="h-fit border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase text-slate-500">Notice status</p>
            <p className="mt-3 font-medium text-slate-950 dark:text-white">{isClosed ? "Closed" : "Current notice"}</p>
            {deadline && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Deadline: {deadline}</p>}
            {registrationLink && !isClosed && <a href={registrationLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-blue-800 px-4 text-sm font-semibold text-white hover:bg-blue-900">Open application <ExternalLink size={15} /></a>}
          </aside>
        </div>
      </article>
    </main>
  )
}