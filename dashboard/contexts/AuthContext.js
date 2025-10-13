"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { auth } from "@/lib/auth"

import Cookies from 'js-cookie' 

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize data on mount


    // Check for auth token in cookies
    const token = Cookies.get('authToken')
    if (token) {
      const currentUser = auth.getCurrentUser()
      setUser(currentUser)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const result = await auth.login(email, password)
    if (result.success) {
      // Set token in cookie upon successful login
      Cookies.set('authToken', result.token, { expires: 7 }) // expires in 7 days
      setUser(result.user)
    }
    return result
  }

  const logout = () => {
    // Remove token from cookie on logout
    Cookies.remove('authToken')
    auth.logout()
    setUser(null)
  }

  // ... rest of the code remains same

}
