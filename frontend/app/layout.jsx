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
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
  
  <div className="relative w-32 h-32">
    
    {/* 1. Ambient Glow (Dark Mode Only) */}
    <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-600/20 blur-2xl rounded-full scale-0 animate-[ping_3s_ease-in-out_infinite]"></div>

    {/* 2. Static Outer Ring (Structure) */}
    <div className="absolute inset-0 border-2 border-slate-200 dark:border-slate-800 rounded-full"></div>

    {/* 3. Primary Orbit (Blue - Fast) */}
    <div className="absolute inset-0 border-[3px] border-transparent border-t-blue-600 dark:border-t-blue-500 rounded-full animate-[spin_1s_linear_infinite]"></div>

    {/* 4. Secondary Orbit (Red - Slow Reverse) */}
    <div className="absolute inset-2 border-[3px] border-transparent border-b-red-600 dark:border-b-red-500 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>

    {/* 5. Inner Core (Pulse) */}
    <div className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center bg-white dark:bg-[#020617] rounded-full border border-slate-100 dark:border-slate-800 shadow-lg z-10">
      <div className="w-3 h-3 bg-slate-900 dark:bg-white rounded-full animate-ping"></div>
    </div>
    
  </div>

  {/* Text Area */}
  <div className="mt-8 text-center space-y-2 relative z-10">
    <h2 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
      DUITS
    </h2>
    
    <div className="flex items-center justify-center gap-1">
      <div className="h-px w-8 bg-gradient-to-r from-transparent to-slate-400 dark:to-slate-600"></div>
      <p className="text-[10px] font-bold tracking-[0.3em] text-slate-500 dark:text-slate-400 uppercase">
        System Loading
      </p>
      <div className="h-px w-8 bg-gradient-to-l from-transparent to-slate-400 dark:to-slate-600"></div>
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
