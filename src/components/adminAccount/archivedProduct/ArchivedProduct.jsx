import { useState, useMemo, useRef, useEffect } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetAdminProducts from "@/hooks/api/queries/admin/useGetAdminProducts";
import usePublishProduct from "@/hooks/api/mutation/admin/usePublishProduct";
import useRemoveProducts from "@/hooks/api/mutation/admin/useRemoveProducts";
import { toast } from "sonner";

const statusList = ["All", "Archived"];

export default function ArchivedProduct() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [modalOrder, setModalOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [publishModal, setPublishModal] = useState(null);
  const [removeModal, setRemoveModal] = useState(null);
  const itemsPerPage = 3;

  const { data, isPending, refetch } = useGetAdminProducts({ published: false });
  const { mutate: publishProduct, isPending: publishPend } = usePublishProduct();
  const { mutate: removeProducts, isPending: removePend } = useRemoveProducts();

  const products = data?.data?.result?.items || [];

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

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedOrders.slice(start, start + itemsPerPage);
  }, [sortedOrders, currentPage]);

  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOrder(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewProduct = (order) =>
    navigate("/admin/product-details", { state: { order } });

  const handleSubmit = () => {
    if (!publishModal) return;
    publishProduct(
      { id: publishModal._id },
      {
        onSuccess: (res) => {
          toast.success(res?.data?.message || "Product Published!");
          setPublishModal(null);
          navigate("/admin/product-list");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || "Error publishing product");
        },
      }
    );
  };

  const handleRemove = () => {
    if (!removeModal) return;
    removeProducts(
      { id: removeModal._id },
      {
        onSuccess: (res) => {
          toast.success(res?.data?.message || "Product removed successfully!");
          setRemoveModal(null);
          refetch();
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || "Error removing product");
        },
      }
    );
  };

  if (isPending)
    return <div className="p-10 text-center text-gray-500">Loading products...</div>;

  if (!products.length)
    return (
      <div className="p-10 text-center text-gray-500">
        No archived products found.
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-0 py-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Archived Products</h1>
        <button className="bg-[#E94E30] hover:bg-[#d13d23] text-white px-5 py-2 rounded-xl font-medium shadow-sm transition w-full sm:w-auto">
          Create New Product
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute top-3 left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by brand or ID"
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-xl w-full text-sm focus:ring-2 focus:ring-[#E94E30] outline-none"
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
              className="flex items-center gap-2 border px-4 py-2 rounded-xl bg-[#F8F8FA] text-sm hover:bg-gray-100"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter size={16} /> Filter
            </button>
            {showFilter && (
              <div className="absolute top-12 right-0 bg-white border p-4 rounded-xl shadow-md z-10 w-48">
                <label className="block mb-2 font-medium text-sm text-gray-700">
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
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              className="appearance-none pl-8 py-2 pr-3 border rounded-xl text-sm w-[120px] bg-[#F8F8FA] focus:ring-2 focus:ring-[#E94E30] outline-none"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="date-asc">Oldest</option>
              <option value="date-desc">Newest</option>
              <option value="amount-asc">Price ↑</option>
              <option value="amount-desc">Price ↓</option>
            </select>
            <ArrowUpDown className="absolute left-2 top-3 text-gray-500" size={16} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="block overflow-x-auto border border-gray-200 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left">Product ID</th>
              <th className="py-3 px-4 text-left">Brand</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Stock</th>
              <th className="py-3 px-4 text-left">Size</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.category}</td>
                <td className="py-3 px-4">{order.items}</td>
                <td className="py-3 px-4">{order.size}</td>
                <td className="py-3 px-4">{order.amount}</td>
                <td className="py-3 px-4 text-right">
                  <span
                    className="font-bold cursor-pointer text-lg"
                    onClick={() =>
                      setModalOrder((prev) =>
                        prev?.id === order.id ? null : order
                      )
                    }
                  >
                    ...
                  </span>
                  {modalOrder?.id === order.id && (
                    <div
                      ref={modalRef}
                      className="absolute right-6 mt-2 z-20 bg-white border rounded-xl shadow p-2 w-40"
                    >
                      <button
                        className="w-full text-left px-3 py-2 hover:text-[#E94E30]"
                        onClick={() => {
                          setModalOrder(null);
                          handleViewProduct(order.full);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="w-full text-left px-3 py-2 text-green-600 hover:bg-green-50 rounded"
                        onClick={() => {
                          setModalOrder(null);
                          setPublishModal(order.full);
                        }}
                      >
                        Publish
                      </button>
                      <button
                        className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded"
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
      <div className="flex justify-center sm:justify-end items-center gap-3 mt-6 flex-wrap text-sm">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modals */}
      {(publishModal || removeModal) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-lg font-bold mb-3">
              {publishModal ? "Confirm Publish" : "Confirm Removal"}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to{" "}
              {publishModal ? "publish" : "remove"}{" "}
              <span className="font-semibold">
                {(publishModal || removeModal)?.brand?.join(", ") ||
                  "this product"}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setPublishModal(null);
                  setRemoveModal(null);
                }}
                className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={publishModal ? handleSubmit : handleRemove}
                className={`px-4 py-2 rounded-lg text-white ${
                  publishModal
                    ? "bg-[#E94E30] hover:bg-[#d13d23]"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {publishModal
                  ? publishPend
                    ? "Confirming..."
                    : "Confirm"
                  : removePend
                  ? "Removing..."
                  : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
