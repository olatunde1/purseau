import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";
import { TiUserOutline } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { TbBorderAll, TbSettings2 } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import Tracker from "../../assets/images/order-tracking.png";
import { StayLoop } from "@/components/StayLoop";
import { Footer } from "@/components/Footer";

const UserAccount = () => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  return (
    <>
      {/* <div className="container-sidebar flex justify-center">  */}
      {/* Sidebar */}

      {/* Main Content */}
      <main className="ml-10 main-content">
        <div className="grid grid-cols-1 gap-6">
          <h1 className="text-2xl font-medium">Account Overview</h1>

          {/* Account Details Card */}
          <Card className="border rounded-lg shadow-lg bg-white p-10">
            <CardHeader>
              <CardTitle className="pb-[24px]">Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 pb-2"> seun fashola</p>
              <p className="text-gray-400 pb-2"> pursue@example.com</p>{" "}
              {/* Inactive email */}
              <p className="text-gray-400"> +234803567890</p>{" "}
              {/* Inactive phone number */}
            </CardContent>
          </Card>

          {/* Address Book Card */}
          <Card className="border rounded-lg shadow-lg bg-white relative p-10">
            <CardHeader className="mb-[24px]">
              <CardTitle>Address Book</CardTitle>
              <p className="text-gray-400">
                Your default shipping address
              </p>{" "}
              {/* Inactive description */}
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 pb-2"> seun fashola</p>
              <p className="text-gray-400 pb-2"> 123 Main St, New York</p>{" "}
              {/* Inactive address */}
              <p className="text-gray-400 mb-8"> USA</p>{" "}
              {/* Inactive country */}
              <Link to="/edit-user-address">
                <Button className="absolute top-4 right-4 flex items-center gap-2 text-[#E94E30] bg-transparent hover:bg-transparent">
                  <FaEdit /> Edit
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
      {/* </div> */}

      {/* <StayLoop />
        <Footer /> */}
    </>
  );
};

export default UserAccount;
