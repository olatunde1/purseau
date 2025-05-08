import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TiUserOutline } from "react-icons/ti";
import { BsHeart } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { TbBorderAll, TbSettings2 } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import Tracker from "../../assets/images/order-tracking.png";
import Bag1 from "../../assets/images/bag1.png";
import Bag2 from "../../assets/images/bag2.png";

const OrderDetails = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const orderFromState = location.state?.order;

  const getStatusStyle = (status) => {
    if (status.toLowerCase() === "ongoing") return "text-[#E9BB02] bg-[#ECE9DE]";
    if (status.toLowerCase() === "delivered") return "text-[#00A878] bg-[#DFF6F0]";
    if (status.toLowerCase() === "canceled") return "bg-[#878787] text-white";
    if (status.toLowerCase() === "returned") return "bg-[#E9E9E9] text-[#5B5B5B]";
    return "";
  };

  const order = {
    id: orderFromState?.id || orderId || "PUR-1562792772493",
    status: orderFromState?.status || "Ongoing",
    date: orderFromState?.date || "2023-10-01",
    product: orderFromState?.product || "Luxury Bag",
    items: orderFromState?.items || [
      {
        id: 1,
        name: "Luxury classic fancy light blue leather handbag",
        quantity: "12",
        price: 123000,
        image: Bag1,
      },
      {
        id: 2,
        name: "Ladies Casual Flat Slippers - Gold",
        quantity: "6",
        price: 55000,
        image: Bag2,
      },
    ],
    totalAmount: orderFromState?.totalAmount || 178000,
    deliveryInfo: orderFromState?.deliveryInfo || {
      method: "Ship to Address",
      address: "4517 Washington Ave. Manchester, Kentucky 39495",
    },
    paymentInfo: orderFromState?.paymentInfo || {
      method: "Credit Card",
      itemsTotal: 178000,
      DeliveryFees: 3000,
      Total: 181000,
    },
  };

  return (
    <div className=" flex justify-center font-custom">

      {/* Main Content */}
      <main className="ml-8 w-[878px] pb-10">
        <Card
          className="border rounded-lg shadow-lg bg-white p-6"
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
          <CardHeader>
            <CardTitle className="text-2xl font-semibold mb-6 flex items-center space-x-3">
              <Link to="/my-order" className="text-black hover:text-[#c8371d]">
                <IoIosArrowBack size={24} />
              </Link>
              <span>Order Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 mx-10 my-6">
            {/* Order Summary */}
            <div className="flex justify-between px-pb-4">
              <div>
                <p className="text-lg font-semibold">Order ID: {order.id}</p>
                <p
                  className={`text-sm mb-5 mt-2 font-medium px-3 py-1 rounded-2xl inline-block ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </p>
                <p className="text-sm pb-2 text-gray-500">Number of Items: {order.items.length}</p>
                <p className="text-sm pb-2 text-gray-500">Date: {order.date}</p>
                <p className="text-sm text-gray-500">
                  Total Amount: <span className="font-semibold">₦ {order.totalAmount.toLocaleString()}</span>
                </p>
              </div>
              <Link to={`/order-status/${order.id}`} state={{ order }}>
                <Button variant="outline" className="text-[#E94E30] border-[#E94E30] hover:bg-[#E94E30] hover:text-white">
                  See Order Status
                </Button>
              </Link>
            </div>

            {/* Items in Order */}
            <div>
              <p className="text-lg font-semibold mb-2">Items in this Order</p>
              {order.items.length > 0 ? (
                <div className="space-y-4 py-5">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row rounded-md bg-[#F2F2F7] justify-between p-5">
                      <img src={item.image} alt={item.name} className="w-[130px] h-[130px] object-cover rounded-md" />
                      <div className="flex-1 mr-0 sm:mr-[212px] ml-0 sm:ml-6 mt-4 sm:mt-0">
                        <p className="font-semibold text-base">{item.name}</p>
                        <p className="font-medium text-gray-600 pt-3">
                          Quantity: <strong className="text-black">{item.quantity}</strong>
                        </p>
                        <p className="font-bold text-base text-black pt-3">₦ {item.price.toLocaleString()}</p>
                      </div>
                      <Button
                        className="text-white mt-4 sm:mt-0 bg-[#F2542D] hover:bg-[#E94E30]"
                        style={{
                          boxShadow: `
                            0px 2px 4px 0px #0000001A,
                            0px 7px 7px 0px #00000017,
                            0px 16px 10px 0px #0000000D,
                            0px 29px 12px 0px #00000003,
                            0px 45px 13px 0px #00000000
                          `,
                        }}
                      >
                        Buy Again
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No items found in this order.</p>
              )}
            </div>

            {/* Delivery Info */}
            <div className="pb-10">
              <p className="text-base font-semibold mb-6">Delivery Information</p>
              <div className="space-y-4">
                <div className="flex justify-normal text-[#5B5B5B]">
                  <strong className="text-black w-[180px]">Delivery Method:</strong>
                  <span className="text-right">{order.deliveryInfo.method}</span>
                </div>
                <div className="flex justify-normal text-[#5B5B5B]">
                  <strong className="text-black w-[180px]">Shipping Address:</strong>
                  <span className="text-right">{order.deliveryInfo.address}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="pb-[60px]">
              <p className="text-lg font-semibold mb-6">Payment Information</p>
              <div className="bg-[#F9F9F9] p-6 rounded-md border border-gray-200 space-y-4">
                <div className="flex justify-normal text-[#5B5B5B]">
                  <strong className="text-black w-[180px]">Payment Method:</strong>
                  <span className="text-right">{order.paymentInfo.method}</span>
                </div>
                <div className="flex justify-normal text-[#5B5B5B]">
                  <strong className="text-black w-[180px]">Items Total:</strong>
                  <span className="text-right">₦ {order.paymentInfo.itemsTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-normal text-[#5B5B5B]">
                  <strong className="text-black w-[180px]">Delivery Fees:</strong>
                  <span className="text-right">₦ {order.paymentInfo.DeliveryFees.toLocaleString()}</span>
                </div>
                <div className="flex justify-normal text-[#5B5B5B]">
                  <strong className="text-black w-[180px]">Total:</strong>
                  <span className="text-right">₦ {order.paymentInfo.Total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default OrderDetails;
