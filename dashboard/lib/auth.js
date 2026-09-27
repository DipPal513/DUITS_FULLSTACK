import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export const auth = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data;
      if (user.role !== 'ADMIN') {
        await api.post('/auth/logout');
        return { success: false, error: 'Unauthorized Access' };
      }
      if (response.status === 200) {
        return { success: true, message: 'Login successful', user, token };
      }
      return { success: false, error: 'Login failed' };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  },

  checkMe: async () => {
    try {
      const response = await api.get('/auth/me');
      return { success: true, user: response.data.user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch user data',
      };
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
        role: 'PENDING',
      });
      if (response.status === 201) {
        return { success: true, user: response.data.user };
      }
      return { success: false, error: 'Registration failed' };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  },

  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      if (response.status === 200) {
        toast.success('Logged out successfully');
        return { success: true };
      }
      toast.error('Logout failed');
      return { success: false, error: 'Logout failed' };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Logout failed',
      };
    }
  },
};
