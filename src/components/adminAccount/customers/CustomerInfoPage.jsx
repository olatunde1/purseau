import { Trash2, Ban, ArrowLeft } from "lucide-react";
import OrderHistory from "../orderHistory/OrderHistory";

const CustomerInfoPage = () => {
  return (
    <div className=" sm:p-6 lg:p-0 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-10">
        {/* Back Button + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-2xl font-semibold">Customer Information</h1>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 bg-white border border-[#878787] text-[#1B121B] hover:text-black px-4 py-2 rounded-lg hover:bg-gray-200 hover:border-transparent transition w-full sm:w-auto">
            <Trash2 size={16} /> Delete User Profile
          </button>
          <button className="flex items-center justify-center gap-2 bg-[#E94E30] text-white px-4 py-2 rounded-lg hover:bg-[#D63D22] transition w-full sm:w-auto">
            <Ban size={16} /> Block User
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white shadow rounded-xl p-4 sm:p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

        {/* First + Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-[16px] font-semibold text-[#1B121B] mb-1">
              First Name
            </label>
            <p className="text-sm font-medium text-[#5B5B5B]">Noah</p>
          </div>
          <div>
            <label className="block text-[16px] font-semibold text-[#1B121B] mb-1">
              Last Name
            </label>
            <p className="text-sm font-medium text-[#5B5B5B]">Fuad</p>
          </div>
        </div>

        {/* Email + Phone + Additional Phone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-[16px] font-semibold text-[#1B121B] mb-1">
              Email
            </label>
            <p className="text-sm font-medium text-[#5B5B5B] break-all">
              dolores.chambers@example.com
            </p>
          </div>
          <div>
            <label className="block text-[16px] font-semibold text-[#1B121B] mb-1">
              Phone Number
            </label>
            <p className="text-sm font-medium text-[#5B5B5B]">
              +234 814 892 3767
            </p>
          </div>
          <div>
            <label className="block text-[16px] font-semibold text-[#1B121B] mb-1">
              Additional Phone Number
            </label>
            <p className="text-sm font-medium text-[#5B5B5B]">(207) 555-0119</p>
          </div>
        </div>

        {/* Delivery Address + Region + City */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[16px] font-semibold text-[#1B121B] mb-1">
              Delivery Address
            </label>
            <p className="text-sm font-medium text-[#5B5B5B]">
              4517 Washington Ave. Manchester, Kentucky 39495
            </p>
          </div>
          <div>
            <label className="block text-[16px] font-semibold text-[#1B121B] mb-1">
              Region
            </label>
            <p className="text-sm font-medium text-[#5B5B5B]">South Africa</p>
          </div>
          <div>
            <label className="block text-[16px] font-semibold text-[#1B121B] mb-1">
              City
            </label>
            <p className="text-sm font-medium text-[#5B5B5B]">Cape Town</p>
          </div>
        </div>
      </div>

      {/* Orders Information */}
      <div className="bg-white shadow rounded-xl p-4 sm:p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Orders Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[16px] font-semibold text-[#1B121B] mb-1">
              Status
            </label>
            <p className="text-[12px] text-[#00A878] bg-[#DBEEE9] w-fit px-3 rounded-sm py-[6px] font-semibold">
              Delivered
            </p>
          </div>
          <div>
            <label className="block text-[16px] font-semibold text-[#1B121B] mb-1">
              Last Purchased Date
            </label>
            <p className="text-sm font-semibold text-[#5B5B5B]">
              March 25, 2025
            </p>
          </div>
          <div>
            <label className="block text-[16px] font-semibold text-[#1B121B] mb-1">
              Orders
            </label>
            <p className="text-sm font-semibold text-[#5B5B5B]">34</p>
          </div>
          <div>
            <label className="block text-[16px] font-semibold text-[#1B121B] mb-1">
              Total Amount Spent
            </label>
            <p className="text-sm font-semibold text-[#5B5B5B]">$753.78</p>
          </div>
        </div>
      </div>

      {/* Order History Section */}
      <div className="bg-white shadow rounded-xl p-1 sm:px-6 overflow-x-auto">
          <OrderHistory showCreateButton={false} />   
      </div>
    </div>
  );
};

export default CustomerInfoPage;
