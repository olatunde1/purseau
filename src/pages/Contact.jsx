import React, { useState } from "react";
import { StayLoop } from "@/components/StayLoop";
import Map from "../assets/images/map.png";
import { SlSocialInstagram } from "react-icons/sl";
import { FaSquareTwitter, FaFacebook } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import useContactUs from "@/hooks/api/mutation/contact/useContactUs";
import { toast } from "sonner";
import { Footer } from "@/components/Footer";

const Contact = () => {
  const { mutate, isPending } = useContactUs();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: (response) => {
        console.log(response, "response");
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Error applying");
      },
    });
  };

  return (
    <>
      <div className="contact-us">
        <h1>Contact Us</h1>
        <p>Everything you need to know about us</p>
      </div>
      <div className="container-contact-us">
        {/* Left Div - Form */}
        <div className="leftDiv">
          <h2>Get in Touch</h2>
          <p>
            Your email address will not be published. Required fields are
            marked*
          </p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="name" className="label your-name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input"
                required
                placeholder="Input your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email" className="label">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="subject" className="label">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="input"
                required
                placeholder="Enter subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="message" className="label">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="textarea"
                required
                placeholder="Enter your message here..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <Button className="submitButton" disabled={isPending}>
              {isPending ? "submitting" : "Submit"}
            </Button>
          </form>
        </div>

        {/* Right Div - Contact Info */}
        <div className="rightDiv">
          <div className="contactInfo">
            <h3>Address</h3>
            <p>
              27/29 Martin Street, shop FF04, last floor, Fulham plaza, <br />
              Lagos Island, Lagos, Nigeria
            </p>

            <h3>Contact</h3>
            <p>
              Phone: +234 (081) 897-2345
              <br />
              Email: purseau@example.com
            </p>

            <h3>Open Time</h3>
            <p>Monday - Saturday: 10 AM - 10 PM</p>

            <h3>Stay Connected</h3>
            <div className="socials">
              <SlSocialInstagram className="social-icon-contact" />
              <FaSquareTwitter className="social-icon-contact" />
              <FaFacebook className="social-icon-contact" />
            </div>
          </div>
        </div>
      </div>

      <div className="map mb-[80px] mt-[80px]">
        <div className="container">
          <img src={Map} alt="" />
        </div>
      </div>

      <StayLoop />
      <Footer/>
    </>
  );
};

export default Contact;
