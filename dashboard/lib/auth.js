import Cookies from 'js-cookie'
import axios from 'axios';
import toast from 'react-hot-toast';

const TOKEN_KEY = 'authToken';



const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const auth = {
  login: async (email, password) => {
    try {
      const response = await axios.post(baseURL + '/auth/login', { email, password }, {
        withCredentials: true,
        
      });
      const { user, token } = response.data;
      if(response.status === 200) {
        return { success: true,message:"Login successful", user, token };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Login failed" 
      };
    }
  },
  checkMe: async () => {
    try {
     
      const response = await axios.get(baseURL + '/auth/me', {
        withCredentials: true,
      });

      return { success: true, user: response.data.user };
    } catch (error) {
      console.log("Error fetching current user:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to fetch user data" 
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
  try {
    

    const response = await axios.post(baseURL + '/auth/logout', {}, {
      withCredentials: true,
    });
    if (response.status === 200) {
      // Only remove token after successful logout
     
      toast.success("Logged out successfully");
      
      return { success: true };
    } else {
      toast.error("Logout failed");
      return { success: false, error: "Logout failed" };
    }
  } catch (error) {
    // Still remove token locally even if API fails
    Cookies.remove(TOKEN_KEY);
    
    return {
      success: false,
      error: error.response?.data?.message || "Logout failed",
    };
  }
},

  

  isAuthenticated: () => {
    return !!user;
  },

  isAdmin: () => {
    const user = auth.checkMe()
    return user?.role === "ADMIN";
  },
};
