"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push("/dashboard")
  console.log("isauthenticated: for true call in useeffect", isAuthenticated, "loading:", loading);

      } else {
        router.push("/login")
  console.log("isauthenticated: if not authed", isAuthenticated, "loading:", loading);

      }
    }
  }, [isAuthenticated, loading, router])


  console.log("isauthenticated: from home page", isAuthenticated, "loading:", loading);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
