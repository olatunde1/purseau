import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginLogo from '../../assets/images/login-logo.png';
import { GrRefresh } from "react-icons/gr";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation to get phone number

export default function VerifyPhoneNumber() {
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || "Unknown Number"; // Get phone number from state
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("1234"); // Simulated OTP for testing
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1].focus();
  };

  // Handle backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Verify OTP
  const verifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === generatedOtp) {
      setMessage("Phone number verified successfully!");
      setTimeout(() => {
        navigate("/Login"); // Redirect to next step
      }, 2000);
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
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
    setTimer(60);
    setMessage("A new OTP has been sent to your phone number.");
    // Add logic to resend OTP (e.g., API call)
  };

  return (
    <div className="phone-verification-wrapper pt-2 pb-8">
      <div className="phone-verification-container flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="signup-logo mb-6">
          <img src={LoginLogo} alt="Purseau Logo" className="h-16 w-16" />
        </div>

        <h1 className="phone-verification-title text-2xl font-bold text-gray-900 mb-2 text-center">
          Verify your phone number
        </h1>

        <p className="signup-subtitle text-gray-600 text-center mb-6 px-2 sm:px-0 pb-[30px] pt-[16px]">
        We’ve sent a verification code to <span className="text-gray-900">{phoneNumber}</span>.
        Please input <br /> the code below
        </p>

        <div className="otp-input-container flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              variant="unstyled"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              className="otp-input"
              ref={(el) => (inputRefs.current[index] = el)}
              style={{ width: "59px", height: "50px", textAlign: "center", fontSize: "18px" }}
            />
          ))}
        </div>

        <Button onClick={verifyOtp} className="verify-otp-button w-full max-w-md transition-all duration-200 py-8">
          Submit
        </Button>

        {message && <p className="verification-message text-center mt-4 text-sm text-gray-600">{message}</p>}

        <p className="request-new-code text-gray-600 text-center mb-6 px-2 sm:px-0 pb-[30px] pt-[16px]">
          Didn’t receive any code? Request a new code in <span className="text-[#d84327]">{timer} seconds</span>
        </p>

        <p className="signup-subtitle text-gray-600 text-center mb-6 px-2 sm:px-0 pb-[30px] pt-[16px] flex items-center justify-center gap-2 cursor-pointer" onClick={handleResendOtp}>
          <GrRefresh className="text-[#E94E30]" />
          Resend SMS
        </p>
      </div>
    </div>
  );
}
