import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useGetOrders from "@/hooks/api/queries/useGetOrders.jsx";


const TABS = ["Initiated", "Placed", "Shipped", "Delivered"];

const MyOrders = () => {
    const [activeTab, setActiveTab] = useState("Initiated");
    const { data: orderData, isPending } = useGetOrders();

    // Transform API response into grouped status buckets
    const ordersByStatus = useMemo(() => {
        const groups = {
            Initiated: [],
            Placed: [],
            Shipped: [],
            Delivered: [],
        };

        if (orderData?.data?.result) {
            orderData.data.result.forEach((order) => {
                // get latest status (last element of statusUpdates array)
                const latestStatus =
                    order.statusUpdates?.[order.statusUpdates.length - 1]?.status ||
                    "Initiated";

                if (groups[latestStatus]) {
                    groups[latestStatus].push(order);
                }
            });
        }

        return groups;
    }, [orderData]);

    const getStatusStyle = (status) => {
        if (status === "Initiated") return "text-[#E9BB02]";
        if (status === "Placed") return "text-blue-500";
        if (status === "Shipped") return "text-purple-500";
        if (status === "Delivered") return "text-[#00A878]";
        return "";
    };

    return (
        <div className="flex justify-center">
            <main
                className="w-full pb-[100px] lg:px-10 "
               
            >
                <div className="grid grid-cols-1 lg:gap-6">
                    <Card className="border-none lg:border rounded-lg w-[388px] lg:w-[878px] shadow-none lg:shadow-lg bg-white lg:px-6 py-6">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold mb-6">
                                My Orders
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Tabs */}
                            <div className="flex lg:space-x-4 mb-6 lg:pb-5 border-b overflow-x-auto">
                                {TABS.map((tab) => (
                                    <Button
                                        key={tab}
                                        variant={activeTab === tab ? "default" : "ghost"}
                                        onClick={() => setActiveTab(tab)}
                                        className={`py-2 px-2 lg:px-4 capitalize ${
                                            activeTab === tab
                                                ? "rounded-none border-b-2 border-[#E94E30] bg-transparent text-black"
                                                : "hover:bg-[#E94E30] hover:text-white hover:rounded-none"
                                        }`}
                                    >
                                        {tab} ({ordersByStatus[tab]?.length || 0})
                                    </Button>
                                ))}
                            </div>

                            {/* Order List */}
                           {isPending ? (
  <p className="text-center">Loading orders...</p>
) : (
  <div
    className="
      grid grid-cols-1 gap-6 
      md:grid-cols-1 
      sm:grid-cols-2   
      lg:grid-cols-1   
    "
  >
    {ordersByStatus[activeTab]?.map((order) => {
      const product = order?.cart?.items?.[0]?.product;
      const image = product?.images?.[0]?.secureUrl;
      const latestStatus =
        order.statusUpdates[order.statusUpdates.length - 1]?.status;

      return (
        <Link
          key={order._id}
          to={`/order-details/${order._id}`}
          state={{ order }}
          className="w-full" // make sure card spans full width
        >
          <Card
            className="
              border rounded-lg shadow-sm p-8 mr-3 lg:mr-0 lg:p-10 bg-[#F2F2F7] 
              hover:shadow-md cursor-pointer 
              
            "
          >
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={image}
                    alt={product?.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium">{product?.name}</p>
                  <p className="text-sm text-gray-500">
                    Order ID: {order.orderId}
                  </p>
                  <p
                    className={`text-sm font-semibold ${getStatusStyle(
                      latestStatus
                    )}`}
                  >
                    Status: {latestStatus}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Show button only on desktop */}
                <div className="hidden md:block">
                  <Button
                    variant="outline"
                    className="text-[#E94E30] border-none bg-[#F2F2F7] hover:bg-[#E94E30] hover:text-white"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      );
    })}

    {ordersByStatus[activeTab]?.length === 0 && (
      <p className="text-center text-gray-500">
        No {activeTab} orders found.
      </p>
    )}
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
