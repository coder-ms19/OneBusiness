import axios from "axios";

// Determine base URL depending on env, assuming Vite runs on 5173
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error: ", error.response?.data?.message || error.message);
    if(error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("token");
      // Optional: window.location.href = "/auth/admin/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
