import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Logo from '../assets/images/logo.png';
import { SlSocialInstagram } from "react-icons/sl";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";

// List of countries with currency symbols and flag images from FlagCDN
const countries = [
  { name: "Nigeria", currency: "₦", code: "ng" },
  { name: "South Africa", currency: "R", code: "za" },
  { name: "Ivory Coast", currency: "CFA", code: "ci" },
  { name: "Cameroon", currency: "CFA", code: "cm" },
  { name: "Democratic Republic of the Congo", currency: "CDF", code: "cd" },
  { name: "Kenya", currency: "KSh", code: "ke" },
  { name: "Ghana", currency: "₵", code: "gh" },
];


export function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 footer">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1 - Address */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={Logo} alt="Logo" className="footer-logo mb-6 w-32" />
            <p className="text-gray-400 mb-4">
              111 Obafemi Awolowo Way, Ikeja, Lagos, 100282
            </p>
            <a href="tel:+2341234567890" className="text-gray-400 hover:underline block mb-4">
              +234 814 897 2345
            </a>
            <a href="mailto:support@example.com" className="text-blue-400 hover:underline">
              support@example.com
            </a>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="footer-links-details">
            <h3 className="text-lg font-semibold mb-4 ">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">New Arrivals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Trending Now</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Best Sellers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Image Search</a></li>
            </ul>
          </div>

          {/* Column 3 - Shop */}
          <div className="footer-links-details">
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="/shop?category=cloth" className="text-gray-400 hover:text-white">Clothes</a></li>
              <li><a href="/shop?category=bags" className="text-gray-400 hover:text-white">Bags</a></li>
              <li><a href="/shop?category=shoes" className="text-gray-400 hover:text-white">Shoes</a></li>
              <li><a href="/shop?category=jewelry" className="text-gray-400 hover:text-white">Jewelry</a></li>
              <li><a href="/shop?category=accessories" className="text-gray-400 hover:text-white">Accessories</a></li>
              <li><a href="/shop?category=beauty" className="text-gray-400 hover:text-white">Beauty</a></li>
            </ul>
          </div>

          {/* Column 4 - Help */}
          <div className="footer-links-details">
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="/Contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ’s</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Order Tracking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Return Policy</a></li>
            </ul>
          </div>

          {/* Column 5 - Country Selector */}
         {/* Column 5 - Country Selector */}
<div className="footer-links-details">
  <Select defaultValue="nigeria">
    <SelectTrigger className="select-item border-gray-700 text-white">
      <SelectValue placeholder="Select a country" />
    </SelectTrigger>
    <SelectContent className="bg-gray-800 border-gray-700 text-white">
      {countries.map((country) => (
        <SelectItem
          key={country.name}
          value={country.name.toLowerCase()}
          className="flex items-center space-x-2"
        >
          <div className="flex items-center">
            <img
              src={`https://flagcdn.com/w40/${country.code}.png`}
              alt={`${country.name} flag`}
              className="w-5 h-5 mr-2 rounded-sm"
            />
            <span>{country.name} ({country.currency})</span>
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
        </div>
      </div>
      <div className="copyright">
        <div className="copyright-text">
            <p>© 2025 Copyright, Inc. All rights reserve</p>
           
              <div className="flex terms-condition gap-8">
              <Link to="/terms"> <p >Terms and Conditions</p></Link> 
              <Link to="/policy"> <p>Privacy Policy</p> </Link> 
              
              </div>
            
           
        </div>
        <div className="socials">
        <SlSocialInstagram className="social-icon" />
        <FaSquareTwitter className="social-icon" />
        <FaFacebook className="social-icon" />
        </div>
      </div>
    </footer>
  );
};