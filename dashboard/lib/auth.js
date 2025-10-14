import Cookies from 'js-cookie'
import axios from 'axios';


const TOKEN_KEY = 'authToken'


const baseURL = process.env.BASE_URL || 'http://localhost:5000/api/v1';

export const auth = {
  login: async (email, password) => {
    try {
      const response = await axios.post(baseURL + '/auth/login', { email, password });
      const { user, token } = response.data;
      
      if (token) {
        Cookies.set(TOKEN_KEY, token);
        return { success: true, user, token };
      }
      // now redirect to dashboard
     

      return { success: false, error: "Invalid credentials" };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Login failed" 
      };
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { user, token } = response.data;
      
      if (token) {
        Cookies.set(TOKEN_KEY, token);
        return { success: true, user, token };
      }
      
      return { success: false, error: "Registration failed" };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed"
      };
    }
  },

  logout: async () => {
    Cookies.remove(TOKEN_KEY);
    try {
      const response = await axios.post(baseURL + '/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${Cookies.get(TOKEN_KEY)}`
        }
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Logout failed" 
      };
    }
  },

  getCurrentUser: () => {
    const token = Cookies.get(TOKEN_KEY);
    if (!token) return null;
    try {
      return JSON.parse(atob(token));
    } catch {
      return null;
    }
  },

  isAuthenticated: () => {
    return !!Cookies.get(TOKEN_KEY);
  },

  isAdmin: () => {
    const user = auth.getCurrentUser();
    return user?.role === "admin";
  },
};
