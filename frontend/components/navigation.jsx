"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

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
    // { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/team", label: "Executives" },
    { href: "/notice", label: "Notice" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav
      className={`bg-transparent z-30 top-0 left-0 transition-all duration-300 ${isScrolled ? "fixed top-0  w-full": "absolute sm:top-10 top-5 w-full"}`}
    >
      <div className={`mx-auto px-4 lg:px-8 rounded-full bg-white/10 dark:bg-black/30 dark:border-white/20 backdrop-blur-xl py-4 lg:py-4 ${isScrolled ? "w-full rounded-none border-b-1" : "border container"}`}>
        <div className="flex items-center overflow-hidden justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 overflow-hidden group">
           <img src="/icons/duits-512.png" alt="IT Club Logo" className="md:h-20 md:w-20 h-12 w-20 rounded-2xl object-contain md:rounded-4xl" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <ThemeToggle />
            
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-900 dark:text-white rounded-md hover:bg-black/10 dark:hover:bg-white/10">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-white/20 bg-white/95 dark:bg-black/95 backdrop-blur-lg fixed w-full left-0 px-4 z-[1000]">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
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