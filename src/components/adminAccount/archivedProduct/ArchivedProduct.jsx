import { useState, useMemo } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetAdminProducts from "@/hooks/api/queries/admin/useGetAdminProducts";
import { useRef, useEffect } from "react";
import usePublishProduct from "@/hooks/api/mutation/admin/usePublishProduct";
import { toast } from "sonner";
import useRemoveProducts from "@/hooks/api/mutation/admin/useRemoveProducts";

const statusList = ["All", "Archived"];

export default function ArchivedProduct() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [modalOrder, setModalOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [publishModal, setPublishModal] = useState(null);
  const [removeModal, setRemoveModal] = useState(null);

  const { data, isPending, refetch } = useGetAdminProducts({
    published: false,
  });

  const { mutate: publishProduct, isPending: publishPend } =
    usePublishProduct();

  const { mutate: removeProducts, isPending: removePend } = useRemoveProducts();

  // ✅ Handle Sort Option
  const handleSort = (value) => {
    setSortOption(value);
  };

  // ✅ View Product Details
  const handleViewProduct = (order) => {
    navigate("/admin/product-details", { state: { order } });
  };

  // ✅ Extract backend data safely
  const products = data?.data?.result?.items || [];

  // ✅ Transform backend data for table UI
  const transformedOrders = useMemo(() => {
    return products.map((p) => ({
      id: p.productId,
      customer: p.brand?.join(", ") || "N/A",
      category: p.category,
      items: p.availableQuantity,
      size: Array.isArray(p.size)
        ? p.size.join(", ")
        : p.size?.replace(/[\[\]"]/g, "") || "-",
      amount: `$${p.pricing?.perQuantity?.onePiece || 0}`,
      status: p.published ? "Published" : "Archived",
      image: p.images?.[0]?.secureUrl || "",
      full: p,
    }));
  }, [products]);

  // ✅ Search + Filter
  const filteredOrders = useMemo(() => {
    return transformedOrders.filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "All" || order.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [transformedOrders, searchTerm, selectedStatus]);

  // ✅ Sorting logic
  const sortedOrders = useMemo(() => {
    const sorted = [...filteredOrders];
    if (sortOption === "date-asc")
      sorted.sort(
        (a, b) => new Date(a.full.createdAt) - new Date(b.full.createdAt)
      );
    if (sortOption === "date-desc")
      sorted.sort(
        (a, b) => new Date(b.full.createdAt) - new Date(a.full.createdAt)
      );
    if (sortOption === "amount-asc")
      sorted.sort(
        (a, b) =>
          (a.full.pricing?.perQuantity?.onePiece || 0) -
          (b.full.pricing?.perQuantity?.onePiece || 0)
      );
    if (sortOption === "amount-desc")
      sorted.sort(
        (a, b) =>
          (b.full.pricing?.perQuantity?.onePiece || 0) -
          (a.full.pricing?.perQuantity?.onePiece || 0)
      );
    return sorted;
  }, [filteredOrders, sortOption]);

  // ✅ Pagination
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedOrders.slice(start, start + itemsPerPage);
  }, [sortedOrders, currentPage]);

  const modalRef = useRef(null);

  // ✅ Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOrder(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = () => {
    if (!publishModal) return;

    publishProduct(
      { id: publishModal._id },
      {
        onSuccess: (response) => {
          toast.success(response?.data?.message || "Product Published!");
          setPublishModal(null);
          navigate("/admin/product-list");
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Error publishing product"
          );
          setPublishModal(null);
        },
      }
    );
  };

  const handleRemove = () => {
    if (!removeModal) return;

    removeProducts(
      { id: removeModal._id },
      {
        onSuccess: (response) => {
          toast.success(
            response?.data?.message || "Product removed successfully!"
          );
          setRemoveModal(null);
          refetch();
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Error removing product"
          );
          setRemoveModal(null);
        },
      }
    );
  };

  if (isPending) {
    return (
      <div className="p-10 text-center text-gray-500">Loading products...</div>
    );
  }

  if (!products.length) {
    return (
      <div className="p-10 text-center text-gray-500">
        No archived products found.
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 sm:mb-[53.94px] gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Archived Products</h1>
        <button className="bg-[#E94E30] text-white px-4 py-2 rounded-xl w-full sm:w-auto">
          Create New Product
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute top-3 left-2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search for product by brand or ID"
            className="pl-8 pr-4 py-2 border-2 border-[#878787] rounded-2xl w-full text-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Filter + Sort */}
        <div className="flex flex-wrap gap-3 relative">
          <div className="relative">
            <button
              className="flex items-center gap-2 border px-4 py-1.5 rounded bg-[#F2F2F7] text-sm"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter size={16} /> Filter
            </button>
            {showFilter && (
              <div className="absolute top-12 right-0 bg-white border p-4 rounded shadow z-10 w-40 sm:w-56">
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

          <div className="relative">
            <select
              className="appearance-none pl-8 py-2 border rounded text-sm w-[107px]
              text-gray-700 bg-[#F2F2F7] focus:outline-none"
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="date-desc">Date (Newest First)</option>
              <option value="amount-asc">Amount (Low to High)</option>
              <option value="amount-desc">Amount (High to Low)</option>
            </select>
            <ArrowUpDown
              className="absolute left-2 top-3 text-gray-500"
              size={16}
            />
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-x-hidden overflow-y-scroll min-h-[150px]">
          <thead className="bg-[#F2F2F7] text-gray-600 text-left">
            <tr>
              <th className="py-3 px-4">Product ID</th>
              <th className="py-3 px-4">Brand</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Size</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 cursor-pointer relative"
              >
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.category}</td>
                <td className="py-3 px-4">{order.items}</td>
                <td className="py-3 px-4">{order.size}</td>
                <td className="py-3 px-4">{order.amount}</td>
                <td className="py-3 px-4 text-right relative">
                  <span
                    className="font-extrabold cursor-pointer"
                    onClick={() =>
                      setModalOrder((prev) =>
                        prev && prev.id === order.id ? null : order
                      )
                    }
                  >
                    ...
                  </span>

                  {modalOrder && modalOrder.id === order.id && (
                    <div
                      ref={modalRef}
                      className="absolute right-6 mt-2 z-20 bg-white border rounded shadow p-2 min-w-[150px]"
                    >
                      <button
                        className="w-full text-center px-1 py-2 rounded hover:text-[#E94E30] font-semibold"
                        onClick={() => {
                          setModalOrder(null);
                          handleViewProduct(order.full);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="w-full font-medium text-center px-3 py-2 bg-green-500/50 text-white hover:bg-green-500/80 hover:text-white rounded"
                        onClick={() => {
                          setModalOrder(null);
                          setPublishModal(order.full);
                        }}
                      >
                        Publish
                      </button>{" "}
                      <button
                        className="w-full font-medium text-center px-3 py-2 bg-[#FEE2E2] text-[#DC2626] hover:bg-[#DC2626] hover:text-white rounded mt-1"
                        onClick={() => {
                          setModalOrder(null);
                          setRemoveModal(order.full);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center sm:justify-end items-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded text-sm disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {publishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-lg w-[90%] sm:w-[400px]">
            <h2 className="text-lg font-bold mb-2">Confirm Publish</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to publish{" "}
              <span className="font-semibold">
                {publishModal?.brand?.join(", ") || "this product"}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPublishModal(null)}
                className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-[#E94E30] text-white hover:bg-[#d34429]"
              >
                {publishPend ? "confirming..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
      {removeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-lg w-[90%] sm:w-[400px]">
            <h2 className="text-lg font-bold mb-2">Confirm Removal</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to remove{" "}
              <span className="font-semibold">
                {removeModal?.brand?.join(", ") || "this product"}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRemoveModal(null)}
                className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleRemove}
                className="px-4 py-2 rounded-lg bg-[#DC2626] text-white hover:bg-[#b91c1c]"
              >
                {removePend ? "Removing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
