import React from "react";
import { FaCheckCircle, FaBoxOpen, FaTruck, FaClipboardList } from "react-icons/fa";

const ProgressTracker = ({ currentStatus, timeline = [] }) => {
    const statusNormalized = currentStatus?.toLowerCase() || "";

    // 1. Define all possible steps (fixed, in order)
    const stepDefinitions = [
        { key: "initiated", label: "Initiated", icon: <FaClipboardList /> },
        { key: "placed", label: "Order Placed", icon: <FaClipboardList /> },
        { key: "in package", label: "In Package", icon: <FaBoxOpen /> },
        { key: "shipped", label: "On the Way", icon: <FaTruck /> },
        { key: "delivered", label: "Delivered", icon: <FaCheckCircle /> },
    ];

    // 2. Normalize backend timeline into dictionary {status -> update}
    const timelineMap = {};
    timeline.forEach(update => {
        if (!update?.status) return;
        timelineMap[update.status.toLowerCase()] = update;
    });

    // 3. Build the steps with either real data or placeholder
    const steps = stepDefinitions.map(step => {
        const match = timelineMap[step.key];
        if (match) {
            const dateObj = new Date(match.timestamp || match.date);
            return {
                ...step,
                date: dateObj.toLocaleDateString(),
                time: dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
        }
        return {
            ...step,
            date: "—",
            time: "—",
        };
    });

    // 4. Find current index
    const currentIndex = steps.findIndex(s => s.key === statusNormalized);

    // 5. Get status styling (completed / current / upcoming)
    const getStatus = (index) => {
        if (index < currentIndex) return "completed";
        if (index === currentIndex) return "current";
        return "upcoming";
    };

    const progressPercentage =
        (currentIndex / (steps.length - 1)) * 100;

    return (
        <div className="relative w-full px-4 mt-10 mb-8">
            {/* Progress Bar */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 -z-10 transform -translate-y-1/2">
                <div
                    className="h-full bg-[#E94E30] transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>

            {/* Steps */}
            <div className="relative z-10 flex justify-between items-center">
                {steps.map((step, idx) => {
                    const status = getStatus(idx);
                    return (
                        <div
                            key={idx}
                            className="relative flex flex-col items-center text-center flex-[1_1_0%]"
                        >
                            {/* Icon + Label */}
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

                            {/* Indicator Square */}
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

                            {/* Date + Time */}
                            <div
                                className={`text-xs ${
                                    status === "completed" || status === "current"
                                        ? "text-gray-700"
                                        : "text-gray-400"
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
