"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, ArrowUpRight, Mail, Menu, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"

const navLinks = [
  { href: "/events", label: "Events" },
  { href: "/notice", label: "Notices" },
  { href: "/executives", label: "Executives" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const closeRef = useRef(null)
  const pathname = usePathname()

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setIsScrolled(y > 24)
      setProgress(max > 0 ? Math.min(y / max, 1) : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // close the menu when the route changes
  useEffect(() => setIsMobileMenuOpen(false), [pathname])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false)
    }
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* reading progress */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 bg-transparent" aria-hidden="true">
        <div className="h-full origin-left bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 transition-transform duration-150" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
        <nav
          aria-label="Main navigation"
          className={`mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full border pl-3 pr-2 backdrop-blur-xl transition-all duration-300 sm:pl-4 lg:h-16 ${
            isScrolled
              ? "border-slate-200 bg-white/90 shadow-lg shadow-blue-900/10 dark:border-white/10 dark:bg-[#0b1636]/90 dark:shadow-black/30"
              : "border-slate-200/70 bg-white/65 dark:border-white/10 dark:bg-[#0b1636]/60"
          }`}
        >
          <Link href="/" aria-label="Dhaka University IT Society home" className="flex min-w-0 items-center gap-2.5">
            <Image src="/icons/duits-512.png" alt="DUITS logo" height={44} width={44} priority className="h-9 w-9 shrink-0 rounded-full object-contain lg:h-10 lg:w-10" />
            <span className="truncate text-sm font-semibold tracking-tight text-slate-900 dark:text-white sm:text-[15px]">
              <span className="sm:hidden">DUITS</span>
              <span className="hidden sm:inline">Dhaka University IT Society</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <span className="mx-2 h-5 w-px bg-slate-200 dark:bg-white/15" aria-hidden="true" />
            <ThemeToggle />
            <Link
              href="/membership"
              className="group ml-1 inline-flex h-10 items-center gap-1.5 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Join DUITS
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex shrink-0 items-center gap-1.5 xl:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition-colors hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Site navigation" className="nv-fade fixed inset-0 z-[80] flex min-h-dvh flex-col overflow-hidden bg-white text-slate-900 dark:bg-[#050b1f] dark:text-white">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-400/25 blur-[90px] dark:bg-blue-600/25" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-cyan-300/25 blur-[90px] dark:bg-cyan-500/10" aria-hidden="true" />

          <div className="relative flex shrink-0 items-center justify-between px-4 pt-3 sm:px-6">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex min-w-0 items-center gap-2.5 rounded-full border border-slate-200 bg-white/80 py-1.5 pl-2 pr-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
              <Image src="/icons/duits-512.png" alt="DUITS logo" height={44} width={44} className="h-9 w-9 shrink-0 rounded-full object-contain" />
              <span className="text-sm font-semibold">DUITS</span>
            </Link>
            <button ref={closeRef} type="button" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close navigation menu" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20">
              <X size={20} />
            </button>
          </div>

          <div className="relative flex flex-1 flex-col overflow-y-auto px-5 pb-8 pt-8 sm:px-8">
            <div className="mx-auto flex w-full max-w-lg flex-col gap-2">
              {navLinks.map((link, index) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    style={{ animationDelay: `${index * 50 + 60}ms` }}
                    className={`nv-item group flex min-h-14 items-center justify-between rounded-2xl border px-5 text-lg font-semibold tracking-tight transition-all ${
                      active
                        ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-blue-300"
                        : "border-slate-200 bg-white/70 text-slate-900 hover:border-blue-300 hover:bg-blue-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={18} className="text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-300" />
                  </Link>
                )
              })}

              <Link
                href="/membership"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: `${navLinks.length * 50 + 100}ms` }}
                className="nv-item mt-4 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-blue-600 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
              >
                Join DUITS <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mx-auto mt-auto w-full max-w-lg pt-10 text-sm text-slate-500 dark:text-slate-400">
              <a href="mailto:duits.official@gmail.com" className="inline-flex items-center gap-2 transition-colors hover:text-blue-700 dark:hover:text-white">
                <Mail size={15} className="text-blue-600 dark:text-blue-300" /> duits.official@gmail.com
              </a>
              <p className="mt-2">University of Dhaka · TSC</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .nv-fade { animation: nvfade .2s ease both; }
        @keyframes nvfade { from { opacity: 0; } to { opacity: 1; } }
        .nv-item { animation: nvitem .45s cubic-bezier(.2,.7,.2,1) both; }
        @keyframes nvitem { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .nv-fade, .nv-item { animation: none; } }
      `}</style>
    </>
  )
}