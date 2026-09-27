import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Award, CalendarDays } from "lucide-react"
import supabaseApi from "@/config/supabaseApi"

export async function generateMetadata({ params }) {
  const { id } = await params
  const achievement = await supabaseApi.getAchievementById(id)

  return {
    title: achievement ? `${achievement.title} | DUITS` : "Achievement | DUITS",
    description: achievement?.description || "Achievements of Dhaka University IT Society.",
  }
}

export default async function AchievementDetailsPage({ params }) {
  const { id } = await params
  const achievement = await supabaseApi.getAchievementById(id)
  if (!achievement) notFound()

  return (
    <main className="min-h-screen bg-white px-4 pb-20 pt-32 text-slate-950 dark:bg-slate-950 dark:text-white">
      <article className="mx-auto max-w-4xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-800 hover:underline dark:text-blue-300"><ArrowLeft size={16} />Back to DUITS</Link>
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase text-blue-800 dark:text-blue-300"><Award size={17} />DUITS achievement</p>
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">{achievement.title}</h1>
        {achievement.date && <p className="mt-4 flex items-center gap-2 text-sm text-slate-500"><CalendarDays size={16} />{new Date(`${achievement.date}T00:00:00`).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}</p>}
        {achievement.image && <img src={achievement.image} alt={achievement.title} className="mt-8 max-h-[32rem] w-full rounded-lg border border-slate-200 object-cover dark:border-slate-800" />}
        <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800"><p className="whitespace-pre-line text-base leading-8 text-slate-700 dark:text-slate-300">{achievement.description}</p></div>
      </article>
    </main>
  )
}