import React, { useState } from "react";
import { Edit, Star } from "lucide-react";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("description");
  const productImages = [
    "https://via.placeholder.com/500x500?text=Main+Image",
    "https://via.placeholder.com/150x150?text=Image+2",
    "https://via.placeholder.com/150x150?text=Image+3",
    "https://via.placeholder.com/150x150?text=Image+4",
  ];
  const [mainImage, setMainImage] = useState(productImages[0]);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Product Details</h1>
        <button className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 w-full sm:w-auto">
          <Edit size={16} /> Edit
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Gallery */}
        <div>
          <div className="border rounded-xl overflow-hidden">
            <img
              src={mainImage}
              alt="Main Product"
              className="w-full h-72 sm:h-96 object-cover"
            />
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {productImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer flex-shrink-0 ${
                  mainImage === img ? "ring-2 ring-orange-500" : ""
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-lg sm:text-[20px] lg:text-[28px] font-bold mb-1">
            Caramew - CHL Bags - 370
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Product ID: DS-PS01ID92
          </p>
          <h3 className="font-bold text-[20px] pb-4">Product Summary</h3>
          <p className="mb-4 text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          {/* Pricing */}
          <div className="grid grid-cols-2 sm:grid-cols-4 mt-4">
            <div>
              <p className="font-bold text-[32px]">₦ 48,000</p>
              <p className="text-gray-400 line-through ">₦ 48,000</p>
              <p className="text-gray-500 text-xs sm:text-sm">1 piece</p>
            </div>
            <div>
              <p className="font-bold text-2xl pt-2 text-[#5B5B5B]">₦ 46,820</p>
              <p className="text-gray-400 line-through text-sm pt-3">₦ 46,820</p>
              <p className="text-gray-500 text-xs sm:text-sm">3-12 pieces</p>
            </div>
            <div>
              <p className="font-bold text-2xl text-[#5B5B5B] pt-2">₦ 45,000</p>
              <p className="text-gray-400 line-through text-sm pt-3">₦ 45,000</p>
              <p className="text-gray-500 text-xs sm:text-sm">13 upward</p>
            </div>
            <div className="text-red-500 font-semibold text-sm sm:text-base mt-2 flex bg-[#FFE4DA] w-[45px] h-[32px] text-center items-center justify-center">
              -23%
            </div>
          </div>

          {/* Stats */}
         <div className="bg-white grid grid-cols-3 mt-6 border rounded-xl shadow h-[88px]">
            <div className="p-3  sm:p-4 text-center border-r border-gray-200 first:rounded-l-xl">
              <p className="text-lg sm:text-2xl font-bold">251</p>
              <p className="text-gray-500 text-xs sm:text-sm">Orders</p>
            </div>
            <div className="p-3 sm:p-4 text-center border-r border-gray-200">
              <p className="text-lg sm:text-2xl font-bold">214</p>
              <p className="text-gray-500 text-xs sm:text-sm">Available Stocks</p>
            </div>
            <div className="p-3 sm:p-4 text-center">
              <p className="text-lg sm:text-2xl font-bold">₦ 1.563,800</p>
              <p className="text-gray-500 text-xs sm:text-sm">Revenue</p>
            </div>
          </div>
          <h1 className="font-bold text-[20px] pt-4">Product Description</h1>
          <p className="text-justify py-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five View more</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 bg-white rounded-xl shadow">
        {/* Tab Header */}
        <div className="flex border-b overflow-x-auto">
          {[
            { id: "description", label: "Description" },
            { id: "additional", label: "Additional Information" },
            { id: "reviews", label: "Reviews" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-4 sm:px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {activeTab === "description" && (
            <div>
              <p className="text-gray-700 mb-4">
                Available Color — Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>
              <p className="text-gray-700">
                Lorem Ipsum is dummy text used throughout the design industry.
              </p>
            </div>
          )}

          {activeTab === "additional" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p><strong>Brand:</strong> Channel</p>
              <p><strong>Weight:</strong> 80kg</p>
              <p><strong>Material:</strong> PU Leather</p>
              <p><strong>Sizes:</strong> EU 34-35, EU 35, EU 35-36, EU 37...</p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl sm:text-2xl font-bold">4.8</span>
                <Star className="text-yellow-400 fill-yellow-400" size={20} />
                <span className="text-gray-500 text-sm">
                  Based on 578 ratings
                </span>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold">Idowu Racheal</p>
                <p className="text-gray-600 text-sm">
                  My hubby bought me this for my birthday and I love it.
                </p>
                <p className="text-xs text-gray-400 mt-1">Apr 14, 2025</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
