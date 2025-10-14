import { useState, useMemo, useEffect } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetAdminProducts from "@/hooks/api/queries/admin/useGetAdminProducts";
import useRemoveProducts from "@/hooks/api/mutation/admin/useRemoveProducts";

const statusList = [
  "All",
  "Delivered",
  "Ongoing",
  "Pickup",
  "Returned",
  "Cancelled",
];

export default function AllProductList() {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOrder, setModalOrder] = useState(null);

  const navigate = useNavigate();
  const { data, isLoading } = useGetAdminProducts({
    published: true,
  });


  // 🧩 Populate the orders array from API response
  useEffect(() => {
    if (data?.data?.result?.items?.length) {
      const mappedData = data.data.result.items.map((item) => ({
        id: item.productId,
        name: item.name,
        price: `$${item.pricing?.priceRange?.maxPrice || 0}`,
        category: item.category,
        items: item.availableQuantity,
        size: item.size || "-",
        full: item,
      }));
      setOrders(mappedData);
    }
  }, [data]);

  // 🧮 Filtering
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        selectedStatus === "All" || order.status === selectedStatus;
      const matchesSearch =
        order.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [orders, selectedStatus, searchTerm]);

  // 🧾 Pagination (using frontend pagination logic)
  const itemsPerPage = 10;
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handleViewProduct = (order) => {
    navigate("/admin/product-details", {
      state: { order: order.full },
    });
  };

  // 🔽 Sorting
  const handleSort = (value) => {
    setSortOption(value);
    let sorted = [...orders];
    switch (value) {
      case "amount-asc":
        sorted.sort(
          (a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1))
        );
        break;
      case "amount-desc":
        sorted.sort(
          (a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1))
        );
        break;
      default:
        sorted = [...orders];
    }
    setOrders(sorted);
    setCurrentPage(1);
  };

  return (
    <div className="w-full px-4 sm:px-0 lg:px-0 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Product List
        </h1>
        <button className="bg-[#E94E30] text-white px-4 py-2 rounded-xl w-full sm:w-auto">
          Create New Product
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute top-3 left-2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by category or ID"
            className="pl-8 pr-4 py-2 border-2 border-gray-300 rounded-2xl w-full focus:outline-none focus:border-[#E94E30]"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex flex-wrap gap-3 relative">
          {/* Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 border px-4 py-2 rounded bg-[#F2F2F7] hover:bg-gray-200 text-sm"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter size={16} /> Filter
            </button>
            {showFilter && (
              <div className="absolute top-12 right-0 bg-white border p-4 rounded shadow z-10 w-40 sm:w-48">
                <label className="block mb-2 font-semibold text-sm text-gray-700">
                  Filter by Status
                </label>
                <select
                  className="border p-2 w-full rounded text-sm"
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setShowFilter(false);
                    setCurrentPage(1);
                  }}
                >
                  {statusList.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown
              className="absolute left-2 top-3 text-gray-500"
              size={16}
            />
            <select
              className="appearance-none pl-8 pr-4 py-2 border rounded text-sm text-gray-700 bg-[#F2F2F7] hover:bg-gray-200 focus:outline-none"
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="amount-asc">Price (Low → High)</option>
              <option value="amount-desc">Price (High → Low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border min-h-[200px]">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b text-[#878787] bg-[#FFF4F0] text-sm sm:text-base">
              <th className="py-3 px-4 font-normal">ID</th>
              <th className="py-3 px-4 font-normal">Name</th>
              <th className="py-3 px-4 font-normal">Price</th>
              <th className="py-3 px-4 font-normal">Category</th>
              <th className="py-3 px-4 font-normal">Qty</th>
              <th className="py-3 px-4 font-normal">Size</th>
              <th className="py-3 px-4 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : paginatedOrders.length > 0 ? (
              paginatedOrders.map((order, index) => (
                <tr
                  key={index}
                  className={`transition duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
                  } hover:bg-gray-100`}
                >
                  <td className="py-3 px-4 text-sm sm:text-base">{order.id}</td>
                  <td className="py-3 px-4">{order.name}</td>
                  <td className="py-3 px-4">{order.price}</td>
                  <td className="py-3 px-4">{order.category}</td>
                  <td className="py-3 px-4">{order.items}</td>
                  <td className="py-3 px-4">{order.size}</td>
                  <td className="py-3 px-4 text-right relative">
                    <span
                      className="cursor-pointer text-lg font-bold"
                      onClick={() => setModalOrder(order)}
                    >
                      ...
                    </span>
                    {modalOrder && modalOrder.id === order.id && (
                      <div className="absolute right-0 top-6 z-20 bg-white border rounded shadow p-2 min-w-[150px]">
                        <button
                          className="block w-full text-left px-3 py-2 text-gray-700 hover:text-[#E94E30]"
                          onClick={() => {
                            setModalOrder(null);
                            handleViewProduct(order);
                          }}
                        >
                          View
                        </button>
                        <button
                          className="block w-full text-left px-3 py-2 text-[#E94E30] hover:bg-[#FFE4DA] rounded"
                          onClick={() => setModalOrder(null)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 text-sm gap-4">
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-2 border rounded hover:bg-[#E94E30] hover:text-white disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 border rounded ${
                currentPage === page
                  ? "bg-[#E94E30] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            className="px-3 py-2 border rounded hover:bg-[#E94E30] hover:text-white disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <p className="text-gray-600 text-center sm:text-right">
          Showing {paginatedOrders.length} of {orders.length} results
        </p>
      </div>

      {/* Click outside modal */}
      {modalOrder && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setModalOrder(null)}
          style={{ background: "transparent" }}
        />
      )}
    </div>
  );
}
