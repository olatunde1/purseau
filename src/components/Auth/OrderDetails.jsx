import React from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TiUserOutline } from "react-icons/ti";
import { BsHeart } from "react-icons/bs";
import { TbBorderAll, TbSettings2 } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { GoHome } from "react-icons/go";
import Tracker from "../../assets/images/order-tracking.png";

const OrderDetails = () => {
  // You can use the useParams hook if you're getting order ID from the route
  const { orderId } = useParams();

  const order = {
    id: orderId || "PUR-1562792772493",
    status: "Ongoing",
    items: [
      {
        id: 1,
        name: "Luxury classic fancy light blue leather handbag",
        price: 123000,
        image: "https://via.placeholder.com/80",
      },
      {
        id: 2,
        name: "Ladies Casual Flat Slippers - Gold",
        price: 55000,
        image: "https://via.placeholder.com/80",
      },
    ],
    date: "2023-10-01",
    totalAmount: 178000,
    deliveryInfo: {
        method: "Ship to Address",
        address: "4517 Washington Ave. Manchester, Kentucky 39495",
    //   phone: "+1 234 567 890",
    },
    paymentInfo: {
        method: "Credit Card",
        itemsTotal: 178000,
        DeliveryFees: 3000,
        Total: 181000
    },
  };

  return (
    <div className="container-sidebar flex justify-center font-custom">
      {/* Sidebar */}
      <aside className="w-[382px] h-[648px] p-2 border-r personal-information-sidebar">
        <nav className="space-y-3">
          <Link to="/user-account"><button className="block flex sidebar-link-first items-center w-full"><TiUserOutline className="mr-4 w-[20px] h-[20px]" /> My Personal Information</button></Link>
          <Link to="/my-order" className="block sidebar-link flex text-base items-center"><TbBorderAll className="mr-4 w-[20px] h-[20px]" /> My Orders</Link>
          <Link to="#" className="block sidebar-link flex text-base items-center"><BsHeart className="mr-4 w-[20px] h-[20px]" /> Wishlist</Link>
          <button className="flex items-center w-full text-left sidebar-link"><TbSettings2 className="mr-4 w-[20px] h-[20px]" /> Account Management <span className="ml-auto"><IoIosArrowDown /></span></button>
          <Link to="#" className="block sidebar-link flex items-center"><GoHome className="mr-4 w-[20px] h-[20px]" /> Address Management</Link>
          <Link to="#" className="block sidebar-link flex items-center"><img src={Tracker} alt="" height={16} width={16} className="mr-4" /> Track Order</Link>
          <Button className="w-full bg-[#FFF4F0] text-[#E94E30] hover:bg-[#E94E30] hover:text-white py-8 track-order">Logout</Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-8 w-[878px]">
        <Card className="border rounded-lg shadow-lg bg-white p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold mb-6 mx-10">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 mx-10 my-6">

            {/* Order Summary */}
            <div className="flex justify-between px-pb-4 ">
              <div>
                <p className="text-lg font-semibold">Order ID: {order.id}</p>
                <p className="text-sm mb-5 mt-2"><span className="text-[#E9BB02] font-medium bg-[#ECE9DE] px-3 py-1 rounded-2xl">{order.status}</span></p>
                <p className="text-sm pb-2  text-gray-500">Number of Items : {order.items.length} Items</p>
                <p className="text-sm pb-2 text-gray-500">Date: {order.date}</p>
             
                <p className="text-sm  text-gray-500">Total Amount: <span className="font-semibold">₦ {order.totalAmount.toLocaleString()}</span></p>
              </div>
              <Button variant="outline" className="text-[#E94E30] border-[#E94E30] hover:bg-[#E94E30] hover:text-white">See Order Status</Button>
            </div>

            {/* Items in Order */}
            <div>
              <p className="text-lg font-semibold mb-2">Items in this Order</p>
             <div className="flex   px-5 py-5">
             <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex  rounded-md bg-[#F2F2F7] justify-between ">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">₦ {item.price.toLocaleString()}</p>
                    </div>
                    <Button className="text-white  hover:bg-[#E94E30] hover:text-white">Buy Again</Button>
                  </div>
                ))}
              </div>
           
             </div>
            </div>

            {/* Delivery Info */}
            <div>
              <p className="text-lg font-semibold mb-2">Delivery Information</p>
              <div className="bg-gray-50 ">
                {/* <p><strong>Name:</strong> {order.deliveryInfo.name}</p> */}
                <p><strong>Delivery Method: </strong> {order.deliveryInfo.method}</p>
                <p><strong>Shipping Address: </strong> {order.deliveryInfo.address}</p>
          
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <p className="text-lg font-semibold mb-2">Payment Information</p>
              <div className="bg-gray-50">
                <p className="pb-3"><strong>Payment Method:</strong> {order.paymentInfo.method}</p>
                <p className="pb-3"><strong>Items Total:</strong> ₦ {order.paymentInfo.itemsTotal.toLocaleString()}</p>
                <p className="pb-3"><strong>Delivery Fees:</strong> ₦ {order.paymentInfo.DeliveryFees.toLocaleString()}</p>
                <p className="pb-[76px]"><strong>Total:</strong> ₦ {order.paymentInfo.Total.toLocaleString()}</p>
              </div>
            </div>

          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default OrderDetails;
