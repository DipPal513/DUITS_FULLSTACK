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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})


// 1. Viewport and Theme Color are now exported separately in Next.js 14+
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" }, // Matches standard dark mode bg
  ],
};

export const metadata = {
  // 2. metadataBase is CRITICAL for social images to work. 
  // Replace with your actual deployed domain.
  metadataBase: new URL("https://duits.org"), 

  title: {
    default: "Dhaka University IT Society (DUITS)",
    template: "%s | DUITS", // Keeps titles consistent on inner pages (e.g., "Events | DUITS")
  },
  description:
    "The official IT Society of Dhaka University. Fostering a community of tech enthusiasts, developers, and innovators through workshops, hackathons, and seminars.",
  
  applicationName: "DUITS Official",
  authors: [{ name: "DUITS Technical Team", url: "https://duits.org" }],
  generator: "Next.js",
  
  // 3. SEO Keywords (Added local context)
  keywords: [
    "DUITS",
    "Dhaka University IT Society",
    "Dhaka University",
    "DU",
    "IT Club BD",
    "Technology Club",
    "Programming Community",
    "Hackathon Bangladesh",
    "Tech Students",
    "Software Engineering",
    "Innovation",
    "TSC",
  ],

  // 4. Open Graph (For Facebook, LinkedIn, Discord previews)
  openGraph: {
    title: "Dhaka University IT Society (DUITS)",
    description: "The leading tech community of Dhaka University. Join us to shape the future of technology.",
    url: "https://duits.org",
    siteName: "DUITS",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.jpg", // You need to add this image to your public folder (1200x630px)
        width: 1200,
        height: 630,
        alt: "DUITS Community Banner",
      },
    ],
  },

  // 5. Twitter Card (For X/Twitter previews)
  twitter: {
    card: "summary_large_image",
    title: "Dhaka University IT Society (DUITS)",
    description: "Fostering innovation and technology at Dhaka University.",
    creator: "@duits_official", // Replace with actual handle if you have one
    images: ["/banner.jpg"],
  },

  icons: {
    icon: "/icons/duits-512.png",
    shortcut: "/icons/duits-512.png",
    apple: "/icons/duits-512.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/icons/duits-512.png",
    },
  },

  manifest: "/manifest.json",
  
  // 6. Robots (Tells Google it's okay to index this site)
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
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head>
      <meta name="theme-color" content="#fff" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="icons/duits-512.png" />
      <link rel="apple-touch-icon" href="icons/duits-512.png" />
    </head>
      <body className={`font-sans ${inter.variable} ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
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
        </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
