import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, UserX } from "lucide-react"
import { FaFacebook, FaLinkedin } from "react-icons/fa"
import supabaseApi from "@/config/supabaseApi"
import ScrollReveal from "@/components/home/ScrollReveal"

// --- Constants (unchanged from your original) ---
const POSITION_ORDER = [
  "President", "Vice President", "General Secretary", "Joint General Secretary",
  "Treasurer", "Office Secretary", "Publicity and Publication Secretary",
  "External Communication Secretary", "Skill Development Secretary",
  "Information and Research Secretary", "Event Secretary",
  "Organizing Secretary", "Design Lead", "Junior Executive", "General Member",
]
const AVAILABLE_YEARS = [2025, 2026, 2027, 2028]
const AVAILABLE_BATCHES = ["11", "12", "13", "14"]

// --- Helpers ---
const cleanStr = (str) => str?.toLowerCase().trim() || ""
const initials = (n = "") => n.split(" ").filter(Boolean).slice(0, 2).map((s) => s[0]).join("").toUpperCase() || "DU"
const link = (year, batch) => {
  const q = new URLSearchParams()
  if (year) q.set("year", String(year))
  if (batch) q.set("batch", String(batch))
  const s = q.toString()
  return s ? `/executives?${s}` : "/executives"
}

async function getExecutives(year, batch) {
  try {
    const response = await supabaseApi.getExecutives(year, batch)
    if (response?.executives) {
      return { executives: response.executives || [], totalCount: response.totalCount || 0 }
    }
    return { executives: [], totalCount: 0 }
  } catch (error) {
    console.error("Error fetching executives:", error)
    return { executives: [], totalCount: 0 }
  }
}

function Pill({ href, on, children }) {
  return (
    <Link
      href={href}
      aria-current={on ? "page" : undefined}
      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
        on
          ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 dark:bg-blue-500"
          : "bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
      }`}
    >
      {children}
    </Link>
  )
}

function MemberCard({ member, isLatest }) {
  const role = member.position || member.designation
  const social = [
    member.facebook && { href: member.facebook, label: "Facebook", icon: <FaFacebook size={15} /> },
    member.linkedin && { href: member.linkedin, label: "LinkedIn", icon: <FaLinkedin size={15} /> },
    member.email && { href: `mailto:${member.email}`, label: "Email", icon: <Mail size={15} /> },
  ].filter(Boolean)

  return (
    <article className="group h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-blue-400/40">
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-700">
        {member.image ? (
          <Image src={member.image} alt={member.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
        ) : (
          <span className="absolute inset-0 grid place-content-center text-6xl font-semibold text-white/90">{initials(member.name)}</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {social.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 flex translate-y-3 justify-center gap-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on ${s.label}`} className="grid h-9 w-9 place-content-center rounded-full bg-white text-blue-700 shadow-lg transition-transform hover:scale-110">{s.icon}</a>
            ))}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold leading-snug tracking-tight text-slate-900 dark:text-white">{member.name}</h3>
        {role && <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-300">{role}</p>}
        {member.duits_batch && (
          <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${isLatest ? "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300" : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400"}`}>
            Batch {member.duits_batch}
          </span>
        )}
      </div>
    </article>
  )
}

// --- Main ---
export default async function TeamContent({ year, batch }) {
  // 1. Fetch every executive for the selected year (empty year = current, same as your original)
  const { executives } = await getExecutives(year, "")

  // 2. Latest batch across fetched executives
  const latestBatch = executives.length > 0
    ? Math.max(...executives.map((e) => parseInt(e.duits_batch) || 0))
    : null

  const activeBatch = batch || ""
  const filtered = activeBatch
    ? executives.filter((e) => String(e.duits_batch) === String(activeBatch))
    : executives

  // 3. Single flat list, same ordering as your original: latest batch first, then position order
  const sorted = [...filtered].sort((a, b) => {
    const batchA = parseInt(a.duits_batch || "0") || 0
    const batchB = parseInt(b.duits_batch || "0") || 0
    if (batchA !== batchB) return batchB - batchA

    const roleA = cleanStr(a.position || a.designation)
    const roleB = cleanStr(b.position || b.designation)
    const indexA = POSITION_ORDER.findIndex((p) => cleanStr(p) === roleA)
    const indexB = POSITION_ORDER.findIndex((p) => cleanStr(p) === roleB)

    if (indexA === -1 && indexB === -1) return 0
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })

  return (
    <div>
      {/* Summary + filters */}
      <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.03] lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight">{year ? `Committee ${year}` : "Current committee"}</p>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            {sorted.length} {sorted.length === 1 ? "member" : "members"}{activeBatch ? ` · Batch ${activeBatch}` : ""}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by year">
            <span className="mr-1 text-xs font-medium text-slate-500 dark:text-slate-400">Year</span>
            <Pill href={link("", "")} on={!year}>Current</Pill>
            {AVAILABLE_YEARS.map((y) => <Pill key={y} href={link(y, "")} on={String(year) === String(y)}>{y}</Pill>)}
          </div>
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by batch">
            <span className="mr-1 text-xs font-medium text-slate-500 dark:text-slate-400">Batch</span>
            <Pill href={link(year, "")} on={!activeBatch}>All</Pill>
            {AVAILABLE_BATCHES.map((b) => <Pill key={b} href={link(year, b)} on={String(activeBatch) === b}>{b}</Pill>)}
          </div>
        </div>
      </div>

      {/* One ordered list */}
      {sorted.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-20 text-center dark:border-white/15 dark:bg-white/[0.03]">
          <span className="mx-auto grid h-14 w-14 place-content-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300"><UserX size={26} /></span>
          <h3 className="mt-5 text-xl font-semibold">No members found</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
            {year || batch ? "Nobody is listed for this selection yet. Try another year or batch." : "The committee has not been published yet."}
          </p>
          {(year || batch) && (
            <Link href="/executives" className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">View current committee</Link>
          )}
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((member, index) => (
            <ScrollReveal key={member._id || index} from={index % 3 === 0 ? "left" : index % 3 === 2 ? "right" : "zoom"} delay={(index % 4) * 50}>
              <MemberCard member={member} isLatest={(parseInt(member.duits_batch) || 0) === latestBatch} />
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* CTA */}
      <ScrollReveal from="zoom">
        <div className="relative mt-24 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-8 text-white shadow-2xl shadow-blue-900/25 sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-300/25 blur-[80px]" aria-hidden="true" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Want to lead the next panel?</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-blue-100">Every committee started as a group of members who showed up. Join DUITS and be one of them.</p>
            </div>
            <Link href="/membership" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-900 transition-all hover:-translate-y-0.5 hover:bg-blue-50">
              Join DUITS <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}