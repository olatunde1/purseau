import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginLogo from "../../assets/images/login-logo.png";
import { FcGoogle } from "react-icons/fc";
import { GrRefresh } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  useResendPasswordOtp,
  useVerifyForgotPassword,
} from "@/hooks/api/mutation/auth/useLogin";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [otp, setOtp] = useState(["", "", "", ""]); // Array to store each digit of the OTP
  const [generatedOtp, setGeneratedOtp] = useState("1234"); // Simulated OTP for testing
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(60); // Countdown timer
  const inputRefs = useRef([]); // Refs for each input field
  const navigate = useNavigate(); // Hook for navigation

  const { state } = useLocation();
  const emailOrPhone = state?.emailOrPhone || "";

  const contactMethod = emailOrPhone.includes("@") ? "email" : "phone";
  useEffect(() => {
    console.log(emailOrPhone);
  }, []);

  const { mutate, isPending } = useVerifyForgotPassword();
  const { mutate: ResendOtp, isPending: ResendPending } =
    useResendPasswordOtp();

  // const emailOrPhone = state?.emailOrPhone || "";
  // console.log(emailOrPhone, "emailOrPhone");

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to the next input field
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to the previous input field
      inputRefs.current[index - 1].focus();
    }
  };

  // Verify the OTP
  const verifyOtp = () => {
    const enteredOtp = otp.join(""); // Combine the OTP digits into a single string

    try {
      mutate(
        { email: emailOrPhone, plainOtp: enteredOtp },
        {
          onSuccess: (response) => {
            console.log(response, "response");
            toast.success(response?.data?.message || "otp verified");
            navigate("/CreateNewPassword", {
              state: { emailOrPhone, enteredOtp },
            });
          },
          onError: (error) => {
            console.error("Error:", error);
            toast.error(
              error?.response?.data?.message ||
                "Something went wrong. Please try again."
            );
          },
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }

    // if (enteredOtp === generatedOtp) {
    //   setMessage("Email verified successfully!");
    //   // Redirect to Create Password page after 2 seconds
    //   setTimeout(() => {
    //     navigate("/CreateNewPassword"); // Navigate to Create Password page
    //   }, 2000);
    // } else {
    //   setMessage("Invalid OTP. Please try again.");
    // }
  };

  // Countdown timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Resend OTP handler
  const handleResendOtp = () => {
    ResendOtp(
      { email: emailOrPhone },
      {
        onSuccess: (response) => {
          setTimer(60);
          toast.success(response?.data?.message || "otp resent");
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message ||
              "Something went wrong. Please try again."
          );
        },
      }
    );
    setMessage("A new OTP has been sent to your email.");
  };

  return (
    <div className="email-verification-wrapper pt-2 pb-8">
      <div className="email-verification-container flex flex-col items-center justify-center bg-gray-50 px-4">
        {/* Logo */}
        <div className="signup-logo mb-6">
          <img src={LoginLogo} alt="Purseau Logo" className="h-16 w-16" />
        </div>

        {/* Title */}
        <h1 className="email-verification-title  mb-2 text-center">
          Forgot password
        </h1>

        {/* Subtitle */}
        <p className="signup-subtitle text-gray-600 text-center mb-6 px-2 sm:px-0 pb-[30px] pt-[16px]">
          We’ve sent a verification code to your {contactMethod}
          <span className="text-gray-900">
            {" "}
            {emailOrPhone ?? ""}
          </span> <br /> Please input the code below.
        </p>

        {/* OTP Input Fields */}
        <div className="otp-input-container flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              variant="unstyled"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)} // Handle backspace navigation
              maxLength={1} // Allow only one character per input
              className="otp-input"
              ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
              style={{
                width: "59px",
                height: "50px",
                textAlign: "center",
                fontSize: "18px",
              }}
            />
          ))}
        </div>

        {/* Submit Button */}
        <Button
          onClick={verifyOtp}
          className="verify-otp-button w-full max-w-md transition-all duration-200 py-8"
        >
          {isPending ? "Please wait..." : "Submit"}
        </Button>

        {/* Display messages */}
        {message && (
          <p className="verification-message text-center mt-4 text-sm text-gray-600">
            {message}
          </p>
        )}

        {/* Request New Code */}
        <p className="request-new-code text-gray-600 text-center mb-2 px-2 sm:px-0 pb-[30px] pt-[16px]">
          Didn’t receive any code? Request a new code in{" "}
          <span className="text-[#d84327]">{timer} seconds</span>
        </p>

        {/* Resend Email */}
        <p
          className="signup-subtitle text-center mb-6 px-2 sm:px-0 pb-[30px] flex items-center justify-center gap-2 cursor-pointer"
          onClick={handleResendOtp}
        >
          <GrRefresh className="text-[#E94E30]" /> {/* Resend email icon */}
          Resend Email
        </p>
      </div>
    </div>
  );
}
