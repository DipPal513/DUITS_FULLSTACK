"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { auth } from "@/lib/auth"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      const result = await auth.checkMe()
      if (result.success && result.user?.role === "ADMIN") {
        setUser(result.user)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  const login = async (email, password) => {
    const result = await auth.login(email, password)
    if (result.success) {
      setUser(result.user)
      setIsAuthenticated(true)
    }
    return result
  }

  const register = async (name, email, password) => {
    const result = await auth.register(name, email, password)
    return result
  }

  const logout = async () => {
    await auth.logout()
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    register,
    setIsAuthenticated,
    logout,
    isAuthenticated,
    isAdmin: user?.role === "ADMIN",
    checkMe: auth.checkMe,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
