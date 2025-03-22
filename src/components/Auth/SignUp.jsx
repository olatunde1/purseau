import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import LoginLogo from "../../assets/images/login-logo.png";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";
import { useSignUp } from "@/hooks/api/mutation/auth/useSignUp";
import { toast } from "sonner";

export default function SignUp() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending } = useSignUp();

  // Validation function
  const validateInput = (input) => {
    // Email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Phone number regex pattern (adjust as needed for your requirements)
    // This example accepts formats like: +1234567890, 1234567890, 123-456-7890
    const phonePattern = /^(\+\d{1,3}[-\s]?)?\d{10,14}$/;
    // const phonePattern = /^(\+234|234)\d{10}$/;

    if (emailPattern.test(input)) {
      return { isValid: true, type: "email" };
    } else if (phonePattern.test(input)) {
      return { isValid: true, type: "phone" };
    } else {
      return { isValid: false, type: null };
    }
  };

  const handleInputChange = (e) => {
    setEmailOrPhone(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input first
    const validation = validateInput(emailOrPhone);

    if (!validation.isValid) {
      setError("Please enter a valid email address or phone number");
      return;
    }

    let formattedInput = emailOrPhone;

    if (validation.type === "phone") {
      if (formattedInput.startsWith("+234")) {
      formattedInput = formattedInput.slice(1);
      } else if (formattedInput.startsWith("0")) {
      formattedInput = "234" + formattedInput.slice(1);
      }
    }
    mutate(
      // { emailOrPhone },
      { emailOrPhone: formattedInput },
      {
        onSuccess: (response) => {
          console.log(response, "response");
          toast.success(
            response?.data?.message || "Verification code sent successfully!"
          );
          if (response?.data?.data?.firstTimeUser) {
            navigate("/VerifyEmail", { state: { emailOrPhone } });
          } else {
            navigate("/Login", { state: { emailOrPhone } });
          }
           if (response?.data?.data?.firstTimeUserVerificationPassed) {
             navigate("/CreatePassword", { state: { emailOrPhone } });
           } else {
             navigate("/Login", { state: { emailOrPhone } });
           }
        },
        onError: (error) => {
          console.error("Error:", error);
          toast.error(
            error?.response?.data?.message ||
              "Something went wrong. Please try again."
          );
          setError(
            error?.response?.data?.message ||
              "Something went wrong. Please try again."
          );
        },
      }
    );
  };

  return (
    <div className="sign-up-wrapper pt-2 pb-8">
      <div className="signup-container flex flex-col items-center justify-center bg-gray-50 px-4 sign-up ">
        {/* Logo */}
        <div className="signup-logo mb-6">
          <img src={LoginLogo} alt="Purseau Logo" className="h-16 w-16" />
        </div>

        {/* Welcome message */}
        <h1 className="signup-title text-2xl font-bold text-gray-900 mb-2 text-center">
          Welcome to Purseau
        </h1>
        <p className="signup-subtitle text-gray-600 text-center mb-6 px-2 sm:px-0 pb-[30px] pt-[16px]">
          Please! Kindly enter your e-mail or phone number to log in or <br />{" "}
          create your Purseau account.
        </p>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="signup-form w-full max-w-md space-y-5  rounded-lg p-6 sm:p-8"
        >
          {/* Email or phone number input */}
          <div className="signup-input-group ">
            <Label htmlFor="emailOrPhone" className="text-gray-700 font-medium">
              Email or Phone Number *
            </Label>
            <Input
              id="emailOrPhone"
              type="text"
              value={emailOrPhone}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className="signup-input w-full mt-1  focus:ring mb-4 bg-gray-200"
              // onInvalid={(e) =>
              //   e.target.setCustomValidity(
              //     "Please enter a valid email or phone number."
              //   )
              // }
              // onInput={(e) => e.target.setCustomValidity("")}
              required
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          {/* Continue button */}
          <Button
            type="submit"
            className="signup-button w-full transition-all duration-200"
          >
            {isPending ? "Please wait..." : "Continue"}
          </Button>

          {/* Terms and conditions */}
          <p className="signup-terms text-xs text-gray-500 text-center pb-[40px]">
            By clicking continue, you agree to the{" "}
            <a href="#" className="text-[#d84327] hover:underline">
              Terms and Conditions
            </a>{" "}
            of <br /> Purseau.
          </p>

          {/* Divider */}
          <div className="signup-divider flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Login with Google button */}
          <Button
            variant="outline"
            className="signup-google-btn w-full flex items-center justify-center gap-2 border-gray-300  transition-all duration-200 mb-[178.18px]"
          >
            <FcGoogle />
            Login with Google
          </Button>
        </form>
      </div>
    </div>
  );
}
