import { useParams, useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IoIosArrowBack } from "react-icons/io";
import ProgressTracker from "./ProgressTracker";

// ✅ Status style function
const getStatusStyle = (status) => {
  if (!status) return "";
  const s = status.toLowerCase();
  if (s === "ongoing") return "text-[#E9BB02] bg-[#ECE9DE]";
  if (s === "delivered") return "text-[#00A878] bg-[#DFF6F0]";
  if (s === "canceled") return "bg-[#878787] text-white";
  if (s === "returned") return "bg-[#E9E9E9] text-[#5B5B5B]";
  return "";
};

const OrderStatus = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const orderFromState = location.state?.order || {};

  console.log(orderFromState, "orderFromState");
  const updates = orderFromState.statusUpdates || [];

  const currentStatus = updates.length ? updates[updates.length - 1].status : null;
  const status = orderFromState.status?.toLowerCase() || "ongoing";
  const statusStyle = getStatusStyle(status);
  const isHiddenSection = status === "canceled" || status === "returned";
  const contentPaddingBottom = isHiddenSection ? "pb-[467px]" : "pb-[100px]";

  const totalAmount = orderFromState?.totalAmount || 178000;
  const deliveryInfo = orderFromState?.deliveryInfo || {
    method: "Ship to Address",
    address: "4517 Washington Ave. Manchester, Kentucky 39495",
  };
  const paymentInfo = orderFromState?.paymentInfo || {
    method: "Credit Card",
    itemsTotal: 178000,
    DeliveryFees: 3000,
    Total: 181000,
  };

  return (
    <div className=" flex flex-col lg:flex-row justify-center font-custom bg-gray-50 min-h-screen p-2">

      {/* Main Content */}
      <main className="w-full lg:w-[878px] lg:ml-8 lg:pt-0">
        <Card
          className="border-none rounded-lg shadow-2xl bg-white p-4 pb-[100px] h-full"
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
          <CardHeader className="flex justify-between">
            <CardTitle className="text-xl font-medium flex items-center mb-2">
              <Link to="/my-order">
                <IoIosArrowBack className="mr-4 text-xl" />
              </Link>
              Order Status
            </CardTitle>
          </CardHeader>

          <CardContent className={`mx-4 sm:mx-6 lg:mx-10 my-6 space-y-10 ${contentPaddingBottom}`}>
            {/* Order Info */}
            <div className="space-y-2">
              <p className="text-lg font-semibold">Order ID: {orderFromState.id || orderId}</p>
              <p className="text-gray-600">{" "}
                <span className={`font-semibold py-1 rounded-md text-sm inline-block ${statusStyle}`}>
                  {orderFromState.status || "Ongoing"}
                </span>
              </p>

              {/* Placeholder for number of items  for numbers of items not fixed yet*/}

              <p className="text-gray-600">Number of items: </p>

              <p className="text-gray-600">
                Date: <span className="">{orderFromState.date || "07 Feb 2025"}</span>
              </p>
              <p className="text-gray-600">
                Total Amount: <span className="">₦ {totalAmount.toLocaleString()}</span>
              </p>
            </div>

            {/* Progress Tracker */}
            <ProgressTracker  currentStatus={currentStatus}
                             timeline={updates}/>

            {/* Delivery and Payment Info */}
          {!isHiddenSection && (
  <>
    {/* Delivery Info */}
    <div className="pb-10 pt-[60px]">
      <p className="text-base font-semibold mb-6">Delivery Information</p>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start text-[#5B5B5B]">
          <strong className="text-black w-full sm:w-[180px] mb-1 sm:mb-0">
            Delivery Method:
          </strong>
          <span className="text-left">{deliveryInfo.method}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start text-[#5B5B5B]">
          <strong className="text-black w-full sm:w-[180px] mb-1 sm:mb-0">
            Shipping Address:
          </strong>
          <span className="text-left">{deliveryInfo.address}</span>
        </div>
      </div>
    </div>

    {/* Payment Info */}
    <div className="pb-[60px]">
      <p className="text-lg font-semibold mb-6">Payment Information</p>
      <div className="p-6 rounded-md border border-gray-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start text-[#5B5B5B]">
          <strong className="text-black w-full sm:w-[180px] mb-1 sm:mb-0">
            Payment Method:
          </strong>
          <span className="text-left">{paymentInfo.method}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start text-[#5B5B5B]">
          <strong className="text-black w-full sm:w-[180px] mb-1 sm:mb-0">
            Items Total:
          </strong>
          <span className="text-left">
            ₦ {paymentInfo.itemsTotal.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start text-[#5B5B5B]">
          <strong className="text-black w-full sm:w-[180px] mb-1 sm:mb-0">
            Delivery Fees:
          </strong>
          <span className="text-left">
            ₦ {paymentInfo.DeliveryFees.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start text-[#5B5B5B]">
          <strong className="text-black w-full sm:w-[180px] mb-1 sm:mb-0">
            Total:
          </strong>
          <span className="text-left">
            ₦ {paymentInfo.Total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  </>
)}

          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default OrderStatus;
