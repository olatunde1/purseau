import React from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { FaRegCircle, FaDotCircle } from "react-icons/fa";

export default function OrderDetails() {
  const location = useLocation();
  const order = location.state?.order;

  console.log("Order Data:", order);

  // Fallbacks if data is missing
  const delivery = order?.deliveryInfo || {};
  const user = order?.userId || {};
  const cartDetails = order?.cartDetails || {};
  const items = cartDetails?.items || [];

  // Format products for table
  const products = items.map((item)  => ({
    name: item?.productId?.name || "N/A",
    price: item?.unitPrice ?? "N/A",
    quantity: item?.quantity ?? "N/A",
    total: item?.totalPrice ?? "N/A",
    id: item?.productId?._id ?? "N/A",
  }));

  // Order status - use latest status update or default
  const latestStatus =
    order?.statusUpdates?.[order.statusUpdates.length - 1]?.status || "N/A";
  const [orderStatus, setOrderStatus] = React.useState(latestStatus);

  const trackSteps = [
    { label: "Initiated", expected: false },
    { label: "Placed", expected: false },
    { label: "Shipped", expected: true },
    { label: "Delivered", expected: true },
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <Link to="/admin/orders-history" className="flex items-center mb-4">
        <h2 className="text-2xl flex font-bold mb-4 gap-4">
          <IoChevronBackSharp className="w-5 h-5 mt-2 font-bold" />
          Order Details
        </h2>
      </Link>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel */}
        <div className="flex-1 rounded-xl p-4">
          <div className="bg-white shadow-md p-4 rounded">
                 {/* Order Info */}
          <div className="flex  flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <div className="text-sm">
              <strong>Order ID:</strong> {order?.orderId || "N/A"}
            </div>
            <button className="bg-[#E94E30] text-white py-2 px-6 rounded-lg text-sm">
              Invoice
            </button>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto p-2">
            <table className="w-full text-sm border rounded-md overflow-hidden">
              <thead className="bg-[#FFF4F0] text-left">
                <tr>
                  <th className="py-[21.5px] px-3 text-[#878787]">Product</th>
                  <th className="py-[21.5px] px-3 text-[#878787]">Price</th>
                  <th className="py-[21.5px] px-3 text-[#878787]">Quantity</th>
                  <th className="py-[21.5px] px-3 text-[#878787]">Total</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((p, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-[#F4F4F6]"}
                    >
                      <td className="py-[21.5px] px-3 whitespace-nowrap">
                        {p.name}
                      </td>
                      <td className="py-[21.5px] px-3">
                        ${p.price?.toFixed ? p.price.toFixed(2) : p.price}
                      </td>
                      <td className="py-[21.5px] px-3">{p.quantity}</td>
                      <td className="py-[21.5px] px-3">
                        ${p.total?.toFixed ? p.total.toFixed(2) : p.total}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          </div>
       

          {/* Delivery & Payment Info */}
          <div className="mt-6 grid gap-6">
            {/* Delivery Info */}
            <div className=" bg-white shadow-md p-4 rounded">
              <h4 className="font-semibold text-xl mb-4">
                Delivery Information
              </h4>
              <div className="space-y-4 text-[#5B5B5B]">
                <div className="flex justify-normal">
                  <span className="w-[180px]">Customer Name:</span>
                  <span>
                    {delivery.name ||
                      `${user.firstName || ""} ${user.lastName || ""}` ||
                      "N/A"}
                  </span>
                </div>
                <div className="flex justify-normal">
                  <span className="w-[180px]">Phone Number:</span>
                  <span>{delivery.phone || "N/A"}</span>
                </div>
                <div className="flex justify-normal">
                  <span className="w-[180px]">Email:</span>
                  <span>{user.email || "N/A"}</span>
                </div>
                <div className="flex justify-normal">
                  <span className="w-[180px]">Address:</span>
                  <span>
                    {delivery.address
                      ? `${delivery.address}, ${delivery.city || ""}, ${
                          delivery.region || ""
                        }`
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="p-4 rounded bg-white shadow-md">
              <h4 className="font-semibold text-xl mb-4">Payment Details</h4>
              <div className="space-y-4 text-[#5B5B5B]">
                <div className="flex justify-normal">
                  <span className="w-[180px]">Payment Method:</span>
                  <span>{order?.paymentMethod || "N/A"}</span>
                </div>
                <div className="flex justify-normal">
                  <span className="w-[180px]">Delivery Type:</span>
                  <span>{order?.deliveryType || "N/A"}</span>
                </div>
                <div className="flex justify-normal">
                  <span className="w-[180px]">Delivery Option:</span>
                  <span>{order?.deliveryOptions || "N/A"}</span>
                </div>
                <div className="flex justify-normal">
                  <span className="w-[180px]">Delivery Fee:</span>
                  <span>${order?.deliveryFee ?? "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-[421px] rounded-xl p-6">
          <div className=" bg-white shadow-md p-4 rounded mb-6">
            <h4 className="font-semibold text-xl mb-2">Order Summary</h4>
            <div className="space-y-4 text-[#5B5B5B]">
              <div className="flex border-b justify-between py-3">
                Subtotal: <span>${order?.orderAmount ?? "N/A"}</span>
              </div>
              <div className="flex border-b justify-between py-3">
                Tax: <span>${order?.tax ?? "N/A"}</span>
              </div>
              <div className="flex border-b justify-between py-3">
                Shipping Fee: <span>${order?.deliveryFee ?? "N/A"}</span>
              </div>
              <div className="flex border-b justify-between py-3 font-semibold">
                Total: <span>${order?.totalOrderAmount ?? "N/A"}</span>
              </div>
            </div>
          </div>

          <div className=" p-4 rounded bg-white shadow-md">
            <h4 className="font-semibold text-xl mb-3">Track Order</h4>
            <div className="text-sm text-[#5B5B5B] space-y-6">
              <div>
                <span className="font-semibold">Tracking ID:</span>{" "}
                {order?.trackingId || "N/A"}
              </div>
              <select
                name="orderStatus"
                id="orderStatus"
                className="border border-[#878787] w-[207px] px-4 rounded-xl py-3 text-sm mb-4 focus:outline-none focus:ring-1 focus:ring-[#878787]"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                {trackSteps.map((s) => (
                  <option key={s.label} value={s.label}>
                    {s.label}
                  </option>
                ))}
              </select>

              <div>
                {trackSteps.map((step, idx) => {
                  const currentIdx = trackSteps.findIndex(
                    (s) => s.label === orderStatus
                  );
                  const isActive = idx === currentIdx;
                  const isCompleted = idx < currentIdx;

                  return (
                    <div
                      key={step.label}
                      className="flex items-center gap-2 mb-6 last:mb-0"
                    >
                      {isActive ? (
                        <FaDotCircle className="text-[#E94E30] w-4 h-4" />
                      ) : isCompleted ? (
                        <FaDotCircle className="text-green-500 w-4 h-4" />
                      ) : (
                        <FaRegCircle className="text-gray-400 w-4 h-4" />
                      )}
                      <div>
                        <div
                          className={`font-semibold ${
                            isActive
                              ? "text-[#E94E30]"
                              : isCompleted
                              ? "text-green-600"
                              : "text-black"
                          }`}
                        >
                          {step.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
