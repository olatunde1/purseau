import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import LoginLogo from "../../assets/images/login-logo.png";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff, FiEdit } from "react-icons/fi";


export default function Login() {
  const [email, setEmail] = useState("user@example.com"); // Registered email
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailEdit = () => setIsEditing(true);
  const handleEmailSave = () => setIsEditing(false);

  return (
    <div className="login-wrapper pt-2 pb-8 flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="login-container flex flex-col items-center bg-white shadow-md p-6 rounded-lg">
        {/* Logo */}
        <div className="login-logo mb-6">
          <img src={LoginLogo} alt="Purseau Logo" className="h-16 w-16" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-6">
         Login back into your Purseau account.
        </p>

        {/* Email Input with Edit Option */}
        <div className="w-full mb-4">
          <div className="flex items-center gap-2">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 focus:ring bg-gray-200"
              disabled={!isEditing}
            />
            {isEditing ? (
              <Button
                onClick={handleEmailSave}
                className="bg-[#d84327] text-white px-4 py-2 rounded-lg"
              >
                Save
              </Button>
            ) : (
              <div
                className="flex items-center gap-1 text-[#d84327] cursor-pointer"
                onClick={handleEmailEdit}
              >
                <FiEdit className="text-lg" />
                <span className="text-sm">Edit</span>
              </div>
            )}
          </div>
        </div>

        {/* Password Input */}
        <div className="w-full mb-4">
          <Label htmlFor="password" className="text-gray-700 font-medium">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 focus:ring bg-gray-200"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <Button className="w-full bg-[#d84327] text-white py-2 rounded-lg">
          Login
        </Button>

        {/* Forgot Password */}
        <p className="text-sm text-gray-500 text-center pt-4">
          <a href="#" className="text-[#d84327] hover:underline">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
}
