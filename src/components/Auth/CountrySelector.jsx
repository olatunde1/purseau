import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const africanCountries = [
  "ng", "gh", "ke", "za", "dz", "et", "ma", "tn", "ug", "cm",
];

const PhoneNumberInput = ({ phoneNumber, setPhoneNumber }) => {
  const [country, setCountry] = useState("ng"); // Default: Nigeria
  const [dialCode, setDialCode] = useState("234"); // Default dial code

  return (
    <div className="flex gap-3 w-full flex-wrap md:flex-nowrap">
      {/* Country Selector (Flag with Search) on the Left */}
      <div className="w-1/3 md:w-1/4">
        <PhoneInput
          country={country}
          value={phoneNumber}
          onChange={(value, countryData) => {
            setPhoneNumber(value);
            setCountry(countryData.countryCode);
            setDialCode(countryData.dialCode);
          }}
          onlyCountries={africanCountries}
          enableSearch={true} // Enable search functionality
          disableDropdown={false}
          inputStyle={{
            display: "none", // Hide input field inside flag selector
          }}
          buttonStyle={{
            width: "100%",
            paddingLeft:"38px",
            height: "44px",
            borderRadius: "8px",
            backgroundColor: "none",
            border: "1px solid #D1D5DB",
            
          }}
          containerStyle={{
            width: "100%",
          }}
        />
      </div>

      {/* Phone Input with Country Code & Number on the Right */}
      <div className="flex-1 flex items-center border border-gray-300 rounded-lg bg-gray-200 px-3 py-2">
        {/* Display Country Code Instead of Flag */}
        <span className="text-gray-700 font-semibold mr-2">+{dialCode}</span>

        {/* Phone Number Input */}
        <input
          type="tel"
        //   value={phoneNumber.replace(`+${dialCode}`, "").trim()} // Remove dial code from display
          onChange={(e) => setPhoneNumber(`+${dialCode} ${e.target.value}`)}
          placeholder="Enter phone number"
          className="w-full bg-transparent focus:outline-none text-gray-900"
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput;
