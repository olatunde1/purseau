import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BsHeart } from 'react-icons/bs';
import { TiUserOutline } from 'react-icons/ti';
import { IoIosArrowDown } from "react-icons/io";
import { TbBorderAll, TbSettings2 } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import Tracker from '../../assets/images/order-tracking.png';

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [orders, setOrders] = useState({
    ongoing: [],
    delivered: [],
    canceled: [],
    returned: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/carts');
        const data = await response.json();

        const transformedOrders = {
          ongoing: data.slice(0, 2).map((item) => ({
            id: item.id,
            product: `Product ${item.id}`,
            status: "Ongoing",
            date: "2023-10-01",
            image: "http://via.placeholder.com/80",
          })),
          delivered: data.slice(2, 5).map((item) => ({
            id: item.id,
            product: `Product ${item.id}`,
            status: "Delivered",
            date: "2023-09-25",
            image: "https://via.placeholder.com/80",
          })),
          canceled: data.slice(5, 6).map((item) => ({
            id: item.id,
            product: `Product ${item.id}`,
            status: "Canceled",
            date: "2023-09-20",
            image: "https://via.placeholder.com/80",
          })),
          returned: data.slice(6, 8).map((item) => ({
            id: item.id,
            product: `Product ${item.id}`,
            status: "Returned",
            date: "2023-09-15",
            image: "https://via.placeholder.com/80",
          })),
        };

        setOrders(transformedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    if (status.toLowerCase() === "ongoing") return "text-[#E9BB02]";
    if (status.toLowerCase() === "delivered") return "text-[#00A878]";
    if (status.toLowerCase() === "canceled") return "bg-[#878787] text-white px-2 py-1 rounded";
    return "";
  };

  return (
    <div className="container-sidebar flex justify-center">
      <aside className="w-[382px] h-[648px] p-2 border-r personal-information-sidebar">
        <nav className="space-y-3">
          <Link to="/user-account">
            <button className="block flex sidebar-link-first items-center w-full">
              <TiUserOutline className="mr-4 w-[20px] h-[20px]" /> My Personal Information
            </button>
          </Link>
          <Link to="/my-order" className="block sidebar-link flex text-base items-center"><TbBorderAll className="mr-4 w-[20px] h-[20px]" /> My Orders</Link>
          <Link to="#" className="block sidebar-link flex text-base items-center"><BsHeart className="mr-4 w-[20px] h-[20px]" /> Wishlist</Link>
          <div>
            <button className="flex items-center w-full text-left sidebar-link">
              <TbSettings2 className="mr-4 w-[20px] h-[20px]" /> Account Management <span className="ml-auto"><IoIosArrowDown /></span>
            </button>
          </div>
          <Link to="#" className="block sidebar-link flex items-center"><GoHome className="mr-4 w-[20px] h-[20px]" /> Address Management</Link>
          <Link to="#" className="block sidebar-link flex items-center"><img src={Tracker} alt="" height={16} width={16} className="mr-4" />Track Order</Link>
          <Button className="w-full bg-[#FFF4F0] text-[#E94E30] hover:bg-[#E94E30] hover:text-white py-8 track-order">Logout</Button>
        </nav>
      </aside>

      <main className="ml-8 w-[878px]">
        <div className="grid grid-cols-1 gap-6">
          <Card className="border rounded-lg shadow-lg bg-white p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold mb-6">My Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4  pb-6">
                {["ongoing", "delivered", "canceled", "returned"].map((tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? "default" : "ghost"}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-4 capitalize ${activeTab === tab ? "rounded-none border-b-2 border-[#E94E30] bg-transparent text-black" : "hover:bg-[#E94E30] hover:text-white hover:rounded-none"}`}
                  >
                    {tab} ({orders[tab]?.length || 0})
                  </Button>
                ))}
              </div>

              {loading ? (
                <p className="text-center">Loading orders...</p>
              ) : (
                <div className="space-y-4">
                  {orders[activeTab].map((order) => (
                    <Card key={order.id} className="border rounded-lg shadow-sm p-4">
                      <CardContent>
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-20 flex-shrink-0">
                            <img
                              src={order.image}
                              alt={order.product}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-lg font-medium">{order.product}</p>
                            <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                            <p className={`text-sm font-semibold ${getStatusStyle(order.status)}`}>
                              Status: {order.status}
                            </p>
                            <p className="text-sm text-gray-500">Date: {order.date}</p>
                          </div>
                          <Link to={`/order-details/${order.id}`} state = {{order}}>
                            <Button variant="outline" className="text-[#E94E30] border-none hover:bg-[#E94E30] hover:text-white">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MyOrders;
