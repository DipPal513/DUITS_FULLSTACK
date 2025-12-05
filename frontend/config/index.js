import axios from "axios";
import https from "https";
// 1. Create a custom agent that forces IPv4
const agent = new https.Agent({
  family: 4 // Force IPv4
});
const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_BASE_URL, // Replace with your backend API base URL
};
// create a object and fetch the data, post, put, delete base url
const api = {
  get: async (url) => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}${url}`, {
        withCredentials: true,
        httpsAgent: agent, 
        timeout: 10000     
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error.message);
      return null; // Return null so your page doesn't crash completely
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

  