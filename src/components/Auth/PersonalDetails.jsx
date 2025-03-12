import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginLogo from "../../assets/images/login-logo.png";
import CountrySelector from "./CountrySelector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";

export default function PersonalDetails() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("US"); 
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState("");

  const navigate = useNavigate(); 

  const handleSubmit = () => {
    if (!firstName || !lastName || !phoneNumber || !gender || !dob) {
      alert("Please fill out all fields.");
      return;
    }

    console.log("Personal details submitted:", {
      firstName,
      lastName,
      phoneNumber,
      country,
      gender,
      dob,
    });

    navigate("/VerifyPhoneNumber", { state: { phoneNumber, dob } });
  };

  const CustomDateInput = ({ value, onClick }) => (
    <div className="relative w-full">
      <Input
        type="text"
        value={value}
        onClick={onClick}
        placeholder="dd/mm/yy"
        readOnly
        className="w-full mt-1 focus:ring mb-4 bg-gray-200 p-2 border border-gray-300 rounded-lg pl-3 pr-10"
      />
      <FiCalendar className="absolute right-3 top-3 text-gray-500 cursor-pointer" onClick={onClick} />
    </div>
  );

  return (
    <div className="personal-details-wrapper pt-2 pb-8">
      <div className="personal-details-container flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="signup-logo mb-6">
          <img src={LoginLogo} alt="Purseau Logo" className="h-16 w-16" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Personal Details</h1>

        <p className="text-gray-600 text-center mb-6 px-2 sm:px-0 pb-[30px] pt-[16px]">
          Kindly fill the form below with your correct details
        </p>

        <div className="w-full max-w-md space-y-5 rounded-lg p-6 sm:p-8">
          <div>
            <label htmlFor="firstName" className="text-gray-900 font-medium">
              First Name *
            </label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full mt-1 focus:ring mb-4 bg-gray-200"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="text-gray-900 font-medium">
              Last Name *
            </label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full mt-1 focus:ring mb-4 bg-gray-200"
              required
            />
          </div>

          <div>
            <label className="text-gray-900 font-medium">Phone Number *</label>
            <CountrySelector
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              country={country}
              setCountry={setCountry}
            />
          </div>

          <div>
            <label htmlFor="gender" className="text-gray-700 font-medium">
              Gender *
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full mt-1 focus:ring mb-4 bg-gray-200 p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="dob" className="text-gray-700 font-medium">
              Date of Birth *
            </label>
            <div className="relative">
              <DatePicker
                selected={dob}
                onChange={(date) => setDob(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yy"
                customInput={<CustomDateInput />}
                required
              />
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full transition-all duration-200">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}