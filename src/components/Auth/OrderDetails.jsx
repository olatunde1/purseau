
import { Link, useParams, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import Bag1 from "../../assets/images/bag1.png";

const OrderDetails = () => {
    const { orderId } = useParams();
    const location = useLocation();
    const orderFromState = location.state?.order;

    const getStatusStyle = (status) => {
        if (status === "Initiated") return "text-[#E9BB02] bg-[#ECE9DE]";
        if (status === "Placed") return "text-[#5B5B5B] bg-[#E9E9E9]";
        if (status === "Shipped") return "text-[#007BFF] bg-[#E0F0FF]";
        if (status === "Delivered") return "text-[#00A878] bg-[#DFF6F0]";
        return "";
    };

    // Safe order object with Nil fallbacks
    const order = {
        id: orderFromState?._id || orderId || "Nil",
        status: orderFromState?.statusUpdates?.[0]?.status || "Nil",
        date: orderFromState?.createdAt
            ? new Date(orderFromState.createdAt).toLocaleDateString()
            : "Nil",
        items:
            orderFromState?.cart?.items?.map((item) => ({
                id: item._id || "Nil",
                name: item.product?.name || "Nil",
                quantity: item.quantity || "Nil",
                price: item.totalPrice || 0,
                image: item.product?.images?.[0]?.secureUrl || Bag1,
            })) || [],
        totalAmount: orderFromState?.totalOrderAmount || 0,
        deliveryInfo: {
            method: orderFromState?.deliveryOptions || "Nil",
            address: orderFromState?.deliveryInfo?.address || "Nil",
        },
        paymentInfo: {
            method: orderFromState?.paymentMethod || "Nil",
            itemsTotal: orderFromState?.orderAmount || 0,
            DeliveryFees: orderFromState?.deliveryFee || 0,
            Total: orderFromState?.totalOrderAmount || 0,
        },
        statusUpdates: orderFromState?.statusUpdates || [],
    };

    return (
        <div className="flex justify-center font-custom">
            <main className="lg:ml-8 w-[878px] pb-10">
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
                        <CardTitle className="text-2xl font-semibold mb-6 flex items-center space-x-3 py-2">
                            <Link to="/my-order" className="text-black flex items-center ">
                                <IoIosArrowBack size={24} />
                                 <span>Order Details</span>
                            </Link>
                           
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6 mx-2 lg:mx-10 my-6">
                        {/* Order Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-between  border-b pb-6">
                            <div>
                                <p className="text-lg font-semibold">Order ID: {order.id}</p>
                                <p
                                    className={`text-sm mb-5 mt-2 font-medium px-3 py-1 rounded-2xl inline-block ${getStatusStyle(
                                        order.status
                                    )}`}
                                >
                                    {order.status}
                                </p>
                                <p className="text-sm pb-2 text-gray-500">
                                    Number of Items: {order.items.length || "Nil"}
                                </p>
                                <p className="text-sm pb-2 text-gray-500">Date: {order.date}</p>
                                <p className="text-sm text-gray-500">
                                    Total Amount:{" "}
                                    <span className="font-semibold">
                    ₦{" "}
                                        {order.totalAmount
                                            ? order.totalAmount.toLocaleString()
                                            : "Nil"}
                  </span>
                                </p>
                            </div>
                            <Link to={`/order-status/${order.id}`} state={{ order }}>
                                <Button
                                    variant="outline"
                                    className="bg-[#E94E30] mt-6 lg:mt-0 text-white lg:text-[#E94E30] lg:bg-white font-bold lg:border-[#E94E30] py-6 hover:bg-[#E94E30] hover:text-white"
                                >
                                    See Order Status
                                </Button>
                            </Link>
                        </div>

                        {/* Items */}
                        <div>
                            <p className="text-lg font-semibold mb-2">Items in this Order</p>
                            {order.items.length > 0 ? (
                                <div className="space-y-4 py-5">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex flex-col sm:flex-row rounded-xl bg-[#F2F2F7] justify-between p-5"
                                        >
                                                <div className="flex space-x-6">
                                                    
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-[130px] h-[130px] object-contain rounded-md"
                                            />
                                            <div className="">
                                                <p className="font-semibold text-base">{item.name}</p>
                                                <p className="font-medium text-gray-600 pt-3">
                                                    Quantity:{" "}
                                                    <strong className="text-black">
                                                        {item.quantity || "Nil"}
                                                    </strong>
                                                </p>
                                                <p className="font-extrabold text-base text-black pt-3">
                                                    ₦{" "}
                                                    {item.price
                                                        ? item.price.toLocaleString()
                                                        : "Nil"}
                                                </p>
                                            </div>
                                            
                                                        
                                                </div>
                                                 <Button
                                                    variant="outline"
                                                    className="text-white mt-6 lg:mt-0 bg-[#E94E30] shadow-lg font-bold border-[#E94E30] px-6 py-6 hover:bg-[#E94E30] hover:text-white rounded-lg "
                                                >
                                                    Buy Again
                                                </Button>
                                        
                          
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 italic">
                                    No items found in this order.
                                </p>
                            )}
                        </div>

                        {/* Delivery Info */}
                        <div className="pb-10">
                            <p className="text-base font-semibold mb-6">Delivery Information</p>
                            <div className="space-y-4">
                                <div className="flex justify-normal text-[#5B5B5B]">
                                    <strong className="text-black w-[180px]">
                                        Delivery Method:
                                    </strong>
                                    <span className="text-left ">
                    {order.deliveryInfo.method || "Nil"}
                  </span>
                                </div>
                                <div className="flex justify-normal text-[#5B5B5B]">
                                    <strong className="text-black w-[180px]">
                                        Shipping Address:
                                    </strong>
                                    <span className="text-left">
                    {order.deliveryInfo.address || "Nil"}
                  </span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="pb-[60px]">
                            <p className="text-lg font-semibold mb-6">Payment Information</p>
                            <div className="  border-gray-200 space-y-4">
                                <div className="flex justify-normal text-[#5B5B5B]">
                                    <strong className="text-black w-[180px]">Payment Method :</strong>
                                    <span className="text-left">{order.paymentInfo.method || "Nil"}</span>
                                </div>
                                <div className="flex justify-normal text-[#5B5B5B]">
                                    <strong className="text-black w-[180px]">Items Total :</strong>
                                    <span className="text-left">
                    ₦{" "}
                                        {order.paymentInfo.itemsTotal
                                            ? order.paymentInfo.itemsTotal.toLocaleString()
                                            : "Nil"}
                  </span>
                                </div>
                                <div className="flex justify-normal text-[#5B5B5B]">
                                    <strong className="text-black w-[180px]">Delivery Fees :</strong>
                                    <span className="text-left">
                    ₦{" "}
                                        {order.paymentInfo.DeliveryFees
                                            ? order.paymentInfo.DeliveryFees.toLocaleString()
                                            : "Nil"}
                  </span>
                                </div>
                                <div className="flex justify-normal text-[#5B5B5B]">
                                    <strong className="text-black w-[180px]">Total :</strong>
                                    <span className="text-left">
                    ₦{" "}
                                        {order.paymentInfo.Total
                                            ? order.paymentInfo.Total.toLocaleString()
                                            : "Nil"}
                  </span>
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
