import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useNavigate
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginLogo from "../../assets/images/login-logo.png";
import { FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi"; // Icons
import { useResetPassword } from "@/hooks/api/mutation/auth/useLogin";
import { toast } from "sonner";
import PasswordResetSuccessful from "./PasswordResetSuccessful";

export default function CreateNewPassword() {
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  // const [email,] = useState(
  //   localStorage.getItem("verifiedEmail") || "purseau@gmail.com"
  // ); // Retrieve email
  // const [, setIsEmailEditable] = useState(false); // Toggle email input editability
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility

  const { state } = useLocation();

  const enteredOtp = state?.enteredOtp ?? "";
  const emailOrPhone = state?.emailOrPhone ?? "";

  // Password validation rules
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  const { mutate: resetPassword, isPending } = useResetPassword();

  // Handle form submission
  const handleSubmit = () => {
    if (!hasMinLength || !hasUpperCase || !hasNumber) {
      setError("Password must meet all the requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    const dataBody = {
      email: emailOrPhone,
      plainOtp: enteredOtp,
      newPassword: confirmPassword,
    };

    resetPassword(dataBody, {
      onSuccess: (response) => {
        toast.success(response?.data?.message || "new password created");
        setSuccess(true);
        // navigate("/Login", { state: { emailOrPhone } });
        setError("");
      },
      onError: (error) => {
        console.error("Error:", error);
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      },
    });

    // navigate("/PasswordResetSuccessful");
  };

  // Handle email edit
  // const handleEmailEdit = () => {
  //   setIsEmailEditable(true); // Enable email input editing
  // };

  // Handle email save
  // const handleEmailSave = () => {
    // setIsEmailEditable(false); 
    // localStorage.setItem("verifiedEmail", email); 
  // };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      {success ? (
        <PasswordResetSuccessful emailOrPhone={emailOrPhone} />
      ) : (
        <div className="create-password-wrapper pt-2 pb-8">
          <div className="create-password-container flex flex-col items-center justify-center bg-gray-50 px-4">
            {/* Logo */}
            <div className="signup-logo mb-6">
              <img src={LoginLogo} alt="Purseau Logo" className="h-16 w-16" />
            </div>

            {/* Title */}
            <h1 className="create-password-title text-2xl font-bold text-gray-900 mb-2 text-center">
              Create new password
            </h1>

            {/* Subtitle */}
            <p className="signup-subtitle  text-center mb-6 px-2 sm:px-0 pb-[30px] pt-[16px]">
              Create your new password to keep your account safe.
            </p>

            {/* Form Container */}
            <div className="create-password-form w-full max-w-md space-y-5 rounded-lg p-6 sm:p-8">
              {/* Create Password Input */}
              <div className="password-input-group">
                <label htmlFor="password" className="text-gray-700 font-medium">
                  Create New Password *
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"} // Toggle password visibility
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="password-input w-full mt-1 focus:ring mb-4 bg-gray-200"
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-gray-500" /> // Eye-off icon when password is visible
                    ) : (
                      <FiEye className="text-gray-500" /> // Eye icon when password is hidden
                    )}
                  </div>
                </div>
                {/* Password Validation Rules */}
                <div className="password-validation-rules flex flex-row gap-4 text-xs text-gray-500 mt-2">
                  <div className="flex items-center gap-1">
                    <FiCheckCircle
                      className={`text-sm ${
                        hasMinLength ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                    <span>Atleast 8 characters</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiCheckCircle
                      className={`text-sm ${
                        hasUpperCase ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                    <span>Atleast one uppercase</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiCheckCircle
                      className={`text-sm ${
                        hasNumber ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                    <span>Atleast one number</span>
                  </div>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="confirm-password-input-group">
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-700 font-medium"
                >
                  Confirm New Password *
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="confirm-password-input w-full mt-1 focus:ring mb-4 bg-gray-200"
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="text-gray-500" /> // Eye-off icon when password is visible
                    ) : (
                      <FiEye className="text-gray-500" /> // Eye icon when password is hidden
                    )}
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <p className="error-message text-center text-sm text-red-600 mb-4">
                  {error}
                </p>
              )}

              {/* Continue Button */}
              <Button
                onClick={handleSubmit}
                className="create-password-button w-full transition-all duration-200 py-6"
                disabled={
                  !hasMinLength ||
                  !hasUpperCase ||
                  !hasNumber ||
                  password !== confirmPassword
                }
              >
                {isPending ? "Please wait..." : "Continue"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
