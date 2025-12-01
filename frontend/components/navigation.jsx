"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

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
    <nav className="absolute w-full mt-10 bg-transparent z-30 top-0 left-0 transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8 rounded-full backdrop-blur-3xl bg-black/30 border border-white/10 py-2 lg:py-2 dark:bg-white/10 dark:border-gray-700">
        <div className="flex items-center overflow-hidden justify-between h-16 lg:h-20">
          <a href="/" className="flex items-center gap-2 overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=100&fit=crop" 
              alt="IT Club Logo" 
              className="md:h-20 md:w-20 h-12 w-20 rounded-2xl object-contain md:rounded-4xl" 
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-white rounded-md hover:bg-white/10 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 text-white lg:hidden">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-white rounded-md hover:bg-white/10 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 text-white rounded-md hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop with blur */}
            <div 
              className="fixed inset-0 backdrop-blur-lg z-[999] lg:hidden transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animation: 'fadeIn 0.3s ease-out' }}
            />
            
          
            <div 
              className="lg:hidden fixed top-0 left-0 h-full w-[280px] bg-black/90 backdrop-blur-lg border-r border-white/10 z-[1000] shadow-2xl"
              style={{ animation: 'slideInFromLeft 0.3s ease-out' }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=100&fit=crop" 
                    alt="IT Club Logo" 
                    className="h-10 w-10 rounded-lg object-contain" 
                  />
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="p-2 text-white rounded-md hover:bg-white/10 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                {/* Navigation Links */}
                <div className="flex flex-col gap-1 p-4 flex-1">
                  {navLinks.map((link, index) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-medium text-white hover:bg-white/10 transition-all py-3 px-4 rounded-lg"
                      style={{ 
                        animation: `slideInFromLeft 0.3s ease-out ${index * 50}ms`,
                        animationFillMode: 'backwards'
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </nav>
  )
}