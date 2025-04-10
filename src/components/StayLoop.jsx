import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn/ui Button
import useSubscribe from "@/hooks/api/mutation/contact/useSubscribe";
import { toast } from "sonner";

export function StayLoop() {
  const { mutate, isPending } = useSubscribe();

  const [email, setEmail] = useState();

  const handleSubscribe = () => {
    mutate(
      { email },
      {
        onSuccess: (response) => {
          console.log(response, "response");
          toast.success(
            response?.data?.message || "Message sent successfully!"
          );
          setEmail("");
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Error applying");
        },
      }
    );
  };

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 stay-in-loop">
      <div className="max-w-6xl mx-auto">
        {/* Flex container for large screens */}
        <div className="lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Heading and Description */}
          <div className="lg:flex-1 mb-8 lg:mb-0">
            <h3 className=" font-bold text-gray-900 mb-4 stay-in-loop-text">
              Stay In The Loop!
            </h3>
            <p className="text-gray-600 text-lg stay-in-loop-text2">
              Be the first to know about our latest arrivals, exclusive deals,{" "}
              <br /> and fashion tips.
            </p>
          </div>

          {/* Subscription Form */}
          <div className="lg:flex-1">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Email Input */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address here"
                className="email-input sm:w-64 px-4 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Subscribe Button */}
              <Button
                onClick={handleSubscribe}
                className=" subscribe-button w-full sm:w-auto  text-white font-semibold py-6 px-6 rounded-lg"
              >
                {isPending ? "..." : "Subscribe"}
              </Button>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="mt-6 flex items-center j">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4  subscribe-checkbox"
              />
              <label
                htmlFor="terms"
                className="ml-2 text-sm text-gray-600 agreement-check"
              >
                I agree to Purseau’s privacy and policy. You can unsubscribe
                from newsletter anytime.
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
