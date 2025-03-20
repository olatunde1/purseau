import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import { BsHeart } from 'react-icons/bs';
import { TiUserOutline } from 'react-icons/ti';
import { IoIosArrowDown } from "react-icons/io";
import { TbBorderAll, TbSettings2 } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import Tracker from '../../assets/images/order-tracking.png';
import CountrySelector from "./CountrySelector";
import { IoChevronBackSharp } from "react-icons/io5";
import { StayLoop } from '@/components/StayLoop';
import { Footer } from '@/components/Footer';

// Updated data for regions and cities in Nigeria, Ghana, and 5 neighboring countries
const africaRegions = {
  Nigeria: [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", 
    "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", 
    "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", 
    "Sokoto", "Taraba", "Yobe", "Zamfara"
  ],
  Ghana: ["Accra", "Kumasi", "Tamale", "Sekondi-Takoradi", "Cape Coast"],
  Benin: ["Cotonou", "Porto-Novo", "Parakou", "Djougou", "Abomey"],
  Togo: ["Lomé", "Sokodé", "Kara", "Atakpamé", "Palimé"],
  Cameroon: ["Douala", "Yaoundé", "Bamenda", "Bafoussam", "Garoua"],
  Niger: ["Niamey", "Zinder", "Maradi", "Agadez", "Tahoua"],
  Chad: ["N'Djamena", "Moundou", "Sarh", "Abéché", "Kélo"],
};

const EditUserAddress = () => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("US");
  const [activeSection, setActiveSection] = useState("editAddress");
  const [formData, setFormData] = useState({
    firstName: "Seun",
    lastName: "Fashola",
    email: "pursue@example.com",
    phoneNumber: "+234803567890",
    additionalPhoneNumber: "",
    deliveryAddress: "123 Main St, New York",
    region: "",
    city: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setFormData({ ...formData, region, city: "" }); // Reset city when region changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Address:", formData);
    alert("Address updated successfully!");
  };

  return <>
     <div className="container-sidebar flex justify-center">
      {/* Sidebar */}
      <aside className="w-[382px] h-[648px] p-2 border-r personal-information-sidebar">
        <nav className="space-y-3">
           <Link to="/user-account">
              <button onClick={() => setActiveSection("accountOverview")} className="block flex sidebar-link-first items-center w-full">
              <TiUserOutline className="mr-4 w-[20px] h-[20px]" /> My Personal Information
              </button>
            </Link>
          <Link to="/my-order" className="block sidebar-link flex text-base items-center"><TbBorderAll className="mr-4 w-[20px] h-[20px]" /> My Orders</Link>
          <Link to="#" className="block sidebar-link flex text-base items-center"><BsHeart className="mr-4 w-[20px] h-[20px]" /> Wishlist</Link>

          {/* Account Management with Submenu */}
          <div>
            <button
              className="flex items-center w-full text-left sidebar-link"
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            >
              <TbSettings2 className="mr-4 w-[20px] h-[20px]" /> Account Management <span className="ml-auto"><IoIosArrowDown className={isAccountMenuOpen ? "rotate-180" : ""} /></span>
            </button>
            {isAccountMenuOpen && (
              <div className="ml-4 space-y-2">
                <Link to="#" className="block text-sm flex sidebar-link items-center"><TiUserOutline className="mr-4 w-[20px] h-[20px]" />Profile</Link>
                <Link to="#" className="block text-sm flex sidebar-link items-center"><IoSettingsOutline className="mr-4 w-[20px] h-[20px]" /> Security Settings</Link>
              </div>
            )}
          </div>

          <Link to="#" className="block sidebar-link flex items-center"><GoHome className="mr-4 w-[20px] h-[20px]" /> Address Management</Link>
          <Link to="#" className="block sidebar-link flex items-center"><img src={Tracker} alt="" height={16} width={16} className="mr-4" />Track Order</Link>
          <Button className="w-full bg-[#FFF4F0] text-[#E94E30] hover:bg-[#E94E30] hover:text-white py-8 track-order">Logout</Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-8 w-[878px]">
        {activeSection === "editAddress" && (
          <div className="grid grid-cols-1 gap-6">
            {/* Breadcrumb with Back Arrow */}
            <div className="flex items-center space-x-2">
              <Link to="/user-account">
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent"
                  onClick={() => setActiveSection("accountOverview")}
                >
                  <IoChevronBackSharp className="w-5 h-5 text-gray-700" />
                </Button>
              </Link>
              
              <span className="text-gray-700">Edit Address</span>
            </div>

            {/* Edit Address Form */}
            <Card className="border rounded-lg shadow-lg bg-white p-10 ">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold mb-6">Edit Address</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name and Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>

                  {/* Phone Number and Additional Phone Number */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <CountrySelector
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        country={country}
                        setCountry={setCountry}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Phone Number</label>
                      <input
                        type="tel"
                        name="additionalPhoneNumber"
                        value={formData.additionalPhoneNumber}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                    <input
                      type="text"
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>

                  {/* Region and City */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                      <select
                        name="region"
                        value={formData.region}
                        onChange={handleRegionChange}
                        className="w-full p-2 border rounded-lg"
                        required
                      >
                        <option value="">Select a region</option>
                        {Object.keys(africaRegions).map((region) => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                        required
                        disabled={!formData.region}
                      >
                        <option value="">Select a city</option>
                        {formData.region && africaRegions[formData.region].map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-[300px] bg-[#E94E30] text-white hover:bg-[#D94326] py-6 save-edit-address ">
                    Save
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
    <StayLoop />
    <Footer />
  </>
   
  
};

export default EditUserAddress;