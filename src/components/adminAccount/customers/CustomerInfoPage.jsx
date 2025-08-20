import React, { useState } from "react";
import { Trash2, Ban, Search, Filter, ArrowUpDown } from "lucide-react";

const CustomerInfoPage = () => {
  const [search, setSearch] = useState("");

  const orders = [
    {
      id: "PUR-15627927",
      customer: "Noah Fuad",
      product: "Prada Mini Bag",
      date: "Oct 28, 2020",
      items: "4 Items",
      status: "Ongoing",
      amount: "$8.99",
    },
    {
      id: "PUR-15627927",
      customer: "Noah Fuad",
      product: "Gucci, 1995 Horsebit",
      date: "Oct 23, 2020",
      items: "24 Items",
      status: "Ongoing",
      amount: "$17.84",
    },
    {
      id: "PUR-15627927",
      customer: "Noah Fuad",
      product: "Chanel, Boy Flap",
      date: "Oct 30, 2020",
      items: "13 Items",
      status: "Delivered",
      amount: "$11.70",
    },
    {
      id: "PUR-15627927",
      customer: "Noah Fuad",
      product: "Hermès Birkin 25",
      date: "Nov 01, 2020",
      items: "7 Items",
      status: "Cancelled",
      amount: "$5.22",
    },
    {
      id: "PUR-15627927",
      customer: "Noah Fuad",
      product: "Gucci Mules",
      date: "Oct 16, 2020",
      items: "12 Items",
      status: "Returned",
      amount: "$14.81",
    },
    {
      id: "PUR-15627927",
      customer: "Noah Fuad",
      product: "Jimmy Choo Pumps",
      date: "Oct 27, 2020",
      items: "2 Items",
      status: "Delivered",
      amount: "$14.81",
    },
    {
      id: "PUR-15627927",
      customer: "Noah Fuad",
      product: "Valentino Studded Shoe",
      date: "Oct 29, 2020",
      items: "1 Item",
      status: "Delivered",
      amount: "$6.48",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold">Customer Information</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition">
            <Trash2 size={16} /> Delete User
          </button>
          <button className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition">
            <Ban size={16} /> Block User
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-3">Personal Information</h2>
          <p><span className="font-medium">First Name:</span> Noah</p>
          <p><span className="font-medium">Last Name:</span> Fuad</p>
          <p><span className="font-medium">Email:</span> dolores.chambers@example.com</p>
          <p><span className="font-medium">Phone:</span> +234 816 892 3767</p>
          <p><span className="font-medium">Additional Phone:</span> (207) 555-0119</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-3">Delivery Address</h2>
          <p><span className="font-medium">Address:</span> 4517 Washington Ave. Manchester, Kentucky 39495</p>
          <p><span className="font-medium">Region:</span> South Africa</p>
          <p><span className="font-medium">City:</span> Cape Town</p>
        </div>
      </div>

      {/* Orders Info */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 shadow rounded-xl text-center">
          <p className="text-gray-500 text-sm">Status</p>
          <p className="text-lg font-bold">Delivered</p>
        </div>
        <div className="bg-white p-4 shadow rounded-xl text-center">
          <p className="text-gray-500 text-sm">Last Purchased Date</p>
          <p className="text-lg font-bold">March 25, 2025</p>
        </div>
        <div className="bg-white p-4 shadow rounded-xl text-center">
          <p className="text-gray-500 text-sm">Orders</p>
          <p className="text-lg font-bold">34</p>
        </div>
        <div className="bg-white p-4 shadow rounded-xl text-center">
          <p className="text-gray-500 text-sm">Total Spent</p>
          <p className="text-lg font-bold">$753.78</p>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold">Order History</h2>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by product or ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg pl-8 pr-3 py-2 text-sm w-56"
              />
              <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
            </div>
            <button className="flex items-center gap-1 border px-3 py-2 rounded-lg text-sm">
              <Filter size={14} /> Filter
            </button>
            <button className="flex items-center gap-1 border px-3 py-2 rounded-lg text-sm">
              <ArrowUpDown size={14} /> Sort
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-2">Order ID</th>
              <th className="text-left p-2">Customer</th>
              <th className="text-left p-2">Product</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Items</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter(
                (o) =>
                  o.product.toLowerCase().includes(search.toLowerCase()) ||
                  o.id.toLowerCase().includes(search.toLowerCase())
              )
              .map((order, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.customer}</td>
                  <td className="p-2">{order.product}</td>
                  <td className="p-2">{order.date}</td>
                  <td className="p-2">{order.items}</td>
                  <td
                    className={`p-2 font-medium ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Ongoing"
                        ? "text-blue-600"
                        : order.status === "Cancelled"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="p-2">{order.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <p>Showing 1–7 of {orders.length}</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-lg">Prev</button>
            <button className="px-3 py-1 border rounded-lg bg-gray-200">1</button>
            <button className="px-3 py-1 border rounded-lg">2</button>
            <button className="px-3 py-1 border rounded-lg">3</button>
            <button className="px-3 py-1 border rounded-lg">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoPage;
