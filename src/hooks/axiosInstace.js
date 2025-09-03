import { BASE_URL } from "@/constants";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      // error.response?.data?.message === "Authorization token is required" ||
      error.response?.data?.message === "Invalid or expired token" 
    ) {
      const { logout } = useAuthStore();
      logout();
      window.location.href = "/SignUp";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
