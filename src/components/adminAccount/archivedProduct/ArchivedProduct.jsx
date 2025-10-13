import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialOrders = [
  { id: 'PUR-15627927', customer: 'Ralph Edwards', category: 'Bags', items: 4, size: 'Medium', amount: '$8.99', status: 'Pending' },
  { id: 'PUR-15627928', customer: 'Dianne Russell', category: 'Shoes', items: 2, size: 'Large', amount: '$45.00', status: 'Completed' },
  { id: 'PUR-15627929', customer: 'Jenny Wilson', category: 'Jackets', items: 1, size: 'Small', amount: '$30.50', status: 'Cancelled' },
  { id: 'PUR-15627930', customer: 'Devon Lane', category: 'Hats', items: 5, size: 'One Size', amount: '$25.20', status: 'Pending' },
];

const statusList = ['All', 'Pending', 'Completed', 'Cancelled'];

export default function ArchivedProduct() {
  const navigate = useNavigate();
  const [orders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortOption, setSortOption] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [modalOrder, setModalOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleSort = (value) => {
    setSortOption(value);
  };

  const handleViewOrder = (order) => {
   navigate('/admin/archived-product-details', { state: { order } });
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === 'All' || order.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, selectedStatus]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 sm:mb-[53.94px] gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Product List</h1>
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
            placeholder="Search for category by name or ID"
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
              className="flex items-center gap-2 border px-4 py-2 rounded bg-[#F2F2F7] text-sm"
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
            <ArrowUpDown className="absolute left-2 top-3 text-gray-500" size={16} />
          </div>

          <p className="font-extrabold cursor-pointer">...</p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-[#F2F2F7] text-gray-600 text-left">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Size</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.category}</td>
                <td className="py-3 px-4">{order.items}</td>
                <td className="py-3 px-4">{order.size}</td>
                <td className="py-3 px-4">{order.amount}</td>
                <td className="py-3 px-4 text-right">
                  <span
                    className="font-extrabold cursor-pointer"
                    onClick={() => setModalOrder(order)}
                  >
                    ...
                  </span>
                  {modalOrder && modalOrder.id === order.id && (
                    <div className="absolute right-6 mt-2 z-20 bg-white border rounded shadow p-2 min-w-[150px]">
                      <button
                        className="w-full text-center px-1 py-2 rounded hover:text-[#E94E30] font-semibold"
                        onClick={() => {
                          setModalOrder(null);
                          handleViewOrder(order);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full font-medium text-center px-3 py-2 bg-[#FFE4DA] text-[#E94E30] hover:bg-[#E94E30] hover:text-white rounded"
                        onClick={() => setModalOrder(null)}
                      >
                        Publish
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block sm:hidden space-y-4">
        {paginatedOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow p-4 border border-gray-100 relative"
          >
            <div className="flex justify-between">
              <p className="text-xs text-gray-400">{order.id}</p>
              <span
                className="font-extrabold cursor-pointer"
                onClick={() => setModalOrder(order)}
              >
                ...
              </span>
              {modalOrder && modalOrder.id === order.id && (
                <div className="absolute right-4 top-10 z-20 bg-white border rounded shadow p-2 min-w-[150px]">
                  <button
                    className="w-full text-center px-1 py-2 rounded hover:text-[#E94E30] font-semibold"
                    onClick={() => {
                      setModalOrder(null);
                      handleViewOrder(order);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="w-full font-medium text-center px-3 py-2 bg-[#FFE4DA] text-[#E94E30] hover:bg-[#E94E30] hover:text-white rounded"
                    onClick={() => setModalOrder(null)}
                  >
                    Publish
                  </button>
                </div>
              )}
            </div>
            <h3 className="font-semibold text-gray-800">{order.customer}</h3>
            <p className="text-sm text-gray-500">{order.category}</p>
            <div className="mt-3 grid grid-cols-2 text-sm text-gray-600">
              <p><span className="font-semibold">Qty:</span> {order.items}</p>
              <p><span className="font-semibold">Size:</span> {order.size}</p>
              <p><span className="font-semibold">Price:</span> {order.amount}</p>
            </div>
          </div>
        ))}
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
          onClick={() =>
            setCurrentPage((p) => Math.min(p + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
