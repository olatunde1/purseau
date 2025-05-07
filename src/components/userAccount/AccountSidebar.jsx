import { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TbBorderAll, TbSettings2 } from "react-icons/tb";
import { TiUserOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

import Tracker from "../../assets/images/order-tracking.png";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const AccountSidebar = () => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const { logout } = useAuthStore();
  
   const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <div>
      <aside className="w-[382px] shadow-lg bg-white p-4 border-r personal-information-sidebar">
        <nav className="space-y-3">
          <Link to="/user-account">
            <button className="flex sidebar-link-first items-center w-full">
              <TiUserOutline className="mr-4 w-[20px] h-[20px]" /> My Personal
              Information
            </button>
          </Link>
          <Link
            to="/my-order"
            className=" sidebar-link flex text-base items-center"
          >
            <TbBorderAll className="mr-4 w-[20px] h-[20px]" /> My Orders
          </Link>
          <Link to="/wishlist" className=" sidebar-link flex text-base items-center">
            <BsHeart className="mr-4 w-[20px] h-[20px]" /> Wishlist
          </Link>

          {/* Account Management with Submenu */}
          <div>
            <button
              className="flex items-center w-full text-left sidebar-link"
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            >
              <TbSettings2 className="mr-4 w-[20px] h-[20px]" /> Account
              Management{" "}
              <span className="ml-auto">
                <IoIosArrowDown
                  className={isAccountMenuOpen ? "rotate-180" : ""}
                />
              </span>
            </button>
            {isAccountMenuOpen && (
              <div className="ml-4 space-y-2">
                <Link
                  to="/profile-details"
                  className=" text-sm flex sidebar-link items-center"
                >
                  <TiUserOutline className="mr-4 w-[20px] h-[20px]" />
                  Profile
                </Link>
                <Link to="/password-settings" className="text-sm flex sidebar-link items-center">
                  <IoSettingsOutline className="mr-4 w-[20px] h-[20px]" />{" "}
                  Security Settings
                </Link>
              </div>
            )}
          </div>

          <Link to="/address-book" className="sidebar-link flex items-center">
            <GoHome className="mr-4 w-[20px] h-[20px]" /> Address Management
          </Link>
          <Link to="#" className="sidebar-link flex items-center ">
            <img src={Tracker} alt="" height={16} width={16} className="mr-4" />
            Track Order
          </Link>
          <Button
            onClick={handleLogout}
            className="w-full bg-[#FFF4F0] text-[#E94E30] hover:bg-[#E94E30] hover:text-white py-8 track-order "
          >
            Logout
          </Button>
        </nav>
      </aside>
    </div>
  );
};

export default AccountSidebar;
