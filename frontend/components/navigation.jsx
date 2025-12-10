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
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav
      className={`bg-transparent z-30 top-0 left-0 transition-all duration-300 ${isScrolled ? "fixed top-0  w-full": "absolute sm:top-10 top-5 w-full"}`}
    >
      <div className={`mx-auto px-4 lg:px-8 rounded-full bg-white/10 dark:bg-black/30 dark:border-white/20 backdrop-blur-xl py-4 lg:py-4 ${isScrolled ? "w-full rounded-none border-b-1" : "border container"}`}>
        <div className="flex items-center overflow-hidden justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 overflow-hidden group">
           <Image src="/icons/duits-512.png" alt="IT Club Logo" height={84} width={84} className=" rounded-2xl object-contain md:rounded-4xl" fetchPriority="true"/>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
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
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-900 dark:text-white rounded-md z-50 relative hover:bg-black/10 dark:hover:bg-white/10">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

      </div>
        {isMobileMenuOpen && (
          <div className=" py-4 border-t border-gray-200  backdrop-blur-lg fixed w-full sm:w-1/2 left-0  z-[1000] top-0 h-screen px-6  lg:-left-[1000] transition-all duration-1000  shadow-lg pt-20 ">

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-900 dark:text-white rounded-md z-50 absolute top-5 right-5 hover:bg-black/10 dark:hover:bg-white/10">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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
    </nav>
  )
}