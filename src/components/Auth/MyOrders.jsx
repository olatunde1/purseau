import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import { BsHeart } from 'react-icons/bs';
import { TiUserOutline } from 'react-icons/ti';
import { IoIosArrowDown } from "react-icons/io";
import { TbBorderAll, TbSettings2 } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import Tracker from '../../assets/images/order-tracking.png';
import CountrySelector from "./CountrySelector";
import { IoChevronBackSharp } from "react-icons/io5";

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("ongoing"); // Default to Ongoing tab
  const [orders, setOrders] = useState({
    ongoing: [],
    delivered: [],
    canceled: [],
    returned: [],
  });
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace this URL with your dummy API endpoint
        const response = await fetch('https://fakestoreapi.com/carts');
        const data = await response.json();

        // Transform the API data into the required format
        const transformedOrders = {
          ongoing: data.slice(0, 2).map((item) => ({
            id: item.id,
            product: `Product ${item.id}`,
            status: "Ongoing",
            date: "2023-10-01",
            image: "http://example.com",
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

  return (
    <div className="container-sidebar flex justify-center">
      {/* Sidebar */}
      <aside className="w-[382px] h-[648px] p-2 border-r personal-information-sidebar">
        <nav className="space-y-3">
          <Link to="/user-account">
            <button className="block flex sidebar-link-first items-center w-full">
              <TiUserOutline className="mr-4 w-[20px] h-[20px]" /> My Personal Information
            </button>
          </Link>
          <Link to="/my-order" className="block sidebar-link flex text-base items-center"><TbBorderAll className="mr-4 w-[20px] h-[20px]" /> My Orders</Link>
          <Link to="#" className="block sidebar-link flex text-base items-center"><BsHeart className="mr-4 w-[20px] h-[20px]" /> Wishlist</Link>

          {/* Account Management with Submenu */}
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

      {/* Main Content */}
      <main className="ml-8 w-[878px]">
        <div className="grid grid-cols-1 gap-6">
          {/* Tabs for Orders */}
          <Card className="border rounded-lg shadow-lg bg-white p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold mb-6">My Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 border-b mb-6">
                <Button
                  variant={activeTab === "ongoing" ? "default" : "ghost"}
                  onClick={() => setActiveTab("ongoing")}
                  className={`py-2 px-4 ${activeTab === "ongoing" ? "border-b-2 border-[#E94E30]" : ""}`}
                >
                  Ongoing ({orders.ongoing.length})
                </Button>
                <Button
                  variant={activeTab === "delivered" ? "default" : "ghost"}
                  onClick={() => setActiveTab("delivered")}
                  className={`py-2 px-4 ${activeTab === "delivered" ? "border-b-2 border-[#E94E30]" : ""}`}
                >
                  Delivered ({orders.delivered.length})
                </Button>
                <Button
                  variant={activeTab === "canceled" ? "default" : "ghost"}
                  onClick={() => setActiveTab("canceled")}
                  className={`py-2 px-4 ${activeTab === "canceled" ? "border-b-2 border-[#E94E30]" : ""}`}
                >
                  Canceled ({orders.canceled.length})
                </Button>
                <Button
                  variant={activeTab === "returned" ? "default" : "ghost"}
                  onClick={() => setActiveTab("returned")}
                  className={`py-2 px-4 ${activeTab === "returned" ? "border-b-2 border-[#E94E30]" : ""}`}
                >
                  Returned ({orders.returned.length})
                </Button>
              </div>

              {/* Display Orders Based on Active Tab */}
              {loading ? (
                <p className="text-center">Loading orders...</p>
              ) : (
                <div className="space-y-4">
                  {orders[activeTab].map((order) => (
                    <Card key={order.id} className="border rounded-lg shadow-sm p-4">
                      <CardContent>
                        <div className="flex items-center space-x-4">
                          {/* Image Column */}
                          <div className="w-20 h-20 flex-shrink-0">
                            <img
                              src={order.image}
                              alt={order.product}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>

                          {/* Details Column */}
                          <div className="flex-1">
                            <p className="text-lg font-medium">{order.product}</p>
                            <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                            <p className="text-sm text-gray-500">Status: {order.status}</p>
                            <p className="text-sm text-gray-500">Date: {order.date}</p>
                          </div>

                          {/* View Details Button */}
                          <Link to="/product-description">
                            <Button variant="outline" className="text-[#E94E30] border-[#E94E30] hover:bg-[#E94E30] hover:text-white">
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