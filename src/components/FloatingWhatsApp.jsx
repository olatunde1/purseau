import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Optional: Hide/Show on scroll if requested "shows as u scroll both up and down",
  // usually means "always visible while scrolling".
  // Fixed position handles "shows as u scroll".
  // If user meant "show only when scrolling", that's different, but "shows as u scroll" usually implies it's sticky/fixed.
  // The user said "shows as u scroll both up and down that page", which strongly implies a fixed position element.

  return (
    <a
      href="https://wa.me/2348105462886?text=Hello%20there"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: "#f2542d", // Brand color
        color: "white",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        transition: "transform 0.3s ease",
      }}
      className="floating-whatsapp"
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
    >
      <FaWhatsapp size={24} />
    </a>
  );
};

export default FloatingWhatsApp;
