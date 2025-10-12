import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import LoginLogo from "../../assets/images/login-logo.png";

import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForgotPassword } from "@/hooks/api/mutation/auth/useLogin";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useAdminLogin } from "@/hooks/api/mutation/admin/useLogin";
import { useAdminAuthStore } from "@/store/adminAuthStore";

const Loginschema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter the correct email for account.")
    .test("no-spaces", "No spaces allowed", (value) => !/\s/.test(value)),
  password: yup.string().min(6, "Password must contain at least 6 characters"),
});

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(Loginschema),
    mode: "onChange",
  });

  const { setAccessToken } = useAdminAuthStore();
  const { mutateAsync, isPending } = useAdminLogin();
  const { mutate: forgotPassword, isPending: forgotPending } = useForgotPassword();

  const onSubmit = async (data) => {
    const loginData = { email: data?.email, password: data?.password };
    try {
      const formData = new FormData();
      Object.keys(loginData).forEach((key) => {
        if (loginData[key]) formData.append(key, loginData[key].toString());
      });

      await mutateAsync(formData, {
        onSuccess: (response) => {
          const token = response?.data?.data?.token;
          if (token) setAccessToken(token);
          toast.success(response?.data?.message || "Admin Login successful");
          navigate("/admin/overview");
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message);
        },
      });
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  const ForgotPasswordSubmit = () => {
    forgotPassword(
      { email: emailOrPhone },
      {
        onSuccess: (response) => {
          toast.success(response?.data?.message || "otp sent");
          navigate("/ForgotPassword", { state: { emailOrPhone } });
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message ||
              "Something went wrong. Please try again."
          );
        },
      }
    );
  };

  return (
    <div className="login-wrapper flex items-center justify-center min-h-screen bg-gray-50 px-4 py-1">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-sm bg-white shadow-lg rounded-2xl px-6 sm:px-8 py-10 sm:py-12 flex flex-col items-center">
        {/* Logo */}
        <Link to="/" className="mb-6 sm:mb-8">
          <img
            src={LoginLogo}
            alt="Purseau Logo"
            className="h-12 sm:h-16 w-auto mx-auto"
          />
        </Link>

        {/* Title */}
        <h1 className="text-2xl sm:text-[28px] font-semibold text-gray-900 mb-2 text-center">
          Yo Admin 👋
        </h1>
        <p className="text-gray-600 text-sm sm:text-base text-center mb-8 sm:mb-10">
          Login into your Admin Dashboard.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          {/* Email Field */}
          <div>
            {errors.email && (
              <div className="border border-dashed border-red-500 rounded-md px-4 py-2 mb-2 text-sm font-medium text-red-600 bg-red-50">
                {errors.email?.message}
              </div>
            )}
            <Input
              {...register("email")}
              type="email"
              placeholder="Enter email address"
              className="w-full bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#d84327]/60 focus:border-[#d84327] py-5 rounded-lg"
            />
          </div>

          {/* Password Field */}
          <div>
            {errors.password && (
              <div className="border border-dashed border-red-500 rounded-md px-4 py-2 mb-2 text-sm font-medium text-red-600 bg-red-50">
                {errors.password?.message}
              </div>
            )}
            <Label htmlFor="password" className="text-gray-700 font-medium mb-1 block">
              Password
            </Label>
            <div className="relative">
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#d84327]/60 focus:border-[#d84327] py-5 rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <Button
            className="w-full bg-[#d84327] hover:bg-[#c73d23] transition-all duration-200 text-white py-5 rounded-lg text-base font-semibold shadow-md"
            type="submit"
          >
            {isPending ? "Loading..." : "Continue"}
          </Button>
        </form>

        {/* Forgot Password */}
        <p className="text-sm text-center text-gray-600 mt-6">
          <span
            onClick={ForgotPasswordSubmit}
            className="text-[#E94E30] hover:underline cursor-pointer font-medium"
          >
            {forgotPending ? "Loading..." : "Forgot your password?"}
          </span>
        </p>
      </div>
    </div>
  );
}
