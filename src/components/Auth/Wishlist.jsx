import React from "react";
import { Button } from "@/components/ui/button";
import { FaTrashAlt } from "react-icons/fa";

const wishlistItems = [
  {
    title: "A Cute Ladies Hand And Shoulder Bag",
    status: "In Stock",
    size: "Medium",
    price: 18000,
    discount: "-23%",
    inStock: true,
  },
  {
    title: "Summer Casual V-Neck Bandage Sh...",
    status: "In Stock",
    size: "UK 24",
    price: 18000,
    discount: "-23%",
    inStock: true,
  },
  {
    title: "A Cute Ladies Hand And Shoulder Bag",
    status: "Out Of Stock",
    size: "UK 24",
    price: 18000,
    discount: "-23%",
    inStock: false,
  },
  {
    title: "A Cute Ladies Hand And Shoulder Bag",
    status: "In Stock",
    size: "UK 24",
    price: 18000,
    discount: "-23%",
    inStock: true,
  },
];

const Wishlist = () => {
  return (
    <div className="p-4  w-[878px]">
      <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
      <div className="space-y-6">
        {wishlistItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row w-[798px] bg-[#F2F2F7] mx-8 justify-between items-start md:items-center  gap-4 p-4 border rounded-xl shadow-sm ${
              !item.inStock ? "opacity-60" : ""
            }`}
          >
            {/* Image */}
            <div className="w-full md:w-28 h-28 bg-gray-800 rounded-md flex-shrink-0" />

            {/* Details */}
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 mb-1">{item.title}</h3>
              <p
                className={`text-sm mt-3 font-medium ${
                  item.inStock ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.status}
              </p>
              <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-semibold text-lg text-gray-900">₦{item.price.toLocaleString()}</span>
                <span className="text-red-500 text-sm font-medium">{item.discount}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-start md:items-center  gap-2">
              <Button
                disabled={!item.inStock}
                className={`bg-[#E94E30] text-white hover:bg-[#d04328] px-4 py-2 ${
                  !item.inStock ? "cursor-not-allowed bg-gray-400" : ""
                }`}
              >
                Add to Cart
              </Button>
              <button className="text-sm text-red-600 flex items-center mt-12 gap-2 hover:underline">
                <FaTrashAlt className="text-xs" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
