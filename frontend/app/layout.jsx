import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { Toaster } from "react-hot-toast"
import "./globals.css"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import ChatWidget from "@/components/chatWidget/ChatWidget"
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

// 1. Viewport (Mobile Responsiveness)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// 2. SEO Metadata (Ranking Power)
export const metadata = {
  metadataBase: new URL("https://duitsbd.org"), // ⚠️ Change this to your real domain

  title: {
    default: "Dhaka University IT Society (DUITS) - Leading Tech Community",
    template: "%s | DUITS",
  },
  
  description:
    "The official IT Society of Dhaka University (DU). Fostering innovation through hackathons, workshops, and tech seminars at TSC. Join the largest student tech community in Bangladesh.",
icons: {
    icon: "/icons/duits-512.png", // The path to your image in 'public'
    shortcut: "/icons/duits-512.png",
    apple: "/icons/duits-512.png", // Important for Apple devices
  },
  keywords: [
    "DUITS", "Dhaka University IT Society", "University of Dhaka", "DU", "TSC",
    "IT Club Bangladesh", "Student Tech Community", "Programming Club DU",
    "Hackathons in Dhaka", "Technology Workshops", "Software Engineering"
  ],

  authors: [{ name: "DUITS Technical Team", url: "https://duitsbd.org" }],
  creator: "Dhaka University IT Society",
  publisher: "Dhaka University IT Society",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Dhaka University IT Society (DUITS)",
    description: "Join the largest student tech community at Dhaka University.",
    url: "https://duitsbd.org",
    siteName: "DUITS",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/icons/duits-512.png", // Make sure this file exists in /public (1200x630px)
      width: 1200,
      height: 630,
      alt: "DUITS Community Banner",
    }],
  },

  twitter: {
    card: "summary_large_image",
    title: "DUITS - Dhaka University IT Society",
    description: "Fostering innovation and technology at Dhaka University.",
    site: "@duits_official",
    creator: "@duits_official",
    images: ["/icons/duits-512.png"],
  },

  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // ⚠️ Get this from Google Search Console
    other: {
      "facebook-domain-verification": "YOUR_FB_CODE",
    },
  },
};



export default function RootLayout({ children }) {
   const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity", // or "Organization"
    "name": "Dhaka University IT Society",
    "alternateName": "DUITS",
    "url": "https://duitsbd.org",
    "logo": "/icons/duits-512.png",
    "foundingDate": "2011", // Update if needed
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "TSC",
      "addressLocality": "Dhaka University",
      "addressRegion": "Dhaka",
      "postalCode": "1000",
      "addressCountry": "BD"
    },
    "sameAs": [
      "https://www.facebook.com/duits.official",
      "https://www.linkedin.com/company/duits",
      "https://twitter.com/duits_official"
    ]
  };
  return (
    <html lang="en" suppressHydrationWarning>
    <head>
      <meta name="theme-color" content="#fff" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="icons/duits-512.png" />
      <link rel="apple-touch-icon" href="icons/duits-512.png" />
    </head>
      <body className={`font-sans ${inter.variable} ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Toaster />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense fallback={ 
            <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="relative">
            <div className="relative w-24 h-24">
              <div className="absolute w-full h-full border-2 border-transparent border-t-cyan-400 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
              <div className="absolute w-full h-full border-2 border-transparent border-r-blue-500 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
              <div className="absolute w-full h-full border-2 border-transparent border-b-purple-500 rounded-full animate-spin" style={{ animationDuration: '2.5s' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-cyan-400 text-sm tracking-widest font-mono animate-pulse">LOADING</p>
              <div className="flex justify-center gap-1 mt-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </div>
        </div>
      }>
        <Navigation />
        {children}
        <Footer />
        <ChatWidget />
        </Suspense>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  )
}
