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
    <footer className="border-t border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-[#050b1f] dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <img src="/icons/duits-512.png" alt="DUITS logo" className="h-12 w-12 rounded-lg" />
              <span className="text-lg font-semibold tracking-tight">Dhaka University IT Society</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">A student-led technology community at the University of Dhaka.</p>

            <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-300" />
                1st Floor, TSC, University of Dhaka, Dhaka, Bangladesh
              </p>
              <a href="tel:+8801519201101" className="flex items-center gap-3 transition-colors hover:text-blue-700 dark:hover:text-white">
                <Phone size={16} className="text-blue-600 dark:text-blue-300" />01519-201101
              </a>
              <a href="mailto:duits.official@gmail.com" className="flex items-center gap-3 transition-colors hover:text-blue-700 dark:hover:text-white">
                <Mail size={16} className="text-blue-600 dark:text-blue-300" />duits.official@gmail.com
              </a>
            </div>

            <a
              href="https://www.facebook.com/Dhaka.University.IT.Society.DUITS/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DUITS on Facebook"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-600 hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:bg-blue-500"
            >
              <FaFacebook />
            </a>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">{group.title}</h2>
              <ul className="space-y-3">
                {group.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="group inline-flex items-center gap-1 text-sm text-slate-600 transition-colors hover:text-blue-700 dark:text-slate-300 dark:hover:text-white">
                      {label}
                      <ArrowUpRight size={13} className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-5 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dhaka University IT Society</p>
          <p>University of Dhaka · TSC</p>
        </div>
      </div>
    </footer>
  )
}