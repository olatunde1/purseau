import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

const loginCall = (data) => {
  return axiosInstance.post(`/user/login`, data);
};

const forgotPassword = (data) => {
  return axiosInstance.post(`/user/forgot/password`, data);
};

const resendPasswordOtp = (data) => {
  return axiosInstance.post(`/user/resend/forgot/password`, data);
};

const verifyForgotPassword = (data) => {
  return axiosInstance.post(`/user/verify/forgot/password`, data);
};

const resetPassword = (data) => {
  return axiosInstance.patch(`/user/reset/password`, data);
};

const useLogin = () => {
  return useMutation({
    mutationFn: (data) => loginCall(data),
  });
};

const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data) => forgotPassword(data),
  });
};

const useResendPasswordOtp = () => {
  return useMutation({
    mutationFn: (data) => resendPasswordOtp(data),
  });
};

const useVerifyForgotPassword = () => {
  return useMutation({
    mutationFn: (data) => verifyForgotPassword(data),
  });
};

const useResetPassword = () => {
  return useMutation({
    mutationFn: (data) => resetPassword(data),
  });
};

export {
  useLogin,
  useForgotPassword,
  useResendPasswordOtp,
  useVerifyForgotPassword,
  useResetPassword,
};
