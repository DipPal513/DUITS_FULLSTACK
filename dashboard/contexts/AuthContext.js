"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { auth } from "@/lib/auth";

// import { initializeData } from "@/lib/storage"
import cookies from 'js-cookie';
import axios from "axios";
const AuthContext = createContext(null)
const token  = cookies.get('authToken');


export function AuthProvider({ children }) {
// AuthContext.jsx

const {checkMe} = auth;
 
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const result = await checkMe();
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    fetchUser();
  }, [])

  const login = async (email, password) => {
    const result = await auth.login(email, password)
    if (result.success) {
      setUser(result.user)
      setIsAuthenticated(true);
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
    setIsAuthenticated(false);
    cookies.remove('authToken');
    setUser(null);
   
  }

  useEffect(() => {
  console.log("AuthContext mounted");
  const checkAuth = async () => {
    try {
      console.log("Checking authentication status...");
      const res = await axios.get(`${baseURL}/auth/me`, {
        withCredentials: true, // send HTTP-only cookie
      });
      console.log("Auth check response:", res);
      if (res.status === 200) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      console.log("User set to:", res.data.user);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  checkAuth(); // run on context mount
}, []);
  const value = {
    user,
    loading,
    login,
    register,setIsAuthenticated,
    token,
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
