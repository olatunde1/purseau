import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

const loginCall = (data) => {
  return axiosInstance.post(`/admin/login`, data);
};

const useAdminLogin = () => {
  return useMutation({
    mutationFn: (data) => loginCall(data),
  });
};

export { useAdminLogin };
