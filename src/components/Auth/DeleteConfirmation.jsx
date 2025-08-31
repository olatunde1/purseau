import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import DeleteProfileLogo from "../../assets/images/delete-profile-logo.png"

const DeleteConfirmation = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendEnabled(true);
    }
  }, [secondsLeft]);

  const handleInputChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setVerificationError("");

      // Auto-focus to next input
      if (value && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      setVerificationError("Please enter a 4-digit code");
      return;
    }

    setIsVerifying(true);
    setVerificationError("");

    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      if (enteredOtp === "1234") { // Replace with actual verification logic
        console.log("OTP verified successfully!");
        // Handle successful verification
      } else {
        setVerificationError("Invalid verification code");
      }
    }, 1500);
  };

  const handleResend = () => {
    setResendEnabled(false);
    setSecondsLeft(30);
    setOtp(["", "", "", ""]);
    document.getElementById("otp-input-0").focus();
    // TODO: Handle resend logic
    console.log("Resending OTP...");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="p-8 rounded-2xl shadow-lg max-w-md w-full text-center font-custom">
        <img src={DeleteProfileLogo} alt="" className="justify-center mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-3">We hate to see you leave</h1>
        <p className="text-sm text-gray-600 mb-6">
          We've sent a 4-digit verification code to your email <br />
          <span className="font-medium text-black">purseau@gmail.com</span>. <br />
          Please input the code below to continue
        </p>

        <div className="flex justify-center gap-3 mb-6 py-10">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-16 h-16 text-center border border-gray-300 rounded-lg text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#E94E30]"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {verificationError && (
          <p className="text-red-500 text-sm mb-4">{verificationError}</p>
        )}

        <Button
          onClick={handleVerify}
          disabled={isVerifying || otp.join("").length !== 4}
          className="w-full bg-[#E94E30] text-white py-[18.5px] rounded-lg hover:bg-[#c8371d] transition mb-4 disabled:opacity-70"
        >
          {isVerifying ? "Verifying..." : "Delete"}
        </Button>

        <p className="text-sm text-gray-600">
          Didn't receive any code?{" "}
          {resendEnabled ? (
            <button
              className="text-[#E94E30] font-medium hover:underline focus:outline-none"
              onClick={handleResend}
            >
              Resend Code
            </button>
          ) : (
            <span className="text-gray-500">Request a new code in {secondsLeft} seconds</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default DeleteConfirmation;