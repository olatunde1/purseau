// import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import {useAuthStore} from "@/store/authStore.js";

const UserAccount = () => {
  // const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const {currentUser, currentAddress} = useAuthStore()


  return (
    <>
      {/* <div className="container-sidebar flex justify-center">  */}
      {/* Sidebar */}

      {/* Main Content */}
      <main className="lg:ml-10 main-content">
        <div className="grid grid-cols-1 gap-6">
          <h1 className="text-2xl font-medium">Account Overview</h1>

          {/* Account Details Card */}
          <Card className="border-t-0 rounded-lg shadow-xl bg-white p-10 md:hover:cursor-pointer relative">
            <CardHeader>
              <CardTitle className="pb-[24px]">Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 pb-2"> {currentUser?.firstName}</p>
              <p className="text-gray-400 pb-2"> {currentUser?.email}</p>{" "}
              {/* Inactive email */}
              <p className="text-gray-400"> +{currentUser?.phoneNumber}</p>{" "}
              {/* Inactive phone number */}
            </CardContent>
          </Card>

          {/* Address Book Card */}
          <Card className="border rounded-lg shadow-lg bg-white relative p-10 md:hover:cursor-pointer">
            <CardHeader className="mb-[24px]">
              <CardTitle>Address Book</CardTitle>
              <p className="text-gray-400">
                Your default shipping address
              </p>{" "}
              {/* Inactive description */}
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 pb-2"> {currentAddress[0]?.firstName}  {currentAddress[0]?.lastName}</p>
              <p className="text-gray-400 pb-2"> {currentAddress[0]?.delivery}</p>{" "}
              {/* Inactive address */}
              <p className="text-gray-400 mb-8"> {currentAddress[0]?.city}, {currentAddress[0]?.region}</p>{" "}
              {/* Inactive country */}
              <Link to="/address-book">
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
