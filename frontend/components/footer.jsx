import Link from "next/link"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import { FaFacebook } from "react-icons/fa"

const footerGroups = [
  {
    title: "Discover",
    links: [["About DUITS", "/#about"], ["Executive team", "/executives"], ["Events", "/events"]],
  },
  {
    title: "Explore",
    links: [["Journal", "/blog"], ["Gallery", "/gallery"], ["Achievements", "/#achievements"]],
  },
  {
    title: "Get involved",
    links: [["Membership", "/membership"], ["Contact", "/contact"]],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <img src="/icons/duits-512.png" alt="DUITS logo" className="h-12 w-12 rounded-sm" />
              <span className="text-lg font-semibold">Dhaka University IT Society</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">A student-led technology community at the University of Dhaka.</p>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <p className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-blue-300" />1st Floor, TSC, University of Dhaka, Dhaka, Bangladesh</p>
              <a href="tel:+8801519201101" className="flex items-center gap-3 hover:text-white"><Phone size={16} className="text-blue-300" />01519-201101</a>
              <a href="mailto:duits.official@gmail.com" className="flex items-center gap-3 hover:text-white"><Mail size={16} className="text-blue-300" />duits.official@gmail.com</a>
            </div>
            <a href="https://www.facebook.com/Dhaka.University.IT.Society.DUITS/" target="_blank" rel="noopener noreferrer" aria-label="DUITS on Facebook" className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 text-slate-200 transition-colors hover:border-blue-400 hover:text-white"><FaFacebook /></a>
          </div>
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-4 text-sm font-semibold text-white">{group.title}</h2>
              <ul className="space-y-3">
                {group.links.map(([label, href]) => <li key={href}><Link href={href} className="inline-flex items-center gap-1 text-sm text-slate-300 transition-colors hover:text-white">{label}<ArrowUpRight size={13} /></Link></li>)}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dhaka University IT Society</p>
          <p>University of Dhaka · TSC</p>
        </div>
      </div>
    </footer>
  )
}
