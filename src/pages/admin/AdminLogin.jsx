import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import LoginLogo from "../../assets/images/login-logo.png";

import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FiEye, FiEyeOff, FiEdit } from "react-icons/fi";
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

  const { setAccessToken, setCurrentUser } = useAdminAuthStore();
  const { mutateAsync, isPending } = useAdminLogin();

  const { mutate: forgotPassword, isPending: forgotPending } =
    useForgotPassword();

  const onSubmit = async (data) => {
    const loginData = {
      email: data?.email,
      password: data?.password,
    };
    try {
      const formData = new FormData();
      Object.keys(loginData).forEach((key) => {
        if (loginData[key] !== undefined && loginData[key] !== null) {
          formData.append(key, loginData[key].toString());
        }
      });

      await mutateAsync(formData, {
        onSuccess: (response) => {
          const token = response?.data?.data?.token;
          if (token) {
            setAccessToken(token);
          }

          toast.success(response?.data?.message || "Admin Login successful");
          navigate("/admin/overview");
          console.log(response, "responsebydex");
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
    <div className="login-wrapper pt-2 pb-12 lg:pb-8 flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="login-container flex flex-col items-center bg-white shadow-md p-6 lg:rounded-3xl">
        {/* Logo */}
        <Link to="/">
          <div className="login-logo mb-6">
            <img
              src={LoginLogo}
              alt="Purseau Logo"
              className="h-10 w-full lg:h-16 lg:w-16"
            />
          </div>
        </Link>

        {/* Title */}
        <div className="flex items-center">
          <h1 className="welcome-back text-gray-900 mb-2 text-xl lg:text-[32px] text-center items-center">
            Yo Admin👋
          </h1>
          {/* <img src={HandWave} alt="" /> */}
        </div>
        <p className="login-back-text w-[470px] mb-10 lg:mb-16 lg:pt-2 text-center">
          Login into your Admin Dashboard.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input with Edit Option */}
          <div className="w-[300px] lg:w-[512px] mb-6">
            {errors.email && (
              <div className="w-full border border-dashed border-red-500 px-4 py-1  my-4 text-black text-sm font-semibold">
                {errors.email?.message}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Input
                {...register("email")}
                name="email"
                id="email"
                type="email"
                placeholder="Enter email address"
                className={`w-full mt-1 focus:ring bg-gray-300 py-6 input-text-email`}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="w-full mb-10 lg:mb-16 lg:w-[512px]">
            {errors.password && (
              <div className="w-full border border-dashed border-red-500 px-4 py-1  my-4 text-black text-sm font-semibold">
                {errors.password?.message}
              </div>
            )}
            <Label htmlFor="password" className=" login-password-text">
              Password*
            </Label>

            <div className="relative">
              <Input
                {...register("password")}
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 focus:ring bg-gray-300 py-6 mb-4 input-text-caption"
              />
              <button
                type="button"
                className="absolute right-3 top-4 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <Button className="w-full bg-[#d84327] text-white py-6 rounded-lg login-continue-button">
            {isPending ? "loading..." : "Continue"}
          </Button>
        </form>

        {/* Forgot Password */}
        <p className="text-sm text-gray-500 text-center pt-8">
          <p
            onClick={ForgotPasswordSubmit}
            className="text-[#E94E30] hover:underline font-[Lato] text-[16px] text-500 cursor-pointer"
          >
            {forgotPending ? "loading..." : "Forgot your Password?"}
          </p>
        </p>
      </div>
    </div>
  );
}
