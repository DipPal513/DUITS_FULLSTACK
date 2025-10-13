"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { auth } from "@/lib/auth"
// import { initializeData } from "@/lib/storage"
import cookies from 'js-cookie';
const AuthContext = createContext(null)
const token  = cookies.get('authToken');
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize data on mount
    // initializeData()

    // Check if user is logged in
    const currentUser = auth.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const result = await auth.login(email, password)
    if (result.success) {
      setUser(result.user)
    }
    return result
  }

  const register = async (name, email, password) => {
    const result = await auth.register(name, email, password)
    if (result.success) {
      setUser(result.user)
    }
    return result
  }

  const logout = () => {
    auth.logout()
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
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
