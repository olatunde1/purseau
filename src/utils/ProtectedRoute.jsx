import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAdminAuthStore } from "@/store/adminAuthStore";

export const ProtectedRoute = () => {
  const { accessToken } = useAdminAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/admin/login");
    }
  }, [accessToken, navigate]);
  if (!accessToken) {
    return null;
  }

  return <Outlet />;
};
