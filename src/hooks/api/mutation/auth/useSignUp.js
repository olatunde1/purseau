import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

const signUp = (data) => {
  return axiosInstance.post(`/user/status/checker`, data);
};

const verifyEmailOrPhone = (data) => {
  return axiosInstance.post(`/user/checker/verification`, data);
};

const resendVerificationOtp = (data) => {
  return axiosInstance.post(`/user/resend/otp`, data);
};

const createUser = (data) => {
  return axiosInstance.post(`/user/signup`, data);
};

const createPersonalDetails = (data) => {
  return axiosInstance.post(`/user/complete/signup`, data);
};

const useSignUp = () => {
  return useMutation({
    mutationFn: (data) => signUp(data),
  });
};

const useVerifyEmailOrPhone = () => {
  return useMutation({
    mutationFn: (data) => verifyEmailOrPhone(data),
  });
};

const useResendVerificationOtp = () => {
  return useMutation({
    mutationFn: (data) => resendVerificationOtp(data),
  });
};

const useCreateUser = () => {
  return useMutation({
    mutationFn: (data) => createUser(data),
  });
};

const useCreatePersonalDetails = () => {
  return useMutation({
    mutationFn: (data) => createPersonalDetails(data),
  });
};

export {
  useSignUp,
  useVerifyEmailOrPhone,
  useResendVerificationOtp,
  useCreateUser,
  useCreatePersonalDetails,
};
