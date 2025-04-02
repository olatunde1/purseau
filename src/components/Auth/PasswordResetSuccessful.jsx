import React from "react";
import { Button } from "@/components/ui/button";
import LoginLogo from "../../assets/images/login-logo.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Reset from "../../assets/images/reset-removebg-preview.png";

export default function PasswordResetSuccessful({ emailOrPhone }) {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = () => {
    navigate("/Login", { state: { emailOrPhone } });
  };

  return (
    <div className="password-reset-successful-wrapper pt-2 pb-8">
      <div className="password-reset-successful-container flex flex-col items-center justify-center bg-gray-50 px-4">
        {/* Logo */}
        <div className="signup-logo mb-6">
          <img src={LoginLogo} alt="Purseau Logo" className="h-16 w-16" />
        </div>

        {/* Title */}
        <h1 className="password-reset-title text-2xl font-bold text-gray-900 mb-2 text-center">
          Password Reset Successful
        </h1>

        {/* Subtitle */}
        <p className="signup-subtitle text-gray-600 text-center mb-6 px-2 sm:px-0 pb-[30px] pt-[16px]">
          Your password has been reset successfully. Kindly go to the login page{" "}
          <br /> to gain access to your account.
        </p>

        {/* Reset Image */}
        <div className="reset-image mb-6">
          <img src={Reset} alt="Reset Successful" className="h-40 w-40" />
        </div>

        {/* Login Button */}
        <Button
          onClick={handleLogin}
          className="login-button-reset-successful w-full max-w-md transition-all duration-200 py-6"
        >
          Login
        </Button>
      </div>
    </div>
  );
}
