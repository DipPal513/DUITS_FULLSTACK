import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { Toaster } from "react-hot-toast"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Dhaka University IT Society(DUITS)",
  description: "DUITS is ",
  generator: "Next.js",
  manifest:"/manifest.json",
  keywords: [
    "Dhaka",
    "University",
    "society",
    "IT Club",
    "Technology",
    "Innovation",
    "Community",
    "Dhaka",
    "Designers",
    "Tech Enthusiasts",
  ],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  authors: [{ name: "DUITS IT Club", url: "https://duits.org" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    // The restrictive maximumScale property has been removed for better accessibility.
  },
  icons: [
    {rel:"apple-touch-icon",url:"icons/duits-512.png"},
    {rel:"icon",url:"icons/duits-512.png"},
  ]
}


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
