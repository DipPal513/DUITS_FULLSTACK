export const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

import axios from "axios";
const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_BASE_URL, // Replace with your backend API base URL
};
// create a object and fetch the data, post, put, delete base url
const api = {
  get: async (url) => {
   try {
    const response = await axios.get(`${config.apiBaseUrl}${url}`,{withCredentials:true});
    return response.data;
   } catch (error) {
    console.error("API GET request error:", error);
    throw error;
   }
  },
  post: async (url, data) => {
   try {
    const response = await axios.post(`${config.apiBaseUrl}${url}`, data ,{
      headers:{ "Content-Type": "application/json" },
      withCredentials:true});
    return response;
   } catch (error) {
    console.error("API POST request error:", error);
    throw error;
   }
  },
  put: async (url, data) => {
   try {
    const response = await axios.put(`${config.apiBaseUrl}${url}`, data,{withCredentials:true});
    return response.data;
   } catch (error) {
    console.error("API PUT request error:", error);
    throw error;
   }
  },
  delete: async (url) => {
   try {
    const response = await axios.delete(`${config.apiBaseUrl}${url}`,{withCredentials:true});
    return response.data;
   } catch (error) {
    console.error("API DELETE request error:", error);
    throw error;
   }
  },
};

export default api;

  