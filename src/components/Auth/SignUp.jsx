import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import LoginLogo from "../../assets/images/login-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "@/hooks/api/mutation/auth/useSignUp";
import { toast } from "sonner";
import { validateAndFormatInput } from "@/utils";

export default function SignUp() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const { mutate, isPending } = useSignUp();

  // 🌙 Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") === "dark";
    setDarkMode(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme);
  }, []);

  // 🌙 Toggle theme
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleInputChange = (e) => {
    setEmailOrPhone(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = validateAndFormatInput(emailOrPhone);
    if (!result.isValid) {
      setError("Please enter a valid email address or phone number");
      return;
    }

    const formattedInput = result.formatted;
    mutate(
      { emailOrPhone: formattedInput },
      {
        onSuccess: (response) => {
          toast.success(
            response?.data?.message || "Verification code sent successfully!"
          );

          if (response?.data?.data?.firstTimeUser) {
            navigate("/VerifyEmail", { state: { emailOrPhone: formattedInput } });
          }
          if (response?.data?.data?.firstTimeUserVerificationPassed) {
            navigate("/CreatePassword", {
              state: { emailOrPhone: formattedInput },
            });
          }

          const { stepTwoCompleted, isVerified, completedPersonalDetails } =
            response?.data?.data || {};
          if (stepTwoCompleted && isVerified && completedPersonalDetails) {
            navigate("/Login", { state: { emailOrPhone: formattedInput } });
          }
        },

        onError: (error) => {
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
    <div className="sign-up-wrapper min-h-screen flex justify-center items-center py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 text-sm px-3 py-1 rounded-full border dark:border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      <div className="signup-container w-full max-w-[550px] bg-white dark:bg-gray-800 shadow-lg rounded-xl px-6 py-10 lg:py-14 transition-colors">
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-10">
          <img
            src={LoginLogo}
            alt="Purseau Logo"
            className="h-16 w-auto dark:opacity-90"
          />
        </Link>

        {/* Welcome message */}
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-3">
          Welcome to Purseau
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
          Please enter your email or phone number to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-gray-700 dark:text-gray-200 font-medium">
              Email or Phone *
            </Label>
            <Input
              type="text"
              value={emailOrPhone}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className={`w-full mt-1 h-14 text-base bg-gray-100 dark:bg-gray-700 border ${
                error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } focus:border-[#d84327] focus:ring-2 focus:ring-[#d84327]/30 rounded-lg transition-all`}
              required
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-14 text-base font-semibold rounded-lg hover:opacity-90 transition-all bg-[#d84327] text-white"
          >
            {isPending ? "Please wait..." : "Continue"}
          </Button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400 leading-relaxed">
            By clicking continue, you agree to the{" "}
            <span className="text-[#d84327] cursor-pointer">Terms & Conditions</span>{" "}
            of Purseau.
          </p>
        </form>
      </div>
    </div>
  );
}
