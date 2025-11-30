import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import { FaFacebook, FaLocationArrow, FaPhoneAlt } from "react-icons/fa"

export default function Footer() {
  const socialLinks = [
    { icon: FaFacebook, href: "https://www.facebook.com/Dhaka.University.IT.Society.DUITS/", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Mail, href: "mailto:contact@itclub.com", label: "Email" },
  ]

  const footerLinks = {
    "Quick Links": [
      { label: "About Us", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Projects", href: "/projects" },
      { label: "Team", href: "/team" },
    ],
    Resources: [
      { label: "Blog", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
      { label: "Tutorials", href: "/blog" },
      { label: "FAQ", href: "#" },
    ],
    Community: [
      { label: "Join Us", href: "/membership" },
      { label: "Code of Conduct", href: "#" },
      { label: "Contact", href: "/contact" },
      { label: "Support", href: "/contact" },
    ],
  }

  return (
    <footer className="bg-card border-t border-border relative z-10">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/icons/duits-512.png" alt="IT Club Logo" className="w-20 h-20 rounded-lg" />
            </Link>
            <h2 className="text-2xl font-bold mb-4 ms-2">Dhaka University IT Society</h2>
            </div>
           
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex gap-3 items-center mb-2">
                <FaPhoneAlt/>
              <p>01519-201101</p>
              </div>
              <div className="flex gap-3 items-center mb-2">
                <Mail/>
              <p>duits.official@gmail.com</p> 
              </div>
              <div className="flex gap-3 items-center">
                <FaLocationArrow/>
              <p>1st Floor, TSC, University of Dhaka, Dhaka, Bangladesh</p>
              </div>

            </div>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

       
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} IT Club. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
