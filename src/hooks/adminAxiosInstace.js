import { BASE_URL } from "@/constants";
import { useAdminAuthStore } from "@/store/adminAuthStore";
import axios from "axios";

const adminAxiosInstace = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

adminAxiosInstace.interceptors.request.use(
  (config) => {
    const { accessToken } = useAdminAuthStore();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

adminAxiosInstace.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      // error.response?.data?.message === "Authorization token is required" ||
      error.response?.data?.message === "Invalid or expired token" 
    ) {
      const { logout } = useAdminAuthStore();
      logout();
      window.location.href = "/SignUp";
    }

    return Promise.reject(error);
  }
);

export default adminAxiosInstace;
