import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginLogo from '../../assets/images/login-logo.png';
import { FiEdit, FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi"; // Icons

export default function CreatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("verifiedEmail") || "purseau@gmail.com"); // Retrieve email
  const [isEmailEditable, setIsEmailEditable] = useState(false); // Toggle email input editability
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility

  // Password validation rules
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);

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

    // If validation passes, clear errors and proceed
    setError("");
    console.log("Password created successfully for email:", email);
    // Add logic to create password (e.g., API call)
  };

  // Handle email edit
  const handleEmailEdit = () => {
    setIsEmailEditable(true); // Enable email input editing
  };

  // Handle email save
  const handleEmailSave = () => {
    setIsEmailEditable(false); // Disable email input editing
    localStorage.setItem("verifiedEmail", email); // Save the updated email
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="create-password-wrapper pt-2 pb-8">
      <div className="create-password-container flex flex-col items-center justify-center bg-gray-50 px-4">
        {/* Logo */}
        <div className="signup-logo mb-6">
          <img src={LoginLogo} alt="Purseau Logo" className="h-16 w-16" />
        </div>

        {/* Title */}
        <h1 className="create-password-title text-2xl font-bold text-gray-900 mb-2 text-center">
          Create your account
        </h1>

        {/* Subtitle */}
        <p className="signup-subtitle text-gray-600 text-center mb-6 px-2 sm:px-0 pb-[30px] pt-[16px]">
        Let’s get you started. To create your account, we need a strong <br /> password to keep your account safe.
        </p>

        {/* Editable Email Input */}
        <div className="email-input-group w-full max-w-md mb-6">
          <div className="flex items-center gap-2">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input w-full mt-1 focus:ring mb-4 bg-gray-200"
              disabled={!isEmailEditable} // Disable input unless editing
            />
            {isEmailEditable ? (
              <Button
                onClick={handleEmailSave}
                className="save-email-button bg-[#d84327] text-white px-4 py-2 rounded-lg"
              >
                Save
              </Button>
            ) : (
              <div
                className="edit-email-button flex items-center gap-1 text-[#d84327] cursor-pointer"
                onClick={handleEmailEdit}
              >
                <FiEdit className="text-lg" /> {/* Edit icon */}
                <span className="text-sm">Edit</span>
              </div>
            )}
          </div>
        </div>

        {/* Form Container */}
        <div className="create-password-form w-full max-w-md space-y-5 rounded-lg p-6 sm:p-8">
          {/* Create Password Input */}
          <div className="password-input-group">
            <label htmlFor="password" className="text-gray-700 font-medium">
              Create Password *
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                placeholder="Enter your password"
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
            <label htmlFor="confirmPassword" className="text-gray-700 font-medium">
              Confirm Password *
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                placeholder="Confirm your password"
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
            className="create-password-button w-full transition-all duration-200"
            disabled={!hasMinLength || !hasUpperCase || !hasNumber || password !== confirmPassword}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}