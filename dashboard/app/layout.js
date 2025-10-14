import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers"
import "./globals.css"
import { Suspense } from "react"
import { Toaster } from "react-hot-toast"

export const metadata = {
  title: "IT Club Dashboard",
  description: "Dynamic IT Club Management System",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Toaster />
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>{children}</Providers>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
