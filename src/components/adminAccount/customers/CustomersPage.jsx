import React, { useState,useRef, useEffect } from "react";
import { Search, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomersPage = () => {
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [deleteCustomer, setDeleteCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // ✅ control items per page

  const navigate = useNavigate();

  const customers = [
    { id: 1, name: "Ralph Edwards", email: "sara.cruz@example.com", orders: 23, date: "Jan 20, 2020", country: "Mexico" },
    { id: 2, name: "Darrell Steward", email: "nathan.roberts@example.com", orders: 6, date: "Jan 20, 2020", country: "Sweden" },
    { id: 3, name: "Albert Flores", email: "tanya.hill@example.com", orders: 67, date: "Jan 20, 2020", country: "Russian Federation" },
    { id: 4, name: "Jenny Wilson", email: "debra.holt@example.com", orders: 2, date: "Jan 19, 2020", country: "Japan" },
    { id: 5, name: "Wade Warren", email: "willie.jennings@example.com", orders: 9, date: "Jan 19, 2020", country: "Hong Kong" },
  ];

  // ✅ filter by search
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);


  // ✅ Select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedCustomers.map((c) => c.id));
    } else {
      setSelectedRows([]);
    }
  };

  // ✅ Single row select
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((i) => i !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleViewOrder = (customer) => {
    navigate("/admin/customer-information", { state: { customer } });
  };

  // ✅ handle pagination click
const goToPage = (page) => {
  if (page < 1 || page > totalPages) return;
  setCurrentPage(page);

  // ✅ Close modal + dropdown when changing page
  setDeleteCustomer(null);
  setMenuOpen(null);
};
const menuRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(null);
      setDeleteCustomer(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search customer"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset to page 1 on search
            }}
            className="border rounded-lg pl-8 pr-3 py-2 text-sm w-full"
          />
          <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow overflow-x-auto relative">
        <table className="w-full text-sm">
          <thead className="bg-[#FFF4F0] text-[#878787]">
            <tr>
              <th className="p-3 text-center">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    paginatedCustomers.length > 0 &&
                    selectedRows.length === paginatedCustomers.length
                  }
                />
              </th>
              <th className="text-left p-3 py-5">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Orders</th>
              <th className="text-left p-3">Last Purchase Date</th>
              <th className="text-left p-3">Country</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((c, idx) => {
                const rowBg = idx % 2 === 0 ? "bg-white" : "bg-[#F8F8F8]";
                return (
                  <tr key={c.id} className={`border-t ${rowBg}`}>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(c.id)}
                        onChange={() => handleRowSelect(c.id)}
                      />
                    </td>
                    <td className="p-3 py-5">{c.name}</td>
                    <td className="p-3">{c.email}</td>
                    <td className="p-3">{c.orders}</td>
                    <td className="p-3">{c.date}</td>
                    <td className="p-3">{c.country}</td>
                    <td className="p-3 text-center relative">
                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={() =>
                          setMenuOpen(menuOpen === c.id ? null : c.id)
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>
{menuOpen === c.id && (
  <div
    ref={menuRef}
    className="absolute right-0 top-6 z-20 bg-white border rounded shadow p-2 min-w-[178px]"
  >
    <button
      className="w-full text-center px-1 py-2 rounded hover:text-gray-800 hover:bg-gray-200 font-semibold"
      onClick={() => {
        setMenuOpen(null);
        handleViewOrder(c);
      }}
    >
      View
    </button>
    <button
      className="w-full text-center px-2 py-2 text-[#E94E30] hover:bg-red-50 rounded"
      onClick={() => {
        setDeleteCustomer(c);
        setMenuOpen(null);
      }}
    >
      Delete
    </button>
  </div>
)}

                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No information available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 text-sm">
  <div className="flex gap-2">
    <button
      onClick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-3 py-1 border rounded-lg disabled:opacity-50"
    >
      Prev
    </button>
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => goToPage(i + 1)}
        className={`px-3 py-1 border rounded-lg ${
          currentPage === i + 1
            ? "bg-[#E94E30] text-white"
            : "hover:bg-gray-100"
        }`}
      >
        {i + 1}
      </button>
    ))}
    <button
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages || totalPages === 0}
      className="px-3 py-1 border rounded-lg disabled:opacity-50"
    >
      Next
    </button>
  </div>
  <p>
    Showing {paginatedCustomers.length} of {filteredCustomers.length} Results
  </p>
</div>

    </div>
  );
};

export default CustomersPage;
