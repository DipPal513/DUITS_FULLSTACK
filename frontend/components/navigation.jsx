"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/team", label: "Team" },
    { href: "/notice", label: "Notice" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav
      className={`absolute w-full mt-10 bg-transparent z-30 top-0 left-0 transition-all duration-300 `}
    >
      <div className="container mx-auto px-4 lg:px-8 rounded-full backdrop-blur-3xl bg-black/30 border border-white/10 py-2 lg:py-2  dark:bg-white/10 dark:border-gray-700">
        <div className="flex items-center overflow-hidden justify-between h-16 lg:h-20">
          <Link href="/" className="flex  items-center gap-2 overflow-hidden group">
           <img src="/icons/duits-512.png" alt="IT Club Logo" className="md:h-20 md:w-20 h-12 w-20 rounded-2xl object-contain md:rounded-4xl" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white text-white-foreground  transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <ThemeToggle />
            
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 text-white  lg:hidden">
            <ThemeToggle />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white rounded-md hover:bg-white/10 ">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-background  backdrop-blur-lg fixed w-full left-0 px-4 z-[1000]">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-white-foreground  transition-colors py-3 px-4 rounded-lg"
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
