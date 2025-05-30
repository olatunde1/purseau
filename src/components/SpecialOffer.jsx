import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { SlArrowRight } from "react-icons/sl";
import specialPicture from '../assets/images/special-offer-img.png';

export default function SpecialOffer() {
  // Retrieve target time from localStorage or set it to 24 hours from now
  const storedTime = localStorage.getItem("targetTime");
  const initialTargetTime = storedTime ? parseInt(storedTime, 10) : new Date().getTime() + 24 * 60 * 60 * 1000;
  
  const [targetTime, setTargetTime] = useState(initialTargetTime);
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Function to calculate remaining time
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        return {
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
      } else {
        return { hours: 0, minutes: 0, seconds: 0 }; // Countdown ended
      }
    };

    // Update countdown every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // If the timer reaches 0, reset it for another 24 hours
      if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        const newTargetTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem("targetTime", newTargetTime);
        setTargetTime(newTargetTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <div className="special-offer-page">
      <div className="special-offer-count-timer">
        <h2 className="text-3xl font-bold mb-2">Special Offer</h2>
        <p className="text-lg mb-6">Save up to 50% off our super <br /> sale</p>

        <div className="flex gap-4">
          {["Hours", "Minutes", "Seconds"].map((label, index) => {
            const value = [timeLeft.hours, timeLeft.minutes, timeLeft.seconds][index];
            return (
              <Button key={label} variant="outline" className="w-20 h-20 flex flex-col items-center justify-center timer">
                <span className="text-2xl font-bold">{String(value).padStart(2, "0")}</span>
                <span className="text-sm">{label}</span>
              </Button>
            );
          })}
        </div>
        <Button className="get-offer">Get Offer <SlArrowRight /></Button>
      </div>
      <img src={specialPicture} alt="special offer" className="specialPicture" />
    </div>
  );
}
