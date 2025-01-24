import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Update with your backend URL
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`, // Add JWT token if available
  // },
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
