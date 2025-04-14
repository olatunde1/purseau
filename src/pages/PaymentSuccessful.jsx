import React from "react";
import OrderComplete from "../assets/images/reset.png";
import DownloadIcon from '../assets/images/download-icon.png'
import { SlArrowRight } from "react-icons/sl";
import { StayLoop } from "@/components/StayLoop";
import { Footer } from "../components/Footer";

const PaymentSuccessful = () => {
  const orderId = "ORD-903458";
  const paymentMethod = "Credit Card (Visa)";
  const transactionId = "TXN-2201-5678";
  const deliveryDate = new Date(
    new Date().setDate(new Date().getDate() + 5)
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
           <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[#ffffff] font-custom">
      <div className="p-4 sm:p-8 w-full max-w-[1200px] text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl sm:text-[36px] font-bold text-gray-800 mb-6 sm:mb-10">
            Order Completed
          </h1>
          <img
            src="https://s3-alpha-sig.figma.com/img/8297/427b/c9f59af8d3970fdf8bfc938dc85afd63?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LW1cpkg4ibO8fD9WGfjNdMUPpG4DcueENPH4Lfyw5DqU9wh6yPS5TY5rXLm8N-wRv861X5Q746WVyBGX4-kqCUbwkDrafL9olXKvX37Vn4vB0wpxPgq09H0N86XXiGlRdOrj3zEtdsif-36mZwfu5Ag-TNpVrAxopgf7XOuTfLhvwUSfhg2GXyKYjg5bxrsp-50y6leRYwDETS~UM1nGFsB2I7lojdFCcF4-tG0HiKfXbqVZVhbrrtS1R~IQml3IsMwbBU5hfp8IOHdm5x4drSKHo6rXW7mmzVmvj6SbPdM6Jf6aAk-iEwvcCkNbgLMeR22yFDixoxnU9RRQggGQ3g__"
            sizes={60}
            alt="Order Complete"
            className="bg-[#EDEDED] w-[150px] sm:w-[200px] mb-6"
          />
          <p className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">
            Thank you for your purchase
          </p>
          <p className="text-[#878787] text-sm sm:text-base max-w-[480px] mb-8 sm:mb-[80px] px-2">
            Your order has been successfully placed. You will receive an order
            confirmation shortly on your email{" "}
            <strong className="text-[#1B121B]">fuadnoah@purseau.com</strong>.
          </p>
        </div>

        <div className="bg-[#FFF4F0] mt-6 mb-[140px] sm:mt-8 border rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row flex-wrap justify-evenly gap-4 text-left text-sm text-gray-700">
          <div className="relative sm:pr-6 after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:border-r after:border-gray-300 after:hidden sm:after:block">
            <span className="font-normal block sm:pr-20 text-[#5B5B5B] mb-4">Order ID</span>
            <span className="font-semibold text-[20px]">{orderId}</span>
          </div>
          <div className="relative sm:pr-6 after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:border-r after:border-gray-300 after:hidden sm:after:block">
            <span className="font-normal block sm:pr-20 text-[#5B5B5B] mb-4">Payment Method</span>
            <span className="font-semibold text-[20px] ">{paymentMethod}</span>
          </div>
          <div className="relative sm:pr-6 after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:border-r after:border-gray-300 after:hidden sm:after:block">
            <span className="font-normal block sm:pr-20 text-[#5B5B5B] mb-4">Transaction ID</span>
            <span className="font-semibold text-[20px]">{transactionId}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <div>
              <span className="font-normal block sm:pr-20 text-[#5B5B5B] mb-4">Estimated Delivery</span>
              <span className="font-semibold text-[20px]">{deliveryDate}</span>
            </div>
            <button
              onClick={() => alert("Receipt downloaded!")}
              className=" flex gap-2 mt-2 sm:mt-0 px-10 py-3 bg-[#E94E30] text-white rounded-md hover:bg-red-600 transition"
            >
             <img src={DownloadIcon} alt="" className=""/> Download Receipt
            </button>
          </div>
        </div>

        <div className="mt-6 mb-[200px] sm:mt-10 flex items-center justify-center">
          <a
            href="/"
            className="flex items-center gap-2 px-8 py-3 border border-[#E94E30] text-[#E94E30] rounded-md hover:bg-[#E94E30] hover:text-white text-sm sm:text-base transform transition-transform duration-300 hover:scale-105"
          >
            Continue Shopping <SlArrowRight />
          </a>
        </div>
      </div>
    </div>
    <StayLoop />
    <Footer />
    </>
 
  );
};

export default PaymentSuccessful;
