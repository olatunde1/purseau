export const calculateReviewStats = (reviews) => {
  const totalReviews = reviews.length;
  const totalRating = reviews.reduce(
    (sum, review) => sum + review.reviewRating,
    0
  );
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter(
      (review) => review.reviewRating === rating
    ).length;
    return {
      label: rating.toString(),
      percent: totalReviews > 0 ? (count / totalReviews) * 100 : 0,
      numberOf: count,
    };
  });

  return { averageRating, totalReviews, ratingCounts };
};



// utils/inputValidation.js

/**
 * Validates and formats email or phone number inputs
 * @param {string} input - Email or phone number to validate
 * @returns {Object} Result object with validation and formatting information
 */
export const validateAndFormatInput = (input) => {
  const result = {
    isValid: false,
    type: null,
    formatted: null,
    original: input,
    error: null
  };

  if (!input) {
    result.error = "Input is required";
    return result;
  }

  // Trim input
  const trimmedInput = input.trim();
  
  // Email regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Phone number regex pattern
  const phonePattern = /^(\+\d{1,3}[-\s]?)?\d{10,14}$/;

  if (emailPattern.test(trimmedInput)) {
    result.isValid = true;
    result.type = "email";
    result.formatted = trimmedInput.toLowerCase();
  } else if (phonePattern.test(trimmedInput)) {
    result.isValid = true;
    result.type = "phone";
    
    // Format phone number to international format
    let formattedPhone = trimmedInput;
    
    if (formattedPhone.startsWith("+234")) {
      formattedPhone = formattedPhone.slice(1); // Remove the + from +234
    } else if (formattedPhone.startsWith("0")) {
      formattedPhone = "234" + formattedPhone.slice(1); // Convert 0... to 234...
    } else if (!formattedPhone.startsWith("234")) {
      // If it's already a valid number without 234 prefix, add it
      // This is assuming Nigerian numbers as the standard
      if (/^\d{10}$/.test(formattedPhone)) {
        formattedPhone = "234" + formattedPhone;
      }
    }
    
    // Remove any non-digit characters
    formattedPhone = formattedPhone.replace(/\D/g, "");
    
    result.formatted = formattedPhone;
  } else {
    result.error = "Please enter a valid email address or phone number";
  }

  return result;
};


// usage belwo fo rvalidation

// import { validateAndFormatInput } from "../utils/inputValidation";

// // In your component or function
// const handleSubmit = () => {
//   const result = validateAndFormatInput(emailOrPhone);

//   if (!result.isValid) {
//     setError(result.error);
//     return;
//   }

//   // Use the formatted input for API calls
//   const formattedInput = result.formatted;

//   // You can also use the type to customize your API calls
//   if (result.type === "email") {
//     // Email-specific logic
//   } else if (result.type === "phone") {
//     // Phone-specific logic
//   }

//   // Continue with your form submission...
// };