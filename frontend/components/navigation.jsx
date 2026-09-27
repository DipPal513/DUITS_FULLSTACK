"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/executives", label: "Executives" },
    { href: "/notice", label: "Notice" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/membership", label: "Membership" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-border bg-background/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-[76px]">
          <Link href="/" aria-label="Dhaka University IT Society home" className="flex min-w-0 items-center gap-3">
            <Image src="/icons/duits-512.png" alt="DUITS logo" height={44} width={44} priority className="h-10 w-10 shrink-0 object-contain" />
            <span className="truncate text-sm font-semibold text-foreground sm:text-base">Dhaka University IT Society</span>
          </Link>

          <div className="hidden items-center gap-6 xl:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          <div className="flex shrink-0 items-center gap-2 xl:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Site navigation" className="fixed inset-0 z-[60] flex min-h-dvh flex-col bg-background text-foreground">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex min-w-0 items-center gap-3">
              <Image src="/icons/duits-512.png" alt="DUITS logo" height={44} width={44} className="h-10 w-10 shrink-0 object-contain" />
              <span className="truncate font-semibold">DUITS</span>
            </Link>
            <button type="button" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close navigation menu" className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-muted">
              <X size={22} />
            </button>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto px-5 py-8 sm:px-8">
            <div className="mx-auto flex w-full max-w-lg flex-col gap-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex min-h-12 items-center justify-between border-b border-border/70 py-3 text-lg font-medium transition-colors hover:text-primary"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                </Link>
              ))}
            </div>
            <div className="mx-auto mt-auto w-full max-w-lg pt-8 text-sm text-muted-foreground">University of Dhaka · TSC</div>
          </div>
        </div>
      )}
    </nav>
  )
}