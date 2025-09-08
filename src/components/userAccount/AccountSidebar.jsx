import { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TbBorderAll, TbSettings2 } from "react-icons/tb";
import { TiUserOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

import Tracker from "../../assets/images/order-tracking.png";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const AccountSidebar = ({ onLinkClick }) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully");
  };

  // ✅ helper: close sidebar THEN navigate
  const handleNavClick = (path) => {
    if (onLinkClick) onLinkClick(); 
    navigate(path);
  };

  return (
    <aside className="w-[382px] lg:w-[382px] shadow-lg bg-white p-4 border-r">
      <nav className="space-y-3">
        {/* Personal Info */}
        <button
          onClick={() => handleNavClick("/user-account")}
          className="flex sidebar-link-first items-center w-full text-left"
        >
          <TiUserOutline className="mr-4 w-[20px] h-[20px]" /> 
          My Personal Information
        </button>

        {/* Orders */}
        <button
          onClick={() => handleNavClick("/my-order")}
          className="sidebar-link flex text-base items-center w-full text-left"
        >
          <TbBorderAll className="mr-4 w-[20px] h-[20px]" /> My Orders
        </button>

        {/* Wishlist */}
        <button
          onClick={() => handleNavClick("/wishlist")}
          className="sidebar-link flex text-base items-center w-full text-left"
        >
          <BsHeart className="mr-4 w-[20px] h-[20px]" /> Wishlist
        </button>

        {/* Account Management with Submenu */}
        <div>
          <button
            className="flex items-center w-full text-left sidebar-link"
            onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
          >
            <TbSettings2 className="mr-4 w-[20px] h-[20px]" /> Account Management{" "}
            <span className="ml-auto">
              <IoIosArrowDown
                className={`transition-transform ${
                  isAccountMenuOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </button>
          {isAccountMenuOpen && (
            <div className="ml-4 space-y-2">
              <button
                onClick={() => handleNavClick("/profile-details")}
                className="text-sm flex sidebar-link items-center w-full text-left"
              >
                <TiUserOutline className="mr-4 w-[20px] h-[20px]" />
                Profile
              </button>
              <button
                onClick={() => handleNavClick("/password-settings")}
                className="text-sm flex sidebar-link items-center w-full text-left"
              >
                <IoSettingsOutline className="mr-4 w-[20px] h-[20px]" /> Security
                Settings
              </button>
            </div>
          )}
        </div>

        {/* Address Book */}
        <button
          onClick={() => handleNavClick("/address-book")}
          className="sidebar-link flex items-center w-full text-left"
        >
          <GoHome className="mr-4 w-[20px] h-[20px]" /> Address Management
        </button>

        {/* Track Order */}
        <button
          onClick={() => handleNavClick("/track-order")}
          className="sidebar-link flex items-center w-full text-left"
        >
          <img src={Tracker} alt="" height={16} width={16} className="mr-4" />
          Track Order
        </button>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          className="w-full bg-[#FFF4F0] text-[#E94E30] hover:bg-[#E94E30] hover:text-white py-8"
        >
          Logout
        </Button>
      </nav>
    </aside>
  );
};

export default AccountSidebar;
