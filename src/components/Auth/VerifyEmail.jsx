import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginLogo from "../../assets/images/login-logo.png";
import { GrRefresh } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useResendVerificationOtp,
  useVerifyAccountCreation,
  useVerifyEmailOrPhone,
} from "@/hooks/api/mutation/auth/useSignUp";
import { toast } from "sonner";
import { validateAndFormatInput } from "@/utils";

export default function VerifyEmail() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [, setError] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      navigate("/SignUp");
    }
  }, [state, navigate]);

  const emailOrPhone = state?.emailOrPhone || state?.phoneNumber || "";
  const accountCreation = state?.accountCreation;
  const contactMethod = emailOrPhone.includes("@") ? "email" : "phone";

  const { mutate, isPending } = useVerifyEmailOrPhone();
  const { mutate: accountMutate, isPending: accountPending } =
    useVerifyAccountCreation();
  const { mutate: ResendOtp, isPending: ResendPending } =
    useResendVerificationOtp();

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const validation = validateAndFormatInput(emailOrPhone);
  if (!validation.isValid) {
    setError("Please enter a valid email address or phone number");
    return;
  }
  const formattedInput = validation.formatted;

  const verifyOtp = () => {
    const enteredOtp = otp.join("");
    const mutationFn = accountCreation ? accountMutate : mutate;

    mutationFn(
      { emailOrPhone: formattedInput, plainOtp: enteredOtp },
      {
        onSuccess: (response) => {
          toast.success(response?.data?.message || "OTP verified");
          if (accountCreation) {
            navigate("/AccountCreatedSuccessful", {
              state: { emailOrPhone: response?.data?.data?.email },
            });
          } else {
            navigate("/CreatePassword", { state: { emailOrPhone } });
          }
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

  const handleResendOtp = () => {
    ResendOtp(
      { emailOrPhone: emailOrPhone },
      {
        onSuccess: (response) => {
          setTimer(60);
          toast.success(response?.data?.message || "OTP resent");
          setMessage("A new OTP has been sent to your email.");
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

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <div className="email-verification-wrapper pt-2 pb-8 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-lg rounded-xl shadow-md bg-white dark:bg-gray-800 px-6 py-10 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={LoginLogo} alt="Purseau Logo" className="h-12" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Verify your {contactMethod === "email" ? "email" : "phone"}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-8">
          We’ve sent a verification code to <span className="font-medium text-gray-900 dark:text-white">{emailOrPhone}</span>.
          <br /> Please input the code below.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-4 mb-8">
          {otp.map((digit, index) => (
            <Input
              key={index}
              // variant="unstyled"
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              className=" w-14 h-14 rounded-md
              bg-gray-100 dark:bg-white/10
              text-center text-xl font-semibold
              border-1 border-gray-300 dark:border-gray-600
              focus:!border-[#E94E30]
              focus:!ring-2 focus:!ring-[#E94E30]
              focus:!outline-none
              !outline-none !ring-0
              transition-all duration-200"
            />
          ))}
        </div>

        <Button
          onClick={verifyOtp}
          className="w-full py-6 text-lg font-semibold bg-[#E94E30] hover:bg-[#d84327] text-white rounded-lg"
        >
          {isPending || accountPending ? "Please wait..." : "Submit"}
        </Button>

        {/* Message */}
        {message && (
          <p className="mt-4 text-sm text-green-600 dark:text-green-400">
            {message}
          </p>
        )}

        <p className="text-gray-600 dark:text-gray-400 text-sm mt-6">
          Didn’t get a code? Request a new one in{" "}
          <span className="text-[#d84327] font-semibold">{timer}</span>s
        </p>

        {/* Resend */}
        <button
          onClick={handleResendOtp}
          className="mt-2 text-[#E94E30] hover:underline flex mx-auto items-center justify-center gap-2 text-sm"
        >
          <GrRefresh />
          {ResendPending ? "Resending..." : `Resend ${contactMethod === "email" ? "OTP" : "SMS"}`}
        </button>

      </div>
    </div>
  );
}
