import React from "react";
import {
  FaCheckCircle,
  FaBoxOpen,
  FaTruck,
  FaClipboardList
} from "react-icons/fa";

const ProgressTracker = ({ currentStatus }) => {
  const statusNormalized = currentStatus?.toLowerCase() || "";

  // Map possible status to step label
  const statusMapping = {
    "placed": "Order Placed",
    "confirmed": "Confirmed",
    "in package": "In Package",
    "on the way": "On the Way",
    "delivered": "Delivered",
    "canceled": "Canceled",
    "ongoing": "In Package", // treating ongoing as middle state
  };

  const mappedStatus = statusMapping[statusNormalized] || "Order Placed";
  const isCanceled = mappedStatus === "Canceled";
//   const isReturned = mappedStatus === "Order Returned";
  const isReturned = statusNormalized === "returned";

  const timeline = [
     {
    label: isReturned ? "Order Returned" : "Order Placed",
    date: "07 Feb 2025",
    time: "04:27 pm",
    icon: <FaClipboardList />
  },
    {
      label: isCanceled ? "Canceled" : "Confirmed",
      date: "07 Feb 2025",
      time: "04:27 pm",
      icon: <FaCheckCircle />
    },
    {
      label: "In Package",
      date: "07 Feb 2025",
      time: "Expected",
      icon: <FaBoxOpen />
    },
    {
      label: "On the Way",
      date: "10,13 Feb 2025",
      time: "Expected",
      icon: <FaTruck />
    },
    {
      label: "Delivered",
      date: "14 Feb 2025",
      time: "Expected",
      icon: <FaCheckCircle />
    }
  ];

  const currentIndex = timeline.findIndex(step => step.label === mappedStatus);

  const getStatus = (stepLabel, index) => {
    if (isCanceled) {
      const canceledIdx = timeline.findIndex(step => step.label === "Canceled");
      if (index < canceledIdx) return "completed";
      if (index === canceledIdx) return "current";
      return "upcoming";
    }

    if (index < currentIndex) return "completed";
    if (index === currentIndex) return "current";
    return "upcoming";
  };

  const progressPercentage = isCanceled
    ? ((timeline.findIndex(step => step.label === "Canceled")) / (timeline.length - 1)) * 100
    : (currentIndex / (timeline.length - 1)) * 100;

  return (
    <div className="relative w-full px-4 mt-10 mb-8">
      {/* Progress Bar */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 -z-10 transform -translate-y-1/2">
        <div
          className="h-full bg-[#E94E30] transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Progress Steps */}
      <div className="relative z-10 flex justify-between items-center">
        {timeline.map((step, idx) => {
          const status = getStatus(step.label, idx);

          return (
            <div
              key={idx}
              className="relative flex flex-col items-center text-center flex-[1_1_0%]"
            >
              {/* Top: Icon and Label */}
              <div className="mb-4 flex flex-col items-center">
                <div
                  className={`text-base mb-1 ${
                    status === "completed" || status === "current"
                      ? "text-[#E94E30]"
                      : "text-gray-400"
                  }`}
                >
                  {step.icon}
                </div>
                <p
                  className={`text-xs font-medium ${
                    status === "completed" || status === "current"
                      ? "text-gray-900"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
              </div>

              {/* Middle: Square Indicator */}
              <div
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mb-2 ${
                  status === "completed"
                    ? "bg-[#E94E30] border-[#E94E30] text-white"
                    : status === "current"
                    ? "bg-white border-[#E94E30] text-[#E94E30]"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {status === "completed" ? (
                  <FaCheckCircle className="text-xs" />
                ) : status === "current" ? (
                  <div className="w-2 h-2 bg-[#E94E30] rounded-sm" />
                ) : (
                  <span className="text-xs font-bold">{idx + 1}</span>
                )}
              </div>

              {/* Bottom: Date & Time */}
              <div
                className={`text-xs ${
                  status === "completed" || status === "current"
                    ? "text-gray-700"
                    : "text-gray-500"
                }`}
              >
                <p>{step.date}</p>
                <p>{step.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
