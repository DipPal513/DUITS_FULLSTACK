"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false) // Not directly used in styling but good practice
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Sets isScrolled state, could be used to change the navbar background on scroll
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Combined navigation and CTA links
  const navLinks = [
    { href: "/", label: "Home", isCta: false },
    { href: "/about", label: "About", isCta: false },
    { href: "/events", label: "Events", isCta: false },
    { href: "/team", label: "Team", isCta: false },
    { href: "/notice", label: "Notice", isCta: false },
    { href: "/gallery", label: "Gallery", isCta: false },
    { href: "/contact", label: "Contact", isCta: false },
    { href: "/membership", label: "Join Now", isCta: true }, // Added CTA here
  ]

  return (
    <nav
      // The `isScrolled` state could be used here to change `bg-transparent` to a solid color.
      className={`absolute w-full mt-10 bg-transparent z-30 top-0 left-0 transition-all duration-300`}
    >
      <div className="w-full sm:container mx-auto px-4 lg:px-8 sm:rounded-full backdrop-blur-3xl bg-black/30 border border-white/10 py-2 lg:py-2 dark:bg-white/10 dark:border-gray-700">
        <div className="flex items-center overflow-hidden justify-between h-16 lg:h-20">
          
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-2 overflow-hidden group">
           <img src="/icons/duits-512.png" alt="IT Club Logo" className="h-20 w-20 object-contain sm:rounded-4xl" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.isCta ? (
                  // Render as a Button for the CTA on Desktop
                  <Link href={link.href}>
                    <Button size="sm">{link.label}</Button>
                  </Link>
                ) : (
                  // Render as a standard Link
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white hover:text-foreground transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                )}
              </div>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 bg-black/50 backdrop-blur-lg">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  // Slightly enhanced mobile link styling for better click target
                  className={`text-base font-medium transition-colors py-3 px-4 rounded-lg
                    ${link.isCta ? 'text-white bg-primary hover:bg-primary/90 mt-2' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}