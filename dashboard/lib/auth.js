import Cookies from 'js-cookie'

const TOKEN_KEY = 'authToken'

export const auth = {
  login: async (email, password) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock authentication - accept any email/password for demo
    if (email && password) {
      const user = {
        id: "1",
        email: email,
        name: email.split("@")[0],
        role: email.includes("admin") ? "admin" : "member",
        createdAt: new Date().toISOString(),
      }

      const token = btoa(JSON.stringify(user)) // Simple token creation
      return { success: true, user, token }
    }

    return { success: false, error: "Invalid credentials" }
  },

  register: async (name, email, password) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock registration
    if (name && email && password) {
      const user = {
        id: Date.now().toString(),
        email: email,
        name: name,
        role: "member",
        createdAt: new Date().toISOString(),
      }

      const token = btoa(JSON.stringify(user))
      return { success: true, user, token }
    }

    return { success: false, error: "Registration failed" }
  },

  logout: () => {
    Cookies.remove(TOKEN_KEY)
  },

  getCurrentUser: () => {
    const token = Cookies.get(TOKEN_KEY)
    if (!token) return null
    try {
      return JSON.parse(atob(token))
    } catch {
      return null
    }
  },

  isAuthenticated: () => {
    return !!Cookies.get(TOKEN_KEY)
  },

  isAdmin: () => {
    const user = auth.getCurrentUser()
    return user?.role === "admin"
  },
}
