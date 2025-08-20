import React, { useState } from "react";
import { Search, MoreVertical } from "lucide-react";

const CustomersPage = () => {
  const [search, setSearch] = useState("");

  const customers = [
    { name: "Ralph Edwards", email: "sara.cruz@example.com", orders: 23, date: "Jan 20, 2020", country: "Mexico" },
    { name: "Darrell Steward", email: "nathan.roberts@example.com", orders: 6, date: "Jan 20, 2020", country: "Sweden" },
    { name: "Albert Flores", email: "tanya.hill@example.com", orders: 67, date: "Jan 20, 2020", country: "Russian Federation" },
    { name: "Jenny Wilson", email: "debra.holt@example.com", orders: 2, date: "Jan 19, 2020", country: "Japan" },
    { name: "Wade Warren", email: "willie.jennings@example.com", orders: 9, date: "Jan 19, 2020", country: "Hong Kong" },
    { name: "Dianne Russell", email: "michael.mitc@example.com", orders: 12, date: "Jan 24, 2020", country: "United States" },
    { name: "Eleanor Pena", email: "dolores.chambers@example.com", orders: 26, date: "Jan 19, 2020", country: "Ukraine" },
    { name: "Devon Lane", email: "georgia.young@example.com", orders: 4, date: "Jan 19, 2020", country: "Brazil" },
    { name: "Darlene Robertson", email: "jackson.graham@example.com", orders: 23, date: "Jan 19, 2020", country: "India" },
    { name: "Annette Black", email: "felicia.reid@example.com", orders: 8, date: "Feb 1, 2020", country: "Spain" },
    { name: "Cameron Williamson", email: "tim.jennings@example.com", orders: 2, date: "Jan 19, 2020", country: "Australia" },
    { name: "Marvin McKinney", email: "kenzi.lawson@example.com", orders: 5, date: "Feb 1, 2020", country: "France" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search customer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg pl-8 pr-3 py-2 text-sm w-full"
          />
          <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Orders</th>
              <th className="text-left p-3">Last Purchase Date</th>
              <th className="text-left p-3">Country</th>
              <th className="text-center p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers
              .filter(
                (c) =>
                  c.name.toLowerCase().includes(search.toLowerCase()) ||
                  c.email.toLowerCase().includes(search.toLowerCase()) ||
                  c.country.toLowerCase().includes(search.toLowerCase())
              )
              .map((c, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.orders}</td>
                  <td className="p-3">{c.date}</td>
                  <td className="p-3">{c.country}</td>
                  <td className="p-3 text-center">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical size={18} className="text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 text-sm">
        <p>Showing 1 of 25,680 Results</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-lg">Prev</button>
          <button className="px-3 py-1 border rounded-lg bg-gray-200">1</button>
          <button className="px-3 py-1 border rounded-lg">2</button>
          <button className="px-3 py-1 border rounded-lg">3</button>
          <button className="px-3 py-1 border rounded-lg">Next</button>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
