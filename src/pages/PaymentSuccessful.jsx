import React from "react";
import OrderComplete from "../assets/images/reset.png";

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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[#EDEDED] font-custom">
      <div className="p-8 w-full max-w-[1200px] text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Order Completed</h1>
          <img src={OrderComplete} sizes={60} alt="Order Complete" className="bg-[#EDEDED]" />
          <p className="text-lg font-medium text-gray-700">
            Thank you for your purchase!
          </p>
          <p className="text-gray-600 max-w-md">
            Your order has been successfully placed. You will receive an order
            confirmation shortly at <strong>fuadnoah@purseau.com</strong>.
          </p>
        </div>

        <div className="mt-8 border rounded-lg p-6 flex flex-col sm:flex-row flex-wrap justify-evenly gap-4 text-left text-sm text-gray-700">
          <div className="relative sm:pr-6 after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:border-r after:border-gray-300 after:hidden sm:after:block">
            <span className="font-semibold block pr-11">Order ID</span>
            <span>{orderId}</span>
          </div>
          <div className="relative sm:pr-6 after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:border-r after:border-gray-300 after:hidden sm:after:block">
            <span className="font-semibold block">Payment Method</span>
            <span>{paymentMethod}</span>
          </div>
          <div className="relative sm:pr-6 after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:border-r after:border-gray-300 after:hidden sm:after:block">
            <span className="font-semibold block">Transaction ID</span>
            <span>{transactionId}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <div>
              <span className="font-semibold block">Estimated Delivery</span>
              <span>{deliveryDate}</span>
            </div>
            <button
              onClick={() => alert("Receipt downloaded!")}
              className="mt-2 sm:mt-0 px-4 py-2 bg-[#E94E30] text-white rounded-md hover:bg-red-600 transition"
            >
              Download Receipt
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-[#E94E30] text-white rounded-md hover:bg-red-600 transition"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
