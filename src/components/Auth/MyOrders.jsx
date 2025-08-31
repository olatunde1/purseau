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
                className="ml-8 w-[878px] pb-[100px] px-10"
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
                <div className="grid grid-cols-1 gap-6">
                    <Card className="border rounded-lg shadow-lg bg-white p-6">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold mb-6">
                                My Orders
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Tabs */}
                            <div className="flex space-x-4 pb-5">
                                {TABS.map((tab) => (
                                    <Button
                                        key={tab}
                                        variant={activeTab === tab ? "default" : "ghost"}
                                        onClick={() => setActiveTab(tab)}
                                        className={`py-2 px-4 capitalize ${
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
                                <div className="space-y-4">
                                    {ordersByStatus[activeTab]?.map((order) => {
                                        const product = order?.cart?.items?.[0]?.product;
                                        const image = product?.images?.[0]?.secureUrl;
                                        const latestStatus =
                                            order.statusUpdates[
                                            order.statusUpdates.length - 1
                                                ]?.status;

                                        return (
                                            <Card
                                                key={order._id}
                                                className="border rounded-lg shadow-sm p-10 bg-[#F2F2F7]"
                                            >
                                                <CardContent>
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-20 h-20 flex-shrink-0">
                                                            <img
                                                                src={image}
                                                                alt={product?.name}
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-lg font-medium">
                                                                {product?.name}
                                                            </p>
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
                                                                Date:{" "}
                                                                {new Date(order.createdAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                        <Link
                                                            to={`/order-details/${order._id}`}
                                                            state={{ order }}
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                className="text-[#E94E30] border-none bg-[#F2F2F7] hover:bg-[#E94E30] hover:text-white"
                                                            >
                                                                View Details
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </CardContent>
                                            </Card>
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
