import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import ProgressTracker from "./ProgressTracker";
import { TiUserOutline } from "react-icons/ti";
import { TbBorderAll, TbSettings2 } from "react-icons/tb";
import { BsHeart } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import Tracker from "../../assets/images/order-tracking.png";
import { Button } from "@/components/ui/button";

// ✅ Status style function
const getStatusStyle = (status) => {
  if (!status) return "";
  const s = status.toLowerCase();
  if (s === "ongoing") return "text-[#E9BB02] bg-[#ECE9DE]";
  if (s === "delivered") return "text-[#00A878] bg-[#DFF6F0]";
  if (s === "canceled") return "bg-[#878787] text-white";
  if (s === "returned") return "bg-[#E9E9E9] text-[#5B5B5B]";
  return "";
};

const OrderStatus = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const orderFromState = location.state?.order || {};

  const status = orderFromState.status?.toLowerCase() || "ongoing";
  const statusStyle = getStatusStyle(status);
  const isHiddenSection = status === "canceled" || status === "returned";
  const contentPaddingBottom = isHiddenSection ? "pb-[467px]" : "pb-[100px]";

  const totalAmount = orderFromState?.totalAmount || 178000;
  const deliveryInfo = orderFromState?.deliveryInfo || {
    method: "Ship to Address",
    address: "4517 Washington Ave. Manchester, Kentucky 39495",
  };
  const paymentInfo = orderFromState?.paymentInfo || {
    method: "Credit Card",
    itemsTotal: 178000,
    DeliveryFees: 3000,
    Total: 181000,
  };

  return (
    <div className="container-sidebar flex flex-col lg:flex-row justify-center font-custom bg-gray-50 min-h-screen p-2">
      {/* Sidebar */}
      <aside
        className="w-full lg:w-[382px] p-4 h-auto lg:h-[648px] border-r personal-information-sidebar mb-6 lg:mb-0"
        style={{
          boxShadow: `
            0px 14px 30px 0px #7575751A,
            0px 55px 55px 0px #75757517,
            0px 124px 74px 0px #7575750D,
            0px 220px 88px 0px #75757503,
            0px 344px 96px 0px #75757500
          `,
        }}
      >
        <nav className="space-y-0">
          <Link to="/user-account">
            <button className="block flex sidebar-link-first items-center w-full">
              <TiUserOutline className="mr-4 w-[20px] h-[20px]" /> My Personal Information
            </button>
          </Link>
          <Link to="/my-order" className="block sidebar-link flex text-base items-center">
            <TbBorderAll className="mr-4 w-[20px] h-[20px]" /> My Orders
          </Link>
          <Link to="#" className="block sidebar-link flex text-base items-center">
            <BsHeart className="mr-4 w-[20px] h-[20px]" /> Wishlist
          </Link>
          <button className="flex items-center w-full text-left sidebar-link">
            <TbSettings2 className="mr-4 w-[20px] h-[20px]" /> Account Management{" "}
            <span className="ml-auto">
              <IoIosArrowDown />
            </span>
          </button>
          <Link to="#" className="block sidebar-link flex items-center">
            <GoHome className="mr-4 w-[20px] h-[20px]" /> Address Management
          </Link>
          <Link to="#" className="block sidebar-link flex items-center">
            <img src={Tracker} alt="" height={16} width={16} className="mr-4" /> Track Order
          </Link>
          <Button className="w-full bg-[#FFF4F0] text-[#E94E30] hover:bg-[#E94E30] hover:text-white py-8 track-order">
            Logout
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full lg:w-[878px] lg:ml-8 pt-4 lg:pt-0">
        <Card
          className="border-none rounded-lg shadow-lg bg-white pb-[100px] h-full"
          style={{
            boxShadow: `
              0px 14px 30px 0px #7575751A,
              0px 55px 55px 0px #75757517,
              0px 124px 74px 0px #7575750D,
              0px 220px 88px 0px #75757503,
              0px 344px 96px 0px #75757500
            `,
          }}
        >
          <CardHeader className="flex justify-between">
            <CardTitle className="text-2xl font-medium flex items-center mb-12">
              <Link to="/my-order">
                <IoIosArrowBack className="mr-4 text-xl" />
              </Link>
              Order Status
            </CardTitle>
          </CardHeader>

          <CardContent className={`mx-4 sm:mx-6 lg:mx-10 my-6 space-y-10 ${contentPaddingBottom}`}>
            {/* Order Info */}
            <div className="space-y-2">
              <p className="text-lg font-semibold">Order ID: {orderFromState.id || orderId}</p>
              <p className="text-gray-600">
                Status:{" "}
                <span className={`font-semibold px-3 py-1 rounded-md text-sm inline-block ${statusStyle}`}>
                  {orderFromState.status || "Ongoing"}
                </span>
              </p>
              <p className="text-gray-600">
                Date: <span className="font-semibold">{orderFromState.date || "07 Feb 2025"}</span>
              </p>
              <p className="text-gray-600">
                Total Amount: <span className="font-semibold">₦ {totalAmount.toLocaleString()}</span>
              </p>
            </div>

            {/* Progress Tracker */}
            <ProgressTracker currentStatus={orderFromState.status} />

            {/* Delivery and Payment Info */}
            {!isHiddenSection && (
              <>
                <div className="pb-10 pt-[60px]">
                  <p className="text-base font-semibold mb-6">Delivery Information</p>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-normal text-[#5B5B5B]">
                      <strong className="text-black w-full sm:w-[180px] mb-1 sm:mb-0">Delivery Method:</strong>
                      <span className="text-right">{deliveryInfo.method}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-normal text-[#5B5B5B]">
                      <strong className="text-black w-full sm:w-[180px] mb-1 sm:mb-0">Shipping Address:</strong>
                      <span className="text-right">{deliveryInfo.address}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="pb-[60px]">
                  <p className="text-lg font-semibold mb-6">Payment Information</p>
                  <div className="bg-[#F9F9F9] p-6 rounded-md border border-gray-200 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-normal text-[#5B5B5B]">
                      <strong className="text-black w-full sm:w-[180px] mb-1 sm:mb-0">Payment Method:</strong>
                      <span className="text-right">{paymentInfo.method}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-normal text-[#5B5B5B]">
                      <strong className="text-black w-full sm:w-[180px] mb-1 sm:mb-0">Items Total:</strong>
                      <span className="text-right">₦ {paymentInfo.itemsTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-normal text-[#5B5B5B]">
                      <strong className="text-black w-full sm:w-[180px] mb-1 sm:mb-0">Delivery Fees:</strong>
                      <span className="text-right">₦ {paymentInfo.DeliveryFees.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-normal text-[#5B5B5B]">
                      <strong className="text-black w-full sm:w-[180px] mb-1 sm:mb-0">Total:</strong>
                      <span className="text-right">₦ {paymentInfo.Total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default OrderStatus;
